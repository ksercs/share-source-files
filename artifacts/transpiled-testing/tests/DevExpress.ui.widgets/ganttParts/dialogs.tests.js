!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/dialogs.tests.js"], ["jquery","localization/message","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/dialogs.tests.js", ["jquery", "localization/message", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var $,
      messageLocalization,
      Consts,
      data,
      options,
      showTaskEditDialog,
      getGanttViewCore,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      messageLocalization = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
      data = $__m.data;
      options = $__m.options;
      showTaskEditDialog = $__m.showTaskEditDialog;
      getGanttViewCore = $__m.getGanttViewCore;
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
      QUnit.module('Dialogs', moduleConfig, function() {
        test('common', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('selectedRowKey', 1);
          this.clock.tick(10);
          showTaskEditDialog(this.instance);
          assert.equal($('body').find(Consts.POPUP_SELECTOR).length, 1, 'dialog is shown');
          this.instance.repaint();
          assert.equal($('body').find(Consts.POPUP_SELECTOR).length, 0, 'dialog is missed after widget repainting');
          this.clock.tick(10);
          showTaskEditDialog(this.instance);
          assert.equal($('body').find(Consts.POPUP_SELECTOR).length, 1, 'dialog is shown');
          this.instance.dispose();
          assert.equal($('body').find(Consts.POPUP_SELECTOR).length, 0, 'dialog is missed after widget disposing');
        });
        test('task editing', function(assert) {
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
          var startTextBox = $dialog.find('.dx-datebox').eq(0).dxDateBox('instance');
          var endTextBox = $dialog.find('.dx-datebox').eq(1).dxDateBox('instance');
          startTextBox.option('value', '');
          endTextBox.option('value', '');
          var $okButton = $dialog.find('.dx-popup-bottom').find('.dx-button').eq(0);
          $okButton.trigger('dxclick');
          assert.equal($dialog.length, 1, 'dialog is shown');
          var isValidStartTextBox = startTextBox._getValidationErrors() === null;
          var isValidEndTextBox = endTextBox._getValidationErrors() === null;
          assert.notOk(isValidStartTextBox, 'empty start validation');
          assert.notOk(isValidEndTextBox, 'empty end validation');
          titleTextBox.option('value', testTitle);
          startTextBox.option('value', data.tasks[0].start);
          endTextBox.option('value', data.tasks[0].end);
          isValidStartTextBox = startTextBox._getValidationErrors() === null;
          isValidEndTextBox = endTextBox._getValidationErrors() === null;
          assert.ok(isValidStartTextBox, 'not empty start validation');
          assert.ok(isValidEndTextBox, 'not empty end validation');
          $okButton.trigger('dxclick');
          this.clock.tick(10);
          var firstTreeListTitleText = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).first().find('td').eq(2).text();
          assert.equal(firstTreeListTitleText, testTitle, 'title text was modified');
          this.instance.option('editing.enabled', false);
          showTaskEditDialog(this.instance);
          assert.equal($dialog.find('.dx-popup-bottom').find('.dx-button').length, 1, 'only cancel button in toolbar');
          $dialog = $('body').find(Consts.POPUP_SELECTOR);
          var inputs = $dialog.find('.dx-texteditor-input');
          assert.equal(inputs.attr('readOnly'), 'readonly', 'all inputs is readOnly');
        });
        test('showTaskDetailsDialog', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          this.instance.showTaskDetailsDialog(1);
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
          var startTextBox = $dialog.find('.dx-datebox').eq(0).dxDateBox('instance');
          var endTextBox = $dialog.find('.dx-datebox').eq(1).dxDateBox('instance');
          startTextBox.option('value', '');
          endTextBox.option('value', '');
          var $okButton = $dialog.find('.dx-popup-bottom').find('.dx-button').eq(0);
          $okButton.trigger('dxclick');
          assert.equal($dialog.length, 1, 'dialog is shown');
          var isValidStartTextBox = startTextBox._getValidationErrors() === null;
          var isValidEndTextBox = endTextBox._getValidationErrors() === null;
          assert.notOk(isValidStartTextBox, 'empty start validation');
          assert.notOk(isValidEndTextBox, 'empty end validation');
          titleTextBox.option('value', testTitle);
          startTextBox.option('value', data.tasks[0].start);
          endTextBox.option('value', data.tasks[0].end);
          isValidStartTextBox = startTextBox._getValidationErrors() === null;
          isValidEndTextBox = endTextBox._getValidationErrors() === null;
          assert.ok(isValidStartTextBox, 'not empty start validation');
          assert.ok(isValidEndTextBox, 'not empty end validation');
          $okButton.trigger('dxclick');
          this.clock.tick(10);
          var firstTreeListTitleText = this.$element.find(Consts.TREELIST_DATA_ROW_SELECTOR).first().find('td').eq(2).text();
          assert.equal(firstTreeListTitleText, testTitle, 'title text was modified');
          this.instance.option('editing.enabled', false);
          this.instance.showTaskDetailsDialog(1);
          this.clock.tick(10);
          assert.equal($dialog.find('.dx-popup-bottom').find('.dx-button').length, 1, 'only cancel button in toolbar');
          $dialog = $('body').find(Consts.POPUP_SELECTOR);
          var inputs = $dialog.find('.dx-texteditor-input');
          assert.equal(inputs.attr('readOnly'), 'readonly', 'all inputs is readOnly');
        });
        test('resources editing', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.clock.tick(10);
          getGanttViewCore(this.instance).commandManager.showResourcesDialog.execute();
          this.clock.tick(10);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 1, 'dialog is shown');
          var $resources = $dialog.find('.dx-list-item');
          assert.equal($resources.length, data.resources.length, 'dialog has all resources');
          var $deleteButtons = $dialog.find('.dx-list-static-delete-button');
          $deleteButtons.eq(0).trigger('dxclick');
          $resources = $dialog.find('.dx-list-item');
          assert.equal($resources.length, data.resources.length - 1, 'first resource removed from list');
          var secondResourceText = data.resources[1].text;
          var thirdResourceText = data.resources[2].text;
          var newResourceText = 'newResource';
          var textBox = $dialog.find('.dx-textbox').eq(0).dxTextBox('instance');
          textBox.option('text', newResourceText);
          var $addButton = $dialog.find('.dx-button-has-text').eq(0);
          $addButton.dxButton('instance').option('disabled', false);
          $addButton.trigger('dxclick');
          $resources = $dialog.find('.dx-list-item');
          assert.equal($resources.length, data.resources.length, 'added resource to list');
          var $okButton = $dialog.find('.dx-popup-bottom').find('.dx-button').eq(0);
          $okButton.trigger('dxclick');
          this.clock.tick(10);
          var $confirmDialog = $('body').find(Consts.POPUP_SELECTOR);
          var $yesButton = $confirmDialog.find('.dx-popup-bottom').find('.dx-button').eq(0);
          $yesButton.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(data.resources[0].text, secondResourceText, 'first resource removed from ds');
          assert.equal(data.resources[1].text, thirdResourceText, 'second resource ds');
          assert.equal(data.resources[2].text, newResourceText, 'new resource ds');
        });
        test('task progress not reset check (T890805)', function(assert) {
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
          assert.equal($inputs.eq(3).val(), data.tasks[0].progress + '%', 'progress text is shown');
          var testTitle = 'text';
          var titleTextBox = $dialog.find('.dx-textbox').eq(0).dxTextBox('instance');
          titleTextBox.option('value', testTitle);
          var $okButton = $dialog.find('.dx-popup-bottom').find('.dx-button').eq(0);
          $okButton.trigger('dxclick');
          this.clock.tick(10);
          assert.equal(data.tasks[0].progress, 31, 'progress reset');
        });
        test('showing taskEditDialog after resources dialog is closed', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('selectedRowKey', 1);
          this.clock.tick(10);
          showTaskEditDialog(this.instance);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          assert.equal($dialog.length, 1, 'dialog is shown');
          var expectedTaskEditTitleText = messageLocalization.format('dxGantt-dialogTaskDetailsTitle');
          var popupTitleText = $dialog.find('.dx-popup-title').text();
          assert.equal(expectedTaskEditTitleText, popupTitleText, 'taskEditPopup title');
          var $showResourcesButton = $dialog.find('.dx-texteditor-buttons-container').find('.dx-button').eq(0);
          $showResourcesButton.trigger('dxclick');
          this.clock.tick(10);
          var expectedResourceTitleText = messageLocalization.format('dxGantt-dialogResourceManagerTitle');
          popupTitleText = $dialog.find('.dx-popup-title').text();
          assert.equal(expectedResourceTitleText, popupTitleText, 'resourcePopup title');
          var $okButton = $dialog.find('.dx-popup-bottom').find('.dx-button').eq(0);
          $okButton.trigger('dxclick');
          this.clock.tick(10);
          popupTitleText = $dialog.find('.dx-popup-title').text();
          assert.equal(expectedTaskEditTitleText, popupTitleText, 'taskEditPopup title shown again');
        });
        test('assign resource dxTagBox is disabled when allowTaskResourceUpdating is false', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('editing.allowTaskResourceUpdating', false);
          this.instance.option('selectedRowKey', 1);
          this.clock.tick(10);
          showTaskEditDialog(this.instance);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          var tagBox = $dialog.find('.dx-tag-container > .dx-texteditor-input');
          assert.ok(tagBox.attr('aria-readOnly'), 'resource tagBox is readOnly');
        });
        test('show edit resource dialog button is disabled when allowResourceAdding and allowResourceDeleting are false ', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('editing.allowResourceAdding', false);
          this.instance.option('editing.allowResourceDeleting', false);
          this.instance.option('selectedRowKey', 1);
          this.clock.tick(10);
          showTaskEditDialog(this.instance);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          var button = $dialog.find('.dx-texteditor-buttons-container > .dx-button');
          assert.ok(button.attr('aria-disabled'), 'button is disabled');
        });
        test('task edit dialog not shown on new task adding (T1110285)', function(assert) {
          var myTasks = [{
            'id': 1,
            'parentId': 0,
            'title': 'Software Development',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-07-04T12:00:00.000Z'),
            'progress': 31,
            'color': 'red'
          }, {
            'id': 2,
            'parentId': 1,
            'title': 'Scope',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-02-26T09:00:00.000Z'),
            'progress': 60
          }, {
            'id': 3,
            'parentId': 2,
            'title': 'Determine project scope',
            'start': new Date('2019-02-21T05:00:00.000Z'),
            'end': new Date('2019-02-21T09:00:00.000Z'),
            'progress': 100
          }, {
            'id': 4,
            'parentId': 2,
            'title': 'Secure project sponsorship',
            'start': new Date('2019-02-21T10:00:00.000Z'),
            'end': new Date('2019-02-22T09:00:00.000Z'),
            'progress': 100
          }, {
            'id': 5,
            'parentId': 2,
            'title': 'Define preliminary resources',
            'start': new Date('2019-02-22T10:00:00.000Z'),
            'end': new Date('2019-02-25T09:00:00.000Z'),
            'progress': 60
          }, {
            'id': 6,
            'parentId': 2,
            'title': 'Secure core resources',
            'start': new Date('2019-02-25T10:00:00.000Z'),
            'end': new Date('2019-02-26T09:00:00.000Z'),
            'progress': 0
          }, {
            'id': 7,
            'parentId': 2,
            'title': 'Scope complete',
            'start': new Date('2019-02-26T09:00:00.000Z'),
            'end': new Date('2019-02-26T09:00:00.000Z'),
            'progress': 0
          }];
          var options = {
            tasks: {dataSource: myTasks},
            editing: {enabled: true},
            selectedRowKey: 1
          };
          this.createInstance(options);
          this.clock.tick(10);
          showTaskEditDialog(this.instance);
          var $dialog = $('body').find(Consts.POPUP_SELECTOR);
          var dialogInstance = this.instance._dialogInstance._popupInstance;
          dialogInstance.option('showCloseButton', true);
          assert.ok(dialogInstance.option('visible'), 'dialog is visible');
          assert.equal($dialog.length, 1, 'dialog exists');
          var $closeButton = $('.dx-closebutton');
          $closeButton.triggerHandler('dxclick');
          this.clock.tick(1000);
          assert.notOk(dialogInstance.option('visible'), 'dialog is not visible');
          var taskData = {
            title: 'My text',
            start: new Date('2019-02-23'),
            end: new Date('2019-02-23')
          };
          this.instance.insertTask(taskData);
          this.clock.tick(1000);
          assert.notOk(dialogInstance.option('visible'), 'dialog is not visible');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","localization/message","ui/gantt","../../../helpers/ganttHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("localization/message"), require("ui/gantt"), require("../../../helpers/ganttHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dialogs.tests.js.map