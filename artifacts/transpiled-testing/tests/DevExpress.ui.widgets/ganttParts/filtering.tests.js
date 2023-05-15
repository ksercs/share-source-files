!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/filtering.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/filtering.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      Consts,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
    }],
    execute: function() {
      var $__4;
      (($__4 = QUnit, test = $__4.test, $__4));
      moduleConfig = {
        beforeEach: function() {
          var $__3 = this;
          this.createInstance = function(settings) {
            $__3.instance = $__3.$element.dxGantt(settings).dxGantt('instance');
          };
          this.$element = $('#gantt');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      QUnit.module('Filtering', moduleConfig, function() {
        test('filterRow', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'id': 3,
            'parentId': 1,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50
          }];
          var options = {
            tasks: {dataSource: tasks},
            validation: {autoUpdateParentTasks: false},
            columns: [{
              dataField: 'id',
              sortOrder: 'desc'
            }, {dataField: 'title'}],
            filterRow: {visible: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var $filterRow = this.$element.find(Consts.TREELIST_FILTER_ROW_SELECTOR);
          assert.equal($filterRow.length, 1);
          var $filterRowInput = $filterRow.find('.dx-texteditor-input').eq(1);
          assert.equal(this.$element.find(Consts.TASK_SELECTOR).length, 3);
          $filterRowInput.val('project');
          $filterRowInput.trigger('keyup');
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_SELECTOR).length, 2);
          $filterRowInput.val('');
          $filterRowInput.trigger('keyup');
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_SELECTOR).length, 3);
        });
        test('headerFilter', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'id': 3,
            'parentId': 1,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50
          }];
          var options = {
            tasks: {dataSource: tasks},
            validation: {autoUpdateParentTasks: false},
            columns: [{
              dataField: 'id',
              sortOrder: 'desc'
            }, {
              dataField: 'title',
              filterValues: ['Determine project scope']
            }],
            headerFilter: {visible: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_SELECTOR).length, 2);
          this.instance._treeList.clearFilter();
          this.clock.tick(300);
          assert.equal(this.$element.find(Consts.TASK_SELECTOR).length, 3);
        });
        test('clear sorting when filtered', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'id': 3,
            'parentId': 1,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50
          }];
          var options = {
            tasks: {dataSource: tasks},
            validation: {autoUpdateParentTasks: false},
            columns: [{
              dataField: 'id',
              sortOrder: 'desc'
            }, {dataField: 'title'}],
            filterRow: {visible: true},
            headerFilter: {visible: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var treeListIdText1 = $(this.instance._treeList.getCellElement(0, 0)).text();
          var treeListTitleText1 = $(this.instance._treeList.getCellElement(0, 1)).text();
          var treeListIdText2 = $(this.instance._treeList.getCellElement(1, 0)).text();
          var treeListTitleText2 = $(this.instance._treeList.getCellElement(1, 1)).text();
          var treeListIdText3 = $(this.instance._treeList.getCellElement(2, 0)).text();
          var treeListTitleText3 = $(this.instance._treeList.getCellElement(2, 1)).text();
          var taskText1 = this.$element.find(Consts.TASK_SELECTOR)[0].textContent;
          var taskText2 = this.$element.find(Consts.TASK_SELECTOR)[1].textContent;
          var taskText3 = this.$element.find(Consts.TASK_SELECTOR)[2].textContent;
          assert.equal(treeListIdText1, '1');
          assert.equal(treeListIdText2, '3');
          assert.equal(treeListIdText3, '2');
          assert.equal(treeListTitleText1, taskText1);
          assert.equal(treeListTitleText2, taskText2);
          assert.equal(treeListTitleText3, taskText3);
          var $filterRow = this.$element.find(Consts.TREELIST_FILTER_ROW_SELECTOR);
          assert.equal($filterRow.length, 1);
          var $filterRowInput = $filterRow.find('.dx-texteditor-input').eq(1);
          assert.equal(this.$element.find(Consts.TASK_SELECTOR).length, 3);
          $filterRowInput.val('project');
          $filterRowInput.trigger('keyup');
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_SELECTOR).length, 2);
          this.instance._treeList.clearSorting();
          this.clock.tick(500);
          assert.equal(this.$element.find(Consts.TASK_SELECTOR).length, 2);
        });
        test('clear in autoUpdateParentTasks == true', function(assert) {
          var start = new Date('2019-02-19');
          var end = new Date('2019-02-26');
          var tasks = [{
            'id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'id': 3,
            'parentId': 1,
            'title': 'Determine project scope',
            'start': start,
            'end': end,
            'progress': 50
          }];
          var options = {
            tasks: {dataSource: tasks},
            validation: {autoUpdateParentTasks: true},
            columns: [{
              dataField: 'id',
              sortOrder: 'desc'
            }, {dataField: 'title'}],
            filterRow: {visible: true},
            headerFilter: {visible: true}
          };
          this.createInstance(options);
          this.clock.tick(500);
          var treeListIdText1 = $(this.instance._treeList.getCellElement(0, 0)).text();
          var treeListTitleText1 = $(this.instance._treeList.getCellElement(0, 1)).text();
          var treeListIdText2 = $(this.instance._treeList.getCellElement(1, 0)).text();
          var treeListTitleText2 = $(this.instance._treeList.getCellElement(1, 1)).text();
          var treeListIdText3 = $(this.instance._treeList.getCellElement(2, 0)).text();
          var treeListTitleText3 = $(this.instance._treeList.getCellElement(2, 1)).text();
          var taskText1 = this.$element.find(Consts.TASK_SELECTOR)[0].textContent;
          var taskText2 = this.$element.find(Consts.TASK_SELECTOR)[1].textContent;
          var taskText3 = this.$element.find(Consts.TASK_SELECTOR)[2].textContent;
          assert.equal(treeListIdText1, '1');
          assert.equal(treeListIdText2, '3');
          assert.equal(treeListIdText3, '2');
          assert.equal(treeListTitleText1, taskText1);
          assert.equal(treeListTitleText2, taskText2);
          assert.equal(treeListTitleText3, taskText3);
          var $filterRow = this.$element.find(Consts.TREELIST_FILTER_ROW_SELECTOR);
          assert.equal($filterRow.length, 1);
          var $filterRowInput = $filterRow.find('.dx-texteditor-input').eq(1);
          assert.equal(this.$element.find(Consts.TASK_SELECTOR).length, 3);
          $filterRowInput.val('project');
          $filterRowInput.trigger('keyup');
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_SELECTOR).length, 2);
          this.instance._treeList.clearSorting();
          this.clock.tick(500);
          assert.equal(this.$element.find(Consts.TASK_SELECTOR).length, 2);
        });
        test('check expand state after filter (T1118628)', function(assert) {
          var tasks = [{
            'id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-20'),
            'end': new Date('2019-02-22'),
            'progress': 0
          }, {
            'id': 3,
            'parentId': 1,
            'title': 'Determine project scope',
            'start': new Date('2019-02-19'),
            'end': new Date('2019-02-26'),
            'progress': 50
          }];
          var options = {
            tasks: {dataSource: tasks},
            validation: {autoUpdateParentTasks: false},
            columns: [{
              dataField: 'id',
              sortOrder: 'desc'
            }, {dataField: 'title'}],
            filterRow: {visible: true}
          };
          this.createInstance(options);
          this.clock.tick(10);
          var expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
          var $filterRow = this.$element.find(Consts.TREELIST_FILTER_ROW_SELECTOR);
          assert.equal($filterRow.length, 1);
          var $filterRowInput = $filterRow.find('.dx-texteditor-input').eq(1);
          $filterRowInput.val('project');
          $filterRowInput.trigger('keyup');
          this.clock.tick(1000);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
          assert.equal(this.instance._treeList.getVisibleRows().length, 2);
          expandedElement = this.$element.find(Consts.TREELIST_EXPANDED_SELECTOR).first();
          expandedElement.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 1);
          assert.equal(this.instance._treeList.getVisibleRows().length, 1);
          var $treeListIdHeader = this.$element.find(Consts.TREELIST_HEADER_ROW_SELECTOR).children().eq(0);
          $treeListIdHeader.trigger('dxclick');
          this.clock.tick(500);
          assert.equal(this.$element.find(Consts.TASK_WRAPPER_SELECTOR).length, 2);
          assert.equal(this.instance._treeList.getVisibleRows().length, 2);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/gantt","../../../helpers/ganttHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/gantt"), require("../../../helpers/ganttHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=filtering.tests.js.map