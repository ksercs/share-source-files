!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.object.tests.js"], ["core/utils/object"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.core/utils.object.tests.js', ['core/utils/object'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const objectUtils = $__require('core/utils/object');

    QUnit.test('orderEach', function (assert) {
        const checkOrderEach = function (mapKeys, keys) {
            let i;
            const map = {};
            for (i = 0; i < mapKeys.length; i++) {
                map[mapKeys[i]] = i;
            }

            mapKeys = [];
            objectUtils.orderEach(map, function (key, value) {
                mapKeys.push(key);
                assert.strictEqual(map[key], value, 'key value');
            });
            assert.deepEqual(mapKeys, keys, 'keys order');
        };

        checkOrderEach(['', 1, '100', 12, -5, 'test', 3, undefined, null], ['-5', '1', '3', '12', '100', '', 'null', 'test', 'undefined']);
    });

    // T396670
    QUnit.test('orderEach when there is custom method in prototype of the array', function (assert) {
        /* eslint-disable no-extend-native */
        // arrange
        const array = [1, 2, 3];
        const keys = [];

        Array.prototype.add = function (item) {
            this[this.length] = item;
        };

        // act
        objectUtils.orderEach(array, function (key, value) {
            keys.push(key);
        });

        // assert
        assert.deepEqual(keys, ['0', '1', '2'], 'keys order');
        delete Array.prototype.add;
    });

    QUnit.module('Object cloning', {
        beforeEach: function () {
            this.SomeClass = function (a, b) {
                this.a = a;
                this.b = b;
                this.changeB = function (b) {
                    this.b = b;
                };
            };
            this.source = new this.SomeClass('a', 'b');
        }
    });

    QUnit.test('Prototypical cloning', function (assert) {
        // act
        const clone = objectUtils.clone(this.source);

        // assert
        assert.ok(clone);
        assert.ok(clone instanceof this.SomeClass);
        assert.notEqual(clone, this.source);
        assert.equal(clone.a, 'a');
        assert.equal(clone.b, 'b');
    });

    QUnit.test('External source changes affect clone', function (assert) {
        // arrange
        const clone = objectUtils.clone(this.source);

        // act
        this.source.a = 'aa';

        // assert
        assert.equal(this.source.a, 'aa');
        assert.equal(clone.a, 'aa');
    });

    QUnit.test('External clone changes don\'t affect source', function (assert) {
        // arrange
        const clone = objectUtils.clone(this.source);

        // act
        clone.a = 'aa';

        // assert
        assert.equal(this.source.a, 'a');
        assert.equal(clone.a, 'aa');
    });

    QUnit.test('Internal source changes affect clone', function (assert) {
        // arrange
        const clone = objectUtils.clone(this.source);

        // act
        this.source.changeB(15);

        // assert
        assert.equal(this.source.b, 15);
        assert.equal(clone.b, 15);
    });

    QUnit.test('Internal clone changes don\'t affect source', function (assert) {
        // arrange
        const clone = objectUtils.clone(this.source);

        // act
        clone.changeB([]);

        // assert
        assert.equal(this.source.b, 'b');
        assert.deepEqual(clone.b, []);
    });

    QUnit.module('deepExtendArraySafe utility', {
        beforeEach: function () {
            this.SomeClass = function (simpleProp, toChange) {
                this.simpleProp = simpleProp;
                this.toChange = toChange;
            };
        }
    });

    QUnit.test('deepExtendArraySafe utility does not change complex \'object\' to plain \'object\' by default', function (assert) {
        const target = {
            deepProp: new this.SomeClass('simple value', 'value to be changed')
        };
        const changes = {
            deepProp: { toChange: 'changed value' }
        };
        const result = objectUtils.deepExtendArraySafe(target, changes);

        assert.equal(result.deepProp.simpleProp, undefined);
        assert.equal(result.deepProp.toChange, 'changed value');
    });

    QUnit.test('deepExtendArraySafe utility can extend complex \'object\' by plain \'object\' (T482160)', function (assert) {
        const target = {
            deepProp: new this.SomeClass('simple value', 'value to be changed')
        };
        const changes = {
            deepProp: { toChange: 'changed value' }
        };
        const result = objectUtils.deepExtendArraySafe(target, changes, true);

        assert.equal(result.deepProp.simpleProp, 'simple value');
        assert.equal(result.deepProp.toChange, 'changed value');
    });

    QUnit.test('deepExtendArraySafe utility could not extend complex \'object\' by another complex \'object\' ', function (assert) {
        const oldValue = {
            deepProp: new this.SomeClass('some value', 'missed value')
        };
        const newValue = {
            deepProp: new this.SomeClass('new value')
        };
        const result = objectUtils.deepExtendArraySafe(oldValue, newValue, true);

        assert.equal(result.deepProp.simpleProp, 'new value');
        assert.notOk(!!result.deepProp.toChange);
    });

    QUnit.test('deepExtendArraySafe utility does not throw an error with \'null\' deep property', function (assert) {
        const oldValue = {
            deepProp: null
        };
        const newValue = {
            deepProp: { toChange: 'changed value' }
        };
        const result = objectUtils.deepExtendArraySafe(oldValue, newValue, true);

        assert.equal(result.deepProp.toChange, 'changed value');
    });

    QUnit.test('deepExtendArraySafe utility does not pollute object prototype', function (assert) {
        objectUtils.deepExtendArraySafe({}, JSON.parse('{ "__proto__": { "pollution": true }}'), true);
        assert.ok(!('pollution' in {}), 'object prototype is not polluted');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/object"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/object"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.object.tests.js.map