!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/columnsView.tests.js"], ["jquery","core/element_data","core/utils/shadow_dom.js","generic_light.css!","ui/data_grid","core/utils/browser","ui/grid_core/ui.grid_core.columns_view","animation/fx","../../helpers/dataGridMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/columnsView.tests.js", ["jquery", "core/element_data", "core/utils/shadow_dom.js", "generic_light.css!", "ui/data_grid", "core/utils/browser", "ui/grid_core/ui.grid_core.columns_view", "animation/fx", "../../helpers/dataGridMocks.js"], function($__export) {
  "use strict";
  var $,
      dataUtils,
      addShadowDomStyles,
      browser,
      columnsView,
      fx,
      dataGridMocks,
      MockColumnsController,
      setupDataGridModules;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      dataUtils = $__m.default;
    }, function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {}, function($__m) {}, function($__m) {
      browser = $__m.default;
    }, function($__m) {
      columnsView = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      dataGridMocks = $__m.default;
    }],
    execute: function() {
      MockColumnsController = dataGridMocks.MockColumnsController;
      setupDataGridModules = dataGridMocks.setupDataGridModules;
      QUnit.testStart(function() {
        var markup = '<div><div id="container" class="dx-datagrid"></div></div>';
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('API methods', {beforeEach: function() {
          var that = this;
          that.widths = [100, 200, 50, 50, 200];
          that.columns = [{
            caption: 'Column 1',
            width: that.widths[0]
          }, {
            caption: 'Column 2',
            width: that.widths[1]
          }, {
            caption: 'Column 3',
            width: that.widths[2]
          }, {
            caption: 'Column 4',
            width: that.widths[3]
          }, {
            caption: 'Column 5',
            width: that.widths[4]
          }];
          setupDataGridModules(that, [], {
            initViews: true,
            controllers: {columns: new MockColumnsController(that.columns)},
            views: {columnsView: new columnsView.ColumnsView(that)}
          });
          that.columnsView._tableElement = $('<table />').addClass('dx-datagrid-table').addClass('dx-datagrid-table-fixed').append(that.columnsView._createColGroup(that.columns), [$('<tbody><tr><td><div><table><row><td></td></row></table></div></td><td></td><td></td><td></td><td></td></tr></tbody>')]);
          that.columnsView._$element = $('<div/>').addClass('dx-datagrid-content').append(that.columnsView._tableElement);
          that.columnsView._$element.appendTo($('#container').width('600'));
        }}, function() {
        QUnit.test('Apply options', function(assert) {
          this.options.showColumnHeaders = true;
          assert.ok(this.columnsView.option('showColumnHeaders'));
        });
        QUnit.test('Get column widths', function(assert) {
          assert.deepEqual(this.columnsView.getColumnWidths(), this.widths);
        });
        QUnit.test('Get column widths during css animation', function(assert) {
          var done = assert.async();
          var that = this;
          fx.animate($('#container'), {
            type: 'pop',
            duration: 50,
            complete: function() {
              done();
            }
          });
          assert.deepEqual(that.columnsView.getColumnWidths(), that.widths);
        });
        QUnit.test('Get column widths with group row', function(assert) {
          this.columnsView.element().find('table').prepend($('<tr class = "dx-group-row"><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr>'));
          assert.deepEqual(this.columnsView.getColumnWidths(), this.widths);
        });
        QUnit.test('Get column widths with detail row (editForm)', function(assert) {
          this.columnsView.element().find('table').prepend($('<tr class="dx-master-detail-row"><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr>'));
          assert.deepEqual(this.columnsView.getColumnWidths(), this.widths);
        });
        QUnit.test('Get column widths with error row (editForm) (T1058684)', function(assert) {
          this.columnsView.element().find('table').prepend($('<tr class="dx-error-row"><td></td><td></td></tr><tr><td></td><td></td><td></td><td></td><td></td></tr>'));
          assert.deepEqual(this.columnsView.getColumnWidths(), this.widths);
        });
        QUnit.test('Set column widths', function(assert) {
          var that = this;
          var newWidths = [250, 100, 50, 50, 150];
          that.columnsView.setColumnWidths({widths: newWidths});
          assert.deepEqual(that.columnsView.getColumnWidths(), newWidths);
        });
        QUnit.test('Create table by default', function(assert) {
          var $table = this.columnsView._createTable();
          assert.ok($table.hasClass('dx-datagrid-table-fixed'), 'is contains data grid table class');
        });
        QUnit.test('Create table with thead in safari', function(assert) {
          var oldSafari = browser.safari;
          try {
            browser.safari = true;
            var $table = this.columnsView._createTable(this.columns);
            var $thead = $table.children('thead');
            assert.ok($thead.length, 'table contains thead element');
            assert.equal($thead.html().toLowerCase(), '<tr></tr>', 'thead contains empty tr');
          } finally {
            browser.safari = oldSafari;
          }
        });
        QUnit.test('Create table by columnWidth auto', function(assert) {
          this.options.columnAutoWidth = true;
          var $table = this.columnsView._createTable();
          assert.ok($table.hasClass('dx-datagrid-table-fixed'), 'is contains data grid table class');
        });
        QUnit.test('Set title attribute when cell text is trimmed', function(assert) {
          var that = this;
          var $container = $('#container').width(200);
          that.option('cellHintEnabled', true);
          that.columns.length = 0;
          that.columns.push({
            caption: 'Column 1',
            width: 100
          });
          that.columns.push({
            caption: 'Column 2',
            width: 100
          });
          var $table = $(that.columnsView._createTable()).append($("\n                <tr class=\"dx-row\">\n                    <td>Test</td>\n                    <td>Test Test Test Test Test</td>\n                </tr>\n            "));
          $container.html($('<div class="dx-datagrid-rowsview dx-datagrid-nowrap" />').append($table));
          var firstCellElement = $table.find('td').first();
          firstCellElement.trigger('mousemove');
          assert.strictEqual(firstCellElement.attr('title'), undefined, 'not has attribute title in first cell');
          var lastCellElement = $table.find('td').last();
          lastCellElement.trigger('mousemove');
          assert.strictEqual(lastCellElement.attr('title'), 'Test Test Test Test Test', 'has attribute title in last cell');
        });
        QUnit.test('Not set title attribute when cell text is trimmed with cellHintEnabled false', function(assert) {
          var that = this;
          var $container = $('#container').width(200);
          that.option('cellHintEnabled', false);
          that.columns.length = 0;
          that.columns.push({
            caption: 'Column 1',
            width: 100
          });
          that.columns.push({
            caption: 'Column 2',
            width: 100
          });
          var $table = $(that.columnsView._createTable());
          $container.html($('<div class="dx-datagrid-rowsview dx-datagrid-nowrap" />').append($table.append(that.columnsView._createColGroup(that.columns), $("\n                        <tr class = \"dx-row\">\n                            <td>Test</td>\n                            <td>Test Test Test Test Test</td>\n                        </tr>\n                    "))));
          var firstCellElement = $table.find('td').first();
          firstCellElement.trigger('mousemove');
          assert.strictEqual(firstCellElement.attr('title'), undefined, 'not has attribute title in first cell');
          var lastCellElement = $table.find('td').last();
          lastCellElement.trigger('mousemove');
          assert.strictEqual(lastCellElement.attr('title'), undefined, 'not has attribute title in last cell');
        });
        QUnit.test('Not set title attribute when cell text is trimmed and cellTemplate defined', function(assert) {
          var that = this;
          var $container = $('#container').width(200);
          that.option('cellHintEnabled', true);
          that.columns.length = 0;
          that.columns.push({
            caption: 'Column 1',
            width: 100
          });
          that.columns.push({
            caption: 'Column 2',
            width: 100,
            cellTemplate: function() {}
          });
          var $table = $(that.columnsView._createTable());
          $container.html($('<div class = \'dx-datagrid-rowsview dx-datagrid-nowrap\' />').append($table.append(that.columnsView._createColGroup(that.columns), $('<tr class = "dx-row dx-data-row"><td>Test Test Test Test Test</td><td>Test Test Test Test Test</td></tr>'))));
          var firstCellElement = $table.find('td').first();
          firstCellElement.trigger('mousemove');
          assert.strictEqual(firstCellElement.attr('title'), 'Test Test Test Test Test', 'has attribute title in first cell');
          var lastCellElement = $table.find('td').last();
          lastCellElement.trigger('mousemove');
          assert.strictEqual(lastCellElement.attr('title'), undefined, 'not has attribute title in last cell');
        });
        QUnit.test('Not set title attribute when group cell text is trimmed and groupCellTemplate defined', function(assert) {
          var that = this;
          var $container = $('#container').width(100);
          that.option('cellHintEnabled', true);
          that.columns.length = 0;
          that.columns.push({
            caption: 'Column 1',
            width: 50,
            groupIndex: 0
          });
          that.columns.push({
            caption: 'Column 2',
            width: 50,
            groupIndex: 1,
            groupCellTemplate: function() {}
          });
          that.columns.push({
            caption: 'Column 3',
            width: 50
          });
          var $table = $(that.columnsView._createTable());
          $container.html($('<div class = \'dx-datagrid-rowsview dx-datagrid-nowrap\' />').append($table.append(that.columnsView._createColGroup(that.columns), $('<tr class = "dx-row dx-group-row"><td class="dx-datagrid-group-space"></td><td colspan="2">Test Test Test Test Test</td></tr>'), $('<tr class = "dx-row dx-group-row"><td class="dx-datagrid-group-space"></td><td class="dx-datagrid-group-space"></td><td>Test Test Test Test Test</td></tr>'))));
          dataUtils.data($table.find('tr').get(0), 'options', {cells: [{}, {column: that.columns[0]}]});
          dataUtils.data($table.find('tr').get(1), 'options', {cells: [{}, {}, {column: that.columns[1]}]});
          var firstCellElement = $table.find('tr').eq(0).find('td').last();
          firstCellElement.trigger('mousemove');
          assert.strictEqual(firstCellElement.attr('title'), 'Test Test Test Test Test', 'has attribute title in first group cell');
          var lastCellElement = $table.find('tr').eq(1).find('td').last();
          lastCellElement.trigger('mousemove');
          assert.strictEqual(lastCellElement.attr('title'), undefined, 'not has attribute title in last group cell');
        });
        QUnit.test('Not set title attribute when cell text is trimmed and headerCellTemplate defined', function(assert) {
          var that = this;
          var $container = $('#container').width(200);
          that.option('cellHintEnabled', true);
          that.columns.length = 0;
          that.columns.push({
            caption: 'Column 1',
            width: 100
          });
          that.columns.push({
            caption: 'Column 2',
            width: 100,
            headerCellTemplate: function() {}
          });
          var $table = $(that.columnsView._createTable());
          $container.html($('<div class = \'dx-datagrid-headers dx-datagrid-nowrap\' />').append($table.append(that.columnsView._createColGroup(that.columns), $('<tr class = "dx-row dx-header-row"><td>Test Test Test Test Test</td><td>Test Test Test Test Test</td></tr>'))));
          var firstCellElement = $table.find('td').first();
          firstCellElement.trigger('mousemove');
          assert.strictEqual(firstCellElement.attr('title'), 'Test Test Test Test Test', 'has attribute title in first cell');
          var lastCellElement = $table.find('td').last();
          lastCellElement.trigger('mousemove');
          assert.strictEqual(lastCellElement.attr('title'), undefined, 'not has attribute title in last cell');
        });
        QUnit.test('Not set title attribute when cell text is trimmed and user title defined', function(assert) {
          var that = this;
          var $container = $('#container').width(200);
          that.option('cellHintEnabled', true);
          that.columns.length = 0;
          that.columns.push({
            caption: 'Column 1',
            width: 100
          });
          that.columns.push({
            caption: 'Column 2',
            width: 100
          });
          var $table = $(that.columnsView._createTable());
          $container.html($('<div class = \'dx-datagrid-rowsview dx-datagrid-nowrap\' />').append($table.append(that.columnsView._createColGroup(that.columns), $('<tr class = "dx-row dx-data-row"><td><div title="User Title">Test Test Test Test Test</div></td><td><div>Test Test Test Test Test</div></td></tr>'))));
          var firstCellElement = $table.find('td').first();
          firstCellElement.children().trigger('mousemove');
          assert.strictEqual(firstCellElement.attr('title'), undefined, 'not has attribute title in first cell');
          assert.strictEqual(firstCellElement.children().attr('title'), 'User Title', 'user title on div in first cell');
          var lastCellElement = $table.find('td').last();
          lastCellElement.children().trigger('mousemove');
          assert.strictEqual(lastCellElement.attr('title'), undefined, 'not has attribute title in last cell');
          assert.strictEqual(lastCellElement.children().attr('title'), 'Test Test Test Test Test', 'has attribute title on div in last cell');
        });
        QUnit.test('Set title attribute when cell text is trimmed in dx-datagrid-text-content container', function(assert) {
          var that = this;
          var $container = $('#container').width(200);
          that.option('cellHintEnabled', true);
          that.columns.length = 0;
          that.columns.push({
            caption: 'Column 1',
            width: 100
          });
          that.columns.push({
            caption: 'Column 2',
            width: 100
          });
          var $table = $(that.columnsView._createTable());
          $container.html($('<div class = \'dx-datagrid-headers dx-datagrid-nowrap\' />').append($table.append(that.columnsView._createColGroup(that.columns), $('<tr class = "dx-row"><td><div class="dx-datagrid-text-content">Test</div></td><td><div class="dx-datagrid-text-content">Test Test Test Test Test</div></td></tr>'))));
          var firstCellElement = $table.find('div').first();
          firstCellElement.trigger('mousemove');
          assert.strictEqual(firstCellElement.attr('title'), undefined, 'not has attribute title in first cell');
          var lastCellElement = $table.find('div').last();
          lastCellElement.trigger('mousemove');
          assert.strictEqual(lastCellElement.attr('title'), 'Test Test Test Test Test', 'has attribute title in last cell');
        });
        QUnit.test('Not set title attribute when cell text is trimmed in dx-datagrid-text-content container with cellHintEnabled false', function(assert) {
          var that = this;
          var $container = $('#container').width(200);
          that.option('cellHintEnabled', false);
          that.columns.length = 0;
          that.columns.push({
            caption: 'Column 1',
            width: 100
          });
          that.columns.push({
            caption: 'Column 2',
            width: 100
          });
          var $table = $(that.columnsView._createTable());
          $container.html($('<div class = \'dx-datagrid-headers dx-datagrid-nowrap\' />').append($table.append(that.columnsView._createColGroup(that.columns), $('<tr class = "dx-row"><td><div class="dx-datagrid-text-content">Test</div></td><td><div class="dx-datagrid-text-content">Test Test Test Test Test</div></td></tr>'))));
          var firstCellElement = $table.find('div').first();
          firstCellElement.trigger('mousemove');
          assert.strictEqual(firstCellElement.attr('title'), undefined, 'not has attribute title in first cell');
          var lastCellElement = $table.find('div').last();
          lastCellElement.trigger('mousemove');
          assert.strictEqual(lastCellElement.attr('title'), undefined, 'not has attribute title in last cell');
        });
        QUnit.test('Not set title attribute when cell is editing', function(assert) {
          var that = this;
          var $container = $('#container').width(200);
          that.option('cellHintEnabled', true);
          that.columns.length = 0;
          that.columns.push({
            caption: 'Column 2',
            width: 100,
            showEditorAlways: true
          });
          var $table = $(that.columnsView._createTable());
          $container.html($('<div class = \'dx-datagrid-headers dx-datagrid-nowrap\' />').append($table.append(that.columnsView._createColGroup(that.columns), $('<tr class = "dx-row"><td><div class="dx-datagrid-text-content">Test Test Test Test Test</div></td></tr>'))));
          var firstCellElement = $table.find('td').first();
          firstCellElement.trigger('mousemove');
          assert.strictEqual(firstCellElement.attr('title'), undefined, 'not has attribute title in cell');
        });
        QUnit.test('Invalidate instead of render for options', function(assert) {
          var renderCounter = 0;
          this.columnsView.render($('#container'));
          this.columnsView.renderCompleted.add(function() {
            renderCounter++;
          });
          this.columnsView.component.isReady = function() {
            return true;
          };
          this.columnsView.beginUpdate();
          this.columnsView.optionChanged({name: 'cellHintEnabled'});
          this.columnsView.optionChanged({name: 'onCellPrepared'});
          this.columnsView.optionChanged({name: 'onRowPrepared'});
          this.columnsView.optionChanged({name: 'onCellHoverChanged'});
          this.columnsView.endUpdate();
          assert.equal(renderCounter, 1, 'count of rendering');
        });
        QUnit.test('Invalidate when data is loading', function(assert) {
          var renderCounter = 0;
          this.columnsView.render($('#container'));
          this.columnsView.renderCompleted.add(function() {
            renderCounter++;
          });
          this.columnsView.component.isReady = function() {
            return false;
          };
          this.columnsView.beginUpdate();
          this.columnsView.optionChanged({name: 'cellHintEnabled'});
          this.columnsView.optionChanged({name: 'onCellPrepared'});
          this.columnsView.optionChanged({name: 'onRowPrepared'});
          this.columnsView.optionChanged({name: 'onCellHoverChanged'});
          this.columnsView.endUpdate();
          assert.equal(renderCounter, 0, 'count of rendering');
        });
        QUnit.test('Require resize of render for options', function(assert) {
          this.columnsView.render($('#container'));
          this.columnsView.component.isReady = function() {
            return true;
          };
          this.columnsView.beginUpdate();
          this.columnsView.optionChanged({name: 'cellHintEnabled'});
          this.columnsView.optionChanged({name: 'onCellPrepared'});
          this.columnsView.optionChanged({name: 'onRowPrepared'});
          this.columnsView.optionChanged({name: 'onCellHoverChanged'});
          this.columnsView.endUpdate();
          assert.ok(this.columnsView.component._requireResize);
        });
        QUnit.test('Options of template have the \'component\'', function(assert) {
          var that = this;
          var callRenderTemplate;
          var template = {
            allowRenderToDetachedContainer: true,
            render: function($container, options) {
              callRenderTemplate = true;
              assert.deepEqual(options.component, that, 'component');
            }
          };
          that.columnsView.renderTemplate($('#container'), template, {});
          assert.ok(callRenderTemplate, 'call render of template');
        });
        QUnit.test('The title attribute should not be set for content inside detail row', function(assert) {
          var $container = $('#container').width(200);
          this.option('cellHintEnabled', true);
          var $table = $(this.columnsView._createTable());
          $container.html($('<div class="dx-datagrid-rowsview dx-datagrid-nowrap" />').append($table.append(this.columnsView._createColGroup(this.columns), "<tr class=\"dx-row dx-master-detail-row\">\n                        <td>\n                            <div id=\"content\">\n                                <div>Test</div>\n                            </div>\n                        </td>\n                    </tr>")));
          $container.find('#content').css('overflow', 'hidden');
          $container.find('#content > div').css({
            width: '600px',
            height: '30px'
          });
          $('#content').trigger('mousemove');
          assert.strictEqual($('#content').attr('title'), undefined, 'not has attribute title');
        });
        QUnit.test('waitAsyncTemplates with async templates', function(assert) {
          var deferred = $.Deferred();
          this.options.renderAsync = false;
          this.options.templatesRenderAsynchronously = true;
          this.columnsView._templateDeferreds.add(deferred);
          assert.strictEqual(this.columnsView.waitAsyncTemplates().state(), 'pending', 'promise state');
          this.columnsView._templateDeferreds.delete(deferred);
          deferred.resolve();
          assert.strictEqual(this.columnsView.waitAsyncTemplates().state(), 'resolved', 'promise state');
        });
        QUnit.test('waitAsyncTemplates with dynamic addition of async templates', function(assert) {
          var deferreds = [$.Deferred(), $.Deferred()];
          this.options.renderAsync = false;
          this.options.templatesRenderAsynchronously = true;
          this.columnsView._templateDeferreds.add(deferreds[0]);
          var promise1 = this.columnsView.waitAsyncTemplates();
          assert.strictEqual(promise1.state(), 'pending', 'promise1 is pending');
          this.columnsView._templateDeferreds.add(deferreds[1]);
          this.columnsView._templateDeferreds.delete(deferreds[0]);
          deferreds[0].resolve();
          var promise2 = this.columnsView.waitAsyncTemplates();
          assert.strictEqual(promise1.state(), 'pending', 'promise1 is pending');
          assert.strictEqual(promise2.state(), 'pending', 'promise2 is pending');
          this.columnsView._templateDeferreds.delete(deferreds[1]);
          deferreds[1].resolve();
          assert.strictEqual(promise1.state(), 'resolved', 'promise1 is resolved');
          assert.strictEqual(promise2.state(), 'resolved', 'promise2 is resolved');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/element_data","core/utils/shadow_dom.js","generic_light.css!","ui/data_grid","core/utils/browser","ui/grid_core/ui.grid_core.columns_view","animation/fx","../../helpers/dataGridMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/element_data"), require("core/utils/shadow_dom.js"), require("generic_light.css!"), require("ui/data_grid"), require("core/utils/browser"), require("ui/grid_core/ui.grid_core.columns_view"), require("animation/fx"), require("../../helpers/dataGridMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=columnsView.tests.js.map