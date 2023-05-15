!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/headerPanel.tests.js"], ["generic_light.css!","ui/data_grid","jquery","../../helpers/dataGridMocks.js","core/devices","core/utils/type"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/headerPanel.tests.js", ["generic_light.css!", "ui/data_grid", "jquery", "../../helpers/dataGridMocks.js", "core/devices", "core/utils/type"], function($__export) {
  "use strict";
  var $,
      setupDataGridModules,
      MockDataController,
      MockColumnsController,
      devices,
      typeUtils;
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
      MockDataController = $__m.MockDataController;
      MockColumnsController = $__m.MockColumnsController;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<div>\n            <div id=\"container\"  class=\"dx-datagrid\"></div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Header panel', {
        beforeEach: function() {
          this.columns = [{
            caption: 'Column 1',
            visible: true
          }, {
            caption: 'Column 2',
            visible: true
          }];
          setupDataGridModules(this, ['data', 'columns', 'headerPanel', 'grouping', 'search', 'editorFactory', 'sorting'], {
            initViews: true,
            controllers: {
              columns: new MockColumnsController(this.columns),
              data: new MockDataController({
                pageCount: 1,
                pageIndex: 0,
                rows: [{values: ['', '']}],
                component: this
              })
            }
          });
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          this.dispose();
        }
      }, function() {
        QUnit.test('Draw searchPanel', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.searchPanel = {
            visible: true,
            width: 160
          };
          headerPanel.render(testElement);
          var headerPanelElement = testElement.find('.dx-datagrid-header-panel');
          assert.ok(headerPanelElement.length);
          assert.ok(headerPanelElement.children().hasClass('dx-toolbar'), 'header panel contain dxToolbar');
          var input = testElement.find('input');
          var searchPanel = testElement.find('.dx-datagrid-search-panel');
          assert.strictEqual(input.length, 1);
          assert.strictEqual(searchPanel.length, 1);
          assert.equal(searchPanel.outerWidth(), 160, 'search panel width');
        });
        QUnit.test('Change search text', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          var input;
          this.options.searchPanel = {
            visible: true,
            width: 160
          };
          headerPanel.render(testElement);
          input = testElement.find('input');
          assert.equal(input.val(), '');
          this.searchByText('Test');
          headerPanel.render();
          input = testElement.find('input');
          assert.equal(input.val(), 'Test');
        });
        QUnit.test('Draw groupPanel without grouping', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.groupPanel = {
            visible: true,
            emptyPanelText: 'Test',
            allowColumnDragging: true
          };
          headerPanel.render(testElement);
          headerPanel.resize();
          var headerPanelElement = testElement.find('.dx-datagrid-header-panel');
          assert.ok(headerPanelElement.length);
          var groupPanel = headerPanelElement.find('.dx-datagrid-group-panel');
          assert.ok(groupPanel.length);
          assert.equal(groupPanel.length, 1);
          assert.ok(groupPanel.css('maxWidth'), 'Group panel has an max width');
          assert.equal(groupPanel.find('.dx-group-panel-message').text(), 'Test');
        });
        QUnit.test('Render groupPanel with visible="auto"', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          var countOfRenderedElements = devices.current().deviceType === 'desktop' ? 1 : 0;
          this.options.groupPanel = {
            visible: 'auto',
            emptyPanelText: 'Test',
            allowColumnDragging: true
          };
          headerPanel.render(testElement);
          headerPanel.resize();
          var headerPanelElement = testElement.find('.dx-datagrid-header-panel');
          assert.equal(headerPanelElement.length, countOfRenderedElements, 'Render on desktop only');
          var groupPanel = headerPanelElement.find('.dx-datagrid-group-panel');
          assert.equal(groupPanel.length, countOfRenderedElements, 'Render on desktop only');
        });
        QUnit.test('Bounding rect of groupPanel when panel is not visible', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.groupPanel = {
            visible: false,
            emptyPanelText: 'Test',
            allowColumnDragging: true
          };
          headerPanel.render(testElement);
          headerPanel.resize();
          assert.equal(headerPanel.getBoundingRect(), null, 'Bounding rect is null when it has no grouping zone');
        });
        QUnit.test('Bounding rect of groupPanel', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.groupPanel = {
            visible: true,
            emptyPanelText: 'Test',
            allowColumnDragging: true
          };
          headerPanel.render(testElement);
          headerPanel.resize();
          var boundingRect = headerPanel.getBoundingRect();
          var isBoundingCorrect = typeUtils.isObject(boundingRect) && typeUtils.isDefined(boundingRect.top) && typeUtils.isDefined(boundingRect.bottom);
          assert.ok(isBoundingCorrect, 'Bounding rect return object with "top" and "bottom" properties when grouping zone is visible');
        });
        QUnit.test('Group items with cssClass', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.groupPanel = {visible: true};
          $.extend(this.columns[0], {
            cssClass: 'customCssClass',
            groupIndex: 0
          });
          $.extend(this.columns[1], {groupIndex: 1});
          headerPanel.render(testElement);
          headerPanel.resize();
          var headerPanelElement = testElement.find('.dx-datagrid-header-panel');
          assert.ok(headerPanelElement.length);
          var groupPanel = headerPanelElement.find('.dx-datagrid-group-panel');
          assert.equal(groupPanel.length, 1);
          assert.ok(groupPanel.find('.dx-group-panel-item').first().hasClass('customCssClass'), 'has class customCssClass');
          assert.ok(!groupPanel.find('.dx-group-panel-item').last().hasClass('customCssClass'), 'not has class customCssClass');
        });
        QUnit.test('Draw groupPanel with grouping', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          $.extend(this.columns[0], {
            groupIndex: 0,
            allowSorting: true
          });
          this.options.groupPanel = {visible: true};
          headerPanel.render(testElement);
          headerPanel.resize();
          var headerPanelElement = testElement.find('.dx-datagrid-header-panel');
          assert.ok(headerPanelElement.length);
          var groupPanel = headerPanelElement.find('.dx-datagrid-group-panel');
          assert.ok(groupPanel.length);
          assert.equal(groupPanel.length, 1);
          var groupPanelItem = groupPanel.find('.dx-group-panel-item');
          assert.ok(groupPanelItem.length);
          assert.equal(groupPanelItem.find('.dx-column-indicators').css('float'), 'none', 'column indicators in group panel has no float style');
          var columns = this.columnsController.getVisibleColumns();
          assert.equal(groupPanelItem.text(), columns[0].caption);
          assert.ok(groupPanelItem.find('.dx-sort').length);
        });
        QUnit.test('Group panel with sorting, check alignment', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          $.extend(this.columns[0], {
            groupIndex: 0,
            allowSorting: true,
            caption: 'test'
          });
          this.options.groupPanel = {visible: true};
          headerPanel.render(testElement);
          var $groupPanelItemChildren = testElement.find('.dx-group-panel-item').contents();
          assert.equal($groupPanelItemChildren.length, 2, 'group panel item have 2 items');
          assert.ok($groupPanelItemChildren.eq(1).hasClass('dx-column-indicators'), 'indicators are after text in group panel');
        });
        QUnit.test('Group panel with sorting, height after change font size', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          $.extend(this.columns[0], {
            groupIndex: 0,
            allowSorting: true
          });
          this.options.groupPanel = {visible: true};
          headerPanel.render(testElement);
          var groupHeader = testElement.find('.dx-datagrid-group-panel');
          var oldHeight = groupHeader.height();
          groupHeader.css('font-size', '10px');
          headerPanel.resize();
          assert.ok(oldHeight > groupHeader.height(), 'sort indicator height changed');
        });
        QUnit.test('Draw header panel with group panel and search panel', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.groupPanel = {visible: true};
          this.options.searchPanel = {visible: true};
          headerPanel.render(testElement);
          var headerPanelElement = testElement.find('.dx-datagrid-header-panel');
          assert.ok(headerPanelElement.length);
          assert.equal(headerPanelElement.outerWidth(), testElement.outerWidth());
          var groupPanel = headerPanelElement.find('.dx-datagrid-group-panel');
          assert.ok(groupPanel.length);
          var searchPanel = headerPanelElement.find('.dx-datagrid-search-panel');
          assert.ok(searchPanel.length);
        });
        QUnit.test('Not draw header panel without group panel and search panel', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          headerPanel.render(testElement);
          assert.ok(!testElement.find('.dx-datagrid-header-panel').is(':visible'));
        });
        QUnit.test('Enter text in searchPanel', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.searchPanel = {visible: true};
          headerPanel.render(testElement);
          var searchPanel = testElement.find('.dx-datagrid-search-panel');
          assert.strictEqual(searchPanel.length, 1);
          searchPanel.dxTextBox('instance').option('value', '123');
          assert.equal(this.option('searchPanel.text'), '123');
        });
        QUnit.test('Draw searchPanel custom width', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.searchPanel = {
            visible: true,
            width: 213
          };
          headerPanel.render(testElement);
          var input = testElement.find('input');
          var searchPanel = testElement.find('.dx-datagrid-search-panel');
          assert.strictEqual(input.length, 1);
          assert.strictEqual(searchPanel.length, 1);
          assert.equal(searchPanel.outerWidth(), 213, 'default search panel width');
        });
        QUnit.test('Toolbar must have aria-label', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.searchPanel = {visible: true};
          headerPanel.render(testElement);
          var $toolbar = testElement.find('.dx-toolbar');
          assert.equal($toolbar.attr('aria-label'), 'Data grid toolbar', 'aria-label');
        });
        QUnit.test('Hide search panel', function(assert) {
          var headerPanel = this.headerPanel;
          var container = $('#container');
          this.options.searchPanel = {visible: true};
          headerPanel.render(container);
          var $headerPanel = container.find('.dx-datagrid-header-panel');
          assert.strictEqual($headerPanel.css('display'), 'block', 'header panel visible');
          this.options.searchPanel = {visible: false};
          headerPanel.render();
          assert.strictEqual($headerPanel.css('display'), 'none', 'header panel hidden');
        });
        function updateSearchTextTest(assert, that, eventToTrigger) {
          var headerPanel = that.headerPanel;
          var container = $('#container');
          that.options.searchPanel = {visible: true};
          headerPanel.render(container);
          var searchInput = container.find('.dx-texteditor');
          assert.equal(searchInput.length, 1);
          searchInput.find('input').val('910');
          searchInput.find('input').trigger(eventToTrigger);
          that.clock.tick(600);
          assert.equal(that.option('searchPanel.text'), undefined);
          that.clock.tick(100);
          assert.equal(that.option('searchPanel.text'), '910');
        }
        QUnit.test('update search text with timeout and keyup event', function(assert) {
          updateSearchTextTest(assert, this, 'keyup');
        });
        QUnit.test('update search text with timeout and input event', function(assert) {
          updateSearchTextTest(assert, this, 'input');
        });
        QUnit.test('Not allow dragging when no visible group panel', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.groupPanel = {
            visible: false,
            allowColumnDragging: false
          };
          headerPanel.render(testElement);
          assert.ok(!headerPanel.allowDragging({allowGrouping: true}), 'not allow dragging');
        });
        QUnit.test('Not allow dragging when allowGrouping in column false', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.groupPanel = {
            visible: true,
            allowColumnDragging: true
          };
          headerPanel.render(testElement);
          assert.ok(!headerPanel.allowDragging({allowGrouping: false}), 'not allow dragging');
        });
        QUnit.test('Allow dragging when visible group panel', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.groupPanel = {
            visible: true,
            allowColumnDragging: true
          };
          headerPanel.render(testElement);
          assert.ok(headerPanel.allowDragging({allowGrouping: true}), 'allow dragging');
        });
        QUnit.test('EmptyPanelText is displayed when allowColumnDragging is false', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.groupPanel = {
            visible: true,
            allowColumnDragging: false
          };
          headerPanel.render(testElement);
          assert.ok(!testElement.find('.dx-group-panel-message').length);
        });
      });
      QUnit.module('Draw buttons in header panel', {
        beforeEach: function() {
          setupDataGridModules(this, ['columns', 'data', 'headerPanel', 'editing', 'editingCellBased', 'editorFactory', 'columnChooser'], {
            initViews: true,
            controllers: {
              columns: new MockColumnsController([]),
              data: new MockDataController({items: []})
            }
          });
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
          this.dispose();
        }
      }, function() {
        QUnit.test('Draw add row button', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.editing = {
            allowAdding: true,
            texts: {addRow: 'Add row'}
          };
          headerPanel.render(testElement);
          var addRowButton = testElement.find('.dx-datagrid-addrow-button');
          assert.equal(addRowButton.length, 1, 'has add row button');
          assert.strictEqual(addRowButton.attr('title'), 'Add row', 'title button');
        });
        QUnit.test('Draw cancel and save buttons', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.editing = {
            allowUpdating: true,
            mode: 'batch',
            texts: {
              cancelAllChanges: 'Cancel',
              saveAllChanges: 'Save'
            }
          };
          headerPanel.render(testElement);
          var cancelButton = testElement.find('.dx-datagrid-cancel-button');
          var saveButton = testElement.find('.dx-datagrid-save-button');
          assert.equal(cancelButton.length, 1, 'has cancel button');
          assert.ok(cancelButton.hasClass('dx-state-disabled'), 'disabled state is set to button');
          assert.strictEqual(cancelButton.attr('title'), 'Cancel', 'title button');
          assert.equal(saveButton.length, 1, 'has save button');
          assert.strictEqual(saveButton.attr('title'), 'Save', 'title button');
        });
        QUnit.test('Draw show column chooser button', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container');
          this.options.columnChooser = {
            enabled: true,
            title: 'Column chooser'
          };
          headerPanel.render(testElement);
          var showColumnChooserButton = testElement.find('.dx-datagrid-column-chooser-button');
          assert.equal(showColumnChooserButton.length, 1, 'has show column chooser button');
          assert.strictEqual(showColumnChooserButton.attr('title'), 'Column chooser', 'title button');
        });
        QUnit.test('Draw hidden show column chooser button', function(assert) {
          var headerPanel = this.headerPanel;
          var testElement = $('#container').width(10);
          this.options.columnChooser = {
            enabled: true,
            title: 'Column chooser'
          };
          headerPanel._appendColumnChooserItem = function() {
            return [{
              widget: 'dxButton',
              options: {
                text: 'Column chooser',
                icon: 'back',
                width: 50
              },
              showText: 'inMenu',
              location: 'after',
              name: 'columnChooserButton',
              locateInMenu: 'auto'
            }];
          };
          headerPanel.render(testElement);
          var $columnChooserButton = testElement.find('.dx-toolbar .dx-toolbar-item:visible');
          var $toolbarMenuButton = $('.dx-toolbar .dx-dropdownmenu').filter(':visible');
          assert.equal($toolbarMenuButton.length, 1, 'has shown toolbar menu button');
          assert.equal($columnChooserButton.length, 0, 'column chooser button is invisible');
        });
        QUnit.test('Add button via the onToolbarPreparing option', function(assert) {
          var callCountToolbarPreparing = 0;
          var headerPanel = this.headerPanel;
          var $testElement = $('#container');
          this.options.onToolbarPreparing = function(e) {
            assert.equal(e.toolbarOptions.items.length, 0, 'count item');
            callCountToolbarPreparing++;
            e.toolbarOptions.items.push({
              widget: 'dxButton',
              options: {
                text: 'Custom button',
                icon: 'back',
                width: 50
              },
              location: 'after',
              locateInMenu: 'auto'
            });
          };
          headerPanel.init();
          headerPanel.render($testElement);
          var $customButtonElement = $testElement.find('.dx-toolbar .dx-item');
          assert.equal(callCountToolbarPreparing, 1, 'call count toolbar preparing');
          assert.equal($customButtonElement.length, 1, 'count button');
          assert.equal($customButtonElement.text(), 'Custom button', 'text of the custom button');
        });
        QUnit.test('Add button via the onToolbarPreparing option when there is column chooser button', function(assert) {
          var headerPanel = this.headerPanel;
          var $testElement = $('#container');
          this.options.columnChooser = {
            enabled: true,
            title: 'Column chooser'
          };
          this.options.onToolbarPreparing = function(e) {
            assert.equal(e.toolbarOptions.items.length, 1, 'count item');
            assert.equal(e.toolbarOptions.items[0].name, 'columnChooserButton', 'has column chooser button');
            e.toolbarOptions.items.push({
              template: function(data, index, container) {
                $('<div/>').addClass('custom-button').dxButton({
                  text: 'Custom Button',
                  width: 50
                }).appendTo(container);
              },
              location: 'before',
              locateInMenu: 'auto'
            });
          };
          headerPanel.init();
          headerPanel.render($testElement);
          var $customButtonElements = $testElement.find('.dx-toolbar .dx-item .dx-button');
          assert.equal($customButtonElements.length, 2, 'count button');
          assert.ok($customButtonElements.eq(0).hasClass('custom-button'), 'has custom button');
          assert.ok($customButtonElements.eq(1).hasClass('dx-datagrid-column-chooser-button'), 'has column chooser button');
        });
        QUnit.test('onToolbarPreparing - setting handler to the click event for column chooser button', function(assert) {
          var callCountClick = 0;
          var headerPanel = this.headerPanel;
          var $testElement = $('#container');
          this.options.columnChooser = {
            enabled: true,
            title: 'Column chooser'
          };
          this.options.onToolbarPreparing = function(e) {
            assert.equal(e.toolbarOptions.items[0].name, 'columnChooserButton', 'has column chooser button');
            e.toolbarOptions.items[0].options.onClick = function() {
              callCountClick++;
            };
          };
          headerPanel.init();
          headerPanel.render($testElement);
          var $columnChooserButton = $testElement.find('.dx-toolbar .dx-item .dx-button');
          assert.equal(callCountClick, 0, 'call count click');
          assert.equal($columnChooserButton.length, 1, 'count button');
          assert.ok($columnChooserButton.eq(0).hasClass('dx-datagrid-column-chooser-button'), 'has column chooser button');
          $columnChooserButton.trigger('dxclick');
          assert.equal(callCountClick, 1, 'call count click');
        });
        QUnit.test('Add custom button via toolbar.items option', function(assert) {
          var headerPanel = this.headerPanel;
          var $testElement = $('#container');
          this.options.toolbar = {items: [{
              widget: 'dxButton',
              options: {
                text: 'Custom button',
                icon: 'back',
                width: 50
              },
              location: 'after',
              locateInMenu: 'auto'
            }]};
          headerPanel.init();
          headerPanel.render($testElement);
          var $button = $testElement.find('.dx-toolbar .dx-item');
          assert.equal($button.length, 1, 'button count');
          assert.equal($button.text(), 'Custom button', 'text of the custom button');
        });
        QUnit.test('Change default button settings via toolbar.items option', function(assert) {
          var headerPanel = this.headerPanel;
          var $testElement = $('#container');
          this.options.columnChooser = {
            enabled: true,
            title: 'Column chooser'
          };
          this.options.editing = {allowAdding: true};
          this.options.toolbar = {items: [{
              name: 'columnChooserButton',
              location: 'before'
            }, {
              name: 'addRowButton',
              location: 'before'
            }]};
          headerPanel.init();
          headerPanel.render($testElement);
          var $buttonsBefore = $testElement.find('.dx-toolbar-before .dx-item .dx-button');
          assert.equal($buttonsBefore.length, 2, 'count button');
          assert.ok($buttonsBefore.eq(0).hasClass('dx-datagrid-column-chooser-button'), 'has column chooser button');
          assert.ok($buttonsBefore.eq(1).hasClass('dx-datagrid-addrow-button'), 'has add button');
        });
        QUnit.test('toolbar.item[].location should be \'after\' by default', function(assert) {
          var headerPanel = this.headerPanel;
          var $testElement = $('#container');
          this.options.toolbar = {items: [{
              widget: 'dxButton',
              options: {text: 'Custom button'}
            }]};
          headerPanel.init();
          headerPanel.render($testElement);
          var $button = $testElement.find('.dx-toolbar .dx-toolbar-after .dx-item');
          assert.equal($button.length, 1, 'button location is after');
        });
        QUnit.test('toolbar.item[].location should be \'center\' by default if added via onToolbarPrepared', function(assert) {
          var headerPanel = this.headerPanel;
          var $testElement = $('#container');
          this.options.onToolbarPreparing = function(e) {
            e.toolbarOptions.items.push({
              widget: 'dxButton',
              options: {text: 'Custom button'}
            });
          };
          headerPanel.init();
          headerPanel.render($testElement);
          var $button = $testElement.find('.dx-toolbar .dx-toolbar-center .dx-item');
          assert.equal($button.length, 1, 'button location is center');
        });
        QUnit.test('The default buttons should be hidden when they are specified in the toolbar.items option', function(assert) {
          var headerPanel = this.headerPanel;
          var $testElement = $('#container');
          this.options.toolbar = {items: ['addRowButton', 'applyFilterButton', 'columnChooserButton', 'exportButton', 'groupPanel', 'revertButton', 'saveButton', 'searchPanel']};
          headerPanel.init();
          headerPanel.render($testElement);
          var $toolbarItemElements = $testElement.find('.dx-toolbar-item');
          assert.strictEqual($toolbarItemElements.length, 8, 'count button');
          $.each($toolbarItemElements, function(_, toolbarItemElement) {
            assert.ok($(toolbarItemElement).hasClass('dx-state-invisible'), 'button is hidden');
          });
        });
        QUnit.test('The default buttons should be hidden when they are specified in the toolbar.items option using name', function(assert) {
          var headerPanel = this.headerPanel;
          var $testElement = $('#container');
          this.options.toolbar = {items: ['addRowButton', 'applyFilterButton', 'columnChooserButton', 'exportButton', 'groupPanel', 'revertButton', 'saveButton', 'searchPanel'].map(function(name) {
              return ({name: name});
            })};
          headerPanel.init();
          headerPanel.render($testElement);
          var $toolbarItemElements = $testElement.find('.dx-toolbar-item');
          assert.strictEqual($toolbarItemElements.length, 8, 'count button');
          $.each($toolbarItemElements, function(_, toolbarItemElement) {
            assert.ok($(toolbarItemElement).hasClass('dx-state-invisible'), 'button is hidden');
          });
          this.options.toolbar.items.forEach(function(item) {
            assert.strictEqual(item.visible, undefined, 'visible option should not be changed in user props');
          });
        });
        QUnit.test('Toolbar item with custom name should be visible', function(assert) {
          var headerPanel = this.headerPanel;
          var $testElement = $('#container');
          this.options.toolbar = {items: [{
              name: 'myItem',
              cssClass: 'my-item',
              widget: 'dxButton',
              options: {text: 'My Button'}
            }]};
          headerPanel.init();
          headerPanel.render($testElement);
          var $customToolbarItem = $testElement.find('.my-item');
          assert.strictEqual($customToolbarItem.length, 1, 'item is rendered');
          assert.ok($customToolbarItem.is(':visible'), 'item is visible');
        });
        QUnit.test('The error should be raised if new default toolbar item is not added to DEFAULT_TOOLBAR_ITEM_NAMES', function(assert) {
          var headerPanel = this.headerPanel;
          var $testElement = $('#container');
          headerPanel._getToolbarItems = function() {
            return [{name: 'new'}];
          };
          assert.throws(function() {
            headerPanel.init();
            headerPanel.render($testElement);
          }, function(e) {
            return e.message === 'Default toolbar item \'new\' is not added to DEFAULT_TOOLBAR_ITEM_NAMES';
          }, 'exception');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/data_grid","jquery","../../helpers/dataGridMocks.js","core/devices","core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/data_grid"), require("jquery"), require("../../helpers/dataGridMocks.js"), require("core/devices"), require("core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=headerPanel.tests.js.map