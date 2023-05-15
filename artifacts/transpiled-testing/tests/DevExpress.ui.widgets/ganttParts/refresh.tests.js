!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/refresh.tests.js"], ["jquery","ui/gantt","../../../helpers/ganttHelpers.js","data/custom_store"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/refresh.tests.js", ["jquery", "ui/gantt", "../../../helpers/ganttHelpers.js", "data/custom_store"], function($__export) {
  "use strict";
  var $,
      Consts,
      options,
      data,
      showTaskEditDialog,
      CustomStore,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
      options = $__m.options;
      data = $__m.data;
      showTaskEditDialog = $__m.showTaskEditDialog;
    }, function($__m) {
      CustomStore = $__m.default;
    }],
    execute: function() {
      var $__6;
      (($__6 = QUnit, test = $__6.test, $__6));
      moduleConfig = {
        beforeEach: function() {
          var $__5 = this;
          this.createInstance = function(settings) {
            $__5.instance = $__5.$element.dxGantt(settings).dxGantt('instance');
          };
          this.$element = $('#gantt');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      QUnit.module('Refresh', moduleConfig, function() {
        test('should render treeList after refresh()', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          this.instance.refresh();
          this.clock.tick(10);
          var treeListElements = this.$element.find(Consts.TREELIST_SELECTOR);
          assert.strictEqual(treeListElements.length, 1);
        });
        test('should render task wrapper for each task after refresh()', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          this.instance.refresh();
          this.clock.tick(10);
          var elements = this.$element.find(Consts.TASK_WRAPPER_SELECTOR);
          assert.equal(elements.length, data.tasks.length - 1);
        });
        test('should store task changes after refresh() ', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('selectedRowKey', 1);
          this.clock.tick(10);
          showTaskEditDialog(this.instance);
          this.clock.tick(10);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 1, 'dialog is shown');
          var $inputs = $dialog.find(Consts.INPUT_TEXT_EDITOR_SELECTOR);
          assert.equal($inputs.eq(0).val(), data.tasks[0].title, 'title text is shown');
          assert.equal((new Date($inputs.eq(1).val())).getTime(), data.tasks[0].start.getTime(), 'start task text is shown');
          assert.equal((new Date($inputs.eq(2).val())).getTime(), data.tasks[0].end.getTime(), 'end task text is shown');
          assert.equal($inputs.eq(3).val(), data.tasks[0].progress + '%', 'progress text is shown');
          var testTitle = 'text';
          var titleTextBox = $dialog.find('.dx-textbox').eq(0).dxTextBox('instance');
          titleTextBox.option('value', testTitle);
          var $okButton = $dialog.find('.dx-popup-bottom').find('.dx-button').eq(0);
          $okButton.trigger('dxclick');
          this.clock.tick(10);
          var firstTreeListTitleText = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).first().find('td').eq(2).text();
          assert.equal(firstTreeListTitleText, testTitle, 'title text was modified');
          this.instance.refresh();
          this.clock.tick(10);
          firstTreeListTitleText = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).first().find('td').eq(2).text();
          assert.equal(firstTreeListTitleText, testTitle, 'title text is the same after repaint()');
        });
        test('check data load on refresh and repaint', function(assert) {
          var task = {
            'id': 1,
            'title': 'Software Development',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          };
          var dataLoaded = false;
          this.createInstance({
            tasks: {dataSource: new CustomStore({load: function(loadOptions) {
                  dataLoaded = true;
                  return [{
                    id: task.id,
                    title: task.title,
                    start: task.start,
                    end: task.end,
                    progress: task.progress
                  }];
                }})},
            editing: {enabled: true},
            columns: [{
              dataField: 'title',
              caption: 'Subject'
            }, {
              dataField: 'start',
              caption: 'Start'
            }, {
              dataField: 'end',
              caption: 'End Date'
            }]
          });
          this.clock.tick(10);
          dataLoaded = false;
          var oldTitle = task.title;
          task.title = 'test';
          this.instance.repaint();
          this.clock.tick(10);
          assert.notOk(dataLoaded);
          assert.equal(this.instance.getTaskData(1).title, oldTitle);
          this.instance.refresh();
          this.clock.tick(10);
          assert.ok(dataLoaded);
          assert.equal(this.instance.getTaskData(1).title, 'test');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/gantt","../../../helpers/ganttHelpers.js","data/custom_store"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/gantt"), require("../../../helpers/ganttHelpers.js"), require("data/custom_store"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=refresh.tests.js.map