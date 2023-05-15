!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.treeList/virtualScrolling.integration.tests.js"], ["core/utils/shadow_dom","ui/tree_list","../../helpers/dataGridHelper.js","jquery","../../helpers/wrappers/dataGridWrappers.js","../../helpers/treeListMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.treeList/virtualScrolling.integration.tests.js", ["core/utils/shadow_dom", "ui/tree_list", "../../helpers/dataGridHelper.js", "jquery", "../../helpers/wrappers/dataGridWrappers.js", "../../helpers/treeListMocks.js"], function($__export) {
  "use strict";
  var addShadowDomStyles,
      baseModuleConfig,
      $,
      TreeListWrapper,
      generateNestedData,
      treeListWrapper;
  return {
    setters: [function($__m) {
      addShadowDomStyles = $__m.addShadowDomStyles;
    }, function($__m) {}, function($__m) {
      baseModuleConfig = $__m.baseModuleConfig;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      TreeListWrapper = $__m.TreeListWrapper;
    }, function($__m) {
      generateNestedData = $__m.generateNestedData;
    }],
    execute: function() {
      treeListWrapper = new TreeListWrapper('#treeList');
      QUnit.testStart(function() {
        var markup = "\n        <div id=\"treeList\"></div>\n    ";
        $('#qunit-fixture').html(markup);
        addShadowDomStyles($('#qunit-fixture'));
      });
      QUnit.module('Virtual Scrolling', baseModuleConfig, function() {
        [true, false].forEach(function(legacyMode) {
          QUnit.test('Last row should not disappear after adding new row when refreshMode is repaint', function(assert) {
            var treeList = $('#treeList').dxTreeList({
              dataSource: [{id: 1}, {id: 2}],
              keyExpr: 'id',
              height: 100,
              scrolling: {
                virtual: true,
                legacyMode: legacyMode
              },
              editing: {refreshMode: 'repaint'}
            }).dxTreeList('instance');
            this.clock.tick(500);
            assert.strictEqual(treeList.getVisibleRows().length, 2, 'visible rows count');
            treeList.addRow();
            treeList.saveEditData();
            assert.strictEqual(treeList.getVisibleRows().length, 3, 'visible rows count');
          });
        });
        QUnit.test('It should be possible to scroll to the last row when wordWrapEnabled: true (T1121483)', function(assert) {
          var data = generateNestedData(20, 1);
          data[9].field2 = 'TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test  Test Test Test Test Test Test Test Test ';
          var treeList = $('#treeList').dxTreeList({
            dataSource: data,
            height: 500,
            autoExpandAll: true,
            wordWrapEnabled: true,
            columns: [{
              dataField: 'field1',
              width: 120
            }, {
              dataField: 'field2',
              width: 300
            }],
            scrolling: {useNative: false}
          }).dxTreeList('instance');
          this.clock.tick(300);
          var visibleRows = treeList.getVisibleRows();
          var scrollable = treeList.getScrollable();
          assert.equal(visibleRows.length, 16, 'rows are rendered initially');
          assert.equal(visibleRows[0].key, 1, 'initial first visible row');
          assert.equal(visibleRows[visibleRows.length - 1].key, 16, 'initial last visible row');
          scrollable.scrollTo({top: 3000});
          $(scrollable.container()).trigger('scroll');
          this.clock.tick(300);
          visibleRows = treeList.getVisibleRows();
          assert.equal(visibleRows.length, 12, 'rows are rendered at the bottom');
          assert.equal(visibleRows[0].key, 9, 'first visible row at the bottom');
          assert.equal(visibleRows[visibleRows.length - 1].key, 20, 'last visible row at the bottom');
          assert.ok(treeListWrapper.rowsView.isRowVisible(11), 'last row visible');
          scrollable.scrollTo({top: 3000});
          $(scrollable.container()).trigger('scroll');
          this.clock.tick(300);
          visibleRows = treeList.getVisibleRows();
          assert.equal(visibleRows.length, 12, 'rows are rendered at the bottom second time');
          assert.equal(visibleRows[0].key, 9, 'first visible row at the bottom second time');
          assert.equal(visibleRows[visibleRows.length - 1].key, 20, 'last visible row at the bottom second time');
          assert.ok(treeListWrapper.rowsView.isRowVisible(11), 'last row visible');
        });
        QUnit.test('It should be possible to scroll to the last row when wordWrapEnabled is set to true and rowDragging is enabled', function(assert) {
          var data = generateNestedData(20, 1);
          data[9].field2 = 'TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test  Test Test Test Test Test Test Test Test ';
          var treeList = $('#treeList').dxTreeList({
            dataSource: data,
            height: 500,
            autoExpandAll: true,
            wordWrapEnabled: true,
            rowDragging: {allowReordering: true},
            columns: [{
              dataField: 'field1',
              width: 120
            }, {
              dataField: 'field2',
              width: 300
            }],
            scrolling: {useNative: false}
          }).dxTreeList('instance');
          this.clock.tick(300);
          var scrollable = treeList.getScrollable();
          var $scrollableContent = $(scrollable.content());
          var $scrollableContainer = $(scrollable.container());
          scrollable.scrollTo({y: 10000});
          $scrollableContainer.trigger('scroll');
          this.clock.tick(1000);
          var maxScrollTop = Math.max($scrollableContent.get(0).clientHeight - $scrollableContainer.get(0).clientHeight, 0);
          assert.roughEqual(scrollable.scrollTop(), maxScrollTop, 1.01, 'scroll position at the end');
        });
        QUnit.test('It should be possible to scroll to the last row when there is fixed column and wordWrapEnabled is set to true', function(assert) {
          var data = generateNestedData(20, 1);
          var done = assert.async();
          data.forEach(function(item, index) {
            item.field1 = ("Field1 " + index + " ").repeat(2);
          });
          data[0].field2 = 'TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST TestTEST Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test Test  Test Test Test Test Test Test Test Test ';
          var treeList = $('#treeList').dxTreeList({
            dataSource: data,
            height: 500,
            autoExpandAll: true,
            wordWrapEnabled: true,
            editing: {
              mode: 'row',
              allowDeleting: true,
              allowUpdating: true,
              useIcons: true
            },
            columns: [{
              dataField: 'field1',
              width: 60
            }, {
              dataField: 'field2',
              width: 120
            }, {
              type: 'buttons',
              fixed: true,
              buttons: ['edit', 'delete']
            }],
            scrolling: {useNative: false}
          }).dxTreeList('instance');
          this.clock.tick(300);
          this.clock.restore();
          var scrollable = treeList.getScrollable();
          var $scrollableContent = $(scrollable.content());
          var $scrollableContainer = $(scrollable.container());
          scrollable.scrollTo({y: 350});
          scrollable.scrollTo({y: 400});
          scrollable.scrollTo({y: 10000});
          setTimeout(function() {
            var maxScrollTop = Math.max($scrollableContent.get(0).clientHeight - $scrollableContainer.get(0).clientHeight, 0);
            assert.roughEqual(scrollable.scrollTop(), maxScrollTop, 1.01, 'scroll position at the end');
            done();
          }, 300);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/shadow_dom","ui/tree_list","../../helpers/dataGridHelper.js","jquery","../../helpers/wrappers/dataGridWrappers.js","../../helpers/treeListMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/shadow_dom"), require("ui/tree_list"), require("../../helpers/dataGridHelper.js"), require("jquery"), require("../../helpers/wrappers/dataGridWrappers.js"), require("../../helpers/treeListMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=virtualScrolling.integration.tests.js.map