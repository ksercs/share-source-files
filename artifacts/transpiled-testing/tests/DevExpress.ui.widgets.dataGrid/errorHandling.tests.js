!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.dataGrid/errorHandling.tests.js"], ["jquery","ui/data_grid","../../helpers/dataGridMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.dataGrid/errorHandling.tests.js", ["jquery", "ui/data_grid", "../../helpers/dataGridMocks.js"], function($__export) {
  "use strict";
  var $,
      setupDataGridModules;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      setupDataGridModules = $__m.setupDataGridModules;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "\n        <div>\n            <div class=\"dx-datagrid\">\n                <div id=\"container\"></div>\n            </div>\n        </div>\n    ";
        $('#qunit-fixture').html(markup);
      });
      QUnit.module('Error handling', {
        beforeEach: function() {
          this.options = {
            errorRowEnabled: true,
            showColumnHeaders: true,
            dataSource: [{
              name: 'test1',
              id: 1,
              date: new Date(2001, 0, 1)
            }, {
              name: 'test2',
              id: 2,
              date: new Date(2002, 1, 2)
            }, {
              name: 'test3',
              id: 3,
              date: new Date(2003, 2, 3)
            }]
          };
          setupDataGridModules(this, ['data', 'columns', 'errorHandling', 'columnHeaders', 'rows'], {
            initViews: true,
            controllers: {editing: {hasChanges: function() {
                  return true;
                }}}
          });
        },
        afterEach: function() {}
      }, function() {
        QUnit.test('Initialization', function(assert) {
          var errorHandlingController = this.errorHandlingController;
          assert.ok(errorHandlingController._rowsView, 'initialization rows view');
          assert.ok(errorHandlingController._columnHeadersView, 'initialization column headers view');
        });
        QUnit.test('Render error row in column headers view', function(assert) {
          var that = this;
          var $testElement = $('#container');
          var $headerRow;
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('tbody > tr').length, 1, 'count rows');
          $headerRow = $testElement.find('tbody > tr').first();
          assert.ok($headerRow.hasClass('dx-header-row'), 'has header row');
          assert.equal($headerRow.find('td').length, 3, 'count columns');
          that.errorHandlingController.renderErrorRow('Test');
          assert.equal($testElement.find('tbody > tr').length, 2, 'count rows');
          $headerRow = $testElement.find('tbody > tr').first();
          assert.ok($headerRow.hasClass('dx-header-row'), 'has header row');
          var $errorRow = $testElement.find('tbody > tr').last();
          assert.ok($errorRow.hasClass('dx-error-row'), 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
        });
        QUnit.test('Render error row in rows view if column headers are hidden', function(assert) {
          var that = this;
          var $testElement = $('#container');
          this.options.showColumnHeaders = false;
          that.rowsView.render($testElement);
          that.errorHandlingController.renderErrorRow('Test');
          assert.equal($testElement.find('tbody > tr').length, 5, 'row count');
          var $firstRow = $testElement.find('tbody > tr').first();
          assert.ok($firstRow.hasClass('dx-error-row'), 'first row is error row');
          assert.strictEqual($firstRow.find('td').first().text(), 'Test', 'error message');
        });
        QUnit.test('Render error row in rows view', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columnHeadersView.getColumnCount = function() {
            return that.columns.length;
          };
          that.rowsView.render($testElement);
          var $rowsView = $testElement.find('.dx-datagrid-rowsview');
          assert.equal($rowsView.length, 1, 'has rows view');
          assert.equal($testElement.find('tbody > tr').length, 4, 'count rows');
          that.errorHandlingController.renderErrorRow('Test', 1);
          assert.equal($testElement.find('tbody > tr').length, 5, 'count rows');
          var $errorRow = $testElement.find('tbody > tr').eq(2);
          assert.ok($errorRow.hasClass('dx-error-row'), 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
        });
        QUnit.test('Close error row', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columnHeadersView.getColumnCount = function() {
            return that.columns.length;
          };
          that.rowsView.render($testElement);
          var $rowsView = $testElement.find('.dx-datagrid-rowsview');
          assert.equal($rowsView.length, 1, 'has rows view');
          assert.equal($testElement.find('tbody > tr').length, 4, 'count rows');
          that.errorHandlingController.renderErrorRow('Test', 1);
          assert.equal($testElement.find('tbody > tr').length, 5, 'count rows');
          var $errorRow = $testElement.find('tbody > tr').eq(2);
          assert.ok($errorRow.hasClass('dx-error-row'), 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
          $errorRow.find('.dx-closebutton').first().trigger('dxclick');
          assert.ok(!$errorRow.parent().length, 'not has error row');
          assert.equal($testElement.find('tbody > tr').length, 4, 'count rows');
        });
        QUnit.test('Remove error row after save edit data', function(assert) {
          var that = this;
          var $testElement = $('#container');
          var $errorRow;
          that.columnHeadersView.render($testElement);
          assert.equal($testElement.find('tbody > tr').length, 1, 'count rows');
          assert.ok($testElement.find('tbody > tr').first().hasClass('dx-header-row'), 'has header row');
          that.errorHandlingController.renderErrorRow('Test');
          assert.equal($testElement.find('tbody > tr').length, 2, 'count rows');
          $errorRow = $testElement.find('tbody > tr').last();
          assert.ok($errorRow.hasClass('dx-error-row'), 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
          that.dataController.changed.fire({});
          assert.equal($testElement.find('tbody > tr').length, 2, 'count rows');
          $errorRow = $testElement.find('tbody > tr').last();
          assert.ok($errorRow.hasClass('dx-error-row'), 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
          that.editingController.hasChanges = function() {
            return false;
          };
          that.dataController.changed.fire({});
          assert.equal($testElement.find('tbody > tr').length, 1, 'count rows');
          assert.ok($testElement.find('tbody > tr').first().hasClass('dx-header-row'), 'has header row');
        });
        QUnit.test('Remove error row in rows view after cancel edit data', function(assert) {
          var that = this;
          var $testElement = $('#container');
          that.columnHeadersView.render($testElement);
          that.rowsView.render($testElement);
          assert.equal($testElement.find('tbody > tr').length, 5, 'count rows');
          assert.ok($testElement.find('tbody > tr.dx-data-row').length, 'has data row');
          that.errorHandlingController.renderErrorRow('Test', 1);
          assert.equal($testElement.find('tbody > tr').length, 6, 'count rows');
          var $errorRow = $testElement.find('.dx-datagrid-rowsview .dx-error-row');
          assert.equal($errorRow.length, 1, 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
          that.editingController.hasChanges = function() {
            return false;
          };
          that.dataController.changed.fire({});
          assert.strictEqual($testElement.find('tbody > tr').length, 5, 'count rows');
          assert.strictEqual($testElement.find('.dx-error-row').length, 0, 'no error row');
        });
        QUnit.test('Repaint error row in rows view', function(assert) {
          var that = this;
          var $testElement = $('#container');
          var $errorRow;
          that.columnHeadersView.getColumnCount = function() {
            return that.columns.length;
          };
          that.options.rowTemplate = function(container) {
            var innerTable = '<table><tbody><tr></tr></tbody></table>';
            $(container).append(("<tr class=\"dx-row\"><td>" + innerTable + "</td></tr>"));
          };
          that.rowsView.render($testElement);
          var $rowsView = $testElement.find('.dx-datagrid-rowsview');
          var $table = $rowsView.find('table').first();
          assert.equal($rowsView.length, 1, 'has rows view');
          assert.equal($table.children('tbody').children('tr').length, 4, 'count rows');
          that.errorHandlingController.renderErrorRow('Test', 1);
          assert.equal($table.children('tbody').children('tr').length, 5, 'count rows');
          $errorRow = $table.children('tbody').children('tr').eq(2);
          assert.ok($errorRow.hasClass('dx-error-row'), 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
          that.errorHandlingController.renderErrorRow('Test', 1);
          assert.equal($table.children('tbody').children('tr').length, 5, 'count rows');
          $errorRow = $table.children('tbody').children('tr').eq(2);
          assert.ok($errorRow.hasClass('dx-error-row'), 'has error row');
          assert.strictEqual($errorRow.find('td').first().text(), 'Test', 'error message');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/data_grid","../../helpers/dataGridMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/data_grid"), require("../../helpers/dataGridMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=errorHandling.tests.js.map