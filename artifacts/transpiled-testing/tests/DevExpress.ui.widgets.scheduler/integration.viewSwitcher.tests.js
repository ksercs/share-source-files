!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.scheduler/integration.viewSwitcher.tests.js"], ["jquery","generic_light.css!","ui/drop_down_button","core/utils/common","data/data_source/data_source","ui/scheduler/ui.scheduler"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.ui.widgets.scheduler/integration.viewSwitcher.tests.js', ['jquery', 'generic_light.css!', 'ui/drop_down_button', 'core/utils/common', 'data/data_source/data_source', 'ui/scheduler/ui.scheduler'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');

    QUnit.testStart(function () {
        $('#qunit-fixture').html('<div id="scheduler">\
            <div data-options="dxTemplate: { name: \'template\' }">Task Template</div>\
            </div>');
    });

    $__require('generic_light.css!');
    $__require('ui/drop_down_button');

    const noop = $__require('core/utils/common').noop;
    const DataSource = $__require('data/data_source/data_source').DataSource;

    $__require('ui/scheduler/ui.scheduler');

    QUnit.module('Integration: View switcher', {
        beforeEach: function () {
            this.createInstance = function (options) {
                this.instance = $('#scheduler').dxScheduler(options).dxScheduler('instance');
            };
        }
    });

    QUnit.test('dataSource should be filtered if \'currentView\' option is changed', function (assert) {
        const dataSource = new DataSource({
            store: [{
                startDate: new Date(2015, 3, 1),
                endDate: new Date(2015, 3, 1, 0, 30),
                text: 'Item 1',
                ownerId: 1
            }, {
                startDate: new Date(2015, 3, 1),
                text: 'Item 2',
                ownerId: 3
            }, {
                startDate: new Date(2015, 4, 1),
                text: 'Item 3',
                ownerId: 1
            }]
        });

        this.createInstance({
            views: ['day', 'week'],
            currentView: 'week',
            currentDate: new Date(2015, 3, 1),
            dataSource: dataSource,
            groups: ['ownerId'],
            remoteFiltering: true,
            resources: [{
                field: 'ownerId',
                dataSource: [{
                    text: 'Jack',
                    id: 1,
                    color: 'red'
                }]
            }]
        });

        this.instance.option('currentView', 'day');

        assert.deepEqual(dataSource.items(), [{
            startDate: new Date(2015, 3, 1),
            text: 'Item 1',
            ownerId: 1,
            endDate: new Date(2015, 3, 1, 0, 30)
        }], 'Data is filtered');
    });

    QUnit.test('Appointment should be rerendered only once if \'currentView\' option is changed', function (assert) {
        const options = {
            views: ['month', 'week'],
            currentView: 'week',
            currentDate: new Date(2015, 3, 1),
            dataSource: new DataSource({
                store: [{
                    startDate: new Date(2015, 3, 1),
                    endDate: new Date(2015, 3, 1, 0, 30),
                    text: 'Item 1'
                }]
            }),
            onAppointmentRendered: noop
        };

        const renderedStub = sinon.stub(options, 'onAppointmentRendered');

        this.createInstance(options);

        this.instance.option('currentView', 'month');

        assert.equal(renderedStub.callCount, 2, 'Appointment is rerendered only once');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","generic_light.css!","ui/drop_down_button","core/utils/common","data/data_source/data_source","ui/scheduler/ui.scheduler"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("generic_light.css!"), require("ui/drop_down_button"), require("core/utils/common"), require("data/data_source/data_source"), require("ui/scheduler/ui.scheduler"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=integration.viewSwitcher.tests.js.map