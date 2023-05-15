!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.animation/transitionExecutors.tests.js"], ["jquery","core/utils/common","core/devices","animation/fx","../../helpers/executeAsyncMock.js","animation/presets/presets","animation/transition_executor/transition_executor"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.animation/transitionExecutors.tests.js', ['jquery', 'core/utils/common', 'core/devices', 'animation/fx', '../../helpers/executeAsyncMock.js', 'animation/presets/presets', 'animation/transition_executor/transition_executor'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const noop = $__require('core/utils/common').noop;
    const devices = $__require('core/devices');
    const fx = $__require('animation/fx');
    const executeAsyncMock = $__require('../../helpers/executeAsyncMock.js');
    const animationPresets = $__require('animation/presets/presets').presets;
    const TransitionExecutorModule = $__require('animation/transition_executor/transition_executor');

    QUnit.module('transition executor', {
        beforeEach: function () {
            executeAsyncMock.setup();
            this._originalAnimate = fx.animate;
            this._createAnimation = fx.createAnimation;
            this._savedDevice = devices.current();
            animationPresets.clear();
        },
        afterEach: function () {
            fx.animate = this._originalAnimate;
            fx.createAnimation = this._createAnimation;
            devices.current(this._savedDevice);
            animationPresets.resetToDefaults();
            executeAsyncMock.teardown();
        }
    });

    function MockAnimation(options) {
        options = options || {};
        this.element = options.element;
        this.config = options.config;
        this.animationSetupLog = options.animationSetupLog || [];
        this.animationStartLog = options.animationStartLog || [];
        this.animationStopLog = options.animationStopLog || [];
        this.setup = options.setup || function () {
            this.animationSetupLog.push(arguments);
        };
        this.start = options.start || function () {
            this.animationStartLog.push(arguments);
        };
        this.stop = options.stop || function () {
            this.animationStopLog.push(arguments);
        };
        this.deferred = options.deferred || $.Deferred();
    }

    QUnit.test('enter/leave/start', function (assert) {
        const createAnimationLog = [];
        const animationSetupLog = [];
        const animationStartLog = [];
        const $toEnter = $('<div/>');
        const $toLeave = $('<div/>');
        const fxAnimateDeferred = $.Deferred();
        const animationConfig = { duration: 555 };

        fx.createAnimation = function (element, config) {
            const result = new MockAnimation({
                element: element,
                config: config,
                animationSetupLog: animationSetupLog,
                animationStartLog: animationStartLog,
                deferred: fxAnimateDeferred
            });
            createAnimationLog.push(result);

            return result;
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();

        transitionExecutor.enter($toEnter, animationConfig);
        transitionExecutor.leave($toLeave, animationConfig);

        assert.equal(createAnimationLog.length, 2);
        assert.equal(animationSetupLog.length, 2, 'T266556');
        assert.equal(animationStartLog.length, 0);

        const resultDeferred = transitionExecutor.start();

        assert.equal(createAnimationLog.length, 2);
        assert.equal(animationSetupLog.length, 2);
        assert.equal(animationStartLog.length, 2);

        assert.equal(createAnimationLog[0].element[0], $toEnter[0]);
        assert.equal(createAnimationLog[0].config.type, 'css');
        assert.equal(createAnimationLog[0].config.duration, 555);
        assert.equal(createAnimationLog[0].config.from, 'dx-enter dx-no-direction');
        assert.equal(createAnimationLog[0].config.to, 'dx-enter-active');

        assert.equal(createAnimationLog[1].element[0], $toLeave[0]);
        assert.equal(createAnimationLog[1].config.type, 'css');
        assert.equal(createAnimationLog[1].config.duration, 555);
        assert.equal(createAnimationLog[1].config.from, 'dx-leave dx-no-direction');
        assert.equal(createAnimationLog[1].config.to, 'dx-leave-active');
        assert.equal(resultDeferred.state(), 'pending');

        fxAnimateDeferred.resolve();

        assert.equal(createAnimationLog.length, 2);
        assert.equal(resultDeferred.state(), 'resolved');
    });

    QUnit.test('stop', function (assert) {
        const animationStopLog = [];
        const $toEnter = $('<div/>');
        const $toLeave = $('<div/>');
        const animationConfig = { duration: 555 };

        fx.createAnimation = function (element, config) {
            const fxAnimateDeferred = $.Deferred();
            const result = new MockAnimation({
                element: element,
                config: config,
                deferred: fxAnimateDeferred,
                stop: function () {
                    animationStopLog.push(arguments);
                    fxAnimateDeferred.resolve();
                }
            });

            return result;
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();

        transitionExecutor.enter($toEnter, animationConfig);
        transitionExecutor.leave($toLeave, animationConfig);
        const resultDeferred = transitionExecutor.start();
        assert.equal(animationStopLog.length, 0);
        assert.equal(resultDeferred.state(), 'pending');

        transitionExecutor.stop();

        assert.equal(animationStopLog.length, 2);
        assert.equal(resultDeferred.state(), 'resolved');
    });

    QUnit.test('works without jquery', function (assert) {
        const animationStopLog = [];
        const $toEnter = document.createElement('div');
        const $toLeave = document.createElement('div');
        const animationConfig = { duration: 555 };

        fx.createAnimation = function (element, config) {
            const fxAnimateDeferred = $.Deferred();
            const result = new MockAnimation({
                element: element,
                config: config,
                deferred: fxAnimateDeferred,
                stop: function () {
                    animationStopLog.push(arguments);
                    fxAnimateDeferred.resolve();
                }
            });

            return result;
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();

        transitionExecutor.enter($toEnter, animationConfig);
        transitionExecutor.leave($toLeave, animationConfig);
        const resultDeferred = transitionExecutor.start();
        assert.equal(animationStopLog.length, 0);
        assert.equal(resultDeferred.state(), 'pending');

        transitionExecutor.stop();

        assert.equal(animationStopLog.length, 2);
        assert.equal(resultDeferred.state(), 'resolved');
    });

    QUnit.test('enter/leave/start direction parameter', function (assert) {
        const createAnimationLog = [];
        const animationSetupLog = [];
        const animationStartLog = [];
        const $toEnter = $('<div/>');
        const $toLeave = $('<div/>');

        fx.createAnimation = function (element, config) {
            const result = new MockAnimation({
                element: element,
                config: config,
                animationSetupLog: animationSetupLog,
                animationStartLog: animationStartLog,
                deferred: $.Deferred().resolve().promise()
            });
            createAnimationLog.push(result);

            return result;
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();

        createAnimationLog.length = 0;
        transitionExecutor.enter($toEnter, { type: undefined, duration: 555, extraCssClasses: 'a b' }, { direction: 'forward' });
        transitionExecutor.leave($toLeave, { type: 'css', duration: 555, extraCssClasses: 'a b' }, { direction: 'forward' });
        transitionExecutor.start();

        assert.equal(createAnimationLog.length, 2);
        assert.equal(createAnimationLog[0].config.type, 'css');
        assert.equal(createAnimationLog[0].config.from, 'dx-enter a b dx-forward');
        assert.equal(createAnimationLog[0].config.to, 'dx-enter-active');
        assert.equal(createAnimationLog[1].config.type, 'css');
        assert.equal(createAnimationLog[1].config.from, 'dx-leave a b dx-forward');
        assert.equal(createAnimationLog[1].config.to, 'dx-leave-active');

        createAnimationLog.length = 0;
        transitionExecutor.enter($toEnter, { duration: 555 }, { direction: 'backward' });
        transitionExecutor.leave($toLeave, { duration: 555 }, { direction: 'backward' });
        transitionExecutor.start();

        assert.equal(createAnimationLog.length, 2);
        assert.equal(createAnimationLog[0].config.from, 'dx-enter dx-backward');
        assert.equal(createAnimationLog[0].config.to, 'dx-enter-active');
        assert.equal(createAnimationLog[1].config.from, 'dx-leave dx-backward');
        assert.equal(createAnimationLog[1].config.to, 'dx-leave-active');

        createAnimationLog.length = 0;
        transitionExecutor.enter($toEnter, { duration: 555 }, { direction: 'none' });
        transitionExecutor.leave($toLeave, { duration: 555 }, { direction: 'none' });
        transitionExecutor.start();

        assert.equal(createAnimationLog.length, 2);
        assert.equal(createAnimationLog[0].config.from, 'dx-enter dx-no-direction');
        assert.equal(createAnimationLog[0].config.to, 'dx-enter-active');
        assert.equal(createAnimationLog[1].config.from, 'dx-leave dx-no-direction');
        assert.equal(createAnimationLog[1].config.to, 'dx-leave-active');
    });

    QUnit.test('enter/leave/start non css', function (assert) {
        const createAnimationLog = [];
        const animationSetupLog = [];
        const animationStartLog = [];
        const $toEnter = $('<div/>');
        const $toLeave = $('<div/>');

        fx.createAnimation = function (element, config) {
            const result = new MockAnimation({
                element: element,
                config: config,
                animationSetupLog: animationSetupLog,
                animationStartLog: animationStartLog,
                deferred: $.Deferred().resolve().promise()
            });
            createAnimationLog.push(result);

            return result;
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();

        createAnimationLog.length = 0;
        transitionExecutor.enter($toEnter, { type: 'fade', from: 0.1, to: 0.9, duration: 555 });
        transitionExecutor.leave($toLeave, { type: 'fade', from: 0.9, to: 0.1, duration: 555 });
        transitionExecutor.start();

        assert.equal(createAnimationLog.length, 2);
        assert.equal(createAnimationLog[0].element[0], $toEnter[0]);
        assert.equal(createAnimationLog[0].config.type, 'fade');
        assert.equal(createAnimationLog[0].config.from, 0.1);
        assert.equal(createAnimationLog[0].config.to, 0.9);
        assert.equal(createAnimationLog[0].config.duration, 555);

        assert.equal(createAnimationLog[1].element[0], $toLeave[0]);
        assert.equal(createAnimationLog[1].config.type, 'fade');
        assert.equal(createAnimationLog[1].config.from, 0.9, 'from and to are swapped');
        assert.equal(createAnimationLog[1].config.to, 0.1);
        assert.equal(createAnimationLog[1].config.duration, 555);
    });

    QUnit.test('enter/leave/start custom animations', function (assert) {
        const createAnimationLog = [];
        const animationSetupLog = [];
        const animationStartLog = [];
        const $toEnter = $('<div/>');
        const $toLeave = $('<div/>');
        const customAnimationNoResult = { enter: noop, leave: noop };
        const modifiers = { test: 'test' };
        const deferred = $.Deferred();

        const customAnimation = {
            enter: function (element, config) {
                const result = new MockAnimation({
                    element: element,
                    config: config,
                    animationSetupLog: animationSetupLog,
                    animationStartLog: animationStartLog,
                    deferred: deferred
                });
                createAnimationLog.push(result);

                return result;
            },
            leave: function (element, config) {
                const result = new MockAnimation({
                    element: element,
                    config: config,
                    animationSetupLog: animationSetupLog,
                    animationStartLog: animationStartLog,
                    deferred: deferred
                });
                createAnimationLog.push(result);

                return result;
            }
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();

        createAnimationLog.length = 0;
        transitionExecutor.enter($toEnter, customAnimation, modifiers);
        transitionExecutor.leave($toLeave, customAnimation, modifiers);
        let transitionsPromise = transitionExecutor.start();

        assert.equal(createAnimationLog.length, 2);
        assert.equal(createAnimationLog[0].element[0], $toEnter[0]);
        assert.equal(createAnimationLog[0].config.test, 'test');
        assert.equal(createAnimationLog[1].element[0], $toLeave[0]);
        assert.equal(createAnimationLog[1].config.test, 'test');
        assert.equal(transitionsPromise.state(), 'pending');

        deferred.resolve();
        assert.equal(transitionsPromise.state(), 'resolved');

        transitionExecutor.enter($toEnter, customAnimationNoResult, modifiers);
        transitionExecutor.leave($toLeave, customAnimationNoResult, modifiers);

        transitionsPromise = transitionExecutor.start();
        assert.equal(transitionsPromise.state(), 'resolved');
    });

    QUnit.test('sync transitions', function (assert) {
        const createAnimationLog = [];
        const animationSetupLog = [];
        const animationStartLog = [];
        const $toEnter1 = $('<div/>');
        const $toEnter2 = $('<div/>');
        const $toLeave = $('<div/>');
        const fxAnimateDeferreds = [$.Deferred(), $.Deferred(), $.Deferred()];

        fx.createAnimation = function (element, config) {
            const result = new MockAnimation({
                element: element,
                config: config,
                animationSetupLog: animationSetupLog,
                animationStartLog: animationStartLog,
                deferred: fxAnimateDeferreds[createAnimationLog.length]
            });
            createAnimationLog.push(result);

            return result;
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();

        transitionExecutor.enter($toEnter1, { duration: 555 });
        transitionExecutor.enter($toEnter2, { duration: 555 });
        transitionExecutor.leave($toLeave, { duration: 555 });

        assert.equal(createAnimationLog.length, 3);

        const resultDeferred = transitionExecutor.start();
        assert.equal(createAnimationLog.length, 3);
        assert.equal(resultDeferred.state(), 'pending');

        fxAnimateDeferreds[0].resolve();
        assert.equal(resultDeferred.state(), 'pending');
        fxAnimateDeferreds[1].reject();
        assert.equal(resultDeferred.state(), 'pending', 'Addition to T300400');
        fxAnimateDeferreds[2].resolve();
        assert.equal(resultDeferred.state(), 'resolved');
    });

    QUnit.test('staggering transitions', function (assert) {
        const createAnimationLog = [];
        const animationSetupLog = [];
        const animationStartLog = [];
        const $toEnter1 = $('<div/>');
        const $toEnter2 = $('<div/>');
        const $toEnter3 = $('<div/>');
        const $toLeave1 = $('<div/>');
        const $toLeave2 = $('<div/>');
        const $toLeave3 = $('<div/>');
        const fxAnimateDeferred = $.Deferred().resolve();
        const animation = {
            duration: 555,
            delay: 100,
            staggerDelay: 111
        };

        fx.createAnimation = function (element, config) {
            const result = new MockAnimation({
                element: element,
                config: config,
                animationSetupLog: animationSetupLog,
                animationStartLog: animationStartLog,
                deferred: fxAnimateDeferred
            });
            createAnimationLog.push(result);

            return result;
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();

        transitionExecutor.enter($toEnter1, animation);
        transitionExecutor.enter($toEnter2, animation);
        transitionExecutor.enter($toEnter3, animation);

        transitionExecutor.leave($toLeave1, animation);
        transitionExecutor.leave($toLeave2, animation);
        transitionExecutor.leave($toLeave3, animation);

        assert.equal(createAnimationLog.length, 6);
        transitionExecutor.start();

        assert.equal(createAnimationLog.length, 6);

        assert.equal(createAnimationLog[0].element[0], $toEnter1[0]);
        assert.equal(createAnimationLog[0].config.duration, 555);
        assert.equal(createAnimationLog[0].config.delay, 100);

        assert.equal(createAnimationLog[1].element[0], $toEnter2[0]);
        assert.equal(createAnimationLog[1].config.duration, 555);
        assert.equal(createAnimationLog[1].config.delay, 211);

        assert.equal(createAnimationLog[2].element[0], $toEnter3[0]);
        assert.equal(createAnimationLog[2].config.duration, 555);
        assert.equal(createAnimationLog[2].config.delay, 322);

        assert.equal(createAnimationLog[3].element[0], $toLeave1[0]);
        assert.equal(createAnimationLog[3].config.duration, 555);
        assert.equal(createAnimationLog[3].config.delay, 100);

        assert.equal(createAnimationLog[4].element[0], $toLeave2[0]);
        assert.equal(createAnimationLog[4].config.duration, 555);
        assert.equal(createAnimationLog[4].config.delay, 211);

        assert.equal(createAnimationLog[5].element[0], $toLeave3[0]);
        assert.equal(createAnimationLog[5].config.duration, 555);
        assert.equal(createAnimationLog[5].config.delay, 322);
    });

    QUnit.test('animation device-dependent presets', function (assert) {
        const createAnimationLog = [];
        const animationSetupLog = [];
        const animationStartLog = [];
        const $toEnter = $('<div/>');

        fx.createAnimation = function (element, config) {
            const result = new MockAnimation({
                element: element,
                config: config,
                animationSetupLog: animationSetupLog,
                animationStartLog: animationStartLog,
                deferred: $.Deferred().resolve().promise()
            });
            createAnimationLog.push(result);

            return result;
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();

        animationPresets.registerPreset('test-animation', {
            device: { platform: 'ios' },
            animation: { type: 'fadeIn', from: 0.1, to: 0.9 }
        });

        animationPresets.registerPreset('test-animation', {
            device: function (currentDevice) {
                return currentDevice.platform === 'android';
            },
            animation: { type: 'css', from: 'test', to: 'test-active' }
        });

        devices.current({ platform: 'ios' });
        animationPresets.applyChanges();
        transitionExecutor.enter($toEnter, 'test-animation');
        transitionExecutor.start();

        devices.current({ platform: 'android' });
        animationPresets.applyChanges();
        transitionExecutor.enter($toEnter, 'test-animation');
        transitionExecutor.start();

        assert.equal(createAnimationLog.length, 2);

        assert.equal(createAnimationLog[0].config.type, 'fadeIn');
        assert.equal(createAnimationLog[0].config.from, 0.1);
        assert.equal(createAnimationLog[0].config.to, 0.9);

        assert.equal(createAnimationLog[1].config.type, 'css');
        assert.equal(createAnimationLog[1].config.from, 'test dx-no-direction');
        assert.equal(createAnimationLog[1].config.to, 'test-active');
    });

    QUnit.test('no animations with unknown preset', function (assert) {
        const createAnimationLog = [];
        const $toEnter = $('<div/>');

        fx.createAnimationLog = function (element, config) {
            createAnimationLog.push({
                element: element,
                config: config
            });
            return $.Deferred().resolve().promise();
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();

        transitionExecutor.enter($toEnter, 'test-animation');
        transitionExecutor.start();

        assert.equal(createAnimationLog.length, 0);
    });

    QUnit.test('clear presets', function (assert) {
        animationPresets.registerPreset('test-animation1', {
            animation: { type: 'test' }
        });
        animationPresets.registerPreset('test-animation2', {
            animation: { type: 'test' }
        });
        animationPresets.applyChanges();
        assert.ok(animationPresets.getPreset('test-animation1'));
        assert.ok(animationPresets.getPreset('test-animation2'));

        animationPresets.clear('test-animation1');
        assert.ok(!animationPresets.getPreset('test-animation1'));
        assert.ok(animationPresets.getPreset('test-animation2'));

        animationPresets.clear();
        assert.ok(!animationPresets.getPreset('test-animation1'));
        assert.ok(!animationPresets.getPreset('test-animation2'));
    });

    QUnit.test('preset aliases', function (assert) {
        animationPresets.registerPreset('test-animation', {
            animation: { type: 'fadeIn', from: 0.1, to: 0.9 }
        });
        animationPresets.registerPreset('alias', {
            animation: 'test-animation'
        });
        animationPresets.applyChanges();
        assert.equal(animationPresets.getPreset('alias'), animationPresets.getPreset('test-animation'));
    });

    QUnit.test('Animation with direction=none on Android (T277115)', function (assert) {
        const createAnimationLog = [];
        const $toEnter = $('<div/>');

        devices.current({ platform: 'android' });
        animationPresets.resetToDefaults();

        fx.createAnimation = function (element, config) {
            const result = new MockAnimation({
                element: element,
                config: config,
                animationSetupLog: [],
                animationStartLog: [],
                deferred: $.Deferred().resolve().promise()
            });
            createAnimationLog.push(result);

            return result;
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();
        transitionExecutor.enter($toEnter, 'slide', { direction: 'none' });
        transitionExecutor.start();

        assert.equal(createAnimationLog.length, 1);
    });

    QUnit.test('The \'configModifier.delay\' property is taken into account on Android (T339056)', function (assert) {
        const createAnimationLog = [];
        const $toEnter = $('<div/>');

        devices.current({ platform: 'android' });
        animationPresets.resetToDefaults();

        fx.createAnimation = function (element, config) {
            const result = new MockAnimation({
                element: element,
                config: config,
                animationSetupLog: [],
                animationStartLog: [],
                deferred: $.Deferred().resolve().promise()
            });
            createAnimationLog.push(result);

            return result;
        };

        const transitionExecutor = new TransitionExecutorModule.TransitionExecutor();
        transitionExecutor.enter($toEnter, 'slide', { duration: 123, delay: 234 });
        transitionExecutor.start();

        assert.equal(createAnimationLog.length, 1);
        assert.equal(createAnimationLog[0].config.duration, 123);
        assert.equal(createAnimationLog[0].config.delay, 234);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/common","core/devices","animation/fx","../../helpers/executeAsyncMock.js","animation/presets/presets","animation/transition_executor/transition_executor"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/common"), require("core/devices"), require("animation/fx"), require("../../helpers/executeAsyncMock.js"), require("animation/presets/presets"), require("animation/transition_executor/transition_executor"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=transitionExecutors.tests.js.map