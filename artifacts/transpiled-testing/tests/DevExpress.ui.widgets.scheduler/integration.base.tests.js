!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/integration.base.tests.js"], ["core/utils/size","jquery","generic_light.css!","core/utils/common","ui/widget/ui.errors","core/config","ui/scheduler/ui.scheduler","ui/drop_down_button"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.ui.widgets.scheduler/integration.base.tests.js', ['core/utils/size', 'jquery', 'generic_light.css!', 'core/utils/common', 'ui/widget/ui.errors', 'core/config', 'ui/scheduler/ui.scheduler', 'ui/drop_down_button'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const { getOuterHeight } = $__require('core/utils/size');
    const $ = $__require('jquery');

    QUnit.testStart(function () {
        $('#qunit-fixture').html('<div id="scheduler">\
            <div data-options="dxTemplate: { name: \'template\' }">Task Template</div>\
            </div>');
    });

    $__require('generic_light.css!');

    const noop = $__require('core/utils/common').noop;
    const errors = $__require('ui/widget/ui.errors');
    const config = $__require('core/config');

    $__require('ui/scheduler/ui.scheduler');
    $__require('ui/drop_down_button');

    QUnit.module('Integration: Base', {
        beforeEach: function () {
            this.createInstance = function (options) {
                this.instance = $('#scheduler').dxScheduler(options).dxScheduler('instance');
            };
            this.compareDates = function (actual, expected, assert) {
                assert.ok(actual instanceof Date, 'WorkSpace current date is instance of Date');
                assert.equal(actual.getFullYear(), expected.year, 'Year is OK');
                assert.equal(actual.getMonth(), expected.month, 'Month is OK');
                assert.equal(actual.getDate(), expected.date, 'Date is OK');
            };
        }
    });

    QUnit.test('Scheduler should have a header', function (assert) {
        this.createInstance();
        assert.equal(this.instance.$element().find('.dx-scheduler-header').length, 1, 'Scheduler has the header');
    });

    QUnit.test('Header should be initialized with correct views and currentView options', function (assert) {
        this.createInstance({
            views: ['day', 'week'],
            currentView: 'week'
        });
        const header = this.instance.$element().find('.dx-scheduler-header').dxSchedulerHeader('instance');
        assert.deepEqual(header.option('views'), ['day', 'week'], 'Scheduler header has a correct views option');
        assert.equal(header.option('currentView'), 'week', 'Scheduler header has a correct current view');
    });

    QUnit.test('Height of \'dx-scheduler-group-row\' should be equal with height of \'dx-scheduler-date-table-row\'', function (assert) {
        const priorities = [{
            text: 'High priority',
            id: 1,
            color: '#cc5c53'
        }, {
            text: 'Low priority',
            id: 2,
            color: '#ff9747'
        }];
        const owners = [{
            text: 'Samantha Bright',
            id: 1,
            color: '#727bd2'
        }, {
            text: 'John Heart',
            id: 2,
            color: '#32c9ed'
        }];

        const data = [{
            text: 'Website Re-Design Plan',
            ownerId: 1, roomId: 1, priorityId: 2,
            startDate: new Date(2017, 4, 22, 9, 30),
            endDate: new Date(2017, 4, 22, 11, 30)
        }, {
            text: 'Book Flights to San Fran for Sales Trip',
            ownerId: 2, roomId: 2, priorityId: 1,
            startDate: new Date(2017, 4, 22, 12, 0),
            endDate: new Date(2017, 4, 22, 13, 0),
            allDay: true
        }];

        this.createInstance({
            dataSource: data,
            views: ['timelineWeek'],
            currentView: 'timelineWeek',
            currentDate: new Date(2017, 4, 22),
            groups: ['ownerId', 'priorityId'],
            resources: [{
                fieldExpr: 'priorityId',
                dataSource: priorities,
                label: 'Priority'
            }, {
                fieldExpr: 'ownerId',
                dataSource: owners,
                label: 'Owner'
            }],
            height: 600
        });

        const $element = this.instance.$element();
        const groupRow = $element.find('.dx-scheduler-group-flex-container .dx-scheduler-group-row:last-child .dx-scheduler-group-header').eq(0);
        const dataTableRow = $element.find('.dx-scheduler-date-table-row').eq(0);

        assert.roughEqual(getOuterHeight(groupRow), getOuterHeight(dataTableRow), 0.3, 'Row heights are equal');
    });

    QUnit.test('Header should be updated with correct \'width\' option', function (assert) {
        this.createInstance({
            views: ['day', 'week'],
            currentView: 'week',
            width: 700
        });
        this.instance.option('width', 800);
        const header = this.instance.$element().find('.dx-scheduler-header').dxSchedulerHeader('instance');

        assert.equal(header.option('width'), 800, 'Header has a right width');
    });

    QUnit.test('Header should be initialized with correct useDropDownViewSwitcher option', function (assert) {
        this.createInstance({
            useDropDownViewSwitcher: true
        });
        const $element = this.instance.$element();
        assert.strictEqual($element.find('.dx-scheduler-header').dxSchedulerHeader('instance').option('useDropDownViewSwitcher'), true, 'Scheduler header has a correct useDropDownViewSwitcher option');
    });

    QUnit.test('Header should be updated with correct useDropDownViewSwitcher option', function (assert) {
        this.createInstance({
            useDropDownViewSwitcher: true
        });
        this.instance.option('useDropDownViewSwitcher', false);
        const $element = this.instance.$element();
        assert.strictEqual($element.find('.dx-scheduler-header').dxSchedulerHeader('instance').option('useDropDownViewSwitcher'), false, 'Scheduler header has a correct useDropDownViewSwitcher option');
    });

    QUnit.test('Scheduler should have a work space', function (assert) {
        this.createInstance();
        assert.equal(this.instance.$element().find('.dx-scheduler-work-space').length, 1, 'Scheduler has the work space');
    });

    QUnit.test('Scheduler should have a tasks', function (assert) {
        this.createInstance();
        assert.equal(this.instance.$element().find('.dx-scheduler-scrollable-appointments').length, 1, 'Scheduler has tasks');
    });

    QUnit.test('Scheduler should handle events from units', function (assert) {
        this.createInstance();
        const checkSchedulerUnit = function (selector, unitName) {
            const unit = this.instance.$element().find(selector)[unitName]('instance');

            const spy = sinon.spy(noop);

            this.instance.subscribe('testFunction', spy);

            const observer = unit.option('observer');

            assert.equal(observer, this.instance, 'observer is instance of scheduler');

            unit.notifyObserver('testFunction', { a: 1 });

            assert.ok(spy.calledOnce, 'testFunction called once');
            assert.deepEqual(spy.getCall(0).args[0], { a: 1 }, 'testFunction has right args');
            assert.ok(spy.calledOn(this.instance), 'testFunction has a right context');
        };

        checkSchedulerUnit.call(this, '.dx-scheduler-work-space', 'dxSchedulerWorkSpaceDay');
        checkSchedulerUnit.call(this, '.dx-scheduler-scrollable-appointments', 'dxSchedulerAppointments');
    });

    QUnit.test('Scheduler should be able to invoke unit methods', function (assert) {
        this.createInstance();

        this.instance.subscribe('testFn', function (a, b) {

            assert.equal(a, 1, 'the first arg is OK');
            assert.equal(b, 2, 'the second arg is OK');

            return a + b;
        });

        const result = this.instance.getWorkSpace().invoke('testFn', 1, 2);

        assert.equal(result, 3, 'result is OK');
    });

    QUnit.test('scheduler should work with disabled: true', function (assert) {
        assert.expect(0);

        this.createInstance({
            disabled: true
        });
    });

    QUnit.test('The \'min\' option should be converted to Date obj before send to work space and header', function (assert) {
        let date = new Date(1422738000000);
        this.createInstance({
            min: date.getTime()
        });

        const header = this.instance.getHeader();

        this.compareDates(header.option('min'), { year: date.getFullYear(), month: date.getMonth(), date: date.getDate() }, assert);

        date = new Date(1425243600000);
        this.instance.option('min', date.getTime());
        this.compareDates(header.option('min'), { year: date.getFullYear(), month: date.getMonth(), date: date.getDate() }, assert);
    });

    QUnit.test('The \'max\' option should be converted to Date obj before send to work space and header', function (assert) {
        let date = new Date(1422738000000);
        this.createInstance({
            max: date.getTime()
        });

        const header = this.instance.getHeader();

        this.compareDates(header.option('max'), { year: date.getFullYear(), month: date.getMonth(), date: date.getDate() }, assert);

        date = new Date(1425243600000);
        this.instance.option('max', date.getTime());
        this.compareDates(header.option('max'), { year: date.getFullYear(), month: date.getMonth(), date: date.getDate() }, assert);
    });

    QUnit.test('Scheduler should not throw an error when the details form is opened for the first time', function (assert) {
        const errorLogStub = sinon.stub(errors, 'log');

        try {
            errorLogStub.withArgs('W1002').returns(true).throws('Non W1002 Exception');

            this.createInstance();
            this.instance.showAppointmentPopup({ startDate: new Date() });

            assert.ok(true, 'exception was not thrown');
        } finally {
            errorLogStub.restore();
        }
    });

    QUnit.test('The \'scrollingEnabled\' option of an appointment form should be \'true\'', function (assert) {
        this.createInstance();
        this.instance.showAppointmentPopup({ startDate: new Date() });

        assert.strictEqual(this.instance.getAppointmentDetailsForm().option('scrollingEnabled'), true, 'the scrollingEnabled option is OK');
    });

    QUnit.module('Integration: Date options with ISO8601', {
        beforeEach: function () {
            this.defaultForceIsoDateParsing = config().forceIsoDateParsing;
            config().forceIsoDateParsing = true;
            this.createInstance = function (options) {
                this.instance = $('#scheduler').dxScheduler(options).dxScheduler('instance');
            };
        },
        afterEach: function () {
            config().forceIsoDateParsing = this.defaultForceIsoDateParsing;
        }
    });

    QUnit.test('currentDate option should be parsed with ISO8601 dates before sending to workspace and header', function (assert) {
        this.createInstance({
            views: ['day'],
            currentView: 'day',
            currentDate: '20170208'
        });

        const workSpace = this.instance.getWorkSpace();
        const header = this.instance.getHeader();

        assert.deepEqual(workSpace.option('currentDate'), new Date(2017, 1, 8), 'currentDate is OK');
        assert.deepEqual(header.option('currentDate'), new Date(2017, 1, 8), 'currentDate is OK');

        this.instance.option('currentDate', '20170209');

        assert.deepEqual(workSpace.option('currentDate'), new Date(2017, 1, 9), 'currentDate is OK after option change');
        assert.deepEqual(header.option('currentDate'), new Date(2017, 1, 9), 'currentDate is OK  after option change');
    });

    QUnit.test('max option should be parsed with ISO8601 dates before sending to workspace and header', function (assert) {
        this.createInstance({
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2017, 1, 8),
            max: '20170209'
        });

        const header = this.instance.getHeader();

        assert.deepEqual(header.option('max'), new Date(2017, 1, 9), 'max is OK');

        this.instance.option('max', '20170210');

        assert.deepEqual(header.option('max'), new Date(2017, 1, 10), 'max is OK  after option change');
    });

    QUnit.test('min option should be parsed with ISO8601 dates before sending to workspace and header', function (assert) {
        this.createInstance({
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2017, 1, 8),
            min: '20170207'
        });

        const header = this.instance.getHeader();

        assert.deepEqual(header.option('min'), new Date(2017, 1, 7), 'min is OK');

        this.instance.option('min', '20170206');

        assert.deepEqual(header.option('min'), new Date(2017, 1, 6), 'min is OK  after option change');
    });

    QUnit.test('dimensionChanged should not generate exception if workspace is not created', function (assert) {
        this.createInstance({
            views: ['day'],
            currentView: 'day',
            currentDate: new Date(2017, 1, 8),
            min: '20170207'
        });

        this.instance._workSpace = null;

        this.instance._dimensionChanged();

        try {
            assert.ok(true, 'No exception');
        } catch (e) {
            assert.ok(false, `${e.message}`);
        }
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/size","jquery","generic_light.css!","core/utils/common","ui/widget/ui.errors","core/config","ui/scheduler/ui.scheduler","ui/drop_down_button"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/size"), require("jquery"), require("generic_light.css!"), require("core/utils/common"), require("ui/widget/ui.errors"), require("core/config"), require("ui/scheduler/ui.scheduler"), require("ui/drop_down_button"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=integration.base.tests.js.map