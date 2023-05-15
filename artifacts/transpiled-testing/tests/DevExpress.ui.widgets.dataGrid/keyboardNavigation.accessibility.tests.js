!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/keyboardNavigation.accessibility.tests.js"], ["jquery","generic_light.css!","ui/data_grid","events/utils/index","../../helpers/dataGridMocks.js","../../helpers/grid/keyboardNavigationHelper.js","animation/fx"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/keyboardNavigation.accessibility.tests.js", ["jquery", "generic_light.css!", "ui/data_grid", "events/utils/index", "../../helpers/dataGridMocks.js", "../../helpers/grid/keyboardNavigationHelper.js", "animation/fx"], function($__export) {
  "use strict";
  var $,
      createEvent,
      setupDataGridModules,
      CLICK_EVENT,
      testInDesktop,
      triggerKeyDown,
      fireKeyDown,
      focusCell,
      dataGridWrapper,
      fx;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {
      createEvent = $__m.createEvent;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
    }, function($__m) {
      CLICK_EVENT = $__m.CLICK_EVENT;
      testInDesktop = $__m.testInDesktop;
      triggerKeyDown = $__m.triggerKeyDown;
      fireKeyDown = $__m.fireKeyDown;
      focusCell = $__m.focusCell;
      dataGridWrapper = $__m.dataGridWrapper;
    }, function($__m) {
      fx = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "\n        <div>\n            <div id=\"container\" class=\"dx-datagrid\"></div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Keyboard navigation accessibility', {
        setupModule: function() {
          var $__4 = this;
          fx.off = true;
          this.$element = function() {
            return $('#container');
          };
          this.renderGridView = function() {
            return $__4.gridView.render($('#container'));
          };
          this.triggerKeyDown = triggerKeyDown;
          this.focusCell = focusCell;
          this.focusFirstCell = function() {
            return $__4.focusCell(0, 0);
          };
          this.ctrlUp = function() {
            return fireKeyDown($('#qunit-fixture').find(':focus'), 'ArrowUp', true);
          };
          this.ctrlDown = function() {
            return fireKeyDown($('#qunit-fixture').find(':focus'), 'ArrowDown', true);
          };
          this.data = this.data || [{
            name: 'Alex',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, {
            name: 'Dan1',
            date: '04/05/2006',
            room: 1,
            phone: 666666
          }, {
            name: 'Dan2',
            date: '07/08/2009',
            room: 2,
            phone: 777777
          }, {
            name: 'Dan3',
            date: '10/11/2012',
            room: 3,
            phone: 888888
          }];
          this.columns = this.columns || [{
            dataField: 'name',
            allowSorting: true,
            allowFiltering: true
          }, {
            dataField: 'date',
            dataType: 'date'
          }, {
            type: 'buttons',
            buttons: [{text: 'test0'}, {text: 'test1'}]
          }, {
            dataField: 'room',
            dataType: 'number'
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.options = $.extend(true, {
            keyboardNavigation: {
              enabled: true,
              dataCellsOnly: false
            },
            commonColumnSettings: {allowEditing: true},
            columns: this.columns,
            dataSource: this.data,
            editing: {
              mode: 'row',
              allowUpdating: true,
              allowAdding: true,
              allowDeleting: true
            },
            showColumnHeaders: true,
            sorting: {mode: 'single'}
          }, this.options);
          setupDataGridModules(this, ['data', 'columns', 'columnHeaders', 'sorting', 'grouping', 'groupPanel', 'headerPanel', 'pager', 'headerFilter', 'filterSync', 'filterPanel', 'filterRow', 'rows', 'editorFactory', 'gridView', 'editing', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'selection', 'focus', 'keyboardNavigation', 'validating', 'masterDetail'], {initViews: true});
        },
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.dispose && this.dispose();
          this.clock.restore();
        }
      }, function() {
        testInDesktop('Click by command cell', function(assert) {
          this.setupModule();
          this.options.keyboardNavigation = false;
          this.gridView.render($('#container'));
          this.focusCell(2, 1);
          this.clock.tick(10);
          assert.ok(this.columnsController.getColumns()[2].type, 'buttons', 'Column type');
          assert.ok($(this.getCellElement(1, 2)).hasClass('dx-cell-focus-disabled'), 'focus disabled class');
        });
        testInDesktop('Focus command cell', function(assert) {
          this.options = {onKeyDown: function(e) {
              if (e.event.key === 'Tab') {
                assert.notOk(e.event.isDefaultPrevented(), 'tab not prevented');
                assert.ok($(e.event.target).is('td.dx-command-edit.dx-focused'), 'command cell target');
              }
            }};
          this.setupModule();
          this.gridView.render($('#container'));
          this.focusCell(1, 1);
          this.triggerKeyDown('ArrowRight');
          this.clock.tick(10);
          assert.ok(this.columnsController.getColumns()[2].type, 'buttons', 'Column type');
          assert.ok($(this.getCellElement(1, 2)).hasClass('dx-focused'), 'cell focused');
          this.triggerKeyDown('tab', false, false, $(this.getCellElement(1, 2)));
          this.clock.tick(10);
        });
        testInDesktop('Focus command elements if row editing', function(assert) {
          var $__4 = this;
          var counter = 0;
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          var _editingCellTabHandler = this.keyboardNavigationController._editingCellTabHandler;
          this.keyboardNavigationController._editingCellTabHandler = function(eventArgs, direction) {
            var $target = $(eventArgs.originalEvent.target);
            var result = _editingCellTabHandler.bind($__4.keyboardNavigationController)(eventArgs, direction);
            if ($target.hasClass('dx-link')) {
              assert.equal(result, eventArgs.shift ? $target.index() === 0 : $target.index() === 1, 'need default behavior');
              ++counter;
            }
          };
          this.editRow(1);
          this.clock.tick(10);
          $(this.getCellElement(1, 1)).focus().trigger('dxclick');
          this.triggerKeyDown('tab', false, false, $(this.getCellElement(1, 1)));
          this.clock.tick(10);
          assert.ok($('#qunit-fixture').find(':focus').hasClass('dx-link'), 'focused element');
          assert.equal($('#qunit-fixture').find(':focus').index(), 0, 'focused element index');
          this.triggerKeyDown('tab', false, false, $(this.getCellElement(1, 2)).find('.dx-link').first());
          assert.equal(counter, 1, '_editingCellTabHandler counter');
          this.triggerKeyDown('tab', false, false, $(this.getCellElement(1, 2)).find('.dx-link').last());
          assert.equal(counter, 2, '_editingCellTabHandler counter');
          assert.ok($('#qunit-fixture').find(':focus').is('input'), 'focused element');
          assert.equal($('#qunit-fixture').find(':focus').closest('td').index(), 3, 'focused element index');
          this.triggerKeyDown('tab', false, true, $('#qunit-fixture').find(':focus'));
          assert.ok($('#qunit-fixture').find(':focus').hasClass('dx-link'), 'focused element');
          assert.equal($('#qunit-fixture').find(':focus').index(), 1, 'focused element index');
          this.triggerKeyDown('tab', false, true, $(this.getCellElement(1, 2)).find('.dx-link').last());
          assert.equal(counter, 3, '_editingCellTabHandler counter');
          this.triggerKeyDown('tab', false, true, $(this.getCellElement(1, 2)).find('.dx-link').first());
          assert.equal(counter, 4, '_editingCellTabHandler counter');
        });
        testInDesktop('Focus column with showEditorAlways on tab', function(assert) {
          this.columns = [{
            dataField: 'name',
            allowSorting: true,
            allowFiltering: true
          }, {
            dataField: 'room',
            dataType: 'number',
            showEditorAlways: true
          }];
          this.options = {editing: {mode: 'cell'}};
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          this.focusCell(0, 0);
          this.clock.tick(10);
          this.triggerKeyDown('tab', false, false, $(this.getCellElement(0, 0)));
          this.clock.tick(10);
          assert.ok($('#qunit-fixture').find(':focus').hasClass('dx-editor-cell'), 'editor cell is focused');
        });
        testInDesktop('Command column should not focused if batch editing mode', function(assert) {
          this.options = {editing: {
              mode: 'batch',
              allowDeleting: true
            }};
          this.setupModule();
          this.gridView.render($('#container'));
          this.editCell(1, 1);
          this.clock.tick(10);
          this.triggerKeyDown('tab', false, false, $(this.getCellElement(1, 1)));
          this.clock.tick(10);
          assert.ok($(this.getCellElement(1, 3)).hasClass('dx-focused'), 'cell focused');
          this.editCell(1, 4);
          this.clock.tick(10);
          this.triggerKeyDown('tab', false, false, $(this.getCellElement(1, 4)));
          this.clock.tick(10);
          assert.ok($(this.getCellElement(2, 0)).hasClass('dx-focused'), 'cell focused');
        });
        testInDesktop('Command column should not focused if cell editing mode', function(assert) {
          this.options = {editing: {
              mode: 'cell',
              allowDeleting: true
            }};
          this.setupModule();
          this.gridView.render($('#container'));
          this.editCell(1, 1);
          this.clock.tick(10);
          this.triggerKeyDown('tab', false, false, $(this.getCellElement(1, 1)));
          this.clock.tick(10);
          assert.ok($(this.getCellElement(1, 3)).hasClass('dx-focused'), 'cell focused');
          this.editCell(1, 4);
          this.clock.tick(10);
          this.triggerKeyDown('tab', false, false, $(this.getCellElement(1, 4)));
          this.clock.tick(10);
          assert.ok($(this.getCellElement(2, 0)).hasClass('dx-focused'), 'cell focused');
        });
        testInDesktop('Selection column should not focused if row editing mode', function(assert) {
          this.options = {
            editing: {
              mode: 'row',
              allowDeleting: true
            },
            selection: {mode: 'multiple'}
          };
          this.columns = [{type: 'selection'}, {
            dataField: 'name',
            allowSorting: true,
            allowFiltering: true
          }, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number'
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          this.editRow(1);
          this.clock.tick(10);
          $(this.getCellElement(1, 1)).focus().trigger('dxclick');
          this.clock.tick(10);
          this.triggerKeyDown('tab', false, true, $(this.getCellElement(1, 1)));
          this.clock.tick(10);
          assert.ok(this.getController('editing').isEditing(), 'Is editing');
          assert.notOk($(this.getCellElement(1, 0)).hasClass('dx-focused'), 'Cell focused');
        });
        testInDesktop('Enter, Space key down by group panel', function(assert) {
          var headerPanelWrapper = dataGridWrapper.headerPanel;
          var keyDownFiresCount = 0;
          this.options = {
            onKeyDown: function() {
              return ++keyDownFiresCount;
            },
            editing: {
              mode: 'batch',
              allowUpdating: true,
              selectTextOnEditStart: true,
              startEditAction: 'dblClick'
            },
            groupPanel: {visible: true},
            columns: [{dataField: 'name'}, {
              dataField: 'date',
              dataType: 'date'
            }, {
              dataField: 'room',
              dataType: 'number',
              groupIndex: 0
            }, {
              dataField: 'phone',
              dataType: 'number'
            }]
          };
          this.setupModule();
          this.gridView.render($('#container'));
          headerPanelWrapper.getGroupPanelItem(0).focus();
          fireKeyDown(headerPanelWrapper.getGroupPanelItem(0), 'Enter');
          this.clock.tick(10);
          assert.equal(keyDownFiresCount, 1, 'keyDownFiresCount');
          fireKeyDown(headerPanelWrapper.getGroupPanelItem(0), ' ');
          this.clock.tick(10);
          assert.equal(keyDownFiresCount, 2, 'keyDownFiresCount');
        });
        testInDesktop('Enter, Space key down by header cell', function(assert) {
          var headersWrapper = dataGridWrapper.headers;
          var keyDownFiresCount = 0;
          this.options = {onKeyDown: function() {
              return ++keyDownFiresCount;
            }};
          this.setupModule();
          this.gridView.render($('#container'));
          headersWrapper.getHeaderItem(0, 0).focus();
          assert.notOk(this.getController('data').getDataSource().sort(), 'Sorting');
          fireKeyDown(headersWrapper.getHeaderItem(0, 0), 'Enter');
          this.clock.tick(10);
          assert.deepEqual(this.getController('data').getDataSource().sort(), [{
            selector: 'name',
            desc: false
          }], 'Sorting');
          assert.equal(keyDownFiresCount, 1, 'keyDownFiresCount');
          fireKeyDown(headersWrapper.getHeaderItem(0, 0), ' ');
          this.clock.tick(10);
          assert.deepEqual(this.getController('data').getDataSource().sort(), [{
            selector: 'name',
            desc: true
          }], 'Sorting');
          assert.equal(keyDownFiresCount, 2, 'keyDownFiresCount');
        });
        testInDesktop('Enter, Space key down by header filter indicator', function(assert) {
          var headersWrapper = dataGridWrapper.headers;
          var keyDownFiresCount = 0;
          var headerFilterShownCount = 0;
          this.options = {
            onKeyDown: function() {
              return ++keyDownFiresCount;
            },
            headerFilter: {visible: true}
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.getView('headerFilterView').showHeaderFilterMenu = function($columnElement, options) {
            assert.equal(options.column.dataField, 'name');
            ++headerFilterShownCount;
          };
          headersWrapper.getHeaderFilterItem(0, 0).focus();
          fireKeyDown(headersWrapper.getHeaderFilterItem(0, 0), 'Enter');
          this.clock.tick(10);
          assert.equal(headerFilterShownCount, 1, 'headerFilterShownCount');
          assert.equal(keyDownFiresCount, 1, 'keyDownFiresCount');
          fireKeyDown(headersWrapper.getHeaderFilterItem(0, 0), ' ');
          this.clock.tick(10);
          assert.equal(headerFilterShownCount, 2, 'headerFilterShownCount');
          assert.equal(keyDownFiresCount, 2, 'keyDownFiresCount');
        });
        testInDesktop('Enter, Space key down by pager', function(assert) {
          var pagerWrapper = dataGridWrapper.pager;
          var keyDownFiresCount = 0;
          this.options = {
            onKeyDown: function() {
              return ++keyDownFiresCount;
            },
            editing: {
              mode: 'batch',
              allowUpdating: true,
              selectTextOnEditStart: true,
              startEditAction: 'dblClick'
            },
            pager: {visible: true},
            paging: {
              pageSize: 1,
              showNavigationButtons: true
            }
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          pagerWrapper.getPagerPageElement(0).focus();
          fireKeyDown(pagerWrapper.getPagerPageElement(0), 'Enter');
          this.clock.tick(10);
          assert.equal(keyDownFiresCount, 1, 'keyDownFiresCount');
          fireKeyDown(pagerWrapper.getPagerPageElement(0), ' ');
          this.clock.tick(10);
          assert.equal(keyDownFiresCount, 2, 'keyDownFiresCount');
        });
        testInDesktop('Enter, Space key down by header filter indicator', function(assert) {
          var headersWrapper = dataGridWrapper.headers;
          this.options = {headerFilter: {
              visible: true,
              texts: {
                ok: 'ok',
                cancel: 'cancel'
              }
            }};
          this.setupModule();
          this.gridView.render($('#container'));
          headersWrapper.getHeaderFilterItem(0, 0).focus();
          fireKeyDown(headersWrapper.getHeaderFilterItem(0, 0), 'Enter');
          this.clock.tick(10);
          this.headerFilterView.hideHeaderFilterMenu();
          this.clock.tick(10);
          assert.ok(headersWrapper.getHeaderFilterItem(0, 0).is(':focus'), 'Header filter icon focus state');
        });
        testInDesktop('Enter, Space key down on filter panel elements', function(assert) {
          var filterPanelWrapper = dataGridWrapper.filterPanel;
          var filterBuilderShownCount = 0;
          this.options = {
            filterPanel: {visible: true},
            filterValue: ['name', '=', 'Alex']
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.getView('filterPanelView')._showFilterBuilder = function() {
            ++filterBuilderShownCount;
          };
          filterPanelWrapper.getIconFilter().focus();
          fireKeyDown(filterPanelWrapper.getIconFilter(), 'Enter');
          this.clock.tick(10);
          assert.equal(filterBuilderShownCount, 1, 'filterBuilderShownCount');
          filterPanelWrapper.getPanelText().focus();
          fireKeyDown(filterPanelWrapper.getPanelText(), 'Enter');
          this.clock.tick(10);
          assert.equal(filterBuilderShownCount, 2, 'filterBuilderShownCount');
          filterPanelWrapper.getClearFilterButton().focus();
          assert.deepEqual(this.options.filterValue, ['name', '=', 'Alex'], 'filterValue');
          fireKeyDown(filterPanelWrapper.getClearFilterButton(), 'Enter');
          this.clock.tick(10);
          assert.equal(this.options.filterValue, null, 'filterValue');
        });
        testInDesktop('Enter, Space key down on pager elements', function(assert) {
          var pagerWrapper = dataGridWrapper.pager;
          this.options = {
            pager: {
              allowedPageSizes: [1, 2, 3],
              showPageSizeSelector: true,
              showNavigationButtons: true,
              visible: true
            },
            paging: {pageSize: 2}
          };
          this.setupModule();
          this.gridView.render($('#container'));
          pagerWrapper.getPagerPageSizeElement(2).trigger('focus');
          fireKeyDown($('#qunit-fixture').find(':focus'), 'Enter');
          this.clock.tick(10);
          assert.ok(pagerWrapper.isFocusedState(), 'Pager focus state');
          assert.ok(pagerWrapper.getPagerPageSizeElement(2).is(':focus'), 'Page size item focus state');
          pagerWrapper.getPagerPageElement(1).trigger('focus');
          fireKeyDown($('#qunit-fixture').find(':focus'), 'Enter');
          this.clock.tick(10);
          assert.ok(pagerWrapper.isFocusedState(), 'Pager focus state');
          assert.ok(pagerWrapper.getPagerPageElement(1).is(':focus'), 'Page choozer item focus state');
          assert.notOk(pagerWrapper.getPrevButtonsElement().is(':focus'), 'Page prev button focus state');
          pagerWrapper.getPrevButtonsElement().trigger('focus');
          fireKeyDown($('#qunit-fixture').find(':focus'), 'Space');
          this.clock.tick(10);
          assert.ok(pagerWrapper.isFocusedState(), 'Pager focus state');
          assert.ok(pagerWrapper.getPrevButtonsElement().is(':focus'), 'Page prev button focus state');
          assert.notOk(pagerWrapper.getNextButtonsElement().is(':focus'), 'Page next button focus state');
          pagerWrapper.getNextButtonsElement().trigger('focus');
          fireKeyDown($('#qunit-fixture').find(':focus'), 'Space');
          this.clock.tick(10);
          assert.ok(pagerWrapper.isFocusedState(), 'Pager focus state');
          assert.ok(pagerWrapper.getNextButtonsElement().is(':focus'), 'Page next button focus state');
        });
        testInDesktop('Group panel focus state', function(assert) {
          var headerPanelWrapper = dataGridWrapper.headerPanel;
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            groupIndex: 0,
            allowSorting: true
          }, {
            dataField: 'phone',
            dataType: 'number',
            groupIndex: 1,
            allowSorting: true
          }];
          this.options = {groupPanel: {visible: true}};
          this.setupModule();
          this.gridView.render($('#container'));
          headerPanelWrapper.getGroupPanelItem(0).focus();
          fireKeyDown($('#qunit-fixture').find(':focus'), 'Tab');
          assert.ok(headerPanelWrapper.getElement().hasClass('dx-state-focused'), 'Group panel focus state');
          $('#qunit-fixture').find(':focus').trigger('mousedown');
          assert.notOk(headerPanelWrapper.getElement().hasClass('dx-state-focused'), 'Group panel focus state');
          headerPanelWrapper.getGroupPanelItem(1).focus();
          fireKeyDown(headerPanelWrapper.getGroupPanelItem(1), 'enter');
          this.clock.tick(10);
          assert.ok(headerPanelWrapper.getElement().hasClass('dx-state-focused'), 'Group panel focus state');
          assert.ok(headerPanelWrapper.getGroupPanelItem(1).is(':focus'), 'Group panel item focus state');
        });
        testInDesktop('Header row focus state', function(assert) {
          var headersWrapper = dataGridWrapper.headers;
          this.setupModule();
          this.gridView.render($('#container'));
          headersWrapper.getHeaderItem(0, 1).focus();
          assert.ok(headersWrapper.getElement().hasClass('dx-state-focused'), 'Header row focus state');
          fireKeyDown($('#qunit-fixture').find(':focus'), 'Tab');
          assert.ok(headersWrapper.getElement().hasClass('dx-state-focused'), 'Header row focus state');
          $('#qunit-fixture').find(':focus').trigger('mousedown');
          assert.notOk(headersWrapper.getElement().hasClass('dx-state-focused'), 'Header row focus state');
        });
        testInDesktop('Rows view focus state', function(assert) {
          this.setupModule();
          this.gridView.render($('#container'));
          this.focusCell(1, 1);
          var $rowsView = this.keyboardNavigationController._focusedView.element();
          assert.notOk($rowsView.hasClass('dx-state-focused'), 'RowsView focus state');
          this.triggerKeyDown('Tab');
          assert.ok($rowsView.hasClass('dx-state-focused'), 'RowsView focus state');
          $(this.getCellElement(1, 2)).trigger(CLICK_EVENT);
          assert.notOk($rowsView.hasClass('dx-state-focused'), 'RowsView focus state');
        });
        testInDesktop('Filter panel focus state', function(assert) {
          var filterPanelWrapper = dataGridWrapper.filterPanel;
          this.options = {
            filterPanel: {visible: true},
            filterValue: ['name', '=', 'Alex']
          };
          this.setupModule();
          this.gridView.render($('#container'));
          assert.notOk(filterPanelWrapper.getElement().hasClass('dx-state-focused'), 'Filter panel focus state');
          filterPanelWrapper.getIconFilter().trigger('focus');
          fireKeyDown($('#qunit-fixture').find(':focus'), 'Tab');
          assert.ok(filterPanelWrapper.getElement().hasClass('dx-state-focused'), 'Filter panel focus state');
          $('#qunit-fixture').find(':focus').trigger('mousedown');
          assert.notOk(filterPanelWrapper.getElement().hasClass('dx-state-focused'), 'Filter panel focus state');
          fireKeyDown($('#qunit-fixture').find(':focus'), 'Tab');
          assert.ok(filterPanelWrapper.getElement().hasClass('dx-state-focused'), 'Filter panel focus state');
        });
        testInDesktop('Pager focus state', function(assert) {
          var pagerWrapper = dataGridWrapper.pager;
          this.options = {
            pager: {
              allowedPageSizes: [1, 2, 3],
              showPageSizeSelector: true,
              showNavigationButtons: true,
              visible: true
            },
            paging: {pageSize: 2}
          };
          this.setupModule();
          this.gridView.render($('#container'));
          assert.notOk(pagerWrapper.isFocusedState(), 'Pager focus state');
          pagerWrapper.getPagerPageSizeElement(0).trigger('focus');
          fireKeyDown($('#qunit-fixture').find(':focus'), 'Tab');
          assert.ok(pagerWrapper.isFocusedState(), 'Pager focus state');
          $('#qunit-fixture').find(':focus').trigger('mousedown');
          assert.notOk(pagerWrapper.isFocusedState(), 'Pager focus state');
          fireKeyDown($('#qunit-fixture').find(':focus'), 'Tab');
          assert.ok(pagerWrapper.isFocusedState(), 'Pager focus state');
        });
        testInDesktop('View selector - groupping, not ordered focusing view', function(assert) {
          this.options = {
            headerFilter: {visible: true},
            filterRow: {visible: true},
            filterPanel: {visible: true},
            groupPanel: {visible: true},
            pager: {
              allowedPageSizes: [1, 2],
              showPageSizeSelector: true,
              showNavigationButtons: true,
              visible: true
            },
            columns: [{
              dataField: 'name',
              allowSorting: true,
              allowFiltering: true
            }, {
              dataField: 'date',
              dataType: 'date'
            }, {
              dataField: 'room',
              dataType: 'number',
              groupIndex: 0
            }, {
              dataField: 'phone',
              dataType: 'number'
            }]
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          dataGridWrapper.headerPanel.getGroupPanelItem(0).focus();
          this.ctrlDown();
          assert.ok(dataGridWrapper.headers.getHeaderItem(0, 0).is(':focus'), 'focused element');
          dataGridWrapper.headers.getHeaderItem(0, 0).focus();
          this.ctrlDown();
          assert.ok(dataGridWrapper.filterRow.getTextEditorInput(0).is(':focus'), 'focused element');
          $(this.getCellElement(1, 1)).trigger(CLICK_EVENT).focus();
          this.ctrlUp();
          assert.ok(dataGridWrapper.filterRow.getTextEditorInput(0).is(':focus'), 'focused element');
          this.ctrlUp();
          assert.ok(dataGridWrapper.headers.getHeaderItem(0, 0).is(':focus'), 'focused element');
          this.ctrlUp();
          assert.ok(dataGridWrapper.headerPanel.getGroupPanelItem(0).is(':focus'), 'focused element');
          this.ctrlDown();
          assert.ok(dataGridWrapper.headers.getHeaderItem(0, 0).is(':focus'), 'focused element');
          $(this.getCellElement(1, 1)).trigger(CLICK_EVENT).focus();
          this.ctrlDown();
          assert.ok(dataGridWrapper.filterPanel.getIconFilter().is(':focus'), 'focused element');
          this.ctrlDown();
          assert.ok(dataGridWrapper.pager.getPagerPageSizeElement(0).is(':focus'), 'focused element');
          this.ctrlUp();
          assert.ok(dataGridWrapper.filterPanel.getIconFilter().is(':focus'), 'focused element');
        });
        testInDesktop('View selector - navigation through views', function(assert) {
          this.options = {
            headerFilter: {visible: true},
            filterRow: {visible: true},
            filterPanel: {visible: true},
            pager: {
              allowedPageSizes: [1, 2],
              showPageSizeSelector: true,
              showNavigationButtons: true,
              visible: true
            },
            columns: [{
              dataField: 'name',
              allowSorting: true,
              allowFiltering: true
            }, {
              dataField: 'date',
              dataType: 'date'
            }, {
              dataField: 'room',
              dataType: 'number'
            }, {
              dataField: 'phone',
              dataType: 'number'
            }]
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          dataGridWrapper.headers.getHeaderItem(0, 0).focus();
          this.ctrlDown();
          assert.ok(dataGridWrapper.filterRow.getTextEditorInput(0).is(':focus'), 'focused filterRow editor');
          this.ctrlDown();
          assert.ok($(this.getCellElement(0, 0)).is(':focus'), 'first cell is focused');
          this.ctrlDown();
          assert.ok(dataGridWrapper.filterPanel.getIconFilter().is(':focus'), 'focused filterPanel filter icon');
          this.ctrlDown();
          assert.ok(dataGridWrapper.pager.getPagerPageSizeElement(0).is(':focus'), 'focused pager page size element');
          this.ctrlUp();
          assert.ok(dataGridWrapper.filterPanel.getIconFilter().is(':focus'), 'focused filterPanel filter icon');
          this.ctrlUp();
          assert.ok($(this.getCellElement(0, 0)).is(':focus'), 'first cell is focused');
          this.ctrlUp();
          assert.ok(dataGridWrapper.filterRow.getTextEditorInput(0).is(':focus'), 'focused filterRow editor');
        });
        testInDesktop('Focusing should be hidden if document.visibilityState changed to visible', function(assert) {
          this.options = {columns: [{
              dataField: 'name',
              allowSorting: true
            }, {
              dataField: 'phone',
              dataType: 'number'
            }]};
          this.setupModule();
          this.gridView.render($('#container'));
          this.clock.tick(10);
          $(document).trigger(createEvent('visibilitychange', {visibilityState: 'visible'}));
          var $headersElement = dataGridWrapper.headers.getElement();
          var $headerItem = dataGridWrapper.headers.getHeaderItem(0, 0);
          $headerItem.trigger('focus');
          assert.ok($headerItem.is(':focus'), 'Header cell has focus');
          assert.notOk($headersElement.hasClass('dx-state-focused'), 'Headers main element has no dx-state-focused class');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","generic_light.css!","ui/data_grid","events/utils","../../helpers/dataGridMocks.js","../../helpers/grid/keyboardNavigationHelper.js","animation/fx"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("generic_light.css!"), require("ui/data_grid"), require("events/utils"), require("../../helpers/dataGridMocks.js"), require("../../helpers/grid/keyboardNavigationHelper.js"), require("animation/fx"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=keyboardNavigation.accessibility.tests.js.map