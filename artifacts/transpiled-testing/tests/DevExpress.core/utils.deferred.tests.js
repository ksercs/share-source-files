!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.deferred.tests.js"], ["core/utils/type","core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
(function() {
var define = $__System.amdDefine;
define("testing/tests/DevExpress.core/utils.deferred.tests.js", ["require", "core/utils/type", "core/utils/deferred"], function(require) {
  const isFunction = require('core/utils/type').isFunction;
  const deferredUtils = require('core/utils/deferred');
  const Deferred = deferredUtils.Deferred;
  if (!QUnit.urlParams['nojquery']) {
    return;
  }
  QUnit.module('when');
  QUnit.test('when should be resolved synchronously', function(assert) {
    const log = [];
    const d1 = new Deferred();
    const d2 = new Deferred();
    deferredUtils.when().done(function() {
      assert.deepEqual(arguments.length, 0, 'correct args');
      log.push(1);
    });
    deferredUtils.when(d1).done(function(result) {
      assert.deepEqual(result, 1, 'correct args');
      log.push(2);
    });
    deferredUtils.when(d1, d2).done(function(result) {
      assert.deepEqual([].slice.call(arguments), [1, [2, 3]], 'correct args');
      log.push(3);
    });
    d1.resolve(1);
    d2.resolve(2, 3);
    assert.deepEqual(log, [1, 2, 3], 'resolved synchronous');
  });
  QUnit.test('when should have correct context in done handler', function(assert) {
    const d1 = new Deferred();
    const d2 = new Deferred();
    deferredUtils.when(d1, d2).done(function(result) {
      assert.equal(this.length, 2, 'correct contexts length');
      assert.equal(this[0], d1.promise(), 'correct context');
      assert.equal(this[1], d2.promise(), 'correct context');
    });
    d1.resolve();
    d2.resolve();
  });
  QUnit.test('when should be rejected if one of deferred was rejected', function(assert) {
    let failHandlerCount = 0;
    const d1 = new Deferred();
    const d2 = new Deferred();
    deferredUtils.when(d1, d2).fail(function(result) {
      assert.deepEqual(result, 1, 'correct args');
      failHandlerCount++;
    });
    d1.reject(1);
    assert.deepEqual(failHandlerCount, 1, 'rejected synchronous');
    d2.reject(2);
    assert.deepEqual(failHandlerCount, 1, 'rejected only once');
  });
  QUnit.module('promise');
  QUnit.test('converted deferred should be resolved when source resolved', function(assert) {
    return new Promise(function(resolve) {
      const promiseResult = {};
      const context = {};
      deferredUtils.fromPromise(Promise.resolve(promiseResult), context).done(function(result) {
        assert.equal(result, promiseResult);
        assert.equal(this, context);
        resolve();
      });
    });
  });
  QUnit.test('converted deferred should be rejected when source rejected', function(assert) {
    return new Promise(function(resolve) {
      const promiseResult = {};
      const context = {};
      deferredUtils.fromPromise(Promise.reject(promiseResult), context).fail(function(result) {
        assert.equal(result, promiseResult);
        assert.equal(this, context);
        resolve();
      });
    });
  });
  QUnit.module('deferred');
  [{
    handlerName: 'done',
    methodName: 'resolve',
    state: 'resolved'
  }, {
    handlerName: 'fail',
    methodName: 'reject',
    state: 'rejected'
  }, {
    handlerName: 'progress',
    methodName: 'notify',
    state: 'pending'
  }].forEach(function(config) {
    const handlerName = config.handlerName;
    const methodName = config.methodName;
    QUnit.test('Deferred should have correct state after ' + methodName, function(assert) {
      const deferred = new Deferred();
      deferred[methodName]();
      assert.equal(deferred.state(), config.state, 'deferred has correct state');
      assert.equal(deferred.promise().state(), config.state, 'deferred.promise has correct state');
    });
    QUnit.test(handlerName + ' handler should be called after ' + methodName, function(assert) {
      const deferred = new Deferred();
      deferred[methodName]();
      deferred[handlerName](function() {
        assert.ok(true, 'deferred handler was called');
        assert.equal(this, deferred.promise(), 'handler has correct context');
      });
    });
    QUnit.test('methods should return Deferred', function(assert) {
      const deferred = new Deferred();
      assert.equal(deferred[methodName](), deferred, methodName + ' return correct object');
      assert.equal(deferred.promise()[handlerName](), deferred.promise(), 'promise().' + handlerName + ' return correct object');
      assert.equal(deferred[handlerName](function() {}), deferred, handlerName + ' return correct object');
    });
    QUnit.test(handlerName + ' should support undefined handlers', function(assert) {
      assert.expect(0);
      const deferred = new Deferred();
      deferred[methodName]();
      deferred[handlerName](null);
    });
    QUnit.test(handlerName + ' should be called only once', function(assert) {
      assert.expect(handlerName === 'progress' ? 2 : 1);
      const deferred = new Deferred();
      deferred[handlerName](function() {
        assert.ok(true, 'deferred callback was called');
      });
      deferred[methodName]();
      deferred[methodName]();
    });
    QUnit.test(handlerName + ' should have correct arguments', function(assert) {
      const deferred = new Deferred();
      deferred[handlerName](function(value1, value2) {
        assert.equal(arguments.length, 2, 'handler has correct number of arguments');
        assert.equal(value1, 3, 'argument is correct');
        assert.equal(value2, 5, 'argument is correct');
      });
      deferred[methodName](3, 5);
    });
    QUnit.test(handlerName + ' should have correct context and arguments after resolve with ' + methodName + 'With method', function(assert) {
      const deferred = new Deferred();
      const context = {};
      deferred[handlerName](function(value1, value2) {
        assert.equal(this, context, 'deferred handler has correct context');
        assert.equal(arguments.length, 2, 'handler has correct number of arguments');
        assert.equal(value1, 3, 'argument is correct');
        assert.equal(value2, 5, 'argument is correct');
      });
      deferred[methodName + 'With'](context, [3, 5]);
    });
    QUnit.test(handlerName + ' handler should be called if Deferred was already resolved/rejected', function(assert) {
      const deferred = new Deferred();
      const context = {};
      deferred[methodName + 'With'](context, [3, 5]);
      deferred[handlerName](function(value1, value2) {
        assert.equal(this, context, 'deferred handler has correct context');
        assert.equal(arguments.length, 2, 'handler has correct number of arguments');
        assert.equal(value1, 3, 'argument is correct');
        assert.equal(value2, 5, 'argument is correct');
      });
    });
    QUnit.test('promise should have ' + handlerName + ' handler and shouldn\'t have ' + methodName + ' method', function(assert) {
      const promise = new Deferred().promise();
      assert.ok(isFunction(promise[handlerName]), 'promise has ' + handlerName + ' handler');
      assert.notOk(isFunction(promise[methodName]), 'promise doesn\'t have ' + methodName + ' method');
    });
  });
  QUnit.test('resolve handler shouldn\'t be called after reject', function(assert) {
    assert.expect(0);
    const deferred = new Deferred();
    deferred.done(function(value1, value2) {
      assert.ok(false, 'handler was called');
    });
    deferred.reject();
    deferred.resolve();
  });
  QUnit.test('notify handler shouldn\'t be called after reject/resolve', function(assert) {
    assert.expect(0);
    const deferred = new Deferred();
    deferred.progress(function(value1, value2) {
      assert.ok(true, 'handler was called');
    });
    deferred.reject();
    deferred.notify();
  });
  QUnit.test('always handler should be called after resolve', function(assert) {
    const deferred = new Deferred();
    const result = deferred.always(function(value1, value2) {
      assert.equal(this, deferred.promise(), 'deferred handler has correct context');
      assert.equal(arguments.length, 2, 'handler has correct number of arguments');
      assert.equal(value1, 3, 'argument is correct');
      assert.equal(value2, 5, 'argument is correct');
    });
    deferred.resolve(3, 5);
    assert.equal(result, deferred, 'deferred handler return correct object');
  });
  QUnit.test('always handler return correct object', function(assert) {
    const deferred = new Deferred();
    assert.equal(deferred.always(), deferred, 'deferred handler return correct object');
    assert.equal(deferred.promise().always(), deferred.promise(), 'deferred.promise() handler return correct object');
  });
  QUnit.test('always handler should be called after reject', function(assert) {
    const deferred = new Deferred();
    deferred.always(function(value1, value2) {
      assert.equal(this, deferred.promise(), 'deferred handler has correct context');
      assert.equal(arguments.length, 2, 'handler has correct number of arguments');
      assert.equal(value1, 3, 'argument is correct');
      assert.equal(value2, 5, 'argument is correct');
    });
    deferred.reject(3, 5);
  });
  QUnit.test('catch handler should be called after reject', function(assert) {
    const deferred = new Deferred();
    deferred.catch(function(value) {
      assert.equal(this, deferred.promise(), 'deferred handler has correct context');
      assert.equal(value, 3, 'argument is correct');
    });
    deferred.reject(3);
  });
  QUnit.test('catch handler shouldn\'t be called after resolve', function(assert) {
    assert.expect(0);
    const deferred = new Deferred();
    deferred.catch(function(value) {
      assert.ok(false);
    });
    deferred.resolve(3);
  });
  QUnit.test('catch handler should be called after reject in chain', function(assert) {
    const deferred = new Deferred();
    deferred.then(function() {
      assert.ok(false, 'resolve callback was called');
    }).catch(function(value) {
      assert.equal(value, 3, 'argument is correct');
    });
    deferred.reject(3);
  });
  QUnit.test('complex chain should call resolve handlers after reject handlers', function(assert) {
    assert.expect(2);
    const deferred = new Deferred();
    deferred.then(function() {
      assert.ok(false, 'resolve handler should\'t be called');
    }).then(undefined, function() {
      assert.ok(true, 'reject should be called');
    }).then(function() {
      assert.ok(true, 'resolve after reject should be called');
    }, function() {
      assert.ok(false, 'reject after reject shouldn\'t be called');
    });
    deferred.reject(3);
  });
  QUnit.test('then.resolve handler should be called after resolve', function(assert) {
    const deferred = new Deferred();
    deferred.then(function(value1, value2) {
      assert.equal(this, deferred.promise(), 'deferred handler has correct context');
      assert.equal(arguments.length, 2, 'handler has correct number of arguments');
      assert.equal(value1, 3, 'argument is correct');
      assert.equal(value2, 5, 'argument is correct');
    });
    deferred.resolve(3, 5);
  });
  QUnit.test('then.reject handler should be called after reject', function(assert) {
    const deferred = new Deferred();
    deferred.then(null, function(value1, value2) {
      assert.equal(this, deferred.promise(), 'deferred handler has correct context');
      assert.equal(arguments.length, 2, 'handler has correct number of arguments');
      assert.equal(value1, 3, 'argument is correct');
      assert.equal(value2, 5, 'argument is correct');
    });
    deferred.reject(3, 5);
  });
  QUnit.test('then should support chaining', function(assert) {
    assert.expect(2);
    const deferred = new Deferred();
    const chainingDeferred = new Deferred();
    deferred.then(function() {
      return 5;
    }).then(function(value) {
      assert.equal(value, 5);
      return chainingDeferred.promise();
    }).then(function(value) {
      assert.equal(value, 8);
    });
    deferred.resolve(3);
    chainingDeferred.resolve(8);
  });
  QUnit.test('then should support chaining with native Promise', function(assert) {
    assert.expect(1);
    const deferred = new Deferred();
    let promiseResolve;
    const promise = new Promise(function(resolve, reject) {
      promiseResolve = resolve;
    });
    deferred.then(function() {
      return promise;
    }).then(function(value) {
      assert.equal(value, 9);
    });
    deferred.resolve();
    promiseResolve(9);
    return promise;
  });
  QUnit.test('then should call only first handler after reject', function(assert) {
    assert.expect(1);
    const deferred = new Deferred();
    const chainingDeferred = new Deferred();
    deferred.then(function() {
      return chainingDeferred;
    }).then(undefined, function() {
      assert.ok(true, 'should handle first then');
    }).then(undefined, function() {
      assert.ok(false, 'shouldn\'t call second handler');
    });
    deferred.resolve();
    chainingDeferred.reject();
  });
  QUnit.test('promise method should extend promise object', function(assert) {
    const props = {test: 'testProperty'};
    const deferred = new Deferred();
    const promise = deferred.promise(props);
    assert.equal(promise.test, props.test, 'promise has additional properties');
    assert.notEqual(deferred.test, props.test, 'deferred doesn\'t have additional properties');
  });
  QUnit.test('Deferred should resolve native Promise', function(assert) {
    const deferred = new Deferred();
    const promise = Promise.resolve(deferred);
    promise.then(function(value1) {
      assert.ok(true, 'native promise was resolved');
      assert.equal(arguments.length, 1, 'handler has correct number of arguments');
      assert.equal(value1, 3, 'argument is correct');
    });
    deferred.resolve(3, 5);
    return promise;
  });
  QUnit.test('then.reject handler shouldn\'t be called after resolve', function(assert) {
    assert.expect(0);
    const deferred = new Deferred();
    deferred.then(undefined, function(value1) {
      assert.ok(false, 'callback wasn\'t called');
    });
    deferred.resolve(3);
  });
  QUnit.test('converted deferred should be resolved sync when source resolved', function(assert) {
    assert.expect(2);
    const promiseResult = {};
    const context = {};
    deferredUtils.fromPromise((new Deferred()).resolveWith(context, [promiseResult]).promise()).done(function(result) {
      assert.equal(result, promiseResult);
      assert.equal(this, context);
    });
  });
  QUnit.test('converted deferred should be rejected sync when source rejected', function(assert) {
    assert.expect(2);
    const promiseResult = {};
    const context = {};
    deferredUtils.fromPromise((new Deferred()).rejectWith(context, [promiseResult]).promise()).fail(function(result) {
      assert.equal(result, promiseResult);
      assert.equal(this, context);
    });
  });
  QUnit.test('converted primitive should be resolved sync', function(assert) {
    assert.expect(2);
    const promiseResult = {};
    const context = {};
    deferredUtils.fromPromise(promiseResult, context).done(function(result) {
      assert.equal(result, promiseResult);
      assert.equal(this, context);
    });
  });
  QUnit.test('Can resolve chain with an empty string and zero', function(assert) {
    const deferred = new Deferred();
    deferred.then(function(v) {
      assert.equal(v, 1);
      return '';
    }).then(function(v) {
      assert.strictEqual(v, '');
      return 0;
    }).then(function(v) {
      assert.strictEqual(v, 0);
    });
    deferred.resolve(1);
  });
});

})();
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/type","core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/type"), require("core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.deferred.tests.js.map