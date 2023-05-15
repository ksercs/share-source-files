!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.data/storeCustom_loadModeRaw.tests.js"], ["data/custom_store","../../helpers/data.errorHandlingHelper.js"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.data/storeCustom_loadModeRaw.tests.js', ['data/custom_store', '../../helpers/data.errorHandlingHelper.js'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const CustomStore = $__require('data/custom_store');
    const ErrorHandlingHelper = $__require('../../helpers/data.errorHandlingHelper.js');

    const RAW = 'raw';

    QUnit.module('load', function () {

        QUnit.test('only userData is passed to user func', function (assert) {
            const done = assert.async();
            const userData = { custom: 123 };

            new CustomStore({
                loadMode: RAW,
                load: function (options) {
                    assert.deepEqual(options, { userData: userData });
                    done();
                }
            }).load({
                sort: 'a',
                group: 'b',
                filter: function () {
                    return true;
                },
                select: 'c',
                skip: 1,
                take: 2,
                userData: userData
            });
        });

        QUnit.test('data is processed locally', function (assert) {
            const done = assert.async();

            new CustomStore({
                loadMode: RAW,
                load: function () {
                    return [{ g: 'g5', v: 'v5' }, { g: 'g4', v: 'v4' }, { g: 'g3', v: 'v3' }, { g: 'g2', v: 'v2' }, { g: 'g1', v: 'v1' }];
                }
            }).load({
                group: 'g',
                sort: 'v',
                filter: ['v', '<>', 'v3'],
                skip: 1,
                take: 2
            }).done(function (result) {
                assert.deepEqual(result, [{
                    key: 'g2',
                    items: [{ g: 'g2', v: 'v2' }]
                }, {
                    key: 'g4',
                    items: [{ g: 'g4', v: 'v4' }]
                }]);
                done();
            });
        });

        QUnit.test('requireTotalCount', function (assert) {
            const done = assert.async();

            new CustomStore({
                loadMode: RAW,
                load: function () {
                    return [1, 2];
                }
            }).load({
                take: 1,
                requireTotalCount: true
            }).done(function (result, extra) {
                assert.deepEqual(result, [1]);
                assert.deepEqual(extra, { totalCount: 2 });
                done();
            });
        });

        QUnit.test('error during local processing', function (assert) {
            const done = assert.async();
            const helper = new ErrorHandlingHelper();

            helper.extraChecker = function (error) {
                assert.equal(error.message, 'expected error');
            };

            helper.run(function () {
                return new CustomStore({
                    loadMode: RAW,
                    load: function () {
                        return [null];
                    },
                    errorHandler: helper.optionalHandler
                }).load({
                    filter: function () {
                        throw Error('expected error');
                    }
                });
            }, done, assert);
        });
    });

    QUnit.module('totalCount', function () {

        QUnit.test('user func takes precedence', function (assert) {
            const done = assert.async();

            new CustomStore({
                loadMode: RAW,
                totalCount: function () {
                    return 123;
                }
            }).totalCount().done(function (count) {
                assert.equal(count, 123);
                done();
            });
        });

        QUnit.test('based on raw load', function (assert) {
            const done = assert.async();
            const userData = { custom: 123 };

            new CustomStore({
                loadMode: RAW,
                load: function (options) {
                    assert.deepEqual(options, { userData: userData });
                    return [1, 2, 3];
                }
            }).totalCount({
                userData: userData,
                filter: ['this', '<>', 2],
                sort: 'anything'
            }).done(function (count) {
                assert.equal(count, 2);
                done();
            });
        });

        QUnit.test('error during local processing', function (assert) {
            const done = assert.async();
            const helper = new ErrorHandlingHelper();

            helper.extraChecker = function (error) {
                assert.equal(error.message, 'expected error');
            };

            helper.run(function () {
                return new CustomStore({
                    loadMode: RAW,
                    load: function () {
                        return [null];
                    },
                    errorHandler: helper.optionalHandler
                }).totalCount({
                    filter: function () {
                        throw Error('expected error');
                    }
                });
            }, done, assert);
        });
    });

    QUnit.module('byKey', function () {

        QUnit.test('user func takes precedence', function (assert) {
            const done = assert.async();

            new CustomStore({
                loadMode: RAW,
                byKey: function () {
                    return 123;
                }
            }).byKey('*').done(function (item) {
                assert.equal(item, 123);
                done();
            });
        });

        QUnit.test('success', function (assert) {
            const done = assert.async();
            const needle = { id: 123 };

            new CustomStore({
                loadMode: RAW,
                key: 'id',
                load: function () {
                    return [needle];
                }
            }).byKey(123).done(function (item) {
                assert.strictEqual(item, needle);
                done();
            });
        });

        QUnit.test('not found', function (assert) {
            const done = assert.async();

            new CustomStore({
                loadMode: RAW,
                key: 'id',
                load: function () {
                    return [];
                }
            }).byKey('anything').fail(function (x) {
                assert.ok(/^E4009 /.test(x.message));
                done();
            });
        });

        QUnit.test('key not specified', function (assert) {
            assert.throws(function () {
                new CustomStore({ loadMode: RAW }).byKey('anything');
            }, function (x) {
                assert.ok(/^E4005 /.test(x.message));
                return true;
            });
        });
    });

    QUnit.module('raw data caching', function () {

        QUnit.test('enabled by default', function (assert) {
            const done = assert.async();
            let loadCallCount = 0;

            const store = new CustomStore({
                key: 'this',
                loadMode: RAW,
                load: function () {
                    loadCallCount++;
                    return [1, 2];
                }
            });

            Promise.all([store.load(), store.byKey(1), store.totalCount()]).then(function () {
                assert.equal(loadCallCount, 1);
                done();
            });
        });

        QUnit.test('can be disabled', function (assert) {
            const done = assert.async();
            let loadCallCount = 0;

            const store = new CustomStore({
                loadMode: RAW,
                cacheRawData: false,
                load: function () {
                    loadCallCount++;
                    return [];
                }
            });

            Promise.all([store.load(), store.totalCount(), store.load()]).then(function () {
                assert.equal(loadCallCount, 3);
                done();
            });
        });
    });

    QUnit.test('ensure valid results regardless of presence of options (checks optimizations)', function (assert) {
        const done = assert.async();

        const store = new CustomStore({
            loadMode: RAW,
            load: function () {
                return [1, 2, 3];
            }
        });

        store.load({ requireTotalCount: true }).done(function (result, extra) {
            assert.deepEqual(result, [1, 2, 3]);
            assert.equal(extra.totalCount, 3);

            store.load({ filter: ['this', '<>', 2], requireTotalCount: true }).done(function (result, extra) {
                assert.deepEqual(result, [1, 3]);
                assert.equal(extra.totalCount, 2);

                done();
            });
        });
    });

    QUnit.test('uses default search', function (assert) {
        assert.strictEqual(new CustomStore({ loadMode: RAW })._useDefaultSearch, true);
    });

    QUnit.test('async load', function (assert) {
        let loadCallCount = 0;
        const store = new CustomStore({
            loadMode: 'raw',
            key: 'ID',
            load: function () {
                loadCallCount++;
                return new Promise(function (resolve) {
                    resolve([{ 'ID': 1 }, { 'ID': 2 }]);
                });
            }
        });

        store.byKey(1);
        store.byKey(2);

        assert.strictEqual(loadCallCount, 1);
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["data/custom_store","../../helpers/data.errorHandlingHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("data/custom_store"), require("../../helpers/data.errorHandlingHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=storeCustom_loadModeRaw.tests.js.map