!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.treeList/rowDragging.tests.js"], ["generic_light.css!","ui/data_grid","ui/tree_list","jquery","../../helpers/pointerMock.js","../../helpers/treeListMocks.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.treeList/rowDragging.tests.js", ["generic_light.css!", "ui/data_grid", "ui/tree_list", "jquery", "../../helpers/pointerMock.js", "../../helpers/treeListMocks.js"], function($__export) {
  "use strict";
  var $,
      pointerMock,
      setupTreeListModules,
      generateData,
      moduleConfig;
  function createRowsView() {
    var mockTreeList = {
      options: this.options,
      isReady: function() {
        return true;
      },
      $element: function() {
        return $('.dx-treelist');
      },
      element: function() {
        return this.$element();
      }
    };
    setupTreeListModules(mockTreeList, ['data', 'columns', 'rows', 'rowDragging'], {initViews: true});
    if (this.treeList) {
      QUnit.assert.ok(false, 'treeList is already created');
    }
    this.treeList = mockTreeList;
    return mockTreeList.rowsView;
  }
  return {
    setters: [function($__m) {}, function($__m) {}, function($__m) {}, function($__m) {
      $ = $__m.default;
    }, function($__m) {
      pointerMock = $__m.default;
    }, function($__m) {
      setupTreeListModules = $__m.setupTreeListModules;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = "<style>\n            .qunit-fixture-static {\n                position: static !important;\n                left: 0 !important;\n                top: 0 !important;\n            }\n        </style>\n        <div class=\"dx-widget dx-treelist\">\n            <div class=\"dx-gridbase-container\">\n                <div id=\"container\"></div>\n            </div>\n        </div>";
        $('#qunit-fixture').html(markup);
      });
      generateData = function(rowCount) {
        var i;
        var result = [];
        for (i = 1; i <= rowCount; i = i + 2) {
          result.push({
            id: i,
            parentId: 0,
            field1: 'test' + i,
            field2: 'test' + (i + 1),
            field3: 'test' + (i + 2)
          });
          result.push({
            id: i + 1,
            parentId: i,
            field1: 'test' + i,
            field2: 'test' + (i + 1),
            field3: 'test' + (i + 2)
          });
        }
        return result;
      };
      moduleConfig = {
        beforeEach: function() {
          $('#qunit-fixture').addClass('qunit-fixture-visible');
          this.options = {
            dataSource: generateData(10),
            autoExpandAll: true,
            keyExpr: 'id',
            parentIdExpr: 'parentId',
            rootValue: 0,
            columns: ['field1', 'field2', 'field3'],
            rowDragging: {
              allowReordering: true,
              allowDropInsideItem: true
            }
          };
          this.createRowsView = createRowsView;
        },
        afterEach: function() {
          $('#qunit-fixture').removeClass('qunit-fixture-visible');
          this.treeList && this.treeList.dispose();
        }
      };
      QUnit.module('Drag and Drop nodes', moduleConfig, function() {
        QUnit.test('Drag and drop node', function(assert) {
          var onDragEndSpy = sinon.spy();
          var $testElement = $('#container');
          this.options.rowDragging.onDragEnd = onDragEndSpy;
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          var pointer = pointerMock(rowsView.getRowElement(0)).start().down().move(0, 70);
          var $draggableElement = $('body').children('.dx-sortable-dragging');
          var $placeholderElement = $('body').children('.dx-sortable-placeholder');
          assert.strictEqual($draggableElement.length, 1, 'there is dragging element');
          assert.strictEqual($placeholderElement.length, 1, 'placeholder');
          assert.notOk($placeholderElement.hasClass('dx-sortable-placeholder-inside'), 'placeholder for dropping inward');
          assert.ok($draggableElement.children().hasClass('dx-treelist'), 'dragging element is treelist');
          assert.strictEqual($draggableElement.find('.dx-data-row').length, 1, 'row count in dragging element');
          pointer.up();
          assert.strictEqual(onDragEndSpy.callCount, 1, 'onDragEnd event is called');
          assert.notOk(onDragEndSpy.getCall(0).args[0].dropInsideItem, 'onDragEnd args - dropInsideItem');
        });
        QUnit.test('Drag and drop a node into another node', function(assert) {
          var onDragEndSpy = sinon.spy();
          var $testElement = $('#container');
          this.options.rowDragging.onDragEnd = onDragEndSpy;
          var rowsView = this.createRowsView();
          rowsView.render($testElement);
          var pointer = pointerMock(rowsView.getRowElement(0)).start().down().move(0, 50);
          var $placeholderElement = $('body').children('.dx-sortable-placeholder');
          assert.strictEqual($placeholderElement.length, 1, 'placeholder');
          assert.ok($placeholderElement.hasClass('dx-sortable-placeholder-inside'), 'placeholder for dropping inward');
          pointer.up();
          assert.strictEqual(onDragEndSpy.callCount, 1, 'onDragEnd event is called');
          assert.ok(onDragEndSpy.getCall(0).args[0].dropInsideItem, 'onDragEnd args - dropInsideItem');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["generic_light.css!","ui/data_grid","ui/tree_list","jquery","../../helpers/pointerMock.js","../../helpers/treeListMocks.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("generic_light.css!"), require("ui/data_grid"), require("ui/tree_list"), require("jquery"), require("../../helpers/pointerMock.js"), require("../../helpers/treeListMocks.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=rowDragging.tests.js.map