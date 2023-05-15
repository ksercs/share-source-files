!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.callbacks.tests.js"], ["core/utils/callbacks"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.core/utils.callbacks.tests.js', ['core/utils/callbacks'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const Callbacks = $__require('core/utils/callbacks');

    QUnit.module('Methods', {
        beforeEach: function () {
            this.Callbacks = Callbacks();
        },
        afterEach: function () {
            this.Callbacks.empty();
        }
    });

    QUnit.test('Call all of the Callbacks with the argument', function (assert) {
        let callBack1;
        let callBack2;

        this.Callbacks.add(function (param) {
            callBack1 = true;

            assert.deepEqual(param, { param: 'test' }, 'parameter of the first callback');
        });
        this.Callbacks.add(function (param) {
            callBack2 = true;

            assert.ok(callBack1, 'callBack1');
            assert.deepEqual(param, { param: 'test' }, 'parameter of the second callback');
        });

        this.Callbacks.fire({ param: 'test' });

        assert.ok(callBack2, 'callBack1');
    });

    QUnit.test('Fired method', function (assert) {
        this.Callbacks.add(function () {});

        assert.notOk(this.Callbacks.fired(), 'Callback not fired yet');

        this.Callbacks.fire();

        assert.ok(this.Callbacks.fired(), 'Callback fired');
    });

    QUnit.test('Call all Callbacks in a list with the given context', function (assert) {
        const context = {};
        let callBack1;
        let callBack2;

        this.Callbacks.add(function (param) {
            callBack1 = true;

            assert.deepEqual(param, { param: 'test' }, 'parameter of the first callback');
            assert.deepEqual(this, context, 'context');
        });
        this.Callbacks.add(function (param) {
            callBack2 = true;

            assert.ok(callBack1, 'callBack1');
            assert.deepEqual(param, { param: 'test' }, 'parameter of the second callback');
            assert.deepEqual(this, context, 'context');
        });

        this.Callbacks.fireWith(context, [{ param: 'test' }]);

        assert.ok(callBack2, 'callBack1');
    });

    QUnit.test('Determine whether callback is in a list', function (assert) {
        const callBack1 = function () {};
        const callBack2 = function () {};

        this.Callbacks.add(callBack1);

        assert.ok(this.Callbacks.has(callBack1), 'has callBack1');
        assert.ok(!this.Callbacks.has(callBack2), 'not has callBack2');
    });

    QUnit.test('Remove a callback from a callback list', function (assert) {
        const callBack1 = function () {};
        const callBack2 = function () {};

        this.Callbacks.add(callBack1);
        this.Callbacks.add(callBack2);

        assert.ok(this.Callbacks.has(callBack1), 'has callBack1');
        assert.ok(this.Callbacks.has(callBack2), 'has callBack2');

        this.Callbacks.remove(callBack1);

        assert.ok(!this.Callbacks.has(callBack1), 'not has callBack1');
        assert.ok(this.Callbacks.has(callBack2), 'has callBack2');
    });

    QUnit.test('Remove a callback from a callback list when firing', function (assert) {
        const that = this;
        let callOrder = [];

        const callBack1 = function () {
            callOrder.push(1);
        };
        const callBack3 = function () {
            callOrder.push(3);
        };
        const callBack2 = function () {
            callOrder.push(2);
            that.Callbacks.remove(callBack3);
        };
        const callBack4 = function () {
            callOrder.push(4);
            that.Callbacks.remove(callBack1);
        };
        const callBack5 = function () {
            callOrder.push(5);
            that.Callbacks.remove(callBack5);
            that.Callbacks.fire();
        };
        const callBack6 = function () {
            callOrder.push(6);
        };

        this.Callbacks.add(callBack1);
        this.Callbacks.add(callBack2);
        this.Callbacks.add(callBack3);
        this.Callbacks.add(callBack4);
        this.Callbacks.add(callBack5);
        this.Callbacks.add(callBack6);

        this.Callbacks.fire();

        assert.deepEqual(callOrder, [1, 2, 4, 5, 6, 2, 4, 6]);

        callOrder = [];

        this.Callbacks.fire();

        assert.deepEqual(callOrder, [2, 4, 6]);
    });

    QUnit.test('Remove all of the Callbacks from a list', function (assert) {
        const callBack1 = function () {};
        const callBack2 = function () {};

        this.Callbacks.add(callBack1);
        this.Callbacks.add(callBack2);

        assert.ok(this.Callbacks.has(callBack1), 'has callBack1');
        assert.ok(this.Callbacks.has(callBack2), 'has callBack2');

        this.Callbacks.empty();

        assert.ok(!this.Callbacks.has(callBack1), 'not has callBack1');
        assert.ok(!this.Callbacks.has(callBack2), 'not has callBack2');
    });

    QUnit.test('Base strategy', function (assert) {
        const that = this;
        let firstFire = true;
        const callOrder = [];

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 1, params: param });
        });

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 2, params: param });

            if (firstFire) {
                firstFire = false;
                that.Callbacks.fire(2);
            }
        });

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 3, params: param });
        });

        that.Callbacks.fire(1);

        assert.deepEqual(callOrder, [{ callback: 1, params: 1 }, { callback: 2, params: 1 }, { callback: 3, params: 1 }, { callback: 1, params: 2 }, { callback: 2, params: 2 }, { callback: 3, params: 2 }]);
    });

    QUnit.module('Flags', {
        afterEach: function () {
            this.Callbacks.empty();
        }
    });

    QUnit.test('Sync strategy with one inner fire', function (assert) {
        const that = this;
        let firstFire = true;
        const callOrder = [];

        this.Callbacks = Callbacks({ syncStrategy: true });

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 1, params: param });
        });

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 2, params: param });

            if (firstFire) {
                firstFire = false;
                that.Callbacks.fire(2);
            }
        });

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 3, params: param });
        });

        that.Callbacks.fire(1);

        assert.deepEqual(callOrder, [{ callback: 1, params: 1 }, { callback: 2, params: 1 }, { callback: 1, params: 2 }, { callback: 2, params: 2 }, { callback: 3, params: 2 }, { callback: 3, params: 1 }]);
    });

    // T544647
    QUnit.test('Sync strategy with one inner fire in first callback', function (assert) {
        const that = this;
        const callOrder = [];

        this.Callbacks = Callbacks({ syncStrategy: true });

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 1, params: param });
            if (callOrder.length === 1) {
                that.Callbacks.fire(2);
            }
        });

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 2, params: param });
        });

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 3, params: param });
        });

        that.Callbacks.fire(1);

        assert.deepEqual(callOrder, [{ callback: 1, params: 1 }, { callback: 1, params: 2 }, { callback: 2, params: 2 }, { callback: 3, params: 2 }, { callback: 2, params: 1 }, { callback: 3, params: 1 }]);
    });

    QUnit.test('Sync strategy with two inner fires', function (assert) {
        const that = this;
        let fireCount = 1;
        const callOrder = [];

        this.Callbacks = Callbacks({ syncStrategy: true });

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 1, params: param });
        });

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 2, params: param });

            if (fireCount < 3) {
                fireCount++;
                that.Callbacks.fire(fireCount);
            }
        });

        that.Callbacks.add(function (param) {
            callOrder.push({ callback: 3, params: param });
        });

        that.Callbacks.fire(1);

        assert.deepEqual(callOrder, [{ callback: 1, params: 1 }, { callback: 2, params: 1 }, { callback: 1, params: 2 }, { callback: 2, params: 2 }, { callback: 1, params: 3 }, { callback: 2, params: 3 }, { callback: 3, params: 3 }, { callback: 3, params: 2 }, { callback: 3, params: 1 }]);
    });

    QUnit.test('Remove a callback from a callback list when firing for sync strategy', function (assert) {
        const that = this;
        let callOrder = [];

        this.Callbacks = Callbacks({ syncStrategy: true });

        const callBack1 = function () {
            callOrder.push(1);
        };
        const callBack3 = function () {
            callOrder.push(3);
        };
        const callBack2 = function () {
            callOrder.push(2);
            that.Callbacks.remove(callBack3);
        };
        const callBack4 = function () {
            callOrder.push(4);
            that.Callbacks.remove(callBack1);
        };
        const callBack5 = function () {
            callOrder.push(5);
            that.Callbacks.remove(callBack5);
            that.Callbacks.fire();
        };
        const callBack6 = function () {
            callOrder.push(6);
        };

        this.Callbacks.add(callBack1);
        this.Callbacks.add(callBack2);
        this.Callbacks.add(callBack3);
        this.Callbacks.add(callBack4);
        this.Callbacks.add(callBack5);
        this.Callbacks.add(callBack6);

        this.Callbacks.fire();

        assert.deepEqual(callOrder, [1, 2, 4, 5, 2, 4, 6, 6]);

        callOrder = [];

        this.Callbacks.fire();

        assert.deepEqual(callOrder, [2, 4, 6]);
    });

    QUnit.test('StopOnFalse', function (assert) {
        let fireCount = 0;

        this.Callbacks = Callbacks({ stopOnFalse: true });

        this.Callbacks.add(function () {
            fireCount++;

            return false;
        });

        this.Callbacks.add(function () {
            fireCount++;
        });

        this.Callbacks.fire();

        assert.equal(fireCount, 1);
    });

    QUnit.test('Unique', function (assert) {
        let fireCount = 0;

        this.Callbacks = Callbacks({ unique: true });

        const func = function () {
            fireCount++;
        };

        this.Callbacks.add(func);
        this.Callbacks.add(func);

        this.Callbacks.fire();

        assert.equal(fireCount, 1);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/callbacks"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/callbacks"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.callbacks.tests.js.map