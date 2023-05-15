!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.treeList/selection.tests.js"], ["core/utils/shadow_dom.js","generic_light.css!","ui/tree_list/ui.tree_list","jquery","animation/fx","data/array_store","../../helpers/treeListMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.treeList/selection.tests.js", ["core/utils/shadow_dom.js", "generic_light.css!", "ui/tree_list/ui.tree_list", "jquery", "animation/fx", "data/array_store", "../../helpers/treeListMocks.js"], function($__export) {
  "use strict";
  var addShadowDomStyles,
      $,
      fx,
      ArrayStore,
      setupTreeListModules,
      setupModule,
      teardownModule;
  return {
    setters: [function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      ArrayStore = $__m.default;
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
        addShadowDomStyles($('#qunit-fixture'));
      });
      fx.off = true;
      setupModule = function() {
        var that = this;
        that.options = {
          dataSource: [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }],
          columns: [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}],
          expandedRowKeys: [],
          keyExpr: 'id',
          parentIdExpr: 'parentId'
        };
        that.setupTreeList = function() {
          var modules = arguments[0] !== (void 0) ? arguments[0] : [];
          setupTreeListModules(that, ['data', 'columns', 'rows', 'selection', 'editorFactory', 'columnHeaders', 'filterRow', 'sorting', 'search', 'focus'].concat(modules), {initViews: true});
        };
      };
      teardownModule = function() {
        this.dispose();
      };
      QUnit.module('Selection', {
        beforeEach: setupModule,
        afterEach: teardownModule
      }, function() {
        QUnit.test('Select row', function(assert) {
          var data = {
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          };
          var $testElement = $('#treeList');
          this.setupTreeList();
          this.rowsView.render($testElement);
          var key = this.keyOf(data);
          this.selectRows(key);
          assert.deepEqual(this.getSelectedRowKeys(), [1]);
          assert.deepEqual(this.option('selectedRowKeys'), [1]);
          assert.ok(this.dataController.items()[0].isSelected);
        });
        QUnit.test('Select row when store hasn\'t key', function(assert) {
          var data = this.options.dataSource;
          var $testElement = $('#treeList');
          this.options.dataSource = {load: function() {
              return $.Deferred().resolve(data);
            }};
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectRows(1);
          assert.deepEqual(this.getSelectedRowKeys(), [1], 'selected row keys');
          assert.ok($testElement.find('.dx-data-row').first().hasClass('dx-selection'), 'first row is selected');
        });
        QUnit.test('Select all rows', function(assert) {
          var $testElement = $('#treeList');
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectAll();
          assert.deepEqual(this.getController('selection').isSelectAll(), true, 'select all state');
          assert.deepEqual(this.getSelectedRowKeys(), [1], 'only visible rows are selected');
          assert.deepEqual(this.option('selectedRowKeys'), [1], 'only visible rows are selected');
          this.expandRow(1);
          assert.deepEqual(this.getController('selection').isSelectAll(), undefined, 'select all state is changed after expand');
        });
        QUnit.test('Deselect all rows', function(assert) {
          var $testElement = $('#treeList');
          this.options.selectedRowKeys = [1, 2];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.deselectAll();
          assert.deepEqual(this.getController('selection').isSelectAll(), false, 'select all state');
          assert.deepEqual(this.getSelectedRowKeys(), [2], 'visible rows are deselected');
          assert.deepEqual(this.option('selectedRowKeys'), [2], 'visible rows are deselected');
        });
        QUnit.test('Select all rows if autoExpandAll is true', function(assert) {
          var $testElement = $('#treeList');
          this.options.autoExpandAll = true;
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectAll();
          assert.deepEqual(this.getSelectedRowKeys(), [1, 2], 'all visible rows are selected');
          assert.deepEqual(this.option('selectedRowKeys'), [1, 2], 'all visible rows are selected');
        });
        QUnit.test('Select all rows if filter is applied', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource.push({
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          });
          this.options.expandNodesOnFiltering = true;
          this.options.columns[0].filterValue = 'test2';
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectAll();
          assert.deepEqual(this.getController('selection').isSelectAll(), true, 'select all state');
          assert.deepEqual(this.getSelectedRowKeys(), [1, 2], 'all visible rows are selected');
          assert.deepEqual(this.option('selectedRowKeys'), [1, 2], 'all visible rows are selected');
        });
        [true, false].forEach(function(recursive) {
          QUnit.test(("Select all rows if filter is applied, filterMode is matchOnly and recursive=" + recursive), function(assert) {
            var $testElement = $('#treeList');
            var selectedRowKeys = recursive ? [1, 2] : [2];
            this.options.filterMode = 'matchOnly';
            this.options.columns[0].filterValue = 'test2';
            this.options.selection = {
              recursive: recursive,
              mode: 'multiple'
            };
            this.setupTreeList();
            this.rowsView.render($testElement);
            this.selectAll();
            assert.deepEqual(this.getController('selection').isSelectAll(), true, 'select all state');
            assert.deepEqual(this.getSelectedRowKeys(), selectedRowKeys, 'all visible rows are selected');
            assert.deepEqual(this.option('selectedRowKeys'), selectedRowKeys, 'all visible rows are selected');
            this.option('filterValue', undefined);
            assert.deepEqual(this.getController('selection').isSelectAll(), true, 'select all state');
            assert.deepEqual(this.getSelectedRowKeys(), selectedRowKeys, 'all visible rows are selected');
            assert.deepEqual(this.option('selectedRowKeys'), selectedRowKeys, 'all visible rows are selected');
          });
          QUnit.test(("Select and deselect all rows if filter is applied, filterMode is matchOnly and recursive=" + recursive), function(assert) {
            var $testElement = $('#treeList');
            var selectedRowKeys = recursive ? [1, 2] : [2];
            this.options.filterMode = 'matchOnly';
            this.options.columns[0].filterValue = 'test2';
            this.options.selection = {
              recursive: recursive,
              mode: 'multiple'
            };
            this.setupTreeList();
            this.rowsView.render($testElement);
            this.selectAll();
            assert.deepEqual(this.getController('selection').isSelectAll(), true, 'select all state');
            assert.deepEqual(this.getSelectedRowKeys(), selectedRowKeys, 'all visible rows are selected');
            assert.deepEqual(this.option('selectedRowKeys'), selectedRowKeys, 'all visible rows are selected');
            this.deselectAll();
            assert.deepEqual(this.getController('selection').isSelectAll(), false, 'select all state');
            assert.deepEqual(this.getSelectedRowKeys(), [], 'all visible rows are selected');
            assert.deepEqual(this.option('selectedRowKeys'), [], 'all visible rows are selected');
            this.option('filterValue', undefined);
            assert.deepEqual(this.getController('selection').isSelectAll(), false, 'select all state');
            assert.deepEqual(this.getSelectedRowKeys(), [], 'all visible rows are selected');
            assert.deepEqual(this.option('selectedRowKeys'), [], 'all visible rows are selected');
          });
        });
        QUnit.test('getSelectedRowKeys with non-recursive selection', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            parentId: 4,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }];
          this.options.expandedRowKeys = [1, 4];
          this.options.selectedRowKeys = [1, 2, 4];
          this.setupTreeList();
          this.rowsView.render($testElement);
          assert.deepEqual(this.getSelectedRowKeys(), [1, 2, 4], 'actual selection');
          assert.deepEqual(this.getSelectedRowKeys('excludeRecursive'), [1], 'only top');
          assert.deepEqual(this.getSelectedRowKeys('all'), [1, 2, 4], 'actual selection');
          assert.deepEqual(this.getSelectedRowKeys('leavesOnly'), [2], 'only leaves selected');
        });
        QUnit.test('Checkboxes should be rendered in right place', function(assert) {
          var $testElement = $('#treeList');
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always'
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          var $gridCell = $testElement.find('.dx-treelist-cell-expandable').eq(0);
          assert.equal($gridCell.find('.dx-select-checkbox').length, 1, 'Select checkbox was rendered in right place');
          assert.ok($gridCell.find('.dx-select-checkbox').parent().hasClass('dx-treelist-icon-container'), 'Checkbox inside icon container');
        });
        QUnit.test('The Select All checkbox should have correct position when first defined column has no dataField and showColumnLines is false', function(assert) {
          var $testElement = $('#treeList');
          this.options.showColumnHeaders = true;
          this.options.showColumnLines = false;
          this.options.columns = [{caption: 'Test'}];
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
            allowSelectAll: true
          };
          this.setupTreeList();
          this.columnHeadersView.render($testElement);
          var $headerCell = $testElement.find('.dx-treelist-select-all').eq(0);
          var $headerTextContent = $headerCell.children('.dx-treelist-text-content');
          var $selectAll = $headerCell.children('.dx-select-checkbox');
          assert.strictEqual($headerCell.length, 1, 'the header with select all checkbox is rendered');
          assert.strictEqual($headerTextContent.length, 1, 'the header text content is rendered');
          assert.strictEqual($selectAll.length, 1, 'the Select All checkbox is rendered');
          assert.roughEqual($selectAll.offset().top, $headerTextContent.offset().top, 1.1, 'the Select All checkbox position is roughly equal to the header text content position');
          assert.strictEqual($headerTextContent.css('display'), 'inline-block', 'the display style of the header text content');
        });
        QUnit.test('Checkboxes should not be rendered if selection is not multiple', function(assert) {
          var $testElement = $('#treeList');
          this.options.selection = {
            mode: 'single',
            showCheckBoxesMode: 'always'
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          var $gridCell = $testElement.find('.dx-treelist-cell-expandable').eq(0);
          assert.equal($gridCell.find('.dx-select-checkbox').length, 0, 'Select checkbox was not rendered');
        });
        QUnit.test('Click on select checkbox should work correctly', function(assert) {
          var $testElement = $('#treeList');
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always'
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          var $selectCheckbox = $testElement.find('.dx-treelist-cell-expandable').eq(0).find('.dx-select-checkbox').eq(0);
          $selectCheckbox.trigger('dxclick');
          assert.equal($selectCheckbox.dxCheckBox('instance').option('value'), true, 'Select checkbox value is OK');
          assert.deepEqual(this.option('selectedRowKeys'), [1], 'Right row is selected');
          assert.ok(this.dataController.items()[0].isSelected, 'Right row is selected');
        });
        QUnit.test('Click on select checkbox container should not select row', function(assert) {
          var $testElement = $('#treeList');
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always'
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          var $selectCheckbox = $testElement.find('.dx-treelist-cell-expandable').eq(0).find('.dx-select-checkbox').eq(0);
          $selectCheckbox.parent().trigger('dxclick');
          assert.equal($selectCheckbox.dxCheckBox('instance').option('value'), false, 'Select checkbox value');
          assert.notOk(this.option('selectedRowKeys'), 'row is not selected');
          assert.notOk(this.dataController.items()[0].isSelected, 'row is not selected');
        });
        QUnit.test('Click on selectAll checkbox should work correctly', function(assert) {
          var $testElement = $('#treeList');
          this.options.showColumnHeaders = true;
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
            allowSelectAll: true
          };
          this.setupTreeList();
          this.columnHeadersView.render($testElement);
          this.rowsView.render($testElement);
          var $checkbox = $('.dx-header-row').find('.dx-checkbox');
          $checkbox.trigger('dxclick');
          assert.equal($checkbox.dxCheckBox('instance').option('value'), true, 'SelectAll checkbox value is OK');
          assert.deepEqual(this.option('selectedRowKeys'), [1], 'Right rows are selected');
        });
        QUnit.test('Click on selectAll checkbox should work correctly when sorting is enabled', function(assert) {
          var $testElement = $('#treeList');
          var clock = sinon.useFakeTimers();
          this.options.showColumnHeaders = true;
          this.options.sorting = {mode: 'single'};
          this.options.columns[0].allowSorting = true;
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
            allowSelectAll: true
          };
          this.setupTreeList();
          this.columnHeadersView.render($testElement);
          this.rowsView.render($testElement);
          var $checkbox = $('.dx-header-row').find('.dx-checkbox');
          $checkbox.trigger('dxclick');
          clock.tick(10);
          assert.equal($checkbox.dxCheckBox('instance').option('value'), true, 'SelectAll checkbox value is OK');
          assert.equal($testElement.find('tbody > tr > td').first().find('.dx-sort-up, .dx-sort-down').length, 0, 'sort not applied');
          clock.restore();
        });
        QUnit.test('Click on selectAll checkbox should check row checkboxes', function(assert) {
          var $testElement = $('#treeList');
          this.options.showColumnHeaders = true;
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
            allowSelectAll: true
          };
          this.setupTreeList();
          this.columnHeadersView.render($testElement);
          this.rowsView.render($testElement);
          var $checkbox = $('.dx-header-row').find('.dx-checkbox');
          $checkbox.trigger('dxclick');
          var $selectCheckbox = $testElement.find('.dx-treelist-cell-expandable').eq(0).find('.dx-select-checkbox').eq(0);
          assert.equal($selectCheckbox.dxCheckBox('instance').option('value'), true, 'Select checkbox value is OK');
        });
        QUnit.test('Reordering column, selection', function(assert) {
          var $testElement = $('#treeList');
          this.options.allowColumnReordering = true;
          this.options.showColumnHeaders = true;
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
            allowSelectAll: true
          };
          this.setupTreeList();
          this.columnHeadersView.render($testElement);
          this.rowsView.render($testElement);
          var $checkbox = $('.dx-header-row').find('.dx-checkbox');
          $checkbox.trigger('dxclick');
          this.columnsController.moveColumn(0, 3);
          var $selectCheckbox = $testElement.find('.dx-treelist-cell-expandable').eq(0).find('.dx-select-checkbox').eq(0);
          assert.equal($selectCheckbox.dxCheckBox('instance').option('value'), true, 'Select checkbox value is OK');
        });
        QUnit.test('Checking state selectAll checkbox - deselect row after select All', function(assert) {
          var $selectAllCheckBox;
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 2,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 2,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            parentId: 2,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }, {
            id: 6,
            parentId: 1,
            field1: 'test6',
            field2: 6,
            field3: new Date(2002, 1, 6)
          }, {
            id: 7,
            parentId: 6,
            field1: 'test7',
            field2: 7,
            field3: new Date(2002, 1, 7)
          }, {
            id: 8,
            parentId: 6,
            field1: 'test8',
            field2: 8,
            field3: new Date(2002, 1, 8)
          }, {
            id: 9,
            parentId: 6,
            field1: 'test9',
            field2: 9,
            field3: new Date(2002, 1, 9)
          }];
          this.options.expandedRowKeys = [1];
          this.options.showColumnHeaders = true;
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
            allowSelectAll: true
          };
          this.setupTreeList();
          this.columnHeadersView.render($testElement);
          this.rowsView.render($testElement);
          this.selectAll();
          $selectAllCheckBox = $testElement.find('.dx-header-row').children().first().find('.dx-select-checkbox');
          assert.ok($selectAllCheckBox.hasClass('dx-checkbox-checked'), 'selectAll checkbox is checked');
          this.deselectRows(2);
          $selectAllCheckBox = $testElement.find('.dx-header-row').children().first().find('.dx-select-checkbox');
          assert.ok($selectAllCheckBox.hasClass('dx-checkbox-indeterminate'), 'selectAll checkbox is indeterminate');
        });
        QUnit.test('Checking state selectAll checkbox - select all when there is filter', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 2,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 2,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            parentId: 2,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }, {
            id: 6,
            parentId: 1,
            field1: 'test6',
            field2: 6,
            field3: new Date(2002, 1, 6)
          }, {
            id: 7,
            parentId: 6,
            field1: 'test7',
            field2: 7,
            field3: new Date(2002, 1, 7)
          }, {
            id: 8,
            parentId: 6,
            field1: 'test8',
            field2: 8,
            field3: new Date(2002, 1, 8)
          }, {
            id: 9,
            parentId: 6,
            field1: 'test9',
            field2: 9,
            field3: new Date(2002, 1, 9)
          }];
          this.options.showColumnHeaders = true;
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always',
            allowSelectAll: true
          };
          this.options.columns[0].filterValue = 'test5';
          this.setupTreeList();
          this.columnHeadersView.render($testElement);
          this.rowsView.render($testElement);
          this.selectAll();
          var $selectAllCheckBox = $testElement.find('.dx-header-row').children().first().find('.dx-select-checkbox');
          assert.ok($selectAllCheckBox.hasClass('dx-checkbox-checked'), 'selectAll checkbox is checked');
        });
        QUnit.test('Not select row when click by expanding icon', function(assert) {
          var $testElement = $('#treeList');
          this.setupTreeList();
          this.rowsView.render($testElement);
          $testElement.find('tbody > tr').first().find('.dx-treelist-collapsed').trigger('dxclick');
          assert.equal(this.option('selectedRowKeys'), undefined, 'checking the \'selectedRowKeys\' option - should be empty');
          assert.notOk(this.dataController.items()[0].isSelected, 'row isn\'t selected');
        });
        QUnit.testInActiveWindow('Focused border is not displayed around expandable cell when row is selected', function(assert) {
          var clock = sinon.useFakeTimers();
          var $testElement = $('#treeList');
          this.element = function() {
            return $testElement;
          };
          this.options.selection = {
            mode: 'multiple',
            showCheckBoxesMode: 'always'
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          var $expandableCell = $testElement.find('.dx-treelist-cell-expandable').first();
          var $selectCheckbox = $expandableCell.find('.dx-select-checkbox').first();
          $selectCheckbox.focus();
          clock.tick(10);
          assert.ok(!$expandableCell.hasClass('dx-focused'));
          clock.restore();
        });
        QUnit.test('The load method should not be called on an attempt to select loaded nodes when they are collapsed', function(assert) {
          var $testElement = $('#treeList');
          var store = new ArrayStore([{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }]);
          var load = sinon.spy(function(loadOptions) {
            return store.load(loadOptions).promise();
          });
          this.options.cacheEnabled = true;
          this.options.expandedRowKeys = [1];
          this.options.remoteOperations = {filtering: true};
          this.options.dataSource = {load: load};
          this.setupTreeList();
          this.rowsView.render($testElement);
          assert.strictEqual(this.getVisibleRows().length, 2, 'row count');
          this.collapseRow(1);
          assert.strictEqual(this.getVisibleRows().length, 1, 'row count');
          load.reset();
          this.selectRows([2]);
          assert.strictEqual(load.callCount, 0, 'load isn\'t called');
        });
        QUnit.test('selection for nested node should work', function(assert) {
          var $testElement = $('#treeList');
          this.options.cacheEnabled = true;
          this.options.expandedRowKeys = [1];
          this.options.dataSource = [{
            id: 1,
            field1: 'test1'
          }, {
            id: 2,
            field1: 'test2'
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3'
          }];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectionController.changeItemSelection(1);
          assert.deepEqual(this.getSelectedRowKeys(), [3], 'selected row keys');
          assert.strictEqual(this.getVisibleRows()[1].isSelected, true, 'row 1 is selected');
        });
        QUnit.test('The getSelectedRowsData method should work correctly when calling navigateToRow in the onNodesInitialized event', function(assert) {
          var $__3 = this;
          var $testElement = $('#treeList');
          var clock = sinon.useFakeTimers();
          this.options.loadingTimeout = 30;
          this.options.autoNavigateToFocusedRow = true;
          this.options.onNodesInitialized = function(e) {
            $__3.navigateToRow(2);
          };
          this.setupTreeList();
          clock.tick(60);
          this.rowsView.render($testElement);
          assert.ok(this.getNodeByKey(1), 'node with key "1" exists');
          assert.ok(this.getNodeByKey(2), 'node with key "2" exists');
          this.selectRows(2);
          assert.deepEqual(this.getSelectedRowKeys(), [2], 'getSelectedRowKeys');
          assert.deepEqual(this.option('selectedRowKeys'), [2], 'selectedRowKeys');
          assert.deepEqual(this.getSelectedRowsData(), [{
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }], 'getSelectedRowsData');
          clock.restore();
        });
        QUnit.test('focusedItemIndex should be reset to -1 after select all nodes', function(assert) {
          var $testElement = $('#treeList');
          var array = [{
            id: 1,
            field1: 'test1',
            field2: 1
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2
          }, {
            id: 3,
            field1: 'test3',
            field2: 3
          }, {
            id: 4,
            parentId: 3,
            field1: 'test4',
            field2: 4
          }];
          this.options.autoExpandAll = true;
          this.options.dataSource = array;
          this.options.selection = {mode: 'multiple'};
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectionController.changeItemSelection(0, {shift: true});
          this.selectionController.changeItemSelection(2, {shift: true});
          assert.deepEqual(this.selectionController.getSelectedRowKeys(), [1, 3, 2], 'selected row keys');
          assert.equal(this.selectionController._selection._focusedItemIndex, 2, '_focusedItemIndex corrected');
          this.selectionController.selectAll();
          assert.deepEqual(this.selectionController.getSelectedRowKeys(), [1, 3, 2, 4], 'selected row keys');
          assert.equal(this.selectionController._selection._focusedItemIndex, -1, '_focusedItemIndex corrected');
        });
        QUnit.test('focusedItemIndex should be reset to -1 after deselect all nodes', function(assert) {
          var $testElement = $('#treeList');
          var array = [{
            id: 1,
            field1: 'test1',
            field2: 1
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2
          }, {
            id: 3,
            field1: 'test3',
            field2: 3
          }, {
            id: 4,
            parentId: 3,
            field1: 'test4',
            field2: 4
          }];
          this.options.autoExpandAll = true;
          this.options.dataSource = array;
          this.options.selection = {mode: 'multiple'};
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectionController.changeItemSelection(0, {shift: true});
          this.selectionController.changeItemSelection(3, {shift: true});
          assert.deepEqual(this.selectionController.getSelectedRowKeys(), [1, 4, 3, 2], 'selected row keys');
          assert.equal(this.selectionController._selection._focusedItemIndex, 3, '_focusedItemIndex corrected');
          this.selectionController.deselectAll();
          assert.deepEqual(this.selectionController.getSelectedRowKeys(), [], 'selected row keys');
          assert.equal(this.selectionController._selection._focusedItemIndex, -1, '_focusedItemIndex corrected');
        });
        QUnit.test('The selection should not work on pressing space when there is no data', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [];
          this.options.selectedRowKeys = [];
          this.options.selection = {mode: 'single'};
          this.options.keyboardNavigation = {enabled: true};
          this.setupTreeList(['keyboardNavigation']);
          this.rowsView.render($testElement);
          var $rowsView = $(this.rowsView.element());
          $rowsView.trigger($.Event('keydown', {key: ' '}));
          assert.deepEqual(this.getSelectedRowKeys(), []);
          assert.deepEqual(this.option('selectedRowKeys'), []);
        });
      });
      QUnit.module('Recursive selection', {
        beforeEach: function() {
          setupModule.call(this);
          this.options.selection = {
            mode: 'multiple',
            recursive: true
          };
        },
        afterEach: teardownModule
      }, function() {
        QUnit.test('Selecting row', function(assert) {
          var $testElement = $('#treeList');
          this.options.expandedRowKeys = [1];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectRows(1);
          var items = this.dataController.items();
          assert.deepEqual(this.option('selectedRowKeys'), [1], 'selected row keys');
          assert.ok(items[0].isSelected, 'first item is selected');
          assert.ok(items[1].isSelected, 'second item is selected');
        });
        QUnit.test('Deselecting row', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }];
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [1];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.deselectRows(2);
          var items = this.dataController.items();
          assert.deepEqual(this.option('selectedRowKeys'), [3, 4], 'selected row keys');
          assert.strictEqual(items[0].isSelected, undefined, 'selection state of the first item is indeterminate');
          assert.notOk(items[1].isSelected, 'second item isn\'t selected');
          assert.ok(items[2].isSelected, 'first item is selected');
          assert.ok(items[3].isSelected, 'second item is selected');
        });
        QUnit.test('Selecting a row when several of his children are selected', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }];
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [3, 4];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectRows(1);
          var items = this.dataController.items();
          assert.deepEqual(this.option('selectedRowKeys'), [1], 'selected row keys');
          assert.ok(items[0].isSelected, 'first item is selected');
          assert.ok(items[1].isSelected, 'second item is selected');
          assert.ok(items[2].isSelected, 'third item is selected');
          assert.ok(items[3].isSelected, 'fourth item is selected');
        });
        QUnit.test('Deselecting the row when all children are selected', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }];
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [2, 3];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.deselectRows(1);
          var items = this.dataController.items();
          assert.deepEqual(this.option('selectedRowKeys'), [], 'selected row keys');
          assert.notOk(items[0].isSelected, 'first item isn\'t selected');
          assert.notOk(items[1].isSelected, 'second item isn\'t selected');
          assert.notOk(items[2].isSelected, 'third item isn\'t selected');
        });
        QUnit.test('Select All', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            field1: 'test5',
            field2: 5,
            field3: new Date(2001, 0, 5)
          }];
          this.options.expandedRowKeys = [1];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectAll();
          var items = this.dataController.items();
          assert.deepEqual(this.option('selectedRowKeys'), [1, 5], 'selected row keys');
          assert.ok(items[0].isSelected, 'first item is selected');
          assert.ok(items[1].isSelected, 'second item is selected');
          assert.ok(items[2].isSelected, 'third item is selected');
          assert.ok(items[3].isSelected, 'fourth item is selected');
          assert.ok(items[4].isSelected, 'fifth item is selected');
        });
        QUnit.test('Select All when several rows are selected', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            field1: 'test5',
            field2: 5,
            field3: new Date(2001, 0, 5)
          }];
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [2, 3];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectAll();
          var items = this.dataController.items();
          assert.deepEqual(this.option('selectedRowKeys'), [1, 5], 'selected row keys');
          assert.ok(items[0].isSelected, 'first item is selected');
          assert.ok(items[1].isSelected, 'second item is selected');
          assert.ok(items[2].isSelected, 'third item is selected');
          assert.ok(items[3].isSelected, 'fourth item is selected');
          assert.ok(items[4].isSelected, 'fifth item is selected');
        });
        QUnit.test('Deselect All', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }];
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [2, 3, 4];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.deselectAll();
          var items = this.dataController.items();
          assert.deepEqual(this.option('selectedRowKeys'), [], 'selected row keys');
          assert.notOk(items[0].isSelected, 'first item isn\'t selected');
          assert.notOk(items[1].isSelected, 'second item isn\'t selected');
          assert.notOk(items[2].isSelected, 'third item isn\'t selected');
          assert.notOk(items[3].isSelected, 'fourth item isn\'t selected');
        });
        QUnit.test('Selecting row with preserve = false', function(assert) {
          var $testElement = $('#treeList');
          this.options.expandedRowKeys = [1];
          this.options.dataSource = [{
            id: 1,
            field1: 'test1'
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2'
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3'
          }], this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectRows(2);
          this.selectRows(3, false);
          var items = this.dataController.items();
          assert.deepEqual(this.option('selectedRowKeys'), [3], 'selected row keys');
          assert.notOk(items[0].isSelected, 'first item is not selected');
          assert.notOk(items[1].isSelected, 'second item is not selected');
          assert.ok(items[2].isSelected, 'third item is selected');
        });
        QUnit.test('Checking arguments of the \'onSelectionChanged\' event when select row', function(assert) {
          var selectionChangedArgs = [];
          var $testElement = $('#treeList');
          var items = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }];
          this.options.dataSource = items;
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [2];
          this.options.onSelectionChanged = function(e) {
            selectionChangedArgs.push(e);
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          assert.deepEqual(this.option('selectedRowKeys'), [2], 'selected row keys');
          this.selectRows(1);
          assert.strictEqual(selectionChangedArgs.length, 1, 'count call \'onSelectionChanged\' event');
          assert.deepEqual(selectionChangedArgs[0].selectedRowKeys, [1], 'selected row keys');
          assert.deepEqual(selectionChangedArgs[0].selectedRowsData, [items[0]], 'selected rows data');
          assert.deepEqual(selectionChangedArgs[0].currentSelectedRowKeys, [1], 'current selected row keys');
          assert.deepEqual(selectionChangedArgs[0].currentDeselectedRowKeys, [], 'current deselected row keys');
        });
        QUnit.test('Checking arguments of the \'onSelectionChanged\' event when deselect row', function(assert) {
          var selectionChangedArgs = [];
          var $testElement = $('#treeList');
          var items = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }];
          this.options.dataSource = items;
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [1];
          this.options.onSelectionChanged = function(e) {
            selectionChangedArgs.push(e);
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          assert.deepEqual(this.option('selectedRowKeys'), [1], 'selected row keys');
          this.deselectRows(2);
          assert.strictEqual(selectionChangedArgs.length, 1, 'count call \'onSelectionChanged\' event');
          assert.deepEqual(selectionChangedArgs[0].selectedRowKeys, [3, 4], 'selected row keys');
          assert.deepEqual(selectionChangedArgs[0].selectedRowsData, [items[2], items[3]], 'selected rows data');
          assert.deepEqual(selectionChangedArgs[0].currentSelectedRowKeys, [], 'current selected row keys');
          assert.deepEqual(selectionChangedArgs[0].currentDeselectedRowKeys, [2], 'current deselected row keys');
        });
        QUnit.test('Checking arguments of the \'onSelectionChanged\' event when select/deselect all rows', function(assert) {
          var selectionChangedArgs = [];
          var $testElement = $('#treeList');
          var items = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }];
          this.options.dataSource = items;
          this.options.expandedRowKeys = [1];
          this.options.onSelectionChanged = function(e) {
            selectionChangedArgs.push(e);
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectAll();
          assert.strictEqual(selectionChangedArgs.length, 1, 'count call \'onSelectionChanged\' event');
          assert.deepEqual(selectionChangedArgs[0].selectedRowKeys, [1], 'selected row keys');
          assert.deepEqual(selectionChangedArgs[0].selectedRowsData, [items[0]], 'selected rows data');
          assert.deepEqual(selectionChangedArgs[0].currentSelectedRowKeys, [1], 'current selected row keys');
          assert.deepEqual(selectionChangedArgs[0].currentDeselectedRowKeys, [], 'current deselected row keys');
          this.deselectAll();
          assert.strictEqual(selectionChangedArgs.length, 2, 'count call \'onSelectionChanged\' event');
          assert.deepEqual(selectionChangedArgs[1].selectedRowKeys, [], 'selected row keys');
          assert.deepEqual(selectionChangedArgs[1].selectedRowsData, [], 'selected rows data');
          assert.deepEqual(selectionChangedArgs[1].currentSelectedRowKeys, [], 'current selected row keys');
          assert.deepEqual(selectionChangedArgs[1].currentDeselectedRowKeys, [1], 'current deselected row keys');
        });
        QUnit.test('getSelectedRowKeys with default parameter', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            parentId: 4,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }];
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [2, 4];
          this.setupTreeList();
          this.rowsView.render($testElement);
          assert.deepEqual(this.getSelectedRowKeys(), [2, 4], 'actual selection');
        });
        QUnit.test('getSelectedRowKeys with \'leavesOnly\' parameter', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            parentId: 4,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }];
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [2, 4];
          this.setupTreeList();
          this.rowsView.render($testElement);
          assert.deepEqual(this.getSelectedRowKeys('leavesOnly'), [2, 5], 'only leaves selected');
        });
        QUnit.test('getSelectedRowKeys with \'all\' parameter', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            parentId: 4,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }];
          this.options.expandedRowKeys = [1, 4];
          this.options.selectedRowKeys = [2, 3, 4];
          this.setupTreeList();
          this.rowsView.render($testElement);
          assert.deepEqual(this.getSelectedRowKeys('all'), [1, 2, 3, 4, 5], 'all selected items');
        });
        ['withAncestors', 'matchOnly', 'fullBranch'].forEach(function(filterMode) {
          QUnit.test(("getSelectedRowKeys with 'all' parameter and filterMode is '" + filterMode + "' when filtered nodes are at different levels"), function(assert) {
            var $testElement = $('#treeList');
            this.options.dataSource = [{
              id: 1,
              field1: 'field1',
              field2: 1,
              field3: new Date(2001, 0, 1)
            }, {
              id: 2,
              parentId: 1,
              field1: 'field2',
              field2: 2,
              field3: new Date(2002, 1, 2)
            }, {
              id: 3,
              parentId: 2,
              field1: 'test1',
              field2: 3,
              field3: new Date(2002, 1, 3)
            }, {
              id: 4,
              parentId: 2,
              field1: 'test2',
              field2: 4,
              field3: new Date(2002, 1, 4)
            }, {
              id: 5,
              parentId: 1,
              field1: 'field2',
              field2: 5,
              field3: new Date(2002, 1, 5)
            }, {
              id: 6,
              field1: 'field3',
              field2: 6,
              field3: new Date(2002, 1, 6)
            }, {
              id: 7,
              field1: 'test3',
              field2: 7,
              field3: new Date(2002, 1, 7)
            }];
            this.options.searchPanel = {text: 'test'};
            this.options.expandNodesOnFiltering = true;
            this.options.filterMode = filterMode;
            this.setupTreeList();
            this.rowsView.render($testElement);
            this.selectAll();
            assert.deepEqual(this.getSelectedRowKeys('all'), [1, 2, 3, 4, 5, 6, 7], 'all selected items');
          });
          QUnit.test(("getSelectedRowKeys with 'all' parameter and filterMode is '" + filterMode + "' when filtered nodes are at the same level"), function(assert) {
            var $testElement = $('#treeList');
            this.options.dataSource = [{
              id: 1,
              field1: 'field1',
              field2: 1,
              field3: new Date(2001, 0, 1)
            }, {
              id: 2,
              parentId: 1,
              field1: 'field2',
              field2: 2,
              field3: new Date(2002, 1, 2)
            }, {
              id: 3,
              parentId: 2,
              field1: 'field3',
              field2: 3,
              field3: new Date(2002, 1, 3)
            }, {
              id: 4,
              parentId: 3,
              field1: 'test1',
              field2: 4,
              field3: new Date(2002, 1, 4)
            }, {
              id: 5,
              parentId: 3,
              field1: 'test2',
              field2: 5,
              field3: new Date(2002, 1, 5)
            }, {
              id: 6,
              parentId: 1,
              field1: 'field4',
              field2: 6,
              field3: new Date(2002, 1, 6)
            }, {
              id: 7,
              parentId: 6,
              field1: 'field5',
              field2: 7,
              field3: new Date(2002, 1, 7)
            }, {
              id: 8,
              parentId: 1,
              field1: 'field6',
              field2: 8,
              field3: new Date(2002, 1, 8)
            }, {
              id: 9,
              parentId: 8,
              field1: 'field7',
              field2: 9,
              field3: new Date(2002, 1, 9)
            }];
            this.options.searchPanel = {text: 'test'};
            this.options.expandNodesOnFiltering = true;
            this.options.filterMode = filterMode;
            this.setupTreeList();
            this.rowsView.render($testElement);
            this.selectAll();
            assert.deepEqual(this.getSelectedRowKeys('all'), [1, 2, 3, 4, 5, 6, 7, 8, 9], 'all selected items');
          });
        });
        QUnit.test('getSelectedRowKeys with \'excludeRecursive\' parameter', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            parentId: 4,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }, {
            id: 6,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 7,
            parentId: 6,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }];
          this.options.expandedRowKeys = [1, 4];
          this.options.selectedRowKeys = [2, 5, 7];
          this.setupTreeList();
          this.rowsView.render($testElement);
          assert.deepEqual(this.getSelectedRowKeys('excludeRecursive'), [2, 4, 6], 'all selected items');
        });
        QUnit.test('getSelectedRowsData with mode parameter calls getSelectedRowKeys', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }];
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [3];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectionController.getSelectedRowKeys = sinon.spy();
          this.getSelectedRowsData('all');
          assert.equal(this.selectionController.getSelectedRowKeys.callCount, 1, 'getSelectedRowKeys is called');
          assert.equal(this.selectionController.getSelectedRowKeys.args[0], 'all', 'getSelectedRowKeys is called with a mode parameter');
        });
        QUnit.test('getSelectedRowsData with mode parameter when key has no data', function(assert) {
          var clock = sinon.useFakeTimers();
          var $testElement = $('#treeList');
          var data = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }];
          this.options.dataSource = {load: function() {
              var d = $.Deferred();
              setTimeout(function() {
                d.resolve(data);
              }, 100);
              return d.promise();
            }};
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [1];
          this.setupTreeList();
          this.rowsView.render($testElement);
          assert.deepEqual(this.getSelectedRowsData('leavesOnly'), [], 'empty data');
          clock.tick(100);
          assert.equal(this.getSelectedRowsData('leavesOnly').length, 2, '2 nodes are returned');
          assert.deepEqual(this.getSelectedRowsData('leavesOnly')[0], data[1], 'first child');
          assert.deepEqual(this.getSelectedRowsData('leavesOnly')[1], data[2], 'second child');
          clock.restore();
        });
        QUnit.test('Selection state of rows should be updated on loadDescendants', function(assert) {
          var clock = sinon.useFakeTimers();
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }];
          this.options.remoteOperations = true;
          this.options.loadingTimeout = 0;
          this.options.selectedRowKeys = [1];
          this.setupTreeList();
          clock.tick(10);
          this.rowsView.render($testElement);
          assert.deepEqual(this.getSelectedRowKeys('leavesOnly'), [], 'leaves');
          this.loadDescendants();
          clock.tick(10);
          assert.deepEqual(this.getSelectedRowKeys('leavesOnly'), [2, 3, 4], 'leaves');
          clock.restore();
        });
        QUnit.test('Checkbox of the parent node should be in an indeterminate state when deselecting child node', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 1,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            parentId: 4,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }];
          this.options.expandedRowKeys = [1];
          this.options.selectedRowKeys = [1];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.deselectRows(2);
          var items = this.dataController.items();
          assert.strictEqual(items[0].isSelected, undefined, 'selection state of the first item is indeterminate');
          assert.ok($testElement.find('.dx-checkbox').first().hasClass('dx-checkbox-indeterminate'), 'Checkbox of the first row in an indeterminate state');
        });
        QUnit.test('Update selection after expanding node when \'remoteOperations\' is true', function(assert) {
          var items;
          var $testElement = $('#treeList');
          this.options.remoteOperations = true;
          this.options.selectedRowKeys = [1];
          this.setupTreeList();
          this.rowsView.render($testElement);
          items = this.dataController.items();
          assert.strictEqual(items.length, 1, 'count item');
          assert.ok(items[0].isSelected, 'first item is selected');
          this.expandRow(1);
          items = this.dataController.items();
          assert.deepEqual(this.option('selectedRowKeys'), [1], 'selected row keys');
          assert.strictEqual(items.length, 2, 'count item');
          assert.ok(items[0].isSelected, 'first item is selected');
          assert.ok(items[1].isSelected, 'second item is selected');
        });
        QUnit.test('Changing recursive option at runtime - Deselecting row when all rows are selected', function(assert) {
          var $testElement = $('#treeList');
          this.options.selection.recursive = false;
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2001, 0, 2)
          }, {
            id: 3,
            parentId: 2,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 2,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }];
          this.options.expandedRowKeys = [1, 2];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectAll();
          this.options.selection.recursive = true;
          this.selectionController.optionChanged({name: 'selection'});
          this.deselectRows(3);
          assert.deepEqual(this.option('selectedRowKeys'), [4], 'selectedRowKeys');
        });
        QUnit.test('Deselecting child node when all nodes are selected', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 3,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            parentId: 3,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }, {
            id: 6,
            parentId: 3,
            field1: 'test6',
            field2: 6,
            field3: new Date(2002, 1, 6)
          }];
          this.options.expandedRowKeys = [3];
          this.options.selectedRowKeys = [1, 2, 3];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.deselectRows(4);
          var items = this.dataController.items();
          assert.deepEqual(this.option('selectedRowKeys'), [1, 2, 5, 6], 'selected row keys');
          assert.ok(items[0].isSelected, 'first item is selected');
          assert.ok(items[1].isSelected, 'second item is selected');
          assert.notOk(items[2].isSelected, 'third item isn\'t selected');
          assert.notOk(items[3].isSelected, 'fourth item isn\'t selected');
          assert.ok(items[4].isSelected, 'fifth item is selected');
          assert.ok(items[5].isSelected, 'sixth item is selected');
        });
        QUnit.test('Select all when end nodes are selected', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2002, 1, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 2,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 3,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }];
          this.options.selectedRowKeys = [2, 3, 4];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectAll();
          assert.deepEqual(this.option('selectedRowKeys'), [2, 3, 4, 5], 'selected row keys');
        });
        QUnit.test('Deselect all after deselecting  -> selecting a nested node', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2002, 1, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 2,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 3,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }];
          this.options.selectedRowKeys = [1, 5];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.deselectRows(2);
          this.selectRows(2);
          this.deselectAll();
          assert.deepEqual(this.option('selectedRowKeys'), [], 'selected row keys');
        });
        QUnit.test('SelectRows - onSelectionChanged event should be fired before resolving the Deferred object', function(assert) {
          var $testElement = $('#treeList');
          var done = assert.async();
          var onSelectionChangedFired;
          this.options.dataSource = {load: function() {
              var d = $.Deferred();
              setTimeout(function() {
                d.resolve([{
                  id: 1,
                  field1: 'test1',
                  field2: 1,
                  field3: new Date(2002, 1, 1)
                }, {
                  id: 2,
                  parentId: 1,
                  field1: 'test2',
                  field2: 2,
                  field3: new Date(2002, 1, 2)
                }, {
                  id: 3,
                  parentId: 2,
                  field1: 'test3',
                  field2: 3,
                  field3: new Date(2002, 1, 3)
                }, {
                  id: 4,
                  parentId: 3,
                  field1: 'test4',
                  field2: 4,
                  field3: new Date(2002, 1, 4)
                }, {
                  id: 5,
                  field1: 'test5',
                  field2: 5,
                  field3: new Date(2002, 1, 5)
                }]);
              }, 30);
              return d.promise();
            }};
          this.options.selectedRowKeys = [2, 3];
          this.options.onSelectionChanged = function() {
            onSelectionChangedFired = true;
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectRows(1, true).done(function() {
            assert.ok(onSelectionChangedFired, 'onSelectionChanged event fired');
            done();
          });
        });
        QUnit.test('Selecting a node and its child node', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2002, 1, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }];
          this.options.expandedRowKeys = [1];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectRows([1, 2]);
          var items = this.dataController.items();
          assert.deepEqual(this.option('selectedRowKeys'), [1, 2], 'selected row keys');
          assert.ok(items[0].isSelected, 'first item is selected');
          assert.ok(items[1].isSelected, 'second item is selected');
          assert.ok(items[2].isSelected, 'third item is selected');
        });
        QUnit.test('Select all after filtering data', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            field1: 'test5',
            field2: 5,
            field3: new Date(2001, 0, 5)
          }];
          this.options.searchPanel = {text: 'test2'};
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectAll();
          assert.deepEqual(this.option('selectedRowKeys'), [1, 4, 5], 'selected row keys');
        });
        QUnit.test('Selection state should be updated correctly after options are changed', function(assert) {
          var $testElement = $('#treeList');
          var clock = sinon.useFakeTimers();
          try {
            this.options.loadingTimeout = 30;
            this.setupTreeList();
            this.rowsView.render($testElement);
            this.options.selectedRowKeys = [2, 4];
            this.options.dataSource = [{
              id: 1,
              field1: 'test1',
              field2: 1,
              field3: new Date(2001, 0, 1)
            }, {
              id: 2,
              parentId: 1,
              field1: 'test2',
              field2: 2,
              field3: new Date(2002, 1, 2)
            }, {
              id: 3,
              field1: 'test3',
              field2: 3,
              field3: new Date(2002, 1, 3)
            }, {
              id: 4,
              parentId: 3,
              field1: 'test4',
              field2: 4,
              field3: new Date(2002, 1, 4)
            }];
            this.selectionController.optionChanged({
              name: 'selectedRowKeys',
              value: this.options.selectedRowKeys
            });
            this.dataController.optionChanged({name: 'dataSource'});
            clock.tick(30);
            var items = this.dataController.items();
            assert.strictEqual(items.length, 2, 'count row');
            assert.ok(items[0].isSelected, 'first row is selected');
            assert.ok(items[1].isSelected, 'second row is selected');
          } finally {
            clock.restore();
          }
        });
        QUnit.test('Check selectedRowKeys after deselecting nested node', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1',
            field2: 1,
            field3: new Date(2002, 1, 1)
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          }, {
            id: 3,
            parentId: 2,
            field1: 'test3',
            field2: 3,
            field3: new Date(2002, 1, 3)
          }, {
            id: 4,
            parentId: 3,
            field1: 'test4',
            field2: 4,
            field3: new Date(2002, 1, 4)
          }, {
            id: 5,
            parentId: 2,
            field1: 'test5',
            field2: 5,
            field3: new Date(2002, 1, 5)
          }, {
            id: 6,
            parentId: 1,
            field1: 'test6',
            field2: 6,
            field3: new Date(2002, 1, 6)
          }];
          this.options.selectedRowKeys = [2];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.deselectRows(4);
          assert.deepEqual(this.option('selectedRowKeys'), [5], 'selected row keys');
        });
        QUnit.test('focusedItemIndex should be reset to -1 after change page index (T742193)', function(assert) {
          var $testElement = $('#treeList');
          var array = [{
            id: 1,
            field1: 'test1',
            field2: 1
          }, {
            id: 2,
            field1: 'test2',
            field2: 2
          }, {
            id: 3,
            field1: 'test3',
            field2: 3
          }, {
            id: 4,
            field1: 'test4',
            field2: 4
          }];
          this.options.dataSource = {
            store: {
              type: 'array',
              data: array,
              key: 'id'
            },
            pageSize: 2,
            paginate: true
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectionController.changeItemSelection(1, {shift: true});
          assert.deepEqual(this.selectionController.getSelectedRowsData(), [{
            id: 2,
            field1: 'test2',
            field2: 2
          }]);
          assert.equal(this.selectionController._selection._focusedItemIndex, 1, '_focusedItemIndex corrected');
          this.dataController.pageIndex(1);
          assert.equal(this.selectionController._selection._focusedItemIndex, -1, '_focusedItemIndex corrected');
        });
        QUnit.test('Selecting row with key = 0', function(assert) {
          var $testElement = $('#treeList');
          var selectionChangedArgs = [];
          this.options.rootValue = -1;
          this.options.columns = ['id', 'text'];
          this.options.selectedRowKeys = [1];
          this.options.dataSource = [{
            id: 0,
            parentId: -1,
            text: 'text a'
          }, {
            id: 1,
            parentId: 0,
            text: 'text ab1'
          }, {
            id: 2,
            parentId: 0,
            text: 'text ab2'
          }, {
            id: 3,
            parentId: -1,
            text: 'text b'
          }];
          this.options.onSelectionChanged = function(e) {
            selectionChangedArgs.push(e);
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectRows(0, true);
          var items = this.dataController.items();
          assert.equal(selectionChangedArgs.length, 1, 'selectionChanged is called once');
          assert.deepEqual(selectionChangedArgs[0].selectedRowKeys, [0], 'selectedItemsKeys');
          assert.deepEqual(selectionChangedArgs[0].currentSelectedRowKeys, [0], 'currentSelectedRowKeys');
          assert.deepEqual(this.option('selectedRowKeys'), [0], 'selected row keys');
          assert.ok(items[0].isSelected, 'first item is selected');
        });
        QUnit.test('The aria-selected attribute of the parent node should be in an indeterminate state after select child node -> collapse parent node', function(assert) {
          var $testElement = $('#treeList');
          this.options.dataSource = [{
            id: 1,
            field1: 'test1'
          }, {
            id: 2,
            parentId: 1,
            field1: 'test2'
          }, {
            id: 3,
            parentId: 1,
            field1: 'test3'
          }];
          this.options.expandedRowKeys = [1];
          this.setupTreeList();
          this.rowsView.render($testElement);
          this.selectRows([3]);
          var items = this.dataController.items();
          assert.strictEqual(items[0].isSelected, undefined, 'selection state of the first item is indeterminate');
          assert.strictEqual($(this.rowsView.getRowElement(0)).attr('aria-selected'), 'undefined', 'aria-selected attr with \'undefined\' value');
          this.collapseRow(1);
          items = this.dataController.items();
          assert.strictEqual(items[0].isSelected, undefined, 'selection state of the first item is indeterminate');
          assert.strictEqual($(this.rowsView.getRowElement(0)).attr('aria-selected'), 'undefined', 'aria-selected attr with \'undefined\' value');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/shadow_dom.js","generic_light.css!","ui/tree_list/ui.tree_list","jquery","animation/fx","data/array_store","../../helpers/treeListMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/shadow_dom.js"), require("generic_light.css!"), require("ui/tree_list/ui.tree_list"), require("jquery"), require("animation/fx"), require("data/array_store"), require("../../helpers/treeListMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=selection.tests.js.map