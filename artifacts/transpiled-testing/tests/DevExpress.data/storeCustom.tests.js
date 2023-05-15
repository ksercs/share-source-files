!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.data/storeCustom.tests.js"], ["jquery","data/custom_store","data/utils","core/config","../../helpers/data.errorHandlingHelper.js","../../helpers/ajaxMock.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.data/storeCustom.tests.js', ['jquery', 'data/custom_store', 'data/utils', 'core/config', '../../helpers/data.errorHandlingHelper.js', '../../helpers/ajaxMock.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const $ = $__require('jquery');
    const CustomStore = $__require('data/custom_store');
    const processRequestResultLock = $__require('data/utils').processRequestResultLock;
    const config = $__require('core/config');
    const ERRORS = {
        INVALID_RETURN: 'E4012',
        MISSING_USER_FUNC: 'E4011',
        MISSING_TOTAL_COUNT: 'E4021',
        QUERY_NOT_SUPPORTED: 'E4010',
        REQUEST_ERROR: 'E4013'
    };
    const ErrorHandlingHelper = $__require('../../helpers/data.errorHandlingHelper.js');
    const ajaxMock = $__require('../../helpers/ajaxMock.js');

    QUnit.testDone(function () {
        ajaxMock.clear();
    });

    function assertErrorCore(error, errorID, assert) {
        assert.ok(error.message.indexOf(errorID) === 0);
    }

    function mustNotReach() {
        throw Error('execution must not reach here');
    }

    QUnit.test('custom store does not use default search', function (assert) {
        const store = new CustomStore();
        assert.strictEqual(store._useDefaultSearch, false);
    });

    QUnit.test('custom stores do not support createQuery', function (assert) {
        try {
            new CustomStore().createQuery();
            mustNotReach();
        } catch (x) {
            assertErrorCore(x, ERRORS.QUERY_NOT_SUPPORTED, assert);
        }
    });

    QUnit.test('missing required options throw', function (assert) {
        const store = new CustomStore();

        function assertError(error) {
            assertErrorCore(error, ERRORS.MISSING_USER_FUNC, assert);
        }

        try {
            store.load();
            mustNotReach();
        } catch (x) {
            assertError(x);
        }

        try {
            store.totalCount();
            mustNotReach();
        } catch (x) {
            assertErrorCore(x, ERRORS.MISSING_TOTAL_COUNT, assert);
        }

        try {
            store.byKey(123);
            mustNotReach();
        } catch (x) {
            assertError(x);
        }

        try {
            store.insert({});
            mustNotReach();
        } catch (x) {
            assertError(x);
        }

        try {
            store.update(123, {});
            mustNotReach();
        } catch (x) {
            assertError(x);
        }

        try {
            store.remove(123);
            mustNotReach();
        } catch (x) {
            assertError(x);
        }
    });

    QUnit.test('load, promise result', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            load: function (options) {
                assert.equal(options.test, 123);
                return $.Deferred().resolve([1, 2, 3]);
            }
        });

        store.load({ test: 123 }).done(function (r) {
            assert.deepEqual(r, [1, 2, 3]);
            done();
        });
    });

    QUnit.test('load, promise result with lock', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            load: function (options) {
                assert.equal(options.test, 123);
                return $.Deferred().resolve([1, 2, 3]);
            }
        });

        let promise = store.load({ test: 123 });
        assert.equal(promise.state(), 'resolved', 'resolved when no lock');

        processRequestResultLock.obtain();
        promise = store.load({ test: 123 });
        assert.equal(promise.state(), 'pending', 'pending when locked');

        processRequestResultLock.release();
        assert.equal(promise.state(), 'resolved', 'resolved when released');

        promise.done(function (r) {
            assert.deepEqual(r, [1, 2, 3]);
            done();
        });
    });

    QUnit.test('load, array result', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            load: function (options) {
                return [1, 2, 3];
            }
        });

        store.load().done(function (r) {
            assert.deepEqual(r, [1, 2, 3]);
            done();
        });
    });

    QUnit.test('load, promise result is class instance', function (assert) {
        const done = assert.async();

        class TestClass {
            constructor(value) {
                this.value = value;
            }
        }

        const store = new CustomStore({
            load: function (options) {
                return $.Deferred().resolve(new TestClass('test'));
            }
        });

        store.load().done(function (r) {
            assert.deepEqual(r.value, 'test');
            done();
        });
    });

    QUnit.test('B250267 backward compat', function (assert) {
        const done = assert.async();

        $.when(new CustomStore({ load: function () {
                return null;
            } }).load().done(function (r) {
            assert.deepEqual(r, []);
        }), new CustomStore({ load: function () {/* undefined */} }).load().done(function (r) {
            assert.deepEqual(r, []);
        })).then(done);
    });

    QUnit.test('load, invalid result', function (assert) {
        const store = new CustomStore({
            load: function () {
                return 'nonsense';
            }
        });

        try {
            store.load();
            mustNotReach();
        } catch (x) {
            assertErrorCore(x, ERRORS.INVALID_RETURN, assert);
        }
    });

    QUnit.test('load with inline totalCount', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            load: function () {
                return $.Deferred().resolve([], { totalCount: 123 });
            }
        });

        store.load().done(function (r, extra) {
            assert.equal(extra.totalCount, 123);
            done();
        });
    });

    QUnit.test('load, ajax error', function (assert) {
        const done = assert.async();
        const helper = new ErrorHandlingHelper();

        helper.extraChecker = function (error) {
            assert.equal(error.message, 'Internal Server Error');
        };

        helper.run(function () {
            return new CustomStore({
                load: function (e) {
                    return $.Deferred().reject({
                        statusText: 'Internal Server Error',
                        getResponseHeader: function () {}
                    }, 'error').promise();
                },
                errorHandler: helper.optionalHandler
            }).load();
        }, done, assert);
    });

    QUnit.test('load, promise result, error as text', function (assert) {
        const helper = new ErrorHandlingHelper();
        helper.extraChecker = function (error) {
            assert.equal(error.message, 'custom error');
        };

        helper.run(function () {
            return new CustomStore({
                load: function () {
                    return $.Deferred().reject('custom error');
                },
                errorHandler: helper.optionalHandler
            }).load();
        }, assert.async(), assert);
    });

    QUnit.test('totalCount, promise result', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            totalCount: function (options) {
                return $.Deferred().resolve(42);
            }
        });

        store.totalCount().done(function (r) {
            assert.strictEqual(r, 42);
            done();
        });
    });

    QUnit.test('totalCount, scalar result', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            totalCount: function (options) {
                return '42';
            }
        });

        store.totalCount().done(function (r) {
            assert.strictEqual(r, 42);
            done();
        });
    });

    QUnit.test('totalCount, invalid result', function (assert) {
        const store = new CustomStore({
            totalCount: function () {
                return 'not a number';
            }
        });

        try {
            store.totalCount();
            mustNotReach();
        } catch (x) {
            assertErrorCore(x, ERRORS.INVALID_RETURN, assert);
        }
    });

    QUnit.test('totalCount, options are passed to user impl', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            totalCount: function (options) {
                assert.equal(options.test, 123);
                done();
                return 1;
            }
        });

        store.totalCount({ test: 123 });
    });

    QUnit.test('totalCount, error handling', function (assert) {
        const done = assert.async();
        const helper = new ErrorHandlingHelper();

        helper.extraChecker = function (error) {
            assert.equal(error.message, 'Unknown error');
        };

        helper.run(function () {
            return new CustomStore({
                totalCount: function () {
                    return $.Deferred().reject();
                },
                errorHandler: helper.optionalHandler
            }).totalCount();
        }, done, assert);
    });

    QUnit.test('byKey, promise result', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            byKey: function (key) {
                return $.Deferred().resolve('item #' + key);
            }
        });

        store.byKey(123).done(function (r) {
            assert.equal(r, 'item #123');
            done();
        });
    });

    QUnit.test('byKey, promise result with lock', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            byKey: function (key) {
                return $.Deferred().resolve('item #' + key);
            }
        });

        let promise = store.byKey(123);
        assert.equal(promise.state(), 'resolved', 'resolved when no lock');

        processRequestResultLock.obtain();
        promise = store.byKey(123);
        assert.equal(promise.state(), 'pending', 'pending when locked');

        processRequestResultLock.release();
        assert.equal(promise.state(), 'resolved', 'resolved when released');

        promise.done(function (r) {
            assert.equal(r, 'item #123');
            done();
        });
    });

    QUnit.test('byKey, non-promise result', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            byKey: function (key) {
                return 'item #' + key;
            }
        });

        store.byKey(123).done(function (r) {
            assert.equal(r, 'item #123');
            done();
        });
    });

    QUnit.test('byKey, extraOptions', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            byKey: function (key, extraOptions) {
                return extraOptions.foo;
            }
        });

        store.byKey(NaN, { foo: 'works' }).done(function (r) {
            assert.deepEqual(r, 'works');

            done();
        });
    });

    QUnit.test('byKey, error handling', function (assert) {
        const done = assert.async();

        const helper = new ErrorHandlingHelper();
        helper.extraChecker = function (error) {
            assert.equal(error.message, 'test error');
        };

        helper.run(function () {
            return new CustomStore({
                byKey: function () {
                    return $.Deferred().reject('test error');
                },
                errorHandler: helper.optionalHandler
            }).byKey(123);
        }, done, assert);
    });

    QUnit.test('insert, promise result', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            key: 'id',
            insert: function (values) {
                return $.Deferred().resolve({ id: 123, a: 1 });
            }
        });

        store.insert({ a: 1 }).done(function (values, key) {
            assert.deepEqual(values, { a: 1, id: 123 });
            assert.equal(key, 123);
            done();
        });
    });

    QUnit.test('insert, non-promise result', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            key: 'id',
            insert: function (values) {
                return { id: 123, a: 1 };
            }
        });

        store.insert({ a: 1 }).done(function (values, key) {
            assert.deepEqual(values, { id: 123, a: 1 });
            assert.equal(key, 123);
            done();
        });
    });

    QUnit.test('insert with useLegacyStoreResult, promise result', function (assert) {
        const done = assert.async();

        config({ useLegacyStoreResult: true });

        const store = new CustomStore({
            insert: function (values) {
                return $.Deferred().resolve(123);
            }
        });

        store.insert({ a: 1 }).done(function (values, key) {
            assert.deepEqual(values, { a: 1 });
            assert.equal(key, 123);
            config({ useLegacyStoreResult: false });
            done();
        });
    });

    QUnit.test('insert with useLegacyStoreResult, non-promise result', function (assert) {
        const done = assert.async();

        config({ useLegacyStoreResult: true });

        const store = new CustomStore({
            insert: function (values) {
                return 123;
            }
        });

        store.insert({ a: 1 }).done(function (values, key) {
            assert.deepEqual(values, { a: 1 });
            assert.equal(key, 123);
            config({ useLegacyStoreResult: false });
            done();
        });
    });

    QUnit.test('insert, error handling', function (assert) {
        const done = assert.async();
        const helper = new ErrorHandlingHelper();
        helper.extraChecker = function (error) {
            assert.equal(error.message, 'insert error');
        };

        helper.run(function () {
            return new CustomStore({
                insert: function () {
                    return $.Deferred().reject('insert error');
                },
                errorHandler: helper.optionalHandler
            }).insert({});
        }, done, assert);
    });

    QUnit.test('update with useLegacyStoreResult, promise result', function (assert) {
        const done = assert.async();

        config({ useLegacyStoreResult: true });

        const store = new CustomStore({
            update: function (key, values) {
                assert.strictEqual(key, 123);
                assert.deepEqual(values, { a: 1 });
                return $.Deferred().resolve();
            }
        });

        store.update(123, { a: 1 }).done(function (key, values) {
            assert.strictEqual(key, 123);
            assert.deepEqual(values, { a: 1 });
            config({ useLegacyStoreResult: false });
            done();
        });
    });

    QUnit.test('update with useLegacyStoreResult, non-promise result', function (assert) {
        const done = assert.async();
        let updateCalled;

        config({ useLegacyStoreResult: true });

        const store = new CustomStore({
            update: function (key, values) {
                assert.strictEqual(key, 123);
                assert.deepEqual(values, { a: 1 });
                updateCalled = true;
            }
        });

        store.update(123, { a: 1 }).done(function (key, values) {
            assert.strictEqual(key, 123);
            assert.deepEqual(values, { a: 1 });
            assert.ok(updateCalled);
            config({ useLegacyStoreResult: false });
            done();
        });
    });

    QUnit.test('update, promise result', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            key: 'id',
            update: function (key, values) {
                assert.strictEqual(key, 123);
                assert.deepEqual(values, { a: 1 });
                return $.Deferred().resolve();
            }
        });

        store.update(123, { a: 1 }).done(function (values, key) {
            assert.strictEqual(key, 123);
            assert.deepEqual(values, { a: 1 });
            done();
        });
    });

    QUnit.test('update, promise result as data', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            update: function (key, values) {
                assert.strictEqual(key, 123);
                assert.deepEqual(values, { a: 1 });
                return $.Deferred().resolve({ a: 1, b: 2 });
            }
        });

        store.update(123, { a: 1 }).done(function (values, key) {
            assert.strictEqual(key, 123);
            assert.deepEqual(values, { a: 1, b: 2 });
            done();
        });
    });

    QUnit.test('update, non-promise result', function (assert) {
        const done = assert.async();
        let updateCalled;

        const store = new CustomStore({
            update: function (key, values) {
                assert.strictEqual(key, 123);
                assert.deepEqual(values, { a: 1 });
                updateCalled = true;
            }
        });

        store.update(123, { a: 1 }).done(function (values, key) {
            assert.strictEqual(key, 123);
            assert.deepEqual(values, { a: 1 });
            assert.ok(updateCalled);
            done();
        });
    });

    QUnit.test('update, non-promise result as data', function (assert) {
        const done = assert.async();
        let updateCalled;

        const store = new CustomStore({
            update: function (key, values) {
                assert.strictEqual(key, 123);
                assert.deepEqual(values, { a: 1 });
                updateCalled = true;
                return { a: 1, b: 2 };
            }
        });

        store.update(123, { a: 1 }).done(function (values, key) {
            assert.strictEqual(key, 123);
            assert.deepEqual(values, { a: 1, b: 2 });
            assert.ok(updateCalled);
            done();
        });
    });

    QUnit.test('update, error handling', function (assert) {
        const done = assert.async();

        const helper = new ErrorHandlingHelper();

        helper.extraChecker = function (error) {
            assert.equal(error.message, 'Internal Server Error');
        };

        helper.run(function () {
            return new CustomStore({
                update: function () {
                    return $.Deferred().reject({
                        statusText: 'Internal Server Error',
                        getResponseHeader: function () {}
                    }, 'error').promise();
                },
                errorHandler: helper.optionalHandler
            }).update(123, {});
        }, done, assert);
    });

    QUnit.test('remove, promise result', function (assert) {
        const done = assert.async();
        let removedKey;

        const store = new CustomStore({
            remove: function (key) {
                removedKey = key;
                return $.Deferred().resolve();
            }
        });

        store.remove(123).done(function (key) {
            assert.strictEqual(key, 123);
            assert.strictEqual(removedKey, 123);
            done();
        });
    });

    QUnit.test('remove, non-promise result', function (assert) {
        const done = assert.async();
        let removedKey;

        const store = new CustomStore({
            remove: function (key) {
                removedKey = key;
            }
        });

        store.remove(123).done(function (key) {
            assert.strictEqual(key, 123);
            assert.strictEqual(removedKey, 123);
            done();
        });
    });

    QUnit.test('remove, error handling', function (assert) {
        const done = assert.async();
        const helper = new ErrorHandlingHelper();

        helper.extraChecker = function (error) {
            assert.equal(error.message, 'my error');
        };

        helper.run(function () {
            return new CustomStore({
                remove: function () {
                    return $.Deferred().reject('my error');
                },
                errorHandler: helper.optionalHandler
            }).remove(123);
        }, done, assert);
    });

    QUnit.test('should support Promise/A standard', function (assert) {
        const done = assert.async();

        function createPromiseAPretenderAndResolveIt() {
            const d = $.Deferred();
            d.resolve();
            return {
                then: function (onWinCallback, onFailCallback) {
                    d.done(onWinCallback);
                    d.fail(onFailCallback);
                }
            };
        }

        function createPromiseAPretenderAndRejectIt(args) {
            const d = $.Deferred();
            d.reject();
            return {
                then: function (onWinCallback, onFailCallback) {
                    d.done(onWinCallback);
                    d.fail(onFailCallback);
                }
            };
        }

        function mustReach() {
            assert.ok(true, 'Must reach here');
        }

        function mustNotReach() {
            assert.ok(false, 'Must not reach here');
        }

        $.when(new CustomStore({ load: createPromiseAPretenderAndResolveIt }).load().done(mustReach).fail(mustNotReach), new CustomStore({ load: createPromiseAPretenderAndRejectIt }).load().done(mustNotReach).fail(mustReach)).always(done);
    });

    QUnit.test('function context is current Store\'s instance', function (assert) {
        assert.expect(12);

        const key = 'key';
        const store = new CustomStore({
            key: key,
            load: ensureThis,
            byKey: ensureThis,
            insert: ensureThis,
            update: ensureThis,
            remove: ensureThis,
            totalCount: function () {
                ensureThis.apply(this);
                return -1; // requires result
            }
        });

        function ensureThis() {
            assert.equal(this.key(), key);
            assert.ok(this instanceof CustomStore);
        }

        store.load();
        store.byKey();
        store.insert();
        store.update();
        store.remove();
        store.totalCount();
    });

    QUnit.test('push', function (assert) {
        const onPushSpy = sinon.spy();
        const changes = [{ type: 'remove', key: 0 }];
        const store = new CustomStore({
            onPush: onPushSpy
        });

        store.push(changes);
        assert.equal(onPushSpy.callCount, 1);
        assert.equal(onPushSpy.firstCall.args[0], changes);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","data/custom_store","data/utils","core/config","../../helpers/data.errorHandlingHelper.js","../../helpers/ajaxMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("data/custom_store"), require("data/utils"), require("core/config"), require("../../helpers/data.errorHandlingHelper.js"), require("../../helpers/ajaxMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=storeCustom.tests.js.map