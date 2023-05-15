!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.treeList/rows.tests.js"], ["generic_light.css!","ui/tree_list/ui.tree_list","jquery","animation/fx","../../helpers/treeListMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.treeList/rows.tests.js", ["generic_light.css!", "ui/tree_list/ui.tree_list", "jquery", "animation/fx", "../../helpers/treeListMocks.js"], function($__export) {
  "use strict";
  var $,
      fx,
      setupTreeListModules,
      MockColumnsController,
      MockDataController,
      setupModule,
      teardownModule;
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      setupTreeListModules = $__m.setupTreeListModules;
      MockColumnsController = $__m.MockColumnsController;
      MockDataController = $__m.MockDataController;
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
      });
      fx.off = true;
      setupModule = function() {
        var that = this;
        that.items = [{
          data: {
            field1: 'test1',
            field2: 1,
            field3: new Date(2001, 0, 1)
          },
          values: ['test1', 1, '1/01/2001'],
          rowType: 'data',
          dataIndex: 0,
          isExpanded: true,
          level: 0,
          node: {
            level: 0,
            hasChildren: true
          }
        }, {
          data: {
            field1: 'test2',
            field2: 2,
            field3: new Date(2002, 1, 2)
          },
          values: ['test2', 2, '2/02/2002'],
          rowType: 'data',
          dataIndex: 1,
          isExpanded: true,
          level: 1,
          node: {
            level: 1,
            hasChildren: true
          }
        }, {
          data: {
            field1: 'test3',
            field2: 3,
            field3: new Date(2003, 2, 3)
          },
          values: ['test3', 3, '3/03/2003'],
          rowType: 'data',
          dataIndex: 2,
          isExpanded: false,
          level: 2,
          node: {
            level: 2,
            hasChildren: false
          }
        }];
        that.columns = [{dataField: 'field1'}, {dataField: 'field2'}, {dataField: 'field3'}];
        that.setupTreeList = function() {
          setupTreeListModules(that, ['data', 'columns', 'rows'], {
            initViews: true,
            controllers: {
              columns: new MockColumnsController(that.columns),
              data: new MockDataController({items: that.items})
            }
          });
        };
      };
      teardownModule = function() {
        this.dispose();
      };
      QUnit.module('Rows view', {
        beforeEach: setupModule,
        afterEach: teardownModule
      }, function() {
        QUnit.test('Render rows when all items collapsed', function(assert) {
          var $testElement = $('#treeList');
          this.items = this.items.slice(0, 1);
          this.items[0].isExpanded = false;
          this.setupTreeList();
          this.rowsView.render($testElement);
          var $rowElements = $testElement.find('tbody > .dx-data-row');
          var $cellElements = $rowElements.find('td');
          assert.equal($rowElements.length, 1, 'count data row');
          assert.equal($cellElements.length, 3, 'count cell');
          var $iconElement = $cellElements.eq(0).find('.dx-treelist-empty-space');
          assert.ok($cellElements.eq(0).hasClass('dx-treelist-cell-expandable'), 'cell is expandable');
          assert.equal($iconElement.length, 1, 'count empty space of first cell of first row');
          assert.ok($iconElement.eq(0).hasClass('dx-treelist-collapsed'), 'expand icon');
        });
        QUnit.test('Render rows when all items expanded', function(assert) {
          var $iconElement;
          var $testElement = $('#treeList');
          this.setupTreeList();
          this.rowsView.render($testElement);
          var $rowElements = $testElement.find('tbody > .dx-data-row');
          var $cellElements = $rowElements.find('td');
          assert.equal($rowElements.length, 3, 'count data row');
          assert.equal($cellElements.length, 9, 'count cell');
          $iconElement = $cellElements.eq(0).find('.dx-treelist-empty-space');
          assert.equal($iconElement.length, 1, 'count empty space of first cell of first row');
          assert.ok($iconElement.eq(0).hasClass('dx-treelist-expanded'), 'expand icon');
          $iconElement = $cellElements.eq(3).find('.dx-treelist-empty-space');
          assert.equal($iconElement.length, 2, 'count empty space of first cell of second row');
          assert.notOk($iconElement.eq(0).hasClass('dx-treelist-expanded'), 'empty space');
          assert.ok($iconElement.eq(1).hasClass('dx-treelist-expanded'), 'expand icon');
          $iconElement = $cellElements.eq(6).find('.dx-treelist-empty-space');
          assert.equal($iconElement.length, 3, 'count empty space of first cell of third row');
          assert.notOk($iconElement.eq(0).hasClass('dx-treelist-expanded'), 'empty space');
          assert.notOk($iconElement.eq(1).hasClass('dx-treelist-expanded'), 'empty space');
          assert.notOk($iconElement.eq(2).hasClass('dx-treelist-expanded'), 'empty space');
        });
      });
      QUnit.module('Expand/Collapse rows', {
        beforeEach: function() {
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
            keyExpr: 'id',
            parentIdExpr: 'parentId',
            expandedRowKeys: []
          };
          that.setupTreeList = function() {
            setupTreeListModules(that, ['data', 'columns', 'rows', 'editing', 'editorFactory'], {initViews: true});
          };
        },
        afterEach: function() {
          this.dispose();
        }
      }, function() {
        QUnit.test('Expand row', function(assert) {
          var $rowElements;
          var $testElement = $('#treeList');
          this.setupTreeList();
          this.rowsView.render($testElement);
          $rowElements = $testElement.find('tbody > .dx-data-row');
          assert.equal($rowElements.length, 1, 'count data row');
          assert.equal($rowElements.first().find('td').first().find('.dx-treelist-expanded').length, 0, 'hasn\'t expand icon');
          assert.equal($rowElements.first().find('td').first().find('.dx-treelist-collapsed').length, 1, 'has collapse icon');
          $rowElements.find('.dx-treelist-collapsed').trigger('dxclick');
          $rowElements = $testElement.find('tbody > .dx-data-row');
          assert.equal($rowElements.length, 2, 'count data row');
          assert.equal($rowElements.first().find('td').first().find('.dx-treelist-expanded').length, 1, 'hasn\'t expand icon');
          assert.equal($rowElements.first().find('td').first().find('.dx-treelist-collapsed').length, 0, 'has collapse icon');
        });
        QUnit.test('Collapse row', function(assert) {
          var $rowElements;
          var $testElement = $('#treeList');
          this.setupTreeList();
          this.rowsView.render($testElement);
          $rowElements = $testElement.find('tbody > .dx-data-row');
          assert.equal($rowElements.length, 1, 'count data row');
          assert.equal($rowElements.first().find('td').first().find('.dx-treelist-expanded').length, 0, 'hasn\'t expand icon');
          assert.equal($rowElements.first().find('td').first().find('.dx-treelist-collapsed').length, 1, 'has collapse icon');
          $rowElements.find('.dx-treelist-collapsed').trigger('dxclick');
          $rowElements = $testElement.find('tbody > .dx-data-row');
          assert.equal($rowElements.length, 2, 'count data row');
          assert.equal($rowElements.first().find('td').first().find('.dx-treelist-expanded').length, 1, 'hasn\'t expand icon');
          assert.equal($rowElements.first().find('td').first().find('.dx-treelist-collapsed').length, 0, 'has collapse icon');
          $rowElements.first().find('.dx-treelist-expanded').trigger('dxclick');
          $rowElements = $testElement.find('tbody > .dx-data-row');
          assert.equal($rowElements.length, 1, 'count data row');
          assert.equal($rowElements.first().find('td').first().find('.dx-treelist-expanded').length, 0, 'hasn\'t expand icon');
          assert.equal($rowElements.first().find('td').first().find('.dx-treelist-collapsed').length, 1, 'has collapse icon');
        });
        QUnit.test('Expand row on row click when edit mode is \'batch\'', function(assert) {
          var $testElement = $('#treeList');
          this.options.editing = {
            mode: 'batch',
            allowUpdating: true
          };
          this.setupTreeList();
          this.rowsView.render($testElement);
          $testElement.find('tbody td').first().find('.dx-treelist-collapsed').first().trigger('dxclick');
          assert.ok(!$testElement.find('tbody td').first().hasClass('dx-editor-cell'), 'cell isn\'t edit');
          assert.equal($testElement.find('tbody > .dx-data-row').length, 2, 'count data row');
        });
        QUnit.test('Collapse row on row click when edit mode is \'batch\'', function(assert) {
          var $testElement = $('#treeList');
          this.options.editing = {
            mode: 'batch',
            allowUpdating: true
          };
          this.options.expandedRowKeys = [1];
          this.setupTreeList();
          this.rowsView.render($testElement);
          assert.equal($testElement.find('tbody > .dx-data-row').length, 2, 'count data row');
          $testElement.find('tbody td').first().find('.dx-treelist-expanded').first().trigger('dxclick');
          assert.equal($testElement.find('tbody > .dx-data-row').length, 1, 'count data row');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/tree_list/ui.tree_list","jquery","animation/fx","../../helpers/treeListMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/tree_list/ui.tree_list"), require("jquery"), require("animation/fx"), require("../../helpers/treeListMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=rows.tests.js.map