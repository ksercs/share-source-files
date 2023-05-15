!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/columnChooserModule.tests.js"], ["generic_light.css!","ui/data_grid","jquery","core/utils/type","core/utils/support","core/devices","ui/themes","../../helpers/dataGridMocks.js","core/utils/public_component","localization/message","../../helpers/wrappers/searchBoxWrappers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/columnChooserModule.tests.js", ["generic_light.css!", "ui/data_grid", "jquery", "core/utils/type", "core/utils/support", "core/devices", "ui/themes", "../../helpers/dataGridMocks.js", "core/utils/public_component", "localization/message", "../../helpers/wrappers/searchBoxWrappers.js"], function($__export) {
  "use strict";
  var $,
      typeUtils,
      supportUtils,
      devices,
      themes,
      dataGridMocks,
      publicComponentUtils,
      messageLocalization,
      TreeViewSearchBoxWrapper,
      device;
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      supportUtils = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      themes = $__m.default;
    }, function($__m) {
      dataGridMocks = $__m.default;
    }, function($__m) {
      publicComponentUtils = $__m.default;
    }, function($__m) {
      messageLocalization = $__m.default;
    }, function($__m) {
      TreeViewSearchBoxWrapper = $__m.TreeViewSearchBoxWrapper;
    }],
    execute: function() {
      device = devices.real();
      QUnit.testStart(function() {
        var markup = '<div id="container" class="dx-datagrid"></div>';
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Column chooser', {
        beforeEach: function() {
          this.clock = sinon.useFakeTimers();
          this.columns = [];
          this.options = {columnChooser: {
              enabled: true,
              width: 300,
              height: 350,
              search: {
                enabled: false,
                editorOptions: {},
                timeout: 500
              },
              selection: {
                allowSelectAll: false,
                recursive: false,
                selectItemByClick: false
              }
            }};
          dataGridMocks.setupDataGridModules(this, ['columns', 'data', 'columnChooser', 'headerPanel', 'editing'], {
            initViews: true,
            controllers: {
              columns: new dataGridMocks.MockColumnsController(this.columns),
              data: new dataGridMocks.MockDataController({items: []})
            }
          });
          this.setTestElement = function($rootElement) {
            var $element = $('<div />').appendTo($rootElement);
            this.columnChooserView._$element = $element;
            this.columnChooserView._$parent = $rootElement;
          };
          this.renderColumnChooser = function() {
            this.columnChooserView.showColumnChooser();
            this.columnChooserView.hideColumnChooser();
            this.clock.tick(1000);
          };
          this.columnChooserView._$element = $('#container');
        },
        afterEach: function() {
          this.clock.restore();
          this.columnChooserView.hideColumnChooser();
        }
      }, function() {
        QUnit.test('Bounding rect of groupPanel when panel is not visible', function(assert) {
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.renderColumnChooser();
          assert.equal(this.columnChooserView.getBoundingRect(), null, 'Bounding rect is null when column chooser is not visible');
        });
        QUnit.test('Bounding rect of groupPanel', function(assert) {
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.columnChooserView.showColumnChooser();
          this.clock.tick(1000);
          var boundingRect = this.columnChooserView.getBoundingRect();
          var isBoundingCorrect = typeUtils.isObject(boundingRect) && typeUtils.isDefined(boundingRect.top) && typeUtils.isDefined(boundingRect.bottom) && typeUtils.isDefined(boundingRect.right) && typeUtils.isDefined(boundingRect.left);
          assert.ok(isBoundingCorrect, 'Bounding rect return object with "top", "bottom", "left" and "right" properties when column chooser is visible');
        });
        QUnit.test('Draw column chooser (dragAndDrop mode)', function(assert) {
          var testElement = $('#container');
          this.options.columnChooser.emptyPanelText = 'Test';
          this.setTestElement(testElement);
          this.renderColumnChooser();
          this.columnChooserView._popupContainer.option('visible', true);
          this.clock.tick(10);
          var $overlayWrapper = this.columnChooserView._popupContainer.$wrapper();
          assert.ok($overlayWrapper.hasClass('dx-datagrid-column-chooser'), 'has column chooser');
          assert.ok($overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-drag'), 'has dragAndDrop mode class');
          assert.ok(!$overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-select'), 'hasn\'t select mode class');
          assert.ok($overlayWrapper.find('.dx-empty-message').length, 'has message');
          assert.strictEqual($overlayWrapper.find('.dx-empty-message').text(), 'Test', 'text message');
        });
        QUnit.test('Draw column chooser (select mode)', function(assert) {
          var testElement = $('#container');
          this.options.columnChooser.mode = 'select';
          this.setTestElement(testElement);
          this.renderColumnChooser();
          this.columnChooserView._popupContainer.option('visible', true);
          this.clock.tick(10);
          var $overlayWrapper = this.columnChooserView._popupContainer.$wrapper();
          assert.ok($overlayWrapper.hasClass('dx-datagrid-column-chooser'), 'has column chooser');
          assert.ok(!$overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-drag'), 'hasn\'t dragAndDrop mode class');
          assert.ok($overlayWrapper.hasClass('dx-datagrid-column-chooser-mode-select'), 'has select mode class');
          assert.ok($overlayWrapper.find('.dx-treeview').length, 'has treeview in column chooser');
          assert.ok(!$overlayWrapper.find('.dx-column-chooser-message').length, 'hasn\'t message');
        });
        QUnit.test('Draw column chooser with hidden columns (dragAndDrop mode)', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          $.extend(this.columns, [{
            caption: 'Column 1',
            visible: true
          }, {
            caption: 'Column 2',
            visible: false,
            showInColumnChooser: true
          }, {
            caption: 'Column 3',
            visible: false,
            showInColumnChooser: false
          }]);
          this.setTestElement(testElement);
          this.renderColumnChooser();
          assert.ok(testElement.find('.dx-datagrid-column-chooser'), 'has column chooser');
          assert.ok(!$('body').children('.dx-datagrid-column-chooser').length, 'doesn\'t have wrapper column chooser');
          columnChooserView._popupContainer.option('visible', true);
          var columnChooser = $('body').children('.dx-datagrid-column-chooser');
          assert.ok(columnChooser.length, 'have wrapper column chooser');
          assert.ok(columnChooser.find('.dx-overlay-content').first().is(':visible'), 'visible column chooser');
          assert.ok(columnChooser.find('.dx-popup-content').length, 'has popup content');
          assert.equal(columnChooser.find('.dx-popup-content').first().find('.dx-column-chooser-item').length, 1, 'count items');
          assert.strictEqual(columnChooser.find('.dx-popup-content').first().find('.dx-column-chooser-item').first().text(), 'Column 2', 'text item 1');
        });
        QUnit.test('Draw column chooser with hidden columns (select mode)', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.options.columnChooser.mode = 'select';
          $.extend(this.columns, [{
            caption: 'Column 1',
            index: 0,
            visible: true
          }, {
            caption: 'Column 2',
            index: 1,
            visible: false,
            showInColumnChooser: true
          }, {
            caption: 'Column 3',
            index: 2,
            visible: false,
            showInColumnChooser: false
          }, {
            caption: 'Column 4',
            index: 3,
            visible: true
          }]);
          this.setTestElement(testElement);
          this.renderColumnChooser();
          columnChooserView._popupContainer.option('visible', true);
          var $columnChooser = $('body').children('.dx-datagrid-column-chooser');
          var treeView = $columnChooser.find('.dx-treeview').dxTreeView('instance');
          var items = treeView.option('items');
          assert.ok($columnChooser.length, 'have wrapper column chooser');
          assert.ok(treeView, 'column chooser has dxTreeView');
          assert.equal(items.length, 3, 'treeView has 3 items');
          assert.ok(items[0].selected, 'selected first item');
          assert.ok(!items[1].selected, 'selected second item');
          assert.ok(items[2].selected, 'selected third item');
        });
        QUnit.test('Draw column chooser with columns.allowHiding == false (select mode)', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.options.columnChooser.mode = 'select';
          $.extend(this.columns, [{
            caption: 'Column 1',
            index: 0,
            visible: true,
            allowHiding: false
          }, {
            caption: 'Column 2',
            index: 1,
            visible: false
          }]);
          this.setTestElement(testElement);
          this.renderColumnChooser();
          columnChooserView._popupContainer.option('visible', true);
          var $columnChooser = $('body').children('.dx-datagrid-column-chooser');
          var treeView = $columnChooser.find('.dx-treeview').dxTreeView('instance');
          var items = treeView.option('items');
          var $checkBoxElements = columnChooserView._popupContainer.$content().find('.dx-checkbox');
          assert.ok($columnChooser.length, 'have wrapper column chooser');
          assert.ok(treeView, 'column chooser has dxTreeView');
          assert.equal(items.length, 2, 'treeView has 2 items');
          assert.ok(items[0].selected, '1st item selected');
          assert.ok(items[0].disabled, '1st item is disabled');
          assert.ok($checkBoxElements.eq(0).hasClass('dx-state-disabled'), '1st item\'s checkbox disabled');
          assert.notOk(items[1].selected, '2nd item not selected');
          assert.notOk(items[1].disabled, '2st item enabled');
          assert.notOk($checkBoxElements.eq(1).hasClass('dx-state-disabled'), '2nd item\'s checkbox enabled');
        });
        QUnit.test('Hide column chooser when is visible true', function(assert) {
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.renderColumnChooser();
          assert.ok(testElement.find('.dx-datagrid-column-chooser').length, 'has column chooser');
          assert.ok(!$('body').children('.dx-datagrid-column-chooser').length, 'doesn\'t have wrapper column chooser');
          this.columnChooserView._popupContainer.option('visible', true);
          var columnChooser = $('body').children('.dx-datagrid-column-chooser');
          assert.ok(columnChooser.length, 'have wrapper column chooser');
          assert.ok(columnChooser.find('.dx-overlay-content').first().is(':visible'), 'visible column chooser');
          columnChooser.find('.dx-closebutton').first().trigger('dxclick');
          this.clock.tick(500);
          assert.ok(!$('body').children('.dx-datagrid-column-chooser').length, 'doesn\'t have wrapper column chooser');
        });
        QUnit.test('Hide column via column chooser (select mode)', function(assert) {
          var testElement = $('#container');
          this.options.columnChooser.mode = 'select';
          $.extend(this.columns, [{
            caption: 'Column 1',
            index: 0,
            visible: true
          }, {
            caption: 'Column 2',
            index: 1,
            visible: false,
            showInColumnChooser: true
          }, {
            caption: 'Column 3',
            index: 2,
            visible: false,
            showInColumnChooser: false
          }, {
            caption: 'Column 4',
            index: 3,
            visible: true
          }]);
          this.setTestElement(testElement);
          this.renderColumnChooser();
          this.columnChooserView._popupContainer.option('visible', true);
          var $columnChooser = $('body').children('.dx-datagrid-column-chooser');
          var $treeViewItem = $columnChooser.find('.dx-checkbox').first();
          $($treeViewItem).trigger('dxclick');
          this.clock.tick(500);
          assert.deepEqual(this.columns[0], {
            caption: 'Column 1',
            index: 0,
            visible: false
          }, 'First column is hidden now');
        });
        QUnit.test('Show column via column chooser (select mode)', function(assert) {
          var testElement = $('#container');
          this.options.columnChooser.mode = 'select';
          $.extend(this.columns, [{
            caption: 'Column 1',
            index: 0,
            visible: false
          }, {
            caption: 'Column 2',
            index: 1,
            visible: false,
            showInColumnChooser: true
          }, {
            caption: 'Column 3',
            index: 2,
            visible: false,
            showInColumnChooser: false
          }, {
            caption: 'Column 4',
            index: 3,
            visible: true
          }]);
          this.setTestElement(testElement);
          this.renderColumnChooser();
          this.columnChooserView._popupContainer.option('visible', true);
          var $columnChooser = $('body').children('.dx-datagrid-column-chooser');
          var $treeViewItem = $columnChooser.find('.dx-checkbox').first();
          $($treeViewItem).trigger('dxclick');
          this.clock.tick(500);
          assert.deepEqual(this.columns[0], {
            caption: 'Column 1',
            index: 0,
            visible: true
          }, 'First column is hidden now');
        });
        QUnit.test('Rendering show column chooser button in headerPanel', function(assert) {
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.options.editing = {allowAdding: true};
          this.renderColumnChooser();
          this.headerPanel.render(testElement);
          this.clock.tick(1000);
          assert.ok(testElement.find('.dx-datagrid-column-chooser').length, 'has column chooser');
          assert.ok(!$('body').children('.dx-datagrid-column-chooser').length, 'doesn\'t have wrapper column chooser');
          var $toolbarButtons = testElement.find('.dx-datagrid-toolbar-button');
          assert.equal($toolbarButtons.length, 2, 'there are 2 buttons in toolbar');
          assert.ok($toolbarButtons.eq(1).hasClass('dx-datagrid-column-chooser-button'), 'second button is column chooser');
          assert.equal($toolbarButtons.eq(1).attr('aria-haspopup'), 'dialog', 'column chooser button has aria-haspopup="dialog" attribute');
          assert.ok($toolbarButtons.eq(0).hasClass('dx-edit-button'), 'first element is edit (insert) button');
        });
        QUnit.test('Show column chooser by pressing the button', function(assert) {
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.renderColumnChooser();
          this.clock.tick(1000);
          this.columnChooserController.renderShowColumnChooserButton(testElement);
          assert.ok(testElement.find('.dx-datagrid-column-chooser-button').length, 'has column chooser button');
          assert.ok(testElement.find('.dx-datagrid-column-chooser').length, 'has column chooser');
          assert.ok(!$('body').children('.dx-datagrid-column-chooser').length, 'doesn\'t have wrapper column chooser');
          testElement.find('.dx-datagrid-column-chooser-button').trigger('dxclick');
          var columnChooser = $('body').children('.dx-datagrid-column-chooser');
          assert.ok(columnChooser.length, 'have wrapper column chooser');
          assert.ok(columnChooser.find('.dx-overlay-content').first().is(':visible'), 'visible column chooser');
        });
        QUnit.test('Get column elements', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          $.extend(this.columns, [{
            caption: 'Column 1',
            visible: true,
            index: 0
          }, {
            caption: 'Column 2',
            visible: false,
            showInColumnChooser: true,
            index: 1
          }, {
            caption: 'Column 3',
            visible: false,
            showInColumnChooser: true,
            index: 2
          }]);
          this.setTestElement(testElement);
          this.renderColumnChooser();
          assert.ok(testElement.find('.dx-datagrid-column-chooser'.length), 'has column chooser');
          assert.ok(!$('body').children('.dx-datagrid-column-chooser').length, 'doesn\'t have wrapper column chooser');
          columnChooserView._popupContainer.option('visible', true);
          var columnChooser = $('body').children('.dx-datagrid-column-chooser');
          assert.ok(columnChooser.length, 'have wrapper column chooser');
          assert.ok(columnChooser.find('.dx-overlay-content').first().is(':visible'), 'visible column chooser');
          var columnHiddenElements = columnChooserView.getColumnElements();
          assert.equal(columnHiddenElements.length, 2, 'count hidden elements');
          assert.strictEqual(columnHiddenElements.eq(0).text(), 'Column 2', 'text hidden element 1');
          assert.strictEqual(columnHiddenElements.eq(1).text(), 'Column 3', 'text hidden element 2');
        });
        QUnit.test('Get bounding rect', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.setTestElement(testElement);
          this.columnChooserView.showColumnChooser();
          this.clock.tick(1000);
          var boundingRect = columnChooserView.getBoundingRect();
          assert.equal(boundingRect.right - boundingRect.left, this.options.columnChooser.width, 'width columnChooser');
          assert.equal(boundingRect.bottom - boundingRect.top, this.options.columnChooser.height, 'height columnChooser');
        });
        QUnit.test('Get bounding rect when column chooser not visible', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.setTestElement(testElement);
          this.renderColumnChooser();
          var boundingRect = columnChooserView.getBoundingRect();
          assert.equal(boundingRect, null, 'boundingRect null');
        });
        QUnit.test('Get bounding rect when column chooser not enabled', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.setTestElement(testElement);
          this.options.columnChooser = {enabled: false};
          this.renderColumnChooser();
          var boundingRect = columnChooserView.getBoundingRect();
          assert.equal(boundingRect, null, 'boundingRect null');
        });
        QUnit.test('rtlEnabled option set class to an overlay content', function(assert) {
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.options.rtlEnabled = true;
          this._createComponent = function(element, name, config) {
            config.rtlEnabled = true;
            name = typeof name === 'string' ? name : publicComponentUtils.name(name);
            var $element = $(element)[name](config || {});
            return $element[name]('instance');
          };
          this.columnChooserView.showColumnChooser();
          this.columnChooserView.hideColumnChooser();
          this.clock.tick(1000);
          assert.ok(testElement.find('.dx-popup-content').first().hasClass('dx-rtl'), 'popup content has dx-rtl class when \'rtlEnabled\' option is true');
        });
        QUnit.test('Redraw column chooser with rtlEnabled (changed options)', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.setTestElement(testElement);
          this.options.rtlEnabled = false;
          this.renderColumnChooser();
          assert.ok(!testElement.find('.dx-overlay-content').first().hasClass('dx-rtl'), 'overlay content hasn\'t dx-rtl class');
          this.options.rtlEnabled = true;
          columnChooserView._initializePopupContainer();
          this.renderColumnChooser();
          assert.ok(testElement.find('.dx-overlay-content').first().hasClass('dx-rtl'), 'overlay content has dx-rtl class when \'rtlEnabled\' option is true');
        });
        QUnit.test('Column chooser is draggable', function(assert) {
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.renderColumnChooser();
          var columnChooserContainer = this.columnChooserView._popupContainer;
          assert.ok(columnChooserContainer.option('dragEnabled'), 'Column chooser is draggable');
        });
        QUnit.test('Enable search', function(assert) {
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.options.columnChooser.search.enabled = true;
          this.options.columnChooser.search.timeout = 300;
          this.renderColumnChooser();
          this.columnChooserView._popupContainer.option('visible', true);
          this.clock.tick(10);
          var $overlayWrapper = this.columnChooserView._popupContainer.$wrapper();
          var treeView = $overlayWrapper.find('.dx-treeview').dxTreeView('instance');
          assert.ok(treeView.option('searchEnabled'));
          assert.equal(treeView.option('searchTimeout'), 300, 'search timeout is assigned');
        });
        QUnit.test('Test aria-label in search-box input (T829760)', function(assert) {
          var searchBoxWrapper = new TreeViewSearchBoxWrapper('.dx-datagrid-column-chooser');
          this.setTestElement($('#container'));
          this.options.columnChooser.search.enabled = true;
          this.renderColumnChooser();
          this.columnChooserView._popupContainer.option('visible', true);
          this.clock.tick(10);
          assert.strictEqual(searchBoxWrapper.getEditorInput().attr('aria-label'), messageLocalization.format('Search'), 'Search box input aria-label attribute');
        });
        if (device.deviceType === 'desktop') {
          QUnit.test('Close and cancel buttons for generic theme', function(assert) {
            var testElement = $('#container');
            var columnChooserView = this.columnChooserView;
            this.setTestElement(testElement);
            this.renderColumnChooser();
            columnChooserView._popupContainer.toggle(true);
            assert.ok($('.dx-closebutton').length, 'closebutton is shown');
            assert.ok(!$('.dx-button-text').length, 'cancel button is hidden');
          });
        }
        QUnit.test('Close and cancel buttons for mobile theme', function(assert) {
          var testElement = $('#container');
          var origIsGeneric = themes.isGeneric;
          var columnChooserView = this.columnChooserView;
          this.setTestElement(testElement);
          themes.isGeneric = function() {
            return false;
          };
          this.renderColumnChooser();
          columnChooserView._popupContainer.toggle(true);
          assert.ok(!$('.dx-closebutton').length, 'close button is hidden');
          assert.ok($('.dx-button-text').length, 'cancel button is shown');
          themes.isGeneric = origIsGeneric;
        });
        QUnit.test('Close and cancel buttons for material theme', function(assert) {
          var testElement = $('#container');
          var origIsMaterial = themes.isMaterial;
          var columnChooserView = this.columnChooserView;
          this.setTestElement(testElement);
          themes.isMaterial = function() {
            return true;
          };
          this.renderColumnChooser();
          columnChooserView._popupContainer.toggle(true);
          assert.ok($('.dx-closebutton').length, 'close button is shown');
          assert.ok(!$('.dx-button-text').length, 'cancel button is hidden');
          themes.isMaterial = origIsMaterial;
        });
        QUnit.test('Add non touch class when column chooser is shown on win phone', function(assert) {
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.columnChooserView._isWinDevice = function() {
            return true;
          };
          this.renderColumnChooser();
          this.clock.tick(1000);
          this.columnChooserController.renderShowColumnChooserButton(testElement);
          testElement.find('.dx-datagrid-column-chooser-button').trigger('dxclick');
          assert.ok($(document.body).hasClass('dx-datagrid-notouch-action'), 'no touch css class');
        });
        QUnit.skip('Use simulated scrolling on win phone', function(assert) {
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.columnChooserView._isWinDevice = function() {
            return true;
          };
          this.renderColumnChooser();
          this.clock.tick(1000);
          this.columnChooserController.renderShowColumnChooserButton(testElement);
          testElement.find('.dx-datagrid-column-chooser-button').trigger('dxclick');
          var treeView = $('.dx-datagrid-column-chooser-list').first().dxTreeView('instance');
          assert.ok(!treeView.option('useNativeScrolling'), 'use simulated scrolling');
        });
        QUnit.skip('Use simulated scrolling is not force enabled on not win phone', function(assert) {
          var testElement = $('#container');
          var supportNativeScrolling = supportUtils.nativeScrolling;
          supportUtils.nativeScrolling = true;
          this.columnChooserView._isWinDevice = function() {
            return false;
          };
          this.setTestElement(testElement);
          this.renderColumnChooser();
          this.clock.tick(1000);
          this.columnChooserController.renderShowColumnChooserButton(testElement);
          testElement.find('.dx-datagrid-column-chooser-button').trigger('dxclick');
          var treeView = $('.dx-datagrid-column-chooser-list').first().dxTreeView('instance');
          assert.equal(treeView.option('useNativeScrolling'), true, 'use native scrolling');
          supportUtils.nativeScrolling = supportNativeScrolling;
        });
        QUnit.test('Non touch class is not added when column chooser is shown on not win phone', function(assert) {
          $(document.body).removeClass('dx-datagrid-notouch-action');
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.columnChooserView._isWinDevice = function() {
            return false;
          };
          this.renderColumnChooser();
          this.clock.tick(1000);
          this.columnChooserController.renderShowColumnChooserButton(testElement);
          testElement.find('.dx-datagrid-column-chooser-button').trigger('dxclick');
          assert.ok(!$(document.body).hasClass('dx-datagrid-notouch-action'), 'no touch css class');
        });
        QUnit.test('Remove non touch class when column chooser is hidden on win phone', function(assert) {
          var testElement = $('#container');
          this.setTestElement(testElement);
          this.columnChooserView._isWinDevice = function() {
            return true;
          };
          this.renderColumnChooser();
          this.clock.tick(1000);
          this.columnChooserController.renderShowColumnChooserButton(testElement);
          testElement.find('.dx-datagrid-column-chooser-button').trigger('dxclick');
          var columnChooser = $('body').children('.dx-datagrid-column-chooser');
          columnChooser.find('.dx-closebutton').first().trigger('dxclick');
          this.clock.tick(500);
          assert.notOk($(document.body).hasClass('dx-datagrid-notouch-action'), 'no touch css class');
        });
        QUnit.test('Show column chooser via api method when it is disabled_T102451', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.setTestElement(testElement);
          this.options.columnChooser = {enabled: false};
          this.renderColumnChooser();
          columnChooserView.showColumnChooser();
          assert.ok(columnChooserView._popupContainer);
          assert.ok(columnChooserView._isPopupContainerShown, 'Column chooser is shown');
        });
        QUnit.test('Popup window is not initialized when enabled is false_T102451', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.setTestElement(testElement);
          this.options.columnChooser = {enabled: false};
          columnChooserView.render(testElement);
          assert.ok(!columnChooserView._popupContainer);
          assert.ok(!columnChooserView._isPopupContainerShown);
        });
        QUnit.test('Not allow dragging when no visible column chooser', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.setTestElement(testElement);
          this.renderColumnChooser();
          assert.ok(!columnChooserView.allowDragging({allowHiding: true}), 'not allow dragging');
        });
        QUnit.test('Not allow dragging when allowHiding in column false', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.setTestElement(testElement);
          this.renderColumnChooser();
          columnChooserView._popupContainer.option('visible', true);
          assert.ok(!columnChooserView.allowDragging({allowHiding: false}), 'not allow dragging');
        });
        QUnit.test('Allow dragging when visible column chooser', function(assert) {
          var testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.setTestElement(testElement);
          this.renderColumnChooser();
          columnChooserView._popupContainer.option('visible', true);
          assert.ok(columnChooserView.allowDragging({allowHiding: true}), 'allow dragging');
        });
        QUnit.test('Allow dragging with visible band column', function(assert) {
          var $testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.setTestElement($testElement);
          this.renderColumnChooser();
          columnChooserView._popupContainer.option('visible', true);
          assert.ok(columnChooserView.allowDragging({
            allowHiding: true,
            visible: false
          }, 'columnChooser'), 'allow dragging');
        });
        QUnit.test('Not allow dragging with hidden band column', function(assert) {
          var $testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.setTestElement($testElement);
          this.renderColumnChooser();
          columnChooserView._columnsController.isParentColumnVisible = function() {
            return false;
          };
          columnChooserView._popupContainer.option('visible', true);
          assert.ok(!columnChooserView.allowDragging({
            allowHiding: true,
            visible: false
          }, 'columnChooser'), 'not allow dragging');
        });
        QUnit.test('CheckBox mode - not update treeview when selected items', function(assert) {
          var $testElement = $('#container');
          var callRenderColumnChooser;
          var columnChooserView = this.columnChooserView;
          this.options.columnChooser.mode = 'select';
          $.extend(this.columns, [{
            caption: 'Column 1',
            index: 0,
            visible: true,
            showInColumnChooser: true
          }, {
            caption: 'Column 2',
            index: 1,
            visible: true,
            showInColumnChooser: true
          }]);
          this.setTestElement($testElement);
          this.renderColumnChooser();
          columnChooserView._columnsController.columnOption = function(columnIndex, optionName, value) {
            if (!typeUtils.isDefined(value)) {
              return;
            }
            assert.strictEqual(optionName, 'visible', 'option name is \'visible\'');
            if (columnIndex === 0) {
              assert.notOk(value, 'first column is hidden');
            } else {
              assert.ok(value, 'second column is visible');
            }
            this.columnsChanged.fire({
              optionNames: {},
              changeTypes: {}
            });
          };
          columnChooserView._popupContainer.option('visible', true);
          columnChooserView._renderColumnChooserList = function() {
            callRenderColumnChooser = true;
          };
          $('body').children('.dx-datagrid-column-chooser').find('.dx-checkbox').first().trigger('dxclick');
          this.clock.tick(500);
          assert.ok(!callRenderColumnChooser, 'not update treeview');
        });
        QUnit.test('CheckBox mode - update treeview items when changed the column option is showInColumnChooser', function(assert) {
          var $testElement = $('#container');
          var callRenderColumnChooser;
          var columnChooserView = this.columnChooserView;
          this.options.columnChooser.mode = 'select';
          $.extend(this.columns, [{
            caption: 'Column 1',
            index: 0,
            visible: true,
            showInColumnChooser: true
          }, {
            caption: 'Column 2',
            index: 1,
            visible: true,
            showInColumnChooser: true
          }]);
          this.setTestElement($testElement);
          this.renderColumnChooser();
          columnChooserView._popupContainer.option('visible', true);
          columnChooserView._updateItems = function() {
            callRenderColumnChooser = true;
          };
          columnChooserView._columnsController.columnsChanged.fire({optionNames: {showInColumnChooser: true}});
          assert.ok(callRenderColumnChooser, 'update treeview items');
        });
        QUnit.test('CheckBox mode - column chooser with hidden band column', function(assert) {
          var $testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.options.columnChooser.mode = 'select';
          $.extend(this.columns, [{
            caption: 'Band Column',
            index: 0,
            visible: false,
            showInColumnChooser: true
          }, {
            caption: 'Column 1',
            index: 1,
            visible: true,
            showInColumnChooser: true,
            ownerBand: 0
          }, {
            caption: 'Column 2',
            index: 2,
            visible: false,
            showInColumnChooser: true,
            ownerBand: 0
          }]);
          this.setTestElement($testElement);
          columnChooserView._columnsController.isParentColumnVisible = function() {
            return false;
          };
          this.renderColumnChooser();
          columnChooserView._popupContainer.option('visible', true);
          var $checkBoxElements = columnChooserView._popupContainer.$content().find('.dx-checkbox');
          assert.equal($checkBoxElements.length, 3, 'count checkbox');
          assert.ok(!$checkBoxElements.eq(0).hasClass('dx-checkbox-checked'), 'checkbox isn\'t checked');
          assert.ok($checkBoxElements.eq(1).hasClass('dx-checkbox-checked'), 'checkbox is checked');
          assert.ok(!$checkBoxElements.eq(2).hasClass('dx-checkbox-checked'), 'checkbox is checked');
        });
        QUnit.test('CheckBox mode - check hidden band column', function(assert) {
          var $testElement = $('#container');
          var columnChooserView = this.columnChooserView;
          this.options.columnChooser.mode = 'select';
          $.extend(this.columns, [{
            caption: 'Band Column',
            index: 0,
            visible: false,
            showInColumnChooser: true
          }, {
            caption: 'Column 1',
            index: 1,
            visible: true,
            showInColumnChooser: true,
            ownerBand: 0
          }, {
            caption: 'Column 2',
            index: 2,
            visible: false,
            showInColumnChooser: true,
            ownerBand: 0
          }]);
          this.setTestElement($testElement);
          this.renderColumnChooser();
          columnChooserView._popupContainer.option('visible', true);
          $(columnChooserView._popupContainer.$content().find('.dx-checkbox').first()).trigger('dxclick');
          var $checkBoxElements = columnChooserView._popupContainer.$content().find('.dx-checkbox');
          assert.equal($checkBoxElements.length, 3, 'count checkbox');
          assert.ok($checkBoxElements.eq(0).hasClass('dx-checkbox-checked'), 'checkbox is checked');
          assert.ok($checkBoxElements.eq(1).hasClass('dx-checkbox-checked'), 'checkbox is checked');
          assert.notOk($checkBoxElements.eq(2).hasClass('dx-checkbox-checked'), 'checkbox isn\'t checked');
        });
        QUnit.test('CheckBox mode - Update a selection state when column visibility is changed via API', function(assert) {
          var $testElement = $('#container');
          this.options.columnChooser.mode = 'select';
          $.extend(this.columns, [{
            caption: 'Column 1',
            index: 0,
            visible: true,
            showInColumnChooser: true
          }, {
            caption: 'Column 2',
            index: 1,
            visible: true,
            showInColumnChooser: true
          }]);
          this.setTestElement($testElement);
          sinon.spy(this.columnChooserView, '_renderTreeView');
          this.columnChooserView.showColumnChooser();
          this.clock.tick(1000);
          assert.strictEqual(this.columnChooserView._renderTreeView.callCount, 1, 'treeview is rendered');
          this.columnsController.columnOption(0, 'visible', false);
          this.columnsController.columnsChanged.fire({
            columnIndex: 0,
            optionNames: {
              visible: true,
              length: 1
            }
          });
          var $checkboxes = $('.dx-datagrid-column-chooser-list').find('.dx-treeview-item-with-checkbox');
          assert.equal($checkboxes.eq(0).attr('aria-selected'), 'false', 'first checkbox is not selected');
          assert.equal($checkboxes.eq(1).attr('aria-selected'), 'true', 'second checkbox is selected');
          assert.ok(!this.columnChooserView._columnChooserList.getNodes()[0].selected, 'first item is not selected');
          assert.strictEqual(this.columnChooserView._renderTreeView.callCount, 1, 'treeview is not rerendered');
          this.columnChooserView.hideColumnChooser();
        });
        QUnit.test('Column chooser should not scroll up after item selection', function(assert) {
          var $testElement = $('#container');
          this.options.columnChooser.mode = 'select';
          var columns = [];
          for (var i = 0; i < 20; i++) {
            columns.push({
              caption: ("Column " + (i + 1)),
              index: i,
              visible: true,
              showInColumnChooser: true
            });
          }
          $.extend(this.columns, columns);
          this.setTestElement($testElement);
          sinon.spy(this.columnChooserView, '_renderTreeView');
          this.columnChooserView.showColumnChooser();
          this.clock.tick(1000);
          assert.strictEqual(this.columnChooserView._renderTreeView.callCount, 1, 'treeview is rendered');
          var $scrollable = $('.dx-datagrid-column-chooser-mode-select').find('.dx-scrollable-container');
          $scrollable.scrollTop(360);
          this.columnsController.columnOption(0, 'visible', false);
          this.columnsController.columnsChanged.fire({
            columnIndex: 0,
            optionNames: {
              visible: true,
              length: 1
            }
          });
          var $checkboxes = $('.dx-datagrid-column-chooser-list').find('.dx-treeview-item-with-checkbox');
          assert.equal($checkboxes.eq(0).attr('aria-selected'), 'false', 'first checkbox is not selected');
          assert.equal($scrollable.scrollTop(), 360, 'scrollTop');
          this.columnChooserView.hideColumnChooser();
        });
        ['select', 'dragAndDrop'].forEach(function(mode) {
          var modeName = (mode === 'select' ? 'CheckBox' : 'T739323: DragAndDrop');
          QUnit.test(modeName + ' mode - scroll position after selecting an last item', function(assert) {
            var scrollableInstance;
            var $testElement = $('#container');
            this.options.columnChooser.mode = mode;
            this.options.columnChooser.height = 200;
            this.columns.push({
              caption: 'Column 1',
              index: 0,
              visible: false,
              showInColumnChooser: true
            }, {
              caption: 'Column 2',
              index: 1,
              visible: false,
              showInColumnChooser: true
            }, {
              caption: 'Column 3',
              index: 2,
              visible: false,
              showInColumnChooser: true
            }, {
              caption: 'Column 4',
              index: 3,
              visible: false,
              showInColumnChooser: true
            }, {
              caption: 'Column 5',
              index: 4,
              visible: false,
              showInColumnChooser: true
            }, {
              caption: 'Column 6',
              index: 5,
              visible: false,
              showInColumnChooser: true
            }, {
              caption: 'Column 7',
              index: 6,
              visible: false,
              showInColumnChooser: true
            }, {
              caption: 'Column 8',
              index: 7,
              visible: false,
              showInColumnChooser: true
            });
            this.setTestElement($testElement);
            this.columnChooserView.showColumnChooser();
            this.clock.tick(1000);
            var $columnChooser = $('body').children('.dx-datagrid-column-chooser');
            var $lastItemElement = $columnChooser.find('.dx-treeview-item').last();
            scrollableInstance = $columnChooser.find('.dx-scrollable').dxScrollable('instance');
            scrollableInstance.scrollToElement($lastItemElement);
            this.columnsController.columnOption(7, 'visible', true);
            this.columnChooserView.render($testElement, 'full');
            scrollableInstance = $columnChooser.find('.dx-scrollable').dxScrollable('instance');
            assert.ok(scrollableInstance.scrollTop() > 0, 'scroll position');
          });
        });
        QUnit.test('CheckBox mode - update treeview items when changing the column options', function(assert) {
          var $testElement = $('#container');
          this.options.columnChooser.mode = 'select';
          $.extend(this.columns, [{
            caption: 'Column 1',
            index: 0,
            visible: true
          }, {
            caption: 'Column 2',
            index: 1,
            visible: true
          }]);
          this.setTestElement($testElement);
          this.showColumnChooser();
          this.clock.tick(1000);
          sinon.spy(this.columnChooserView, '_updateItems');
          this.columnsController.columnsChanged.fire({
            optionNames: {all: true},
            changeTypes: {columns: true}
          });
          assert.strictEqual(this.columnChooserView._updateItems.callCount, 1, 'update treeview item');
        });
        QUnit.test('Filter value should be reset after disabled search', function(assert) {
          var $testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            index: 0,
            visible: false
          }, {
            caption: 'Column 2',
            index: 1,
            visible: false
          }]);
          this.options.columnChooser.search.enabled = true;
          this.setTestElement($testElement);
          this.renderColumnChooser();
          var popupInstance = this.columnChooserView._popupContainer;
          popupInstance.option('visible', true);
          this.clock.tick(10);
          assert.strictEqual($(popupInstance.content()).find('.dx-column-chooser-item').length, 2, 'hidden column count');
          var treeViewInstance = this.columnChooserView._columnChooserList;
          treeViewInstance.option('searchValue', 'test');
          assert.strictEqual($(popupInstance.content()).find('.dx-column-chooser-item').length, 0, 'hidden column count');
          this.option('columnChooser.search.enabled', false);
          assert.strictEqual($(popupInstance.content()).find('.dx-column-chooser-item').length, 2, 'hidden column count');
        });
        QUnit.test('Change width and height after first rendering', function(assert) {
          var $testElement = $('#container');
          this.setTestElement($testElement);
          this.renderColumnChooser();
          var popupInstance = this.columnChooserView._popupContainer;
          assert.strictEqual(popupInstance.option('width'), 300, 'default width');
          assert.strictEqual(popupInstance.option('height'), 350, 'default height');
          this.option('columnChooser.width', 500);
          this.option('columnChooser.height', 600);
          assert.strictEqual(popupInstance.option('width'), 500, 'changed width');
          assert.strictEqual(popupInstance.option('height'), 600, 'changed height');
        });
        [true, false].forEach(function(useBeginEndUpdate) {
          QUnit.test(("ColumnChooser's item captions should be updated if column captions were changed (" + (useBeginEndUpdate ? 'with' : 'without') + " optimization)"), function(assert) {
            var $testElement = $('#container');
            this.options.columnChooser.mode = 'select';
            $.extend(this.columns, [{
              caption: 'Column 1',
              index: 0,
              visible: true,
              showInColumnChooser: true
            }, {
              caption: 'Column 2',
              index: 1,
              visible: true,
              showInColumnChooser: true
            }]);
            this.setTestElement($testElement);
            sinon.spy(this.columnChooserView, '_renderTreeView');
            this.columnChooserView.showColumnChooser();
            this.clock.tick(1000);
            assert.strictEqual(this.columnChooserView._renderTreeView.callCount, 1, 'treeview is rendered');
            sinon.spy(this.columnChooserView, '_updateItems');
            var optionNames = {
              caption: true,
              length: 1
            };
            if (useBeginEndUpdate) {
              this.beginUpdate();
              for (var i = 0; i < 2; i++) {
                this.columnsController.columnOption(i, 'caption', 'new caption');
              }
              this.endUpdate();
              this.columnsController.columnsChanged.fire({optionNames: optionNames});
            } else {
              for (var i$__7 = 0; i$__7 < 2; i$__7++) {
                this.columnsController.columnOption(i$__7, 'caption', 'new caption');
                this.columnsController.columnsChanged.fire({
                  optionNames: optionNames,
                  columnIndex: i$__7
                });
              }
            }
            var $treeViewItems = $('.dx-treeview-item');
            assert.strictEqual(this.columnChooserView._renderTreeView.callCount, 1, 'treeview rendered only one time');
            assert.strictEqual(this.columnChooserView._updateItems.callCount, useBeginEndUpdate ? 1 : 2, 'treeview items update count');
            assert.equal($treeViewItems.eq(0).text(), 'new caption', 'caption was changed');
            assert.equal($treeViewItems.eq(1).text(), 'new caption', 'caption was changed');
            this.columnChooserView.hideColumnChooser();
          });
        });
        ['showInColumnChooser', 'caption', 'allowHiding', 'visible', 'cssClass', 'ownerBand'].forEach(function(optionName) {
          QUnit.test(("ColumnChooser should update items when column option '" + optionName + "' was changed"), function(assert) {
            var $__6;
            var $testElement = $('#container');
            this.options.columnChooser.mode = 'select';
            this.setTestElement($testElement);
            this.columnChooserView.showColumnChooser();
            sinon.spy(this.columnChooserView, '_updateItems');
            this.columnsController.columnsChanged.fire({optionNames: ($__6 = {}, Object.defineProperty($__6, optionName, {
                value: true,
                configurable: true,
                enumerable: true,
                writable: true
              }), $__6)});
            assert.strictEqual(this.columnChooserView._updateItems.callCount, 1, 'treeview items update count');
            this.columnChooserView.hideColumnChooser();
          });
        });
        QUnit.test('ColumnChooser should not update items if column was hidden via chooser', function(assert) {
          var $testElement = $('#container');
          $.extend(this.columns, [{
            caption: 'Column 1',
            index: 0,
            visible: true,
            showInColumnChooser: true
          }]);
          this.options.columnChooser.mode = 'select';
          this.setTestElement($testElement);
          this.columnChooserView.showColumnChooser();
          var updateItemSelectionCalled = false;
          var updateItemsCalled = false;
          this.columnChooserView._updateItemSelection = function() {
            return updateItemSelectionCalled = true;
          };
          this.columnChooserView._updateItems = function() {
            return updateItemsCalled = true;
          };
          this.columnChooserView._columnsController.columnOption = function(columnIndex, optionName, value) {
            if (optionName === 'visible' && !typeUtils.isDefined(value)) {
              return;
            }
            this.columnsChanged.fire({
              columnIndex: columnIndex,
              optionNames: {visible: true}
            });
          };
          var treeView = $('.dx-treeview').dxTreeView('instance');
          treeView.unselectItem(0);
          this.clock.tick(500);
          assert.notOk(updateItemSelectionCalled, 'updateItemSelection called');
          assert.notOk(updateItemsCalled, 'updateItems called');
          this.columnChooserView.hideColumnChooser();
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/data_grid","jquery","core/utils/type","core/utils/support","core/devices","ui/themes","../../helpers/dataGridMocks.js","core/utils/public_component","localization/message","../../helpers/wrappers/searchBoxWrappers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/data_grid"), require("jquery"), require("core/utils/type"), require("core/utils/support"), require("core/devices"), require("ui/themes"), require("../../helpers/dataGridMocks.js"), require("core/utils/public_component"), require("localization/message"), require("../../helpers/wrappers/searchBoxWrappers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=columnChooserModule.tests.js.map