!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/keyboardNavigation.customization.tests.js"], ["jquery","generic_light.css!","ui/data_grid","core/utils/browser","../../helpers/dataGridMocks.js","../../helpers/keyboardMock.js","../../helpers/grid/keyboardNavigationHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/keyboardNavigation.customization.tests.js", ["jquery", "generic_light.css!", "ui/data_grid", "core/utils/browser", "../../helpers/dataGridMocks.js", "../../helpers/keyboardMock.js", "../../helpers/grid/keyboardNavigationHelper.js"], function($__export) {
  "use strict";
  var $,
      browser,
      setupDataGridModules,
      keyboardMock,
      testInDesktop,
      triggerKeyDown,
      fireKeyDown,
      focusCell,
      dataGridWrapper,
      getTextSelection;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {}, function($__m) {
      browser = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      testInDesktop = $__m.testInDesktop;
      triggerKeyDown = $__m.triggerKeyDown;
      fireKeyDown = $__m.fireKeyDown;
      focusCell = $__m.focusCell;
      dataGridWrapper = $__m.dataGridWrapper;
      getTextSelection = $__m.getTextSelection;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "\n        <div>\n            <div id=\"container\" class=\"dx-datagrid\"></div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Customize keyboard navigation', {
        setupModule: function() {
          var $__4 = this;
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
          this.columns = this.columns || [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
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
              enterKeyAction: 'startEdit',
              enterKeyDirection: 'none',
              editOnKeyPress: false
            },
            commonColumnSettings: {allowEditing: true},
            columns: this.columns,
            dataSource: this.data,
            editing: {allowUpdating: true}
          }, this.options);
          setupDataGridModules(this, ['data', 'columns', 'columnHeaders', 'rows', 'editorFactory', 'gridView', 'editing', 'editingRowBased', 'editingFormBased', 'editingCellBased', 'keyboardNavigation', 'validating', 'masterDetail', 'summary'], {initViews: true});
        },
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.dispose && this.dispose();
          this.clock.restore();
        }
      }, function() {
        testInDesktop('Editing navigation mode - arrow keys should operate with drop down if it is expanded', function(assert) {
          var rooms = [{
            id: 0,
            name: 'room0'
          }, {
            id: 1,
            name: 'room1'
          }, {
            id: 2,
            name: 'room2'
          }, {
            id: 3,
            name: 'room3'
          }, {
            id: 222,
            name: 'room222'
          }];
          this.options = {
            editing: {mode: 'batch'},
            keyboardNavigation: {
              enterKeyDirection: 'column',
              editOnKeyPress: true
            }
          };
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            lookup: {
              dataSource: rooms,
              valueExpr: 'id',
              displayExpr: 'name',
              searchExpr: 'id'
            }
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.renderGridView();
          assert.equal($('.dx-selectbox-popup').length, 0, 'no drop down');
          this.focusCell(2, 1);
          this.triggerKeyDown('2');
          this.clock.tick(525);
          keyboardMock($('#qunit-fixture').find(':focus')[0]).keyDown('downArrow');
          this.clock.tick(10);
          assert.equal($('.dx-selectbox-popup').length, 1, 'drop down created');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'focusedCellPosition');
          keyboardMock($('#qunit-fixture').find(':focus')[0]).keyDown('enter');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          var $input = $('.dx-row .dx-texteditor-container input').eq(0);
          assert.equal($input.length, 0, 'input');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 2
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '04/05/2006',
            room: 222,
            phone: 666666
          }, 'row 1 data');
          this.triggerKeyDown('1');
          this.clock.tick(525);
          keyboardMock($('#qunit-fixture').find(':focus')[0]).keyDown('downArrow');
          this.clock.tick(10);
          keyboardMock($('#qunit-fixture').find(':focus')[0]).keyDown('enter');
          this.clock.tick(10);
          this.triggerKeyDown('upArrow');
          this.clock.tick(10);
          $input = $('.dx-row .dx-texteditor-container input').eq(0);
          assert.equal($input.length, 0, 'input');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[2].data, {
            name: 'Dan2',
            date: '07/08/2009',
            room: 1,
            phone: 777777
          }, 'row 2 data');
        });
        testInDesktop('Editing by char for not editable column', function(assert) {
          this.options = {editing: {
              mode: 'batch',
              fastEditingMode: true
            }};
          this.columns = ['name', {
            dataField: 'date',
            allowEditing: false
          }, 'room'];
          this.setupModule();
          this.gridView.render($('#container'));
          this.focusCell(1, 1);
          this.triggerKeyDown('1');
          this.clock.tick(10);
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is editing by char key');
        });
        testInDesktop('Enter key if \'enterKeyAction\' is \'moveFocus\'', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {enterKeyAction: 'moveFocus'}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is not in editing mode');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
        });
        testInDesktop('Enter key if \'enterKeyDirection\' is \'column\' and cell edit mode', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {enterKeyDirection: 'column'}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          assert.ok(!this.keyboardNavigationController._isEditingCompleted, 'editing is completed');
        });
        testInDesktop('Enter+Shift key if \'enterKeyDirection\' is \'column\' and cell edit mode', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {enterKeyDirection: 'column'}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'row is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          this.triggerKeyDown('enter', undefined, true);
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          assert.ok(!this.keyboardNavigationController._isEditingCompleted, 'editing is completed');
        });
        testInDesktop('Enter key if \'enterKeyDirection\' is row and cell edit mode', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {enterKeyDirection: 'row'}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          assert.ok(!this.keyboardNavigationController._isEditingCompleted, 'editing is completed');
        });
        testInDesktop('Enter key if \'enterKeyDirection\' is row, rtlEnabled and cell edit mode', function(assert) {
          this.options = {
            rtlEnabled: true,
            editing: {mode: 'cell'},
            keyboardNavigation: {enterKeyDirection: 'row'}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          assert.ok(!this.keyboardNavigationController._isEditingCompleted, 'editing is completed');
        });
        testInDesktop('Enter+Shift key if \'enterKeyDirection\' is row and cell edit mode', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {enterKeyDirection: 'row'}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
          this.triggerKeyDown('enter', undefined, true);
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          assert.ok(!this.keyboardNavigationController._isEditingCompleted, 'editing is completed');
        });
        testInDesktop('Enter+Shift key if \'enterKeyDirection\' is row, rtlEnabled and cell edit mode', function(assert) {
          this.options = {
            rtlEnabled: true,
            editing: {mode: 'cell'},
            keyboardNavigation: {enterKeyDirection: 'row'}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
          this.triggerKeyDown('enter', undefined, true);
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          assert.ok(!this.keyboardNavigationController._isEditingCompleted, 'editing is completed');
        });
        testInDesktop('Enter key if \'enterKeyDirection\' is \'column\' and batch edit mode', function(assert) {
          this.options = {
            editing: {mode: 'batch'},
            keyboardNavigation: {enterKeyDirection: 'column'}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          assert.ok(!this.keyboardNavigationController._isEditingCompleted, 'editing is completed');
        });
        testInDesktop('Enter key if \'enterKeyDirection\' is \'column\' and batch edit mode if recalculateWhileEditing is enabled', function(assert) {
          this.options = {
            editing: {mode: 'batch'},
            keyboardNavigation: {enterKeyDirection: 'column'},
            summary: {recalculateWhileEditing: true},
            loadingTimeout: 0
          };
          this.setupModule();
          this.renderGridView();
          this.clock.tick(10);
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.$element().find('.dx-texteditor').dxTextBox('instance').option('value', 'test');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          var changedSpy = sinon.spy();
          this.dataController.changed.add(changedSpy);
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(changedSpy.callCount, 2, 'changed count');
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
        });
        testInDesktop('Enter+Shift key if \'enterKeyDirection\' is \'column\' and batch edit mode', function(assert) {
          this.options = {
            editing: {mode: 'batch'},
            keyboardNavigation: {enterKeyDirection: 'column'}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'row is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          this.triggerKeyDown('enter', undefined, true);
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          assert.ok(!this.keyboardNavigationController._isEditingCompleted, 'editing is completed');
        });
        testInDesktop('Enter key if \'enterKeyDirection\' is row and batch edit mode', function(assert) {
          this.options = {
            editing: {mode: 'batch'},
            keyboardNavigation: {enterKeyDirection: 'row'}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          assert.ok(!this.keyboardNavigationController._isEditingCompleted, 'editing is completed');
        });
        testInDesktop('Enter+Shift key if \'enterKeyDirection\' is row and batch edit mode', function(assert) {
          this.options = {
            editing: {mode: 'batch'},
            keyboardNavigation: {enterKeyDirection: 'row'}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
          this.triggerKeyDown('enter', undefined, true);
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          assert.ok(!this.keyboardNavigationController._isEditingCompleted, 'editing is completed');
        });
        testInDesktop('Enter key for not changed editing cell if \'editOnKeyPress\' and cell edit mode', function(assert) {
          this.options = {
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.editCell(0, 0);
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is editing began by char key');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is editing began by char key');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
        });
        testInDesktop('Enter key for not changed editing cell if \'editOnKeyPress\' and batch edit mode', function(assert) {
          this.options = {
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.editCell(0, 0);
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is editing began by char key');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is editing began by char key');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
        });
        testInDesktop('Enter key for changed editing cell if \'editOnKeyPress\' and cell edit mode', function(assert) {
          this.options = {
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.editCell(0, 0);
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Editing navigation mode');
          var $input = $('.dx-row .dx-texteditor-input').eq(0);
          $input.val('Test');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Editing navigation mode');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
        });
        testInDesktop('Enter key for changed editing cell if \'editOnKeyPress\' and batch edit mode', function(assert) {
          this.options = {
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.editCell(0, 0);
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Editing navigation mode');
          var $input = $('.dx-row .dx-texteditor-input').eq(0);
          $input.val('Test');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Editing navigation mode');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
        });
        testInDesktop('F2 key and cell edit mode', function(assert) {
          this.options = {editing: {mode: 'cell'}};
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is editing by char key');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is editing by char key');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
        });
        testInDesktop('F2 key and batch edit mode', function(assert) {
          this.options = {editing: {mode: 'batch'}};
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is editing by char key');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is editing by char key');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.equal($('td[tabIndex]').attr('tabIndex'), 0, 'tabIndex of cell');
          assert.equal($('td.dx-focused').length, 1, 'one cell is focused');
        });
        testInDesktop('Press DELETE key if \'editOnKeyPress: true\', \'enterKeyDirection: column\' and cell edit mode', function(assert) {
          var $editor;
          this.options = {
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            keyboardNavigation: {
              enterKeyDirection: 'column',
              editOnKeyPress: true
            }
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('Delete');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'Alex',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Alex', 'editor value');
          assert.strictEqual($editor.find('.dx-texteditor-input').val(), '', 'input value');
          fireKeyDown($editor.find('.dx-texteditor-input'), 'Enter');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: '',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
        });
        testInDesktop('Press DELETE key if \'editOnKeyPress: true\', \'enterKeyDirection: column\' and batch edit mode', function(assert) {
          var $editor;
          this.options = {
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            keyboardNavigation: {
              enterKeyDirection: 'column',
              editOnKeyPress: true
            }
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('Delete');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'Alex',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Alex', 'editor value');
          assert.strictEqual($editor.find('.dx-texteditor-input').val(), '', 'input value');
          fireKeyDown($editor.find('.dx-texteditor-input'), 'Enter');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: '',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
        });
        testInDesktop('Press BACKSPACE key if \'editOnKeyPress: true\', \'enterKeyDirection: column\' and cell edit mode', function(assert) {
          var $editor;
          this.options = {
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            keyboardNavigation: {
              enterKeyDirection: 'column',
              editOnKeyPress: true
            }
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('Backspace');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'Alex',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Alex', 'editor value');
          assert.strictEqual($editor.find('.dx-texteditor-input').val(), '', 'input value');
          fireKeyDown($editor.find('.dx-texteditor-input'), 'Enter');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: '',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
        });
        testInDesktop('Press BACKSPACE key if \'editOnKeyPress: true\', \'enterKeyDirection: column\' and batch edit mode', function(assert) {
          var $editor;
          this.options = {
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            keyboardNavigation: {
              enterKeyDirection: 'column',
              editOnKeyPress: true
            }
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('Backspace');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'Alex',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Alex', 'editor value');
          assert.strictEqual($editor.find('.dx-texteditor-input').val(), '', 'input value');
          fireKeyDown($editor.find('.dx-texteditor-input'), 'Enter');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: '',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
        });
        testInDesktop('\'editOnKeyPress\', \'enterKeyDirection\' is column and cell edit mode', function(assert) {
          var $editor;
          this.options = {
            editing: {
              mode: 'cell',
              allowUpdating: true
            },
            keyboardNavigation: {
              enterKeyDirection: 'column',
              editOnKeyPress: true
            }
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('D');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'Alex',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Alex', 'editor value');
          assert.equal($editor.find('.dx-texteditor-input').val(), 'D', 'input value');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'D',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
        });
        testInDesktop('\'editOnKeyPress\', \'enterKeyDirection\' is row and cell edit mode', function(assert) {
          var $editor;
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {
              enterKeyDirection: 'row',
              editOnKeyPress: true
            }
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('D');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'Alex',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Alex', 'editor value');
          assert.equal($editor.find('.dx-texteditor-input').val(), 'D', 'input value');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'D',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
        });
        testInDesktop('\'editOnKeyPress\', \'enterKeyDirection\' is column and batch edit mode', function(assert) {
          var $editor;
          this.options = {
            editing: {
              mode: 'batch',
              allowUpdating: true
            },
            keyboardNavigation: {
              enterKeyDirection: 'column',
              editOnKeyPress: true
            }
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('D');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'Alex',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Alex', 'editor value');
          assert.equal($editor.find('.dx-texteditor-input').val(), 'D', 'input value');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'D',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
        });
        testInDesktop('\'editOnKeyPress\', \'enterKeyDirection\' is \'row\' and batch edit mode', function(assert) {
          var $editor;
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {
              enterKeyDirection: 'row',
              editOnKeyPress: true
            }
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('D');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'Alex',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Alex', 'editor value');
          assert.equal($editor.find('.dx-texteditor-input').val(), 'D', 'input value');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'D',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
        });
        testInDesktop('\'editOnKeyPress\', \'enterKeyDirection\' is row, \'rtlEnabled\' and cell edit mode', function(assert) {
          var $editor;
          this.options = {
            rtlEnabled: true,
            editing: {mode: 'cell'},
            keyboardNavigation: {
              enterKeyDirection: 'row',
              editOnKeyPress: true
            }
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('D');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'Alex',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Alex', 'editor value');
          assert.equal($editor.find('.dx-texteditor-input').val(), 'D', 'input value');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Is begin editing by char key');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'D',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
        });
        testInDesktop('Do not begin editing by char key if \'editOnKeyPress\' is false', function(assert) {
          this.options = {editing: {mode: 'cell'}};
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('D');
          this.clock.tick(10);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'row is editing');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Editing navigation mode');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
        });
        testInDesktop('RightArrow key if \'keyboardNavigation.editOnKeyPress\' and editing has began by key press', function(assert) {
          var $editor;
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusFirstCell();
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('D');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'Alex',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Alex', 'editor value');
          assert.equal($editor.find('.dx-texteditor-input').val(), 'D', 'input value');
          this.triggerKeyDown('rightArrow');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Editing navigation mode');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'D',
            date: '01/02/2003',
            room: 0,
            phone: 555555
          }, 'data');
        });
        testInDesktop('LeftArrow key if \'keyboardNavigation.editOnKeyPress\' and editing has began by key press', function(assert) {
          var $editor;
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusCell(2, 1);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('2');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '04/05/2006',
            room: 1,
            phone: 666666
          }, 'data');
          assert.equal($editor.dxNumberBox('instance').option('value'), '1', 'editor value');
          assert.equal($editor.find('.dx-texteditor-input').val(), '2', 'input value');
          this.triggerKeyDown('leftArrow');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '04/05/2006',
            room: 2,
            phone: 666666
          }, 'cell value');
        });
        testInDesktop('UpArrow key if \'keyboardNavigation.editOnKeyPress\' and editing has began by key press', function(assert) {
          var $editor;
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusCell(0, 1);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('D');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '04/05/2006',
            room: 1,
            phone: 666666
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Dan1', 'editor value');
          assert.equal($editor.find('.dx-texteditor-input').val(), 'D', 'input value');
          this.triggerKeyDown('upArrow');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'D',
            date: '04/05/2006',
            room: 1,
            phone: 666666
          }, 'cell value');
        });
        testInDesktop('DownArrow key if \'keyboardNavigation.editOnKeyPress\' and editing has began by key press', function(assert) {
          var $editor;
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusCell(0, 1);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('D');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '04/05/2006',
            room: 1,
            phone: 666666
          }, 'data');
          assert.equal($editor.dxTextBox('instance').option('value'), 'Dan1', 'editor value');
          assert.equal($editor.find('.dx-texteditor-input').val(), 'D', 'input value');
          this.triggerKeyDown('downArrow');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 2
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'D',
            date: '04/05/2006',
            room: 1,
            phone: 666666
          }, 'cell value');
        });
        testInDesktop('DownArrow key if \'keyboardNavigation.editOnKeyPress\' and editing began 2nd time by the key press', function(assert) {
          var $editor;
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusCell(0, 1);
          assert.equal(this.editingController._getVisibleEditRowIndex(), -1, 'cell is editing');
          this.triggerKeyDown('D');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          this.triggerKeyDown('downArrow');
          this.clock.tick(10);
          this.triggerKeyDown('A');
          this.clock.tick(25);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 1, 'editor');
          assert.equal(this.editingController._getVisibleEditRowIndex(), 2, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 2
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          this.triggerKeyDown('downArrow');
          this.clock.tick(10);
          $editor = $('.dx-texteditor').eq(0);
          assert.equal($editor.length, 0, 'no editor');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 0,
            rowIndex: 3
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'D',
            date: '04/05/2006',
            room: 1,
            phone: 666666
          }, 'row 1 data');
          assert.deepEqual(this.getController('data').items()[2].data, {
            name: 'A',
            date: '07/08/2009',
            room: 2,
            phone: 777777
          }, 'row 2 data');
        });
        testInDesktop('Editing navigation mode for a number cell if \'keyboardNavigation.editOnKeyPress\' and Up/Down arrow keys', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusCell(2, 1);
          this.triggerKeyDown('2');
          this.clock.tick(25);
          var $input = $('.dx-row .dx-texteditor-input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '04/05/2006',
            room: 1,
            phone: 666666
          }, 'row 1 data');
          assert.deepEqual(this.getController('data').items()[2].data, {
            name: 'Dan2',
            date: '07/08/2009',
            room: 2,
            phone: 777777
          }, 'row 2 data');
          assert.equal($input.val(), '2', 'input value');
          this.triggerKeyDown('downArrow');
          this.clock.tick(10);
          this.triggerKeyDown('1');
          this.clock.tick(25);
          $input = $('.dx-row .dx-texteditor-input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 2, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 2
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '04/05/2006',
            room: 2,
            phone: 666666
          }, 'row 1 data');
          assert.equal($input.val(), '1', 'input value');
          this.triggerKeyDown('upArrow');
          this.clock.tick(10);
          $input = $('.dx-row .dx-texteditor-input').eq(0);
          assert.equal($input.length, 0, 'input');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[2].data, {
            name: 'Dan2',
            date: '07/08/2009',
            room: 1,
            phone: 777777
          }, 'row 2 data');
        });
        testInDesktop('Editing start for a number cell with format if \'keyboardNavigation.editOnKeyPress\'', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.columns = [{dataField: 'name'}, {
            dataField: 'room',
            dataType: 'number',
            editorOptions: {format: '$#0.00'}
          }];
          this.setupModule();
          this.renderGridView();
          this.focusCell(1, 1);
          this.triggerKeyDown('2');
          this.clock.tick(300);
          var $input = $('.dx-row .dx-texteditor-input').eq(0);
          assert.equal($input.val(), '$2.00', 'input value');
          assert.equal($input.get(0).selectionStart, 2, 'caret start position');
          assert.equal($input.get(0).selectionEnd, 2, 'caret end position');
        });
        testInDesktop('Editing navigation mode for a number cell if \'keyboardNavigation.editOnKeyPress\' and Left/Right arrow keys exit', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusCell(2, 1);
          this.triggerKeyDown('2');
          this.clock.tick(25);
          var $input = $('.dx-row .dx-texteditor-container input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.equal($input.val(), '2', 'input value');
          this.triggerKeyDown('rightArrow');
          this.clock.tick(10);
          this.triggerKeyDown('1');
          this.clock.tick(25);
          $input = $('.dx-row .dx-texteditor-container input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 3,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.equal($input.val(), '1', 'input value');
          this.triggerKeyDown('leftArrow');
          this.clock.tick(10);
          $input = $('.dx-row .dx-texteditor-container input').eq(0);
          assert.equal($input.length, 0, 'input');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
        });
        testInDesktop('Editing navigation mode for a date cell if \'keyboardNavigation.editOnKeyPress\' and Up/Down arrow keys', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.renderGridView();
          this.focusCell(1, 1);
          this.triggerKeyDown('2');
          this.clock.tick(25);
          var $input = $('.dx-texteditor-input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.equal($input.val(), '2', 'input value');
          this.triggerKeyDown('downArrow');
          this.clock.tick(10);
          this.triggerKeyDown('1');
          this.clock.tick(25);
          $input = $('.dx-texteditor-input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 2, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 2
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.equal($input.val(), '1', 'input value');
          this.triggerKeyDown('upArrow');
          this.clock.tick(10);
          $input = $('.dx-row .dx-numberbox .dx-texteditor-container input').eq(0);
          assert.equal($input.length, 0, 'input');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
        });
        testInDesktop('Editing navigation mode for a date cell if \'keyboardNavigation.editOnKeyPress\' and Left/Right arrow keys exit', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.setupModule();
          this.gridView.render($('#container'));
          this.focusCell(1, 1);
          this.triggerKeyDown('2');
          this.clock.tick(25);
          var $input = $('.dx-row .dx-texteditor-input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.equal($input.val(), '2', 'input value');
          this.triggerKeyDown('rightArrow');
          this.clock.tick(10);
          this.triggerKeyDown('1');
          this.clock.tick(25);
          $input = $('.dx-row .dx-texteditor-input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.equal($input.val(), '1', 'input value');
          this.triggerKeyDown('leftArrow');
          this.clock.tick(10);
          $input = $('.dx-row .dx-texteditor-input').eq(0);
          assert.equal($input.length, 0, 'input');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
        });
        testInDesktop('Editing navigation mode for a date cell if \'useMaskBehavior\', \'keyboardNavigation.editOnKeyPress\' are set and \'cell\' edit mode', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {
              enterKeyDirection: 'column',
              editOnKeyPress: true
            }
          };
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date',
            editorOptions: {useMaskBehavior: true}
          }, {
            dataField: 'room',
            dataType: 'number'
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.gridView.render($('#container'));
          this.focusCell(1, 1);
          assert.ok(true);
          this.triggerKeyDown('1');
          this.clock.tick(10);
          var $input = $('.dx-texteditor-input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.equal($input.val(), '1/5/2006', 'input value');
          fireKeyDown($input, 'Enter');
          this.clock.tick(10);
          $input = $('.dx-texteditor-input').eq(0);
          assert.equal($input.length, 0, 'input');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 2
          }, 'focusedCellPosition');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '2006/01/05',
            room: 1,
            phone: 666666
          }, 'row 1 data');
          this.triggerKeyDown('2');
          this.clock.tick(10);
          $input = $('.dx-texteditor-input').eq(0);
          fireKeyDown($input, 'ArrowUp');
          this.clock.tick(10);
          $input = $('.dx-texteditor-input').eq(0);
          assert.equal($input.length, 0, 'input');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '2006/01/05',
            room: 1,
            phone: 666666
          }, 'row 1 data');
          assert.deepEqual(this.getController('data').items()[2].data, {
            name: 'Dan2',
            date: '2009/02/08',
            room: 2,
            phone: 777777
          }, 'row 2 data');
        });
        testInDesktop('Editing navigation mode for a date cell if \'useMaskBehavior\', \'keyboardNavigation.editOnKeyPress\' are set and \'batch\' edit mode', function(assert) {
          this.options = {
            editing: {mode: 'batch'},
            keyboardNavigation: {
              enterKeyDirection: 'column',
              editOnKeyPress: true
            }
          };
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date',
            editorOptions: {useMaskBehavior: true}
          }, {
            dataField: 'room',
            dataType: 'number'
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.gridView.render($('#container'));
          this.focusCell(1, 1);
          this.triggerKeyDown('1');
          this.clock.tick(10);
          var $input = $('.dx-texteditor-input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.equal($input.val(), '1/5/2006', 'input value');
          fireKeyDown($input, 'Enter');
          this.clock.tick(10);
          $input = $('.dx-texteditor-input').eq(0);
          assert.equal($input.length, 0, 'input');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 2
          }, 'focusedCellPosition');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '2006/01/05',
            room: 1,
            phone: 666666
          }, 'row 1 data');
          this.triggerKeyDown('2');
          this.clock.tick(10);
          $input = $('.dx-texteditor-input').eq(0);
          fireKeyDown($input, 'ArrowUp');
          this.clock.tick(10);
          $input = $('.dx-texteditor-input').eq(0);
          assert.equal($input.length, 0, 'input');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 1,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '2006/01/05',
            room: 1,
            phone: 666666
          }, 'row 1 data');
          assert.deepEqual(this.getController('data').items()[2].data, {
            name: 'Dan2',
            date: '2009/02/08',
            room: 2,
            phone: 777777
          }, 'row 2 data');
        });
        testInDesktop('Editing navigation mode for a number cell if \'format\', \'keyboardNavigation.editOnKeyPress\' are set and \'cell\' edit mode', function(assert) {
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {
              enterKeyDirection: 'column',
              editOnKeyPress: true
            }
          };
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            editorOptions: {format: '#_0.00'}
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.renderGridView();
          this.focusCell(2, 1);
          this.triggerKeyDown('2');
          this.clock.tick(25);
          var $input = $('.dx-row .dx-texteditor-container input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 1, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.equal($input.val(), '#_2.00', 'input value');
          this.triggerKeyDown('downArrow');
          this.clock.tick(10);
          this.triggerKeyDown('1');
          this.clock.tick(25);
          $input = $('.dx-row .dx-texteditor-container input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 2, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 2
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.equal($input.val(), '#_1.00', 'input value');
          this.triggerKeyDown('upArrow');
          this.clock.tick(10);
          this.triggerKeyDown('upArrow');
          this.clock.tick(10);
          this.triggerKeyDown('1');
          this.clock.tick(25);
          $input = $('.dx-row .dx-texteditor-container input').eq(0);
          assert.equal(this.editingController._getVisibleEditRowIndex(), 0, 'cell is editing');
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 0
          }, 'focusedCellPosition');
          assert.ok(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.equal($input.val(), '#_1.00', 'input value');
          this.triggerKeyDown('enter');
          this.clock.tick(10);
          $input = $('.dx-row .dx-texteditor-container input').eq(0);
          assert.equal($input.length, 0, 'input');
          assert.notOk(this.keyboardNavigationController._isEditing);
          assert.deepEqual(this.keyboardNavigationController._focusedCellPosition, {
            columnIndex: 2,
            rowIndex: 1
          }, 'focusedCellPosition');
          assert.notOk(this.keyboardNavigationController._isFastEditingStarted(), 'Fast editing mode');
          assert.deepEqual(this.getController('data').items()[0].data, {
            name: 'Alex',
            date: '01/02/2003',
            room: 1,
            phone: 555555
          }, 'row 0 data');
          assert.deepEqual(this.getController('data').items()[1].data, {
            name: 'Dan1',
            date: '04/05/2006',
            room: 2,
            phone: 666666
          }, 'row 1 data');
          assert.deepEqual(this.getController('data').items()[2].data, {
            name: 'Dan2',
            date: '07/08/2009',
            room: 1,
            phone: 777777
          }, 'row 2 data');
        });
        testInDesktop('Input should have a correct value in fast editing mode in Microsoft Edge Browser (T808348)', function(assert) {
          var rowsViewWrapper = dataGridWrapper.rowsView;
          this.options = {
            editing: {mode: 'cell'},
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.columns = [{dataField: 'name'}];
          this.setupModule();
          this.renderGridView();
          this.focusCell(0, 0);
          this.triggerKeyDown('1');
          var editor = rowsViewWrapper.getCell(0, 0).getEditor();
          var $input = editor.getInputElement();
          assert.equal($input.val(), 'Alex', 'input value has not changed');
          this.clock.tick(25);
          assert.equal($input.val(), '1', 'input value has changed after timeout');
        });
        testInDesktop('Select all text if editing mode is batch', function(assert) {
          var rooms = [{
            id: 0,
            name: 'room0'
          }, {
            id: 1,
            name: 'room1'
          }, {
            id: 2,
            name: 'room2'
          }, {
            id: 3,
            name: 'room3'
          }, {
            id: 222,
            name: 'room222'
          }];
          var input;
          this.options = {editing: {
              mode: 'batch',
              selectTextOnEditStart: true
            }};
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            lookup: {
              dataSource: rooms,
              valueExpr: 'id',
              displayExpr: 'name',
              searchExpr: 'id'
            }
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.renderGridView();
          this.focusCell(0, 1);
          this.triggerKeyDown('Enter');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Escape');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.notOk(input, 'Editor input');
          this.focusCell(1, 1);
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Escape');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.notOk(input, 'Editor input');
          this.focusCell(2, 1);
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
        });
        testInDesktop('Select all text for editor with remote data source', function(assert) {
          var rooms = [{
            id: 0,
            name: 'room0'
          }, {
            id: 1,
            name: 'room1'
          }, {
            id: 2,
            name: 'room2'
          }, {
            id: 3,
            name: 'room3'
          }];
          this.options = {editing: {
              mode: 'batch',
              selectTextOnEditStart: true
            }};
          this.columns = [{dataField: 'name'}, {
            dataField: 'room',
            lookup: {
              dataSource: {
                load: function() {
                  return rooms;
                },
                byKey: function(key) {
                  var d = $.Deferred();
                  setTimeout(function() {
                    d.resolve(rooms.filter(function(room) {
                      return room.id === key;
                    })[0]);
                  }, 100);
                  return d.promise();
                }
              },
              valueExpr: 'id',
              displayExpr: 'name'
            }
          }];
          this.setupModule();
          this.renderGridView();
          $(this.getCellElement(0, 1)).focus().trigger('dxclick');
          var input = $('.dx-texteditor-input').get(0);
          assert.equal(input.value, '', 'editor input value is empty');
          this.clock.tick(100);
          assert.equal(input.value, 'room0', 'editor input value is not empty');
          assert.equal(getTextSelection(input), input.value, 'input value is selected');
        });
        testInDesktop('Not select all text if input is readonly', function(assert) {
          this.options = {editing: {
              mode: 'batch',
              selectTextOnEditStart: true
            }};
          this.columns = [{
            dataField: 'name',
            editorOptions: {readOnly: true}
          }];
          this.setupModule();
          this.renderGridView();
          this.focusCell(0, 1);
          this.triggerKeyDown('Enter');
          this.clock.tick(10);
          var $input = $('.dx-texteditor-input');
          assert.equal($input.length, 1, 'editor input');
          assert.ok($input.prop('readonly'), 'input is readonly');
          assert.equal(getTextSelection($input.get(0)), '', 'no selection');
        });
        testInDesktop('Not select all text if editing mode is batch', function(assert) {
          var rooms = [{
            id: 0,
            name: 'room0'
          }, {
            id: 1,
            name: 'room1'
          }, {
            id: 2,
            name: 'room2'
          }, {
            id: 3,
            name: 'room3'
          }, {
            id: 222,
            name: 'room222'
          }];
          var input;
          this.options = {editing: {mode: 'batch'}};
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            lookup: {
              dataSource: rooms,
              valueExpr: 'id',
              displayExpr: 'name',
              searchExpr: 'id'
            }
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.renderGridView();
          assert.equal($('.dx-selectbox-popup').length, 0, 'no drop down');
          this.focusCell(0, 1);
          this.triggerKeyDown('Enter');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Escape');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.notOk(input, 'Editor input');
          this.focusCell(1, 1);
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Escape');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.notOk(input, 'Editor input');
          this.focusCell(2, 1);
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
        });
        testInDesktop('Select all text if editing mode is cell', function(assert) {
          var rooms = [{
            id: 0,
            name: 'room0'
          }, {
            id: 1,
            name: 'room1'
          }, {
            id: 2,
            name: 'room2'
          }, {
            id: 3,
            name: 'room3'
          }, {
            id: 222,
            name: 'room222'
          }];
          var input;
          this.options = {editing: {
              mode: 'cell',
              selectTextOnEditStart: true
            }};
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            lookup: {
              dataSource: rooms,
              valueExpr: 'id',
              displayExpr: 'name',
              searchExpr: 'id'
            }
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.renderGridView();
          assert.equal($('.dx-selectbox-popup').length, 0, 'no drop down');
          this.focusCell(0, 1);
          this.triggerKeyDown('Enter');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Escape');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.notOk(input, 'Editor input');
          this.focusCell(1, 1);
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Escape');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.notOk(input, 'Editor input');
          this.focusCell(2, 1);
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
        });
        testInDesktop('Not select all text if editing mode is cell', function(assert) {
          var rooms = [{
            id: 0,
            name: 'room0'
          }, {
            id: 1,
            name: 'room1'
          }, {
            id: 2,
            name: 'room2'
          }, {
            id: 3,
            name: 'room3'
          }, {
            id: 222,
            name: 'room222'
          }];
          var input;
          this.options = {editing: {mode: 'cell'}};
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            lookup: {
              dataSource: rooms,
              valueExpr: 'id',
              displayExpr: 'name',
              searchExpr: 'id'
            }
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.renderGridView();
          assert.equal($('.dx-selectbox-popup').length, 0, 'no drop down');
          this.focusCell(0, 1);
          this.triggerKeyDown('Enter');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Escape');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.notOk(input, 'Editor input');
          this.focusCell(1, 1);
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Escape');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.notOk(input, 'Editor input');
          this.focusCell(2, 1);
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
        });
        testInDesktop('Select all text if editing mode is form', function(assert) {
          var rooms = [{
            id: 0,
            name: 'room0'
          }, {
            id: 1,
            name: 'room1'
          }, {
            id: 2,
            name: 'room2'
          }, {
            id: 3,
            name: 'room3'
          }, {
            id: 222,
            name: 'room222'
          }];
          var input;
          this.options = {editing: {
              mode: 'form',
              selectTextOnEditStart: true
            }};
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            lookup: {
              dataSource: rooms,
              valueExpr: 'id',
              displayExpr: 'name',
              searchExpr: 'id'
            }
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.renderGridView();
          this.keyboardNavigationController._focusedView = this.rowsView;
          this.editRow(1);
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
          input = $('.dx-texteditor-input').get(1);
          $(input).focus();
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), '', 'Selection');
          input = $('.dx-texteditor-input').get(0);
          $(input).focus();
          this.triggerKeyDown('Tab', false, false, $(input).parent());
          input = $('.dx-texteditor-input').get(1);
          this.getController('editing')._focusEditingCell(null, $(input).parent());
          this.clock.tick(10);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
          input = $('.dx-texteditor-input').get(2);
          $(input).focus();
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), '', 'Selection');
        });
        testInDesktop('Not select all text if editing mode is form', function(assert) {
          var rooms = [{
            id: 0,
            name: 'room0'
          }, {
            id: 1,
            name: 'room1'
          }, {
            id: 2,
            name: 'room2'
          }, {
            id: 3,
            name: 'room3'
          }, {
            id: 222,
            name: 'room222'
          }];
          var input;
          this.options = {editing: {mode: 'form'}};
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            lookup: {
              dataSource: rooms,
              valueExpr: 'id',
              displayExpr: 'name',
              searchExpr: 'id'
            }
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.renderGridView();
          this.editRow(1);
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
          input = $('.dx-texteditor-input').get(1);
          $(input).focus();
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Tab', false, false, $(input).parent());
          input = $('.dx-texteditor-input').get(1);
          this.getController('editing')._focusEditingCell(null, $(input).parent());
          this.clock.tick(10);
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
          input = $('.dx-texteditor-input').get(2);
          $(input).focus();
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
        });
        testInDesktop('Select all text if editing mode is popup', function(assert) {
          var rooms = [{
            id: 0,
            name: 'room0'
          }, {
            id: 1,
            name: 'room1'
          }, {
            id: 2,
            name: 'room2'
          }, {
            id: 3,
            name: 'room3'
          }, {
            id: 222,
            name: 'room222'
          }];
          var input;
          this.options = {editing: {
              mode: 'form',
              selectTextOnEditStart: true
            }};
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            lookup: {
              dataSource: rooms,
              valueExpr: 'id',
              displayExpr: 'name',
              searchExpr: 'id'
            }
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.renderGridView();
          this.keyboardNavigationController._focusedView = this.rowsView;
          this.editRow(1);
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
          input = $('.dx-texteditor-input').get(1);
          $(input).focus();
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), '', 'Selection');
          input = $('.dx-texteditor-input').get(0);
          $(input).focus();
          this.triggerKeyDown('Tab', false, false, $(input).parent());
          input = $('.dx-texteditor-input').get(1);
          this.getController('editing')._focusEditingCell(null, $(input).parent());
          this.clock.tick(10);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
          input = $('.dx-texteditor-input').get(2);
          $(input).focus();
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), '', 'Selection');
        });
        testInDesktop('Not select all text if editing mode is popup', function(assert) {
          var rooms = [{
            id: 0,
            name: 'room0'
          }, {
            id: 1,
            name: 'room1'
          }, {
            id: 2,
            name: 'room2'
          }, {
            id: 3,
            name: 'room3'
          }, {
            id: 222,
            name: 'room222'
          }];
          var input;
          this.options = {editing: {mode: 'form'}};
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            lookup: {
              dataSource: rooms,
              valueExpr: 'id',
              displayExpr: 'name',
              searchExpr: 'id'
            }
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.renderGridView();
          this.editRow(1);
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
          input = $('.dx-texteditor-input').get(1);
          $(input).focus();
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Tab', false, false, $(input).parent());
          input = $('.dx-texteditor-input').get(1);
          this.getController('editing')._focusEditingCell(null, $(input).parent());
          this.clock.tick(10);
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
          input = $('.dx-texteditor-input').get(2);
          $(input).focus();
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
        });
        testInDesktop('Select all text if editOnKeyPress is true', function(assert) {
          var rooms = [{
            id: 0,
            name: 'room0'
          }, {
            id: 1,
            name: 'room1'
          }, {
            id: 2,
            name: 'room2'
          }, {
            id: 3,
            name: 'room3'
          }, {
            id: 222,
            name: 'room222'
          }];
          var input;
          this.options = {
            editing: {
              mode: 'batch',
              selectTextOnEditStart: true
            },
            keyboardNavigation: {editOnKeyPress: true}
          };
          this.columns = [{dataField: 'name'}, {
            dataField: 'date',
            dataType: 'date'
          }, {
            dataField: 'room',
            dataType: 'number',
            lookup: {
              dataSource: rooms,
              valueExpr: 'id',
              displayExpr: 'name',
              searchExpr: 'id'
            }
          }, {
            dataField: 'phone',
            dataType: 'number'
          }];
          this.setupModule();
          this.renderGridView();
          this.focusCell(0, 1);
          this.triggerKeyDown('A');
          this.clock.tick(100);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.notEqual(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Escape');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.notOk(input, 'Editor input');
          this.focusCell(1, 1);
          this.triggerKeyDown('Enter');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
          this.triggerKeyDown('Escape');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.notOk(input, 'Editor input');
          this.focusCell(2, 1);
          this.triggerKeyDown('F2');
          this.clock.tick(10);
          input = $('.dx-texteditor-input').get(0);
          assert.ok(input, 'Editor input');
          assert.equal(getTextSelection(input), input.value, 'Selection');
        });
        ['Batch', 'Cell'].forEach(function(mode) {
          testInDesktop((mode + " - A cell should display only a single typed character (T882996)"), function(assert) {
            this.options = {
              keyboardNavigation: {editOnKeyPress: true},
              editing: {
                mode: mode.toLowerCase(),
                allowUpdating: true,
                startEditAction: 'dblClick'
              }
            };
            this.columns = ['name'];
            this.setupModule();
            this.renderGridView();
            this.focusCell(0, 0);
            this.triggerKeyDown('a');
            this.clock.tick(10);
            var $input = $('.dx-texteditor-input');
            assert.equal($input.length, 1, 'Editor is rendered');
            if (browser.mozilla) {
              assert.notEqual($input.val(), 'a', 'entered value is not modified');
              this.clock.tick(25);
            }
            assert.strictEqual($input.val(), 'a', 'entered value is correct');
          });
          testInDesktop((mode + " - Input value should not be duplicated for a number column with format when editOnKeyPress is enabled'"), function(assert) {
            this.options = {
              editing: {
                mode: mode.toLowerCase(),
                allowUpdating: true
              },
              keyboardNavigation: {editOnKeyPress: true}
            };
            this.data = [{
              name: 'Alex',
              room: 5
            }];
            this.columns = [{dataField: 'name'}, {
              dataField: 'room',
              dataType: 'number',
              editorOptions: {
                type: 'number',
                format: {precision: 1}
              }
            }];
            this.setupModule();
            this.renderGridView();
            this.focusCell(1, 0);
            this.triggerKeyDown('5');
            this.clock.tick(300);
            var $input = $('.dx-row .dx-texteditor-input').eq(0);
            assert.equal($input.val(), '5', 'input value');
          });
          testInDesktop((mode + " - input value should not throw an exception for a column with a given mask when editOnKeyPress is enabled and startEditAction='dblClick'"), function(assert) {
            this.options = {
              editing: {
                mode: 'cell',
                allowUpdating: true,
                startEditAction: 'dblClick'
              },
              keyboardNavigation: {editOnKeyPress: true}
            };
            this.data = [{
              name: 'Alex',
              room: 5
            }];
            this.columns = [{
              dataField: 'name',
              editorOptions: {mask: '#'}
            }, 'room'], this.setupModule();
            this.renderGridView();
            this.focusCell(0, 0);
            this.clock.tick(10);
            $(this.getCellElement(0, 0)).trigger($.Event('keydown', {key: 'b'}));
            $(this.getCellElement(0, 0)).find('.dx-texteditor-input').first().trigger($.Event('beforeinput'));
            this.clock.tick(300);
            var $input = $('.dx-row .dx-texteditor-input').eq(0);
            assert.equal($input.val(), '_', 'input value');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","generic_light.css!","ui/data_grid","core/utils/browser","../../helpers/dataGridMocks.js","../../helpers/keyboardMock.js","../../helpers/grid/keyboardNavigationHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("generic_light.css!"), require("ui/data_grid"), require("core/utils/browser"), require("../../helpers/dataGridMocks.js"), require("../../helpers/keyboardMock.js"), require("../../helpers/grid/keyboardNavigationHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=keyboardNavigation.customization.tests.js.map