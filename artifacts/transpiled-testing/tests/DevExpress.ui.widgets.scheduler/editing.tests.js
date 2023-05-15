!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/editing.tests.js"], ["jquery","core/devices","ui/tooltip/ui.tooltip","animation/fx","../../helpers/keyboardMock.js","core/element_data","generic_light.css!","ui/scheduler/ui.scheduler","ui/drop_down_button"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.ui.widgets.scheduler/editing.tests.js', ['jquery', 'core/devices', 'ui/tooltip/ui.tooltip', 'animation/fx', '../../helpers/keyboardMock.js', 'core/element_data', 'generic_light.css!', 'ui/scheduler/ui.scheduler', 'ui/drop_down_button'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const devices = $__require('core/devices');
    const tooltip = $__require('ui/tooltip/ui.tooltip');
    const fx = $__require('animation/fx');
    const keyboardMock = $__require('../../helpers/keyboardMock.js');
    const dataUtils = $__require('core/element_data');

    $__require('generic_light.css!');
    $__require('ui/scheduler/ui.scheduler');
    $__require('ui/drop_down_button');

    QUnit.testStart(function () {
        $('#qunit-fixture').html('<div id="scheduler"></div>');
    });

    QUnit.module('Editing option: boolean', {
        beforeEach: function () {
            this.createInstance = function (options) {
                fx.off = true;

                options = options || {};
                options.editing = options.editing || false;
                this.instance = $('#scheduler').dxScheduler(options).dxScheduler('instance');
            };
        },
        afterEach: function () {
            fx.off = false;
        }
    });

    QUnit.test('Scheduler should have \'readonly\' css class', function (assert) {
        this.createInstance();
        assert.ok(this.instance.$element().hasClass('dx-scheduler-readonly'), 'Readonly class is defined');

        this.instance.option('editing', true);
        assert.notOk(this.instance.$element().hasClass('dx-scheduler-readonly'), 'Readonly class is removed');
    });

    QUnit.test('popup should not be shown  after click on focused cell', function (assert) {
        this.createInstance();

        $(this.instance.$element()).find('.dx-scheduler-date-table-cell').first().trigger('dxpointerdown').trigger('dxpointerdown').trigger('dxclick');

        assert.notOk($('.dx-scheduler-appointment-popup .dx-overlay-content').length, 'Popup is not shown');
    });

    QUnit.test('popup should not be shown after press Enter', function (assert) {
        this.createInstance({ focusStateEnabled: true });

        const $workSpace = $(this.instance.$element().find('.dx-scheduler-work-space'));
        const keyboard = keyboardMock($workSpace);

        $($workSpace).trigger('focusin');
        keyboard.keyDown('enter');

        assert.notOk($('.dx-scheduler-appointment-popup .dx-overlay-content').length, 'Popup is not shown');
    });

    QUnit.test('Appointment should not be draggable & resizable', function (assert) {
        this.createInstance({
            currentDate: new Date(2015, 5, 15),
            firstDayOfWeek: 1,
            dataSource: [{
                text: 'a',
                startDate: new Date(2015, 5, 15, 10),
                endDate: new Date(2015, 5, 15, 10, 30)
            }]
        });

        const appointments = this.instance.$element().find('.dx-scheduler-scrollable-appointments').dxSchedulerAppointments('instance');
        assert.notOk(appointments.option('allowDrag'), 'Drag is not allowed');
        assert.notOk(appointments.option('allowResize'), 'Resize is not allowed');

        this.instance.option('editing', true);
        assert.ok(appointments.option('allowDrag'), 'Drag is allowed');
        assert.ok(appointments.option('allowResize'), 'Resize is allowed');
    });

    QUnit.test('Edit button should not be contain the \'pencil\' icon', function (assert) {
        this.createInstance({
            currentDate: new Date(2015, 5, 15),
            firstDayOfWeek: 1,
            dataSource: [{
                text: 'a',
                startDate: new Date(2015, 5, 15, 10),
                endDate: new Date(2015, 5, 15, 10, 30)
            }]
        });

        const $appointment = $(this.instance.$element().find('.dx-scheduler-appointment').first());

        const itemData = dataUtils.data($appointment[0], 'dxItemData');

        this.instance.showAppointmentTooltip(itemData, $appointment);

        assert.notOk($('.dx-scheduler-appointment-tooltip-buttons .dx-button').hasClass('dx-button-has-icon'), 'Edit button is OK');
        tooltip.hide();
    });

    QUnit.test('ReadOnly option should be passed to the details appointment view', function (assert) {
        this.createInstance();

        this.instance.showAppointmentPopup({
            text: 'a',
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 11)
        });

        let detailsAppointmentView = this.instance.getAppointmentDetailsForm();

        assert.ok(detailsAppointmentView.option('readOnly'), 'ReadOnly option is correct');

        this.instance.option('editing', true);
        this.instance.showAppointmentPopup({
            text: 'a',
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 11)
        });
        detailsAppointmentView = this.instance.getAppointmentDetailsForm();

        assert.notOk(detailsAppointmentView.option('readOnly'), 'ReadOnly option is correct');
    });

    QUnit.test('Details appointment view should be readOnly if editing.allowUpdating=false', function (assert) {
        this.createInstance({
            editing: {
                allowUpdating: false
            }
        });

        this.instance.showAppointmentPopup({
            text: 'a',
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 11)
        });

        let detailsAppointmentView = this.instance.getAppointmentDetailsForm();

        assert.ok(detailsAppointmentView.option('readOnly'), 'ReadOnly option is correct');

        this.instance.option('editing', {
            allowUpdating: true
        });
        this.instance.showAppointmentPopup({
            text: 'a',
            startDate: new Date(2015, 5, 15, 10),
            endDate: new Date(2015, 5, 15, 11)
        });
        detailsAppointmentView = this.instance.getAppointmentDetailsForm();

        assert.notOk(detailsAppointmentView.option('readOnly'), 'ReadOnly option is correct');
    });

    QUnit.test('Details appointment view shouldn\'t be readOnly when adding new appointment if editing.allowUpdating=false', function (assert) {
        this.createInstance({
            currentDate: new Date(2015, 5, 14),
            editing: {
                allowUpdating: false,
                allowAdding: true
            }
        });

        this.instance.showAppointmentPopup({
            text: 'a',
            startDate: new Date(2015, 12, 15, 10),
            endDate: new Date(2015, 12, 15, 11)
        }, true);

        const detailsAppointmentView = this.instance.getAppointmentDetailsForm();

        assert.notOk(detailsAppointmentView.option('readOnly'), 'ReadOnly option is correct');
    });

    QUnit.test('Details appointment form should be readOnly after adding new appointment if editing.allowUpdating=false', function (assert) {
        this.createInstance({
            currentDate: new Date(2015, 5, 14),
            editing: {
                allowUpdating: false
            },
            dataSource: []
        });

        const a = { text: 'a', startDate: new Date(2015, 5, 14, 0), endDate: new Date(2015, 5, 14, 0, 30) };

        this.instance.showAppointmentPopup(a, true);
        this.instance.hideAppointmentPopup();

        this.instance.showAppointmentPopup(a);

        const detailsAppointmentView = this.instance.getAppointmentDetailsForm();

        assert.ok(detailsAppointmentView.option('readOnly'), 'ReadOnly option is correct');
        this.instance.hideAppointmentPopup();
    });

    QUnit.test('Details form of new appointment shouldn\'t be readOnly after try to change existing appointment if editing.allowUpdating=false', function (assert) {
        const first = { text: 'first', startDate: new Date(2015, 5, 14, 0), endDate: new Date(2015, 5, 14, 0, 30) };
        const second = { text: 'second', startDate: new Date(2015, 5, 14, 1), endDate: new Date(2015, 5, 14, 1, 30) };

        this.createInstance({
            currentDate: new Date(2015, 5, 14),
            editing: {
                allowUpdating: false
            },
            dataSource: [first]
        });
        this.instance.showAppointmentPopup(first);
        this.instance.hideAppointmentPopup();
        this.instance.showAppointmentPopup(second, true);

        const detailsAppointmentView = this.instance.getAppointmentDetailsForm();

        assert.notOk(detailsAppointmentView.option('readOnly'), 'ReadOnly option is correct');
        this.instance.hideAppointmentPopup();
    });

    QUnit.module('Editing option: complex object', {
        beforeEach: function () {
            this.createInstance = function (options) {
                fx.off = true;

                options = options || {};
                !options.editing && (options.editing = {
                    allowAdding: false,
                    allowUpdating: false,
                    allowDeleting: false,
                    allowResizing: false,
                    allowDragging: false
                });
                this.instance = $('#scheduler').dxScheduler(options).dxScheduler('instance');
            };
        },
        afterEach: function () {
            fx.off = false;
        }
    });

    QUnit.test('Scheduler should have \'readonly\' css class for complex object editing option', function (assert) {
        this.createInstance();
        assert.ok(this.instance.$element().hasClass('dx-scheduler-readonly'), 'Readonly class is defined');

        this.instance.option('editing.allowUpdating', true);
        assert.notOk(this.instance.$element().hasClass('dx-scheduler-readonly'), 'Readonly class is removed');
    });

    QUnit.test('showAppointmentPopup method should not be called after click on focused cell if editing.allowAdding is false', function (assert) {
        this.createInstance({
            editing: {
                allowAdding: false
            }
        });
        const spy = sinon.spy(this.instance, 'showAppointmentPopup');

        $(this.instance.$element()).find('.dx-scheduler-date-table-cell').first().trigger('dxpointerdown').trigger('dxpointerdown');

        assert.notOk(spy.called, 'showAppointmentPopup is not called');

        this.instance.showAppointmentPopup.restore();
    });

    QUnit.test('Appointment should not be draggable & resizable if editing.allowUpdating is false', function (assert) {
        if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'test does not actual for mobile devices');
            return;
        }

        this.createInstance({
            editing: {
                allowUpdating: false
            },
            currentDate: new Date(2015, 5, 15),
            firstDayOfWeek: 1,
            dataSource: [{
                text: 'a',
                startDate: new Date(2015, 5, 15, 10),
                endDate: new Date(2015, 5, 15, 10, 30)
            }]
        });

        const appointments = this.instance.$element().find('.dx-scheduler-scrollable-appointments').dxSchedulerAppointments('instance');
        assert.notOk(appointments.option('allowDrag'), 'Drag is not allowed');
        assert.notOk(appointments.option('allowResize'), 'Resize is not allowed');

        this.instance.option('editing', {
            allowUpdating: true
        });
        assert.ok(appointments.option('allowDrag'), 'Drag is allowed');
        assert.ok(appointments.option('allowResize'), 'Resize is allowed');
    });

    QUnit.test('Appointment should not be resizable if editing.allowResizing is false', function (assert) {
        this.createInstance({
            editing: {
                allowResizing: false
            },
            currentDate: new Date(2015, 5, 15),
            firstDayOfWeek: 1,
            dataSource: [{
                text: 'a',
                startDate: new Date(2015, 5, 15, 10),
                endDate: new Date(2015, 5, 15, 10, 30)
            }]
        });

        const appointments = this.instance.$element().find('.dx-scheduler-scrollable-appointments').dxSchedulerAppointments('instance');
        assert.notOk(appointments.option('allowResize'), 'Resize is not allowed');

        this.instance.option('editing', {
            allowResizing: true
        });
        assert.ok(appointments.option('allowResize'), 'Resize is allowed');
    });

    QUnit.test('Appointment should not be draggable if editing.allowDragging is false', function (assert) {
        this.createInstance({
            editing: {
                allowDragging: false
            },
            currentDate: new Date(2015, 5, 15),
            firstDayOfWeek: 1,
            dataSource: [{
                text: 'a',
                startDate: new Date(2015, 5, 15, 10),
                endDate: new Date(2015, 5, 15, 10, 30)
            }]
        });

        const appointments = this.instance.$element().find('.dx-scheduler-scrollable-appointments').dxSchedulerAppointments('instance');
        assert.notOk(appointments.option('allowDrag'), 'Drag is not allowed');

        this.instance.option('editing', {
            allowDragging: true
        });
        assert.ok(appointments.option('allowDrag'), 'Drag is allowed');
    });

    QUnit.test('Appointment should not be deleted, if allowUpdating || allowDeleting = false', function (assert) {
        this.createInstance({
            currentDate: new Date(2015, 5, 15),
            firstDayOfWeek: 1,
            dataSource: [{
                text: 'a',
                startDate: new Date(2015, 5, 15, 10),
                endDate: new Date(2015, 5, 15, 10, 30)
            }],
            editing: {
                allowUpdating: false,
                allowDeleting: false
            }
        });

        let appointments = this.instance.$element().find('.dx-scheduler-scrollable-appointments').dxSchedulerAppointments('instance');
        assert.strictEqual(appointments.option('allowDelete'), false, 'Delete is not allowed');

        this.instance.option('editing', {
            allowUpdating: false,
            allowDeleting: true
        });

        assert.strictEqual(appointments.option('allowDelete'), false, 'Delete is not allowed');

        this.instance.option('editing', {
            allowUpdating: true,
            allowDeleting: true
        });

        appointments = this.instance.$element().find('.dx-scheduler-scrollable-appointments').dxSchedulerAppointments('instance');
        assert.strictEqual(appointments.option('allowDelete'), true, 'Delete is allowed');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/devices","ui/tooltip/ui.tooltip","animation/fx","../../helpers/keyboardMock.js","core/element_data","generic_light.css!","ui/scheduler/ui.scheduler","ui/drop_down_button"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/devices"), require("ui/tooltip/ui.tooltip"), require("animation/fx"), require("../../helpers/keyboardMock.js"), require("core/element_data"), require("generic_light.css!"), require("ui/scheduler/ui.scheduler"), require("ui/drop_down_button"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=editing.tests.js.map