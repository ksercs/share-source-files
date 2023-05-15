!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets/ganttParts/fullScreenMode.tests.js"], ["core/utils/size","jquery","ui/gantt","../../../helpers/ganttHelpers.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets/ganttParts/fullScreenMode.tests.js", ["core/utils/size", "jquery", "ui/gantt", "../../../helpers/ganttHelpers.js"], function($__export) {
  "use strict";
  var getHeight,
      getWidth,
      $,
      Consts,
      options,
      data,
      showTaskEditDialog,
      getGanttViewCore,
      test,
      moduleConfig;
  return {
    setters: [function($__m) {
      getHeight = $__m.getHeight;
      getWidth = $__m.getWidth;
    }, function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      Consts = $__m.Consts;
      options = $__m.options;
      data = $__m.data;
      showTaskEditDialog = $__m.showTaskEditDialog;
      getGanttViewCore = $__m.getGanttViewCore;
    }],
    execute: function() {
      var $__3;
      (($__3 = QUnit, test = $__3.test, $__3));
      moduleConfig = {
        beforeEach: function() {
          var $__2 = this;
          this.createInstance = function(settings) {
            $__2.instance = $__2.$element.dxGantt(settings).dxGantt('instance');
          };
          this.$element = $('#gantt');
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          this.clock.restore();
        }
      };
      QUnit.module('FullScreen Mode', moduleConfig, function() {
        test('FullScreen is switching', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          this.instance.option('height', 200);
          this.clock.tick(10);
          var fullScreenCommand = getGanttViewCore(this.instance).commandManager.getCommand(10);
          assert.strictEqual(getGanttViewCore(this.instance).fullScreenModeHelper.isInFullScreenMode, false, 'Normal mode is enabled');
          this.clock.tick(10);
          fullScreenCommand.executeInternal();
          this.clock.tick(10);
          assert.strictEqual(getGanttViewCore(this.instance).fullScreenModeHelper.isInFullScreenMode, true, 'FullScreen mode is enabled');
          fullScreenCommand.execute();
          assert.strictEqual(getGanttViewCore(this.instance).fullScreenModeHelper.isInFullScreenMode, false, 'Normal mode is enabled after FullScreen mode');
        });
        test('is taking up entire screen', function(assert) {
          this.createInstance(options.tasksOnlyOptions);
          this.clock.tick(10);
          this.instance.option('height', 200);
          this.instance.option('width', 400);
          this.instance.option('taskListWidth', 200);
          this.clock.tick(10);
          var fullScreenCommand = getGanttViewCore(this.instance).commandManager.getCommand(10);
          assert.ok(getHeight(this.instance.$element()) < getHeight($(window)), '1.normalMode: gantt height < window height');
          assert.ok(getWidth(this.instance.$element()) < getWidth($(window)), '1.normalMode: gantt width < window width');
          fullScreenCommand.execute();
          assert.equal(getHeight(this.instance.$element()), getHeight($(window)), '1.fullScreenMode: gantt height == window height');
          assert.equal(getWidth(this.instance.$element()), getWidth($(window)), '1.fullScreenMode: gantt width == window width');
          fullScreenCommand.execute();
          this.clock.tick(10);
          assert.ok(getHeight(this.instance.$element()) < getHeight($(window)), '2.normalMode: gantt height < window height');
          assert.ok(getWidth(this.instance.$element()) < getWidth($(window)), '2.normalMode: gantt width < window width');
          fullScreenCommand.execute();
          assert.equal(getHeight(this.instance.$element()), getHeight($(window)), '2.fullScreenMode: gantt height == window height');
          assert.equal(getWidth(this.instance.$element()), getWidth($(window)), '2.fullScreenMode: gantt width == window width');
          fullScreenCommand.execute();
        });
        test('task editng is possible', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.instance.option('editing.enabled', true);
          this.instance.option('selectedRowKey', 1);
          this.clock.tick(10);
          var fullScreenCommand = getGanttViewCore(this.instance).commandManager.getCommand(10);
          fullScreenCommand.execute();
          assert.strictEqual(getGanttViewCore(this.instance).fullScreenModeHelper.isInFullScreenMode, true, 'FullScreen mode is enabled');
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
          this.instance.option('editing.enabled', false);
          showTaskEditDialog(this.instance);
          assert.equal($dialog.find('.dx-popup-bottom').find('.dx-button').length, 1, 'only cancel button in toolbar');
          $dialog = $('body').find(Consts.POPUP_SELECTOR);
          var inputs = $dialog.find('.dx-texteditor-input');
          assert.equal(inputs.attr('readOnly'), 'readonly', 'all inputs is readOnly');
          fullScreenCommand.execute();
        });
        test('panel sizes are the same', function(assert) {
          this.createInstance(options.allSourcesOptions);
          this.clock.tick(10);
          var fullScreenCommand = getGanttViewCore(this.instance).commandManager.getCommand(10);
          var leftPanelWidth = this.instance._splitter._leftPanelPercentageWidth;
          fullScreenCommand.execute();
          assert.equal(Math.floor(leftPanelWidth), Math.floor(this.instance._splitter._leftPanelPercentageWidth), 'left Panel Width is not changed in FullScreen');
          fullScreenCommand.execute();
          this.clock.tick(10);
          var diff = Math.abs(leftPanelWidth - Math.floor(this.instance._splitter._leftPanelPercentageWidth));
          assert.ok(diff < 2, 'left Panel Width is not changed in NormalMode');
          this.clock.tick(10);
          fullScreenCommand.execute();
          var splitterWrapper = this.$element.find(Consts.SPLITTER_WRAPPER_SELECTOR);
          var splitter = this.$element.find(Consts.SPLITTER_SELECTOR);
          var treeListWrapperElement = this.$element.find(Consts.TREELIST_WRAPPER_SELECTOR);
          var treeListWrapperLeftOffset = treeListWrapperElement.offset().left;
          var treeListWrapperTopOffset = treeListWrapperElement.offset().top;
          var ganttView = this.$element.find(Consts.GANTT_VIEW_SELECTOR);
          var splitterContainerWrapperWidth = getWidth($(treeListWrapperElement).parent());
          assert.ok(splitterWrapper, 'Splitter wrapper has been found');
          assert.ok(splitter, 'Splitter has been found');
          splitter.trigger($.Event('dxpointerdown', {pointerType: 'mouse'}));
          splitter.trigger($.Event('dxpointermove', {
            pointerType: 'mouse',
            pageX: treeListWrapperLeftOffset - parseFloat(splitter.css('margin-left')) + 100,
            pageY: treeListWrapperTopOffset + 100
          }));
          splitter.trigger($.Event('dxpointerup', {pointerType: 'mouse'}));
          assert.equal(getWidth(treeListWrapperElement), 100);
          assert.equal(getWidth(ganttView), splitterContainerWrapperWidth - 100);
          assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), 100, 'Splitter has been moved by mouse');
          splitter.trigger($.Event('dxpointerdown', {pointerType: 'touch'}));
          splitter.trigger($.Event('dxpointermove', {
            pointerType: 'touch',
            pageX: treeListWrapperLeftOffset - parseFloat(splitter.css('margin-left')) + 300,
            pageY: treeListWrapperTopOffset + 100
          }));
          splitter.trigger($.Event('dxpointerup', {pointerType: 'touch'}));
          assert.equal(getWidth(treeListWrapperElement), 300);
          assert.equal(getWidth(ganttView), splitterContainerWrapperWidth - 300);
          assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), 300, 'Splitter has been moved by touch');
          splitter.trigger($.Event('dxpointerdown'));
          splitter.trigger($.Event('dxpointermove', {
            pageX: treeListWrapperLeftOffset - parseFloat(splitter.css('margin-left')) - 10,
            pageY: treeListWrapperTopOffset + 100
          }));
          splitter.trigger($.Event('dxpointerup'));
          assert.equal(getWidth(treeListWrapperElement), 0);
          assert.equal(getWidth(ganttView), splitterContainerWrapperWidth);
          assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), 0, 'Splitter has not cross the left side');
          splitter.trigger($.Event('dxpointerdown'));
          splitter.trigger($.Event('dxpointermove', {
            pageX: splitterContainerWrapperWidth - parseFloat(splitter.css('margin-left')) + 10,
            pageY: treeListWrapperTopOffset + 100
          }));
          splitter.trigger($.Event('dxpointerup'));
          assert.equal(getWidth(treeListWrapperElement), splitterContainerWrapperWidth - getWidth(splitter));
          assert.equal(getWidth(ganttView), getWidth(splitter));
          assert.equal(parseFloat(splitterWrapper.css('left')) + parseFloat(splitter.css('margin-left')), splitterContainerWrapperWidth - getWidth(splitter), 'Splitter has not cross the right side');
          leftPanelWidth = this.instance._splitter._leftPanelPercentageWidth;
          fullScreenCommand.execute();
          assert.equal(Math.floor(leftPanelWidth), Math.floor(this.instance._splitter._leftPanelPercentageWidth), 'left Panel Width is not changed in Normal mode');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","jquery","ui/gantt","../../../helpers/ganttHelpers.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("jquery"), require("ui/gantt"), require("../../../helpers/ganttHelpers.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=fullScreenMode.tests.js.map