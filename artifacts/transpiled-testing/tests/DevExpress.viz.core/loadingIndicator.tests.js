!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.core/loadingIndicator.tests.js"], ["core/utils/common","../../helpers/vizMocks.js","viz/core/loading_indicator"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.viz.core/loadingIndicator.tests.js', ['core/utils/common', '../../helpers/vizMocks.js', 'viz/core/loading_indicator'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const noop = $__require('core/utils/common').noop;
    const vizMocks = $__require('../../helpers/vizMocks.js');
    const loadingIndicatorModule = $__require('viz/core/loading_indicator');

    QUnit.module('Common', {
        beforeEach: function () {
            this.renderer = new vizMocks.Renderer();
            this.eventTrigger = sinon.spy();
            this.notify = sinon.spy();
            this.loadingIndicator = new loadingIndicatorModule.LoadingIndicator({ renderer: this.renderer, eventTrigger: this.eventTrigger, notify: this.notify });
            this.group = this.renderer.g.lastCall.returnValue;
            this.rect = this.renderer.rect.lastCall.returnValue;
            this.text = this.renderer.text.lastCall.returnValue;
        },

        afterEach: function () {
            this.loadingIndicator.dispose();
        },

        checkAnimation: function (assert, opacity) {
            assert.deepEqual(this.rect.stopAnimation.lastCall.args, [], 'rect animation is stopped');
            assert.deepEqual(this.rect.animate.lastCall.args, [{ opacity: opacity }, { easing: 'linear', duration: 400, unstoppable: true, complete: this.rect.animate.lastCall.args[1].complete }], 'rect animation is started');
        },

        reset: function () {
            this.eventTrigger.reset();
            this.notify.reset();
            this.renderer.root.stub('attr').reset();
            this.rect.stub('animate').reset();
            this.group.stub('linkAppend').reset();
            this.group.stub('linkRemove').reset();
        }
    });

    QUnit.test('Construction', function (assert) {
        assert.deepEqual(this.group.attr.lastCall.args, [{ 'class': 'dx-loading-indicator' }], 'root settings');
        assert.deepEqual(this.group.linkOn.lastCall.args, [this.renderer.root, { name: 'loading-indicator', after: 'peripheral' }], 'root is linked to container');
        assert.deepEqual(this.rect.append.lastCall.args, [this.group], 'rect is appended to root');
        assert.deepEqual(this.rect.attr.lastCall.args, [{ opacity: 0 }], 'rect settings');
        assert.deepEqual(this.renderer.text.lastCall.args, [], 'text is created');
        assert.deepEqual(this.text.append.lastCall.args, [this.group], 'text is appended to root');
        assert.deepEqual(this.text.attr.lastCall.args, [{ align: 'center' }], 'text settings');
    });

    QUnit.test('Disposing', function (assert) {
        this.loadingIndicator.dispose();
        this.loadingIndicator.dispose = noop; // To prevent crash on `afterEach`; `dispose` is not expected to be reenterable

        assert.deepEqual(this.group.linkRemove.lastCall.args, [], 'root is removed');
        assert.deepEqual(this.group.linkOff.lastCall.args, [], 'root is unlinked');
    });

    QUnit.test('Show', function (assert) {
        this.loadingIndicator.show();

        assert.deepEqual(this.group.linkAppend.lastCall.args, [], 'group is appended to container');
        assert.deepEqual(this.renderer.root.css.lastCall.args, [{ 'pointer-events': 'none' }], 'renderer root style');
        this.checkAnimation(assert, 0.85);
        assert.deepEqual(this.notify.lastCall.args, [true], 'notification');
        assert.strictEqual(this.eventTrigger.lastCall, null, 'no event');
        this.rect.animate.lastCall.args[1].complete();
        assert.deepEqual(this.eventTrigger.lastCall.args, ['loadingIndicatorReady'], 'event');
    });

    QUnit.test('Hide', function (assert) {
        this.loadingIndicator.show();
        this.reset();

        this.loadingIndicator.hide();

        assert.strictEqual(this.group.linkRemove.lastCall, null, 'group is not removed from container');
        assert.strictEqual(this.renderer.root.attr.lastCall, null, 'renderer root settings');
        this.checkAnimation(assert, 0);
        assert.deepEqual(this.notify.lastCall.args, [false], 'notification');
        assert.strictEqual(this.eventTrigger.lastCall, null, 'no event');
        this.rect.animate.lastCall.args[1].complete();
        assert.deepEqual(this.group.linkRemove.lastCall.args, [], 'group is removed from container');
        assert.deepEqual(this.renderer.root.css.lastCall.args, [{ 'pointer-events': '' }], 'renderer root style');
        assert.deepEqual(this.eventTrigger.lastCall.args, ['loadingIndicatorReady'], 'event');
    });

    QUnit.test('Show when already shown', function (assert) {
        this.loadingIndicator.show();
        this.reset();

        this.loadingIndicator.show();

        assert.strictEqual(this.rect.animate.lastCall, null, 'rect is not animated');
        assert.strictEqual(this.group.linkAppend.lastCall, null, 'group is not appended to container');
        assert.strictEqual(this.notify.lastCall, null, 'no notification');
        assert.strictEqual(this.eventTrigger.lastCall, null, 'no event');
    });

    QUnit.test('Hide when already hidden', function (assert) {
        this.loadingIndicator.hide();
        this.reset();

        this.loadingIndicator.hide();

        assert.strictEqual(this.rect.animate.lastCall, null, 'rect is not animated');
        assert.strictEqual(this.group.linkRemove.lastCall, null, 'group is not removed from container');
        assert.strictEqual(this.notify.lastCall, null, 'no notification');
        assert.strictEqual(this.eventTrigger.lastCall, null, 'no event');
    });

    QUnit.test('Set size', function (assert) {
        this.loadingIndicator.setSize({ width: 400, height: 300 });

        assert.deepEqual(this.rect.attr.lastCall.args, [{ width: 400, height: 300 }], 'rect settings');
        assert.deepEqual(this.text.attr.lastCall.args, [{ x: 200, y: 150 }], 'text settings');
    });

    QUnit.test('Set options / `show` is false', function (assert) {
        const show = sinon.spy(this.loadingIndicator, 'show');
        const hide = sinon.spy(this.loadingIndicator, 'hide');
        this.loadingIndicator.setOptions({
            backgroundColor: 'red',
            font: { size: 13, color: 'blue' },
            text: 'Loading...',
            show: false,
            cssClass: 'loadingindicator_class'
        });

        assert.deepEqual(this.rect.attr.lastCall.args, [{ fill: 'red' }], 'rect settings');
        assert.deepEqual(this.text.attr.lastCall.args, [{ text: 'Loading...', 'class': 'loadingindicator_class' }], 'text settings');
        assert.deepEqual(this.text.css.lastCall.args, [{ fill: 'blue', 'font-size': 13 }], 'text css');
        assert.strictEqual(show.lastCall, null, 'show is not called');
        assert.deepEqual(hide.lastCall.args, [], 'hide is called');
    });

    QUnit.test('Set options / `show` is true', function (assert) {
        const show = sinon.spy(this.loadingIndicator, 'show');
        const hide = sinon.spy(this.loadingIndicator, 'hide');
        this.loadingIndicator.setOptions({
            backgroundColor: 'red', font: { size: 13, color: 'blue' }, text: 'Loading...', show: true
        });

        assert.deepEqual(this.rect.attr.lastCall.args, [{ fill: 'red' }], 'rect settings');
        assert.deepEqual(this.text.attr.lastCall.args, [{ text: 'Loading...', 'class': undefined }], 'text settings');
        assert.deepEqual(this.text.css.lastCall.args, [{ fill: 'blue', 'font-size': 13 }], 'text css');
        assert.deepEqual(show.lastCall.args, [], 'show is called');
        assert.strictEqual(hide.lastCall, null, 'hide is not called');
    });

    QUnit.module('Scheduling', {
        beforeEach: function () {
            const that = this;
            that.loadingIndicator = new loadingIndicatorModule.LoadingIndicator({
                renderer: new vizMocks.Renderer(),
                eventTrigger: noop,
                notify: function () {
                    that.notify && that.notify.apply(that, arguments);
                }
            });
            that.hide = sinon.spy(that.loadingIndicator, 'hide');
        },

        afterEach: function () {
            this.loadingIndicator.dispose();
        }
    });

    QUnit.test('Fulfill scheduled hiding', function (assert) {
        this.loadingIndicator.scheduleHiding();

        this.loadingIndicator.fulfillHiding();

        assert.deepEqual(this.hide.lastCall.args, []);
    });

    QUnit.test('Fulfill non scheduled hiding', function (assert) {
        this.loadingIndicator.fulfillHiding();

        assert.strictEqual(this.hide.lastCall, null);
    });

    QUnit.test('Fulfill hiding canceled by \'show\'', function (assert) {
        this.loadingIndicator.scheduleHiding();
        this.loadingIndicator.show();

        this.loadingIndicator.fulfillHiding();

        assert.strictEqual(this.hide.lastCall, null);
    });

    QUnit.test('Fulfill hiding canceled by \'hide\'', function (assert) {
        this.loadingIndicator.show();
        this.loadingIndicator.scheduleHiding();
        this.loadingIndicator.hide();
        this.hide.reset();

        this.loadingIndicator.fulfillHiding();

        assert.strictEqual(this.hide.lastCall, null);
    });

    QUnit.test('Hiding is not scheduled on show', function (assert) {
        const loadingIndicator = this.loadingIndicator;
        this.notify = function () {
            loadingIndicator.scheduleHiding();
        };

        loadingIndicator.show();
        loadingIndicator.fulfillHiding();

        assert.strictEqual(this.hide.lastCall, null);
    });

    QUnit.test('Hiding is not scheduled on hide', function (assert) {
        const loadingIndicator = this.loadingIndicator;
        loadingIndicator.show();
        this.notify = function () {
            loadingIndicator.scheduleHiding();
        };

        loadingIndicator.hide();
        this.hide.reset();
        loadingIndicator.fulfillHiding();

        assert.strictEqual(this.hide.lastCall, null);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/common","../../helpers/vizMocks.js","viz/core/loading_indicator"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/common"), require("../../helpers/vizMocks.js"), require("viz/core/loading_indicator"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=loadingIndicator.tests.js.map