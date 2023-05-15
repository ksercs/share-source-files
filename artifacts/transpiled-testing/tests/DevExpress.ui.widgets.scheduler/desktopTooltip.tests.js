!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/desktopTooltip.tests.js"], ["ui/scheduler/tooltip_strategies/desktopTooltipStrategy","core/templates/function_template","core/utils/extend","ui/tooltip","ui/list/ui.list.edit","ui/button","core/utils/support"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.scheduler/desktopTooltip.tests.js", ["ui/scheduler/tooltip_strategies/desktopTooltipStrategy", "core/templates/function_template", "core/utils/extend", "ui/tooltip", "ui/list/ui.list.edit", "ui/button", "core/utils/support"], function($__export) {
  "use strict";
  var DesktopTooltipStrategy,
      FunctionTemplate,
      extend,
      Tooltip,
      List,
      Button,
      support,
      stubComponent,
      stubCreateComponent,
      stubShowAppointmentPopup,
      stubAddDefaultTemplates,
      stubGetAppointmentTemplate,
      stubCheckAndDeleteAppointment,
      stubCreateFormattedDateText,
      stubGetAppointmentDisabled,
      stubIsAppointmentInAllDayPanel,
      environment;
  return {
    setters: [function($__m) {
      DesktopTooltipStrategy = $__m.DesktopTooltipStrategy;
    }, function($__m) {
      FunctionTemplate = $__m.FunctionTemplate;
    }, function($__m) {
      extend = $__m.extend;
    }, function($__m) {
      Tooltip = $__m.default;
    }, function($__m) {
      List = $__m.default;
    }, function($__m) {
      Button = $__m.default;
    }, function($__m) {
      support = $__m.default;
    }],
    execute: function() {
      stubComponent = {
        option: sinon.stub().returns('stubOption'),
        focus: sinon.stub()
      };
      stubCreateComponent = sinon.stub().returns(stubComponent);
      stubShowAppointmentPopup = sinon.stub();
      stubAddDefaultTemplates = sinon.stub();
      stubGetAppointmentTemplate = sinon.stub().returns('template');
      stubCheckAndDeleteAppointment = sinon.stub();
      stubCreateFormattedDateText = sinon.stub().returns('text');
      stubGetAppointmentDisabled = sinon.stub().returns(false);
      stubIsAppointmentInAllDayPanel = sinon.stub().returns(true);
      environment = {
        createSimpleTooltip: function(tooltipOptions) {
          return new DesktopTooltipStrategy(tooltipOptions);
        },
        tooltipOptions: {
          createComponent: stubCreateComponent,
          container: '<div>',
          addDefaultTemplates: stubAddDefaultTemplates,
          getAppointmentTemplate: stubGetAppointmentTemplate,
          showAppointmentPopup: stubShowAppointmentPopup,
          createFormattedDateText: stubCreateFormattedDateText,
          getAppointmentDisabled: stubGetAppointmentDisabled,
          checkAndDeleteAppointment: stubCheckAndDeleteAppointment,
          isAppointmentInAllDayPanel: stubIsAppointmentInAllDayPanel
        },
        extraOptions: {
          rtlEnabled: true,
          focusStateEnabled: true,
          editing: true,
          offset: 'offset',
          isButtonClick: false
        },
        afterEach: function() {
          stubCreateComponent.resetHistory();
          stubComponent.option.resetHistory();
          stubShowAppointmentPopup.resetHistory();
          stubAddDefaultTemplates.resetHistory();
          stubGetAppointmentTemplate.resetHistory();
          stubCreateFormattedDateText.resetHistory();
          stubCreateFormattedDateText.resetHistory();
          stubCheckAndDeleteAppointment.resetHistory();
        }
      };
      QUnit.module('Tooltip', environment);
      QUnit.test('Show tooltip', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = ['data1', 'data2'];
        tooltip.show('target', dataList, this.extraOptions);
        assert.ok(tooltip, 'tooltip is created');
        assert.equal(stubComponent.option.callCount, 2);
        assert.deepEqual(stubComponent.option.getCall(0).args, ['position', {
          'at': 'top',
          'collision': 'fit flipfit',
          'my': 'bottom',
          boundary: '<div>',
          offset: 'offset'
        }], 'tooltip has correct position');
        assert.deepEqual(stubComponent.option.getCall(1).args, ['visible', true], 'tooltip is visible');
        assert.ok(stubCreateComponent.calledOnce);
      });
      QUnit.test('Shouldn\'t show tooltip if data is not array', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = 12;
        tooltip.show('target', dataList, this.extraOptions);
        assert.ok(!stubCreateComponent.called);
      });
      QUnit.test('createComponent should be called with correct options', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = ['data1', 'data2'];
        tooltip.show('target', dataList, this.extraOptions);
        assert.equal(stubCreateComponent.getCall(0).args[0][0].className, 'dx-scheduler-appointment-tooltip-wrapper');
        assert.deepEqual(stubCreateComponent.getCall(0).args[1], Tooltip);
        assert.equal(Object.keys(stubCreateComponent.getCall(0).args[2]).length, 6);
        assert.equal(stubCreateComponent.getCall(0).args[2].target, 'target');
        assert.equal(stubCreateComponent.getCall(0).args[2].maxHeight, 200);
        assert.equal(stubCreateComponent.getCall(0).args[2].rtlEnabled, true);
        assert.ok(stubCreateComponent.getCall(0).args[2].onShown);
        assert.ok(stubCreateComponent.getCall(0).args[2].contentTemplate);
      });
      QUnit.test('contentTemplate passed to createComponent should work correct', function(assert) {
        var _touch = support.touch;
        try {
          support.touch = false;
          var tooltip = this.createSimpleTooltip(this.tooltipOptions);
          var dataList = ['data1', 'data2'];
          tooltip.show('target', dataList, this.extraOptions);
          stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
          assert.equal(stubCreateComponent.getCall(1).args[0][0].nodeName, 'DIV');
          assert.equal(stubCreateComponent.getCall(1).args[1], List);
          assert.equal(Object.keys(stubCreateComponent.getCall(1).args[2]).length, 7);
          assert.equal(stubCreateComponent.getCall(1).args[2].dataSource, dataList);
          assert.equal(stubCreateComponent.getCall(1).args[2].showScrollbar, 'onHover');
          assert.ok(stubCreateComponent.getCall(1).args[2].onContentReady);
          assert.ok(stubCreateComponent.getCall(1).args[2].onItemClick);
          assert.ok(stubCreateComponent.getCall(1).args[2].itemTemplate);
          assert.notOk(stubCreateComponent.getCall(1).args[2]._swipeEnabled);
          assert.equal(stubCreateComponent.getCall(1).args[2].pageLoadMode, 'scrollBottom');
        } finally {
          support.touch = _touch;
        }
      });
      QUnit.test('Tooltip should update the content after call method "show" several times', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = ['data1', 'data2'];
        tooltip.show('target', dataList, this.extraOptions);
        stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
        stubComponent.option.reset();
        tooltip.show('target', ['updatedData1', 'updatedData2'], this.extraOptions);
        assert.equal(stubComponent.option.callCount, 5);
        assert.deepEqual(stubComponent.option.getCall(0).args, ['visible', false]);
        assert.deepEqual(stubComponent.option.getCall(1).args, ['target', 'target']);
        assert.deepEqual(stubComponent.option.getCall(2).args, ['dataSource', ['updatedData1', 'updatedData2']]);
        assert.deepEqual(stubComponent.option.getCall(3).args, ['position', {
          'at': 'top',
          'collision': 'fit flipfit',
          'my': 'bottom',
          boundary: '<div>',
          offset: 'offset'
        }]);
        assert.deepEqual(stubComponent.option.getCall(4).args, ['visible', true]);
      });
      QUnit.test('onShown passed to createComponent should work correct, one element in tooltip', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = ['data1', 'data2'];
        tooltip.show('target', dataList, this.extraOptions);
        stubComponent.option.reset();
        stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
        stubCreateComponent.getCall(0).args[2].onShown();
        assert.equal(stubComponent.option.callCount, 1);
        assert.deepEqual(stubComponent.option.getCall(0).args, ['focusStateEnabled', true]);
      });
      QUnit.test('onShown passed to createComponent should work correct, several elements in tooltip', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = ['data1', 'data2'];
        tooltip.show('target', dataList, extend(this.extraOptions, {isButtonClick: true}));
        stubComponent.option.reset();
        stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
        stubCreateComponent.getCall(0).args[2].onShown();
        assert.equal(stubComponent.option.callCount, 2);
        assert.deepEqual(stubComponent.option.getCall(1).args, ['focusedElement', null]);
        assert.ok(stubComponent.focus.called);
      });
      QUnit.test('contentTemplate passed to createComponent should pass correct showScrollbar option for touch device', function(assert) {
        var _touch = support.touch;
        try {
          support.touch = true;
          var tooltip = this.createSimpleTooltip(this.tooltipOptions);
          var dataList = ['data1', 'data2'];
          tooltip.show('target', dataList, this.extraOptions);
          stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
          assert.equal(stubCreateComponent.getCall(1).args[2].showScrollbar, 'always');
        } finally {
          support.touch = _touch;
        }
      });
      QUnit.test('onContentReady passed to createComponent should work correct', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = ['data1', 'data2'];
        tooltip.show('target', dataList, this.extraOptions);
        stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
        assert.equal(stubCreateComponent.getCall(1).args[2].onContentReady(), undefined, 'called without errors');
      });
      QUnit.test('onContentReady passed to createComponent should work correct, with dragBehavior', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = ['data1', 'data2'];
        var dragBehavior = sinon.spy();
        tooltip.show('target', dataList, extend(this.extraOptions, {dragBehavior: dragBehavior}));
        stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
        assert.equal(stubCreateComponent.getCall(1).args[2].onContentReady(), undefined, 'called without errors');
        assert.ok(dragBehavior.called);
      });
      QUnit.test('onItemClick passed to createComponent should work correct', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = ['data1', 'data2'];
        var event = {itemData: {
            appointment: 'appointment',
            targetedAppointment: 'targetedAppointment'
          }};
        tooltip.show('target', dataList, this.extraOptions);
        stubComponent.option.reset();
        stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
        stubCreateComponent.getCall(1).args[2].onItemClick(event);
        assert.deepEqual(stubComponent.option.getCall(0).args, ['visible', false], 'tooltip is hide');
        assert.deepEqual(stubShowAppointmentPopup.getCall(0).args, [event.itemData.appointment, false, event.itemData.targetedAppointment]);
      });
      QUnit.test('onItemClick passed to createComponent should work correct, with clickEvent', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = ['data1', 'data2'];
        var event = {itemData: {
            appointment: 'appointment',
            targetedAppointment: 'targetedAppointment'
          }};
        var clickEvent = sinon.spy();
        tooltip.show('target', dataList, extend(this.extraOptions, {clickEvent: clickEvent}));
        stubComponent.option.reset();
        stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
        stubCreateComponent.getCall(1).args[2].onItemClick(event);
        assert.deepEqual(stubComponent.option.getCall(0).args, ['visible', false], 'tooltip is hide');
        assert.deepEqual(stubShowAppointmentPopup.getCall(0).args, [event.itemData.appointment, false, event.itemData.targetedAppointment]);
        assert.ok(clickEvent.called);
      });
      QUnit.test('itemTemplate passed to createComponent should work correct', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = ['data1', 'data2'];
        var item = {
          appointment: 'data',
          targetedAppointment: 'currentData',
          color: {done: sinon.spy()}
        };
        tooltip.show('target', dataList, this.extraOptions);
        stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
        var itemTemplate = stubCreateComponent.getCall(1).args[2].itemTemplate(item, 'index');
        assert.ok(itemTemplate instanceof FunctionTemplate);
        assert.ok(stubAddDefaultTemplates.getCall(0).args[0]['appointmentTooltip'] instanceof FunctionTemplate);
        assert.equal(stubGetAppointmentTemplate.getCall(0).args[0], 'appointmentTooltipTemplate');
        assert.deepEqual(stubCreateFormattedDateText.getCall(0).args, [item.appointment, item.targetedAppointment]);
        assert.equal(stubCreateComponent.getCall(2).args[0][0].className, 'dx-tooltip-appointment-item-delete-button');
        assert.deepEqual(stubCreateComponent.getCall(2).args[1], Button);
        assert.equal(stubCreateComponent.getCall(2).args[2].icon, 'trash');
        assert.equal(stubCreateComponent.getCall(2).args[2].stylingMode, 'text');
        assert.ok(stubCreateComponent.getCall(2).args[2].onClick);
        stubComponent.option.reset();
        var e = {event: {stopPropagation: sinon.spy()}};
        stubCreateComponent.getCall(2).args[2].onClick(e);
        assert.deepEqual(stubComponent.option.getCall(0).args, ['visible', false], 'tooltip is hide');
        assert.ok(e.event.stopPropagation.called);
        assert.deepEqual(stubCheckAndDeleteAppointment.getCall(0).args, [item.appointment, item.targetedAppointment]);
      });
      QUnit.test('Delete button shouldn\'t createed, editing = false', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = ['data1', 'data2'];
        var item = {
          appointment: 'appointment',
          targetedAppointment: 'appointment',
          color: {done: sinon.spy()}
        };
        tooltip.show('target', dataList, extend(this.extraOptions, {editing: false}));
        stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
        stubCreateComponent.getCall(1).args[2].itemTemplate(item, 'index');
        assert.equal(stubCreateComponent.getCall(2), undefined);
      });
      QUnit.test('Delete button shouldn\'t created, appointment is disabled', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = [{
          data: 'data1',
          disabled: true
        }, {
          data: 'data2',
          disabled: true
        }];
        var item = {
          appointment: dataList[0],
          targetedAppointment: 'currentData',
          color: {done: sinon.spy()}
        };
        tooltip.show('target', dataList, this.extraOptions);
        stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
        stubCreateComponent.getCall(1).args[2].itemTemplate(item, 'index');
        assert.equal(stubCreateComponent.getCall(2), undefined);
      });
      QUnit.test('isAlreadyShown method, tooltip is not created', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var target = ['target'];
        assert.ok(!tooltip.isAlreadyShown(target), 'tooltip is not created and haven\'t data');
      });
      QUnit.test('isAlreadyShown method, tooltip is created and shown', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = [{data: 'data1'}, {data: 'data2'}];
        var target = ['target'];
        var callback = sinon.stub();
        callback.withArgs('target').returns(target);
        callback.withArgs('visible').returns(true);
        stubComponent.option = callback;
        tooltip.show(target, dataList, this.extraOptions);
        stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
        assert.ok(tooltip.isAlreadyShown(target), 'tooltip is shown and have the same target');
        assert.ok(!tooltip.isAlreadyShown(['target_1']), 'tooltip is shown and have another target');
      });
      QUnit.test('isAlreadyShown method, tooltip is hide', function(assert) {
        var tooltip = this.createSimpleTooltip(this.tooltipOptions);
        var dataList = [{data: 'data1'}, {data: 'data2'}];
        var target = ['target'];
        var callback = sinon.stub();
        callback.withArgs('target').returns(target);
        callback.withArgs('visible').returns(false);
        stubComponent.option = callback;
        tooltip.show(target, dataList, this.extraOptions);
        assert.ok(!tooltip.isAlreadyShown(target), 'tooltip is hidden');
      });
      ['appointmentTooltip', 'dropDownAppointment'].forEach(function(template) {
        var templateName = template + 'Template';
        QUnit.test((templateName + " equal to \"" + templateName + "\""), function(assert) {
          var tooltip = this.createSimpleTooltip(this.tooltipOptions);
          var dataList = ['data1', 'data2'];
          var item = {
            appointment: 'appointment',
            targetedAppointment: 'targetedAppointment',
            color: {done: sinon.spy()}
          };
          var config = {};
          config[templateName] = templateName;
          tooltip.show('target', dataList, extend(this.extraOptions, config));
          stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
          stubCreateComponent.getCall(1).args[2].itemTemplate(item, 'index');
          assert.ok(stubAddDefaultTemplates.getCall(0).args[0][template] instanceof FunctionTemplate);
          assert.equal(stubGetAppointmentTemplate.getCall(0).args[0], templateName);
        });
        QUnit.test((templateName + " equal to custom template"), function(assert) {
          var tooltip = this.createSimpleTooltip(this.tooltipOptions);
          var dataList = ['data1', 'data2'];
          var item = {
            appointment: 'appointment',
            targetedAppointment: 'targetedAppointment',
            color: {done: sinon.spy()}
          };
          var config = {};
          config[templateName] = templateName;
          tooltip.show('target', dataList, extend(this.extraOptions, config));
          stubCreateComponent.getCall(0).args[2].contentTemplate('<div>');
          stubCreateComponent.getCall(1).args[2].itemTemplate(item, 'index');
          assert.ok(stubAddDefaultTemplates.getCall(0).args[0][template] instanceof FunctionTemplate);
          assert.equal(stubGetAppointmentTemplate.getCall(0).args[0], templateName);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["ui/scheduler/tooltip_strategies/desktopTooltipStrategy","core/templates/function_template","core/utils/extend","ui/tooltip","ui/list/ui.list.edit","ui/button","core/utils/support"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("ui/scheduler/tooltip_strategies/desktopTooltipStrategy"), require("core/templates/function_template"), require("core/utils/extend"), require("ui/tooltip"), require("ui/list/ui.list.edit"), require("ui/button"), require("core/utils/support"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=desktopTooltip.tests.js.map