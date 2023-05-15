!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.browser.tests.js"], ["core/utils/browser"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic('testing/tests/DevExpress.core/utils.browser.tests.js', ['core/utils/browser'], true, function ($__require, exports, module) {
    var global = this || self,
        GLOBAL = global;
    const browser = $__require('core/utils/browser');

    const userAgents = {
        webkit: 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Custom/43.0.2357.124',
        mozilla: 'Mozilla/5.0 (Windows NT 6.3; WOW64; rv:38.0) Gecko/20100101 Firefox/38.0',
        msEdge: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/42.0.2311.135 Safari/537.36 Edge/12.0',
        safari: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/602.2.14 (KHTML, like Gecko) Version/10.0.1 Safari/602.2.14',
        chrome: 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
        chrome_ios: 'Mozilla/5.0 (iPad; CPU OS 9_1 like Mac OS X) AppleWebKit/601.1 (KHTML, like Gecko) CriOS/74.0.3729.157 Mobile/13B143 Safari/601.1.46',
        mozilla_ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_4 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) FxiOS/18.2b15817 Mobile/15E148 Safari/605.1.15',
        phantom: 'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/538.1 (KHTML, like Gecko) PhantomJS/2.1.1 Safari/538.1',
        google_app_ios: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) GSA/88.0.281793270 Mobile/15E148 Safari/604.1'
    };

    QUnit.module('browser');

    QUnit.test('browser is generic webkit', function (assert) {
        const browserObject = browser._fromUA(userAgents.webkit);
        assert.ok(browserObject.webkit, 'webkit detected');
        assert.equal(browserObject.version, '537.36', 'version was detect correctly');
    });

    QUnit.test('browser is mozilla', function (assert) {
        const browserObject = browser._fromUA(userAgents.mozilla);
        assert.ok(browserObject.mozilla, 'mozilla detected');
        assert.equal(browserObject.version, '38.0', 'version was detect correctly');
    });

    QUnit.test('browser is safari', function (assert) {
        const browserObject = browser._fromUA(userAgents.safari);

        assert.ok(browserObject.safari, 'safari detected');
        assert.ok(browserObject.webkit, 'safari is webkit browser');
        assert.equal(browserObject.version, '10.0.1', 'version was detect correctly');
    });

    QUnit.test('browser is phantom masked to safari', function (assert) {
        const browserObject = browser._fromUA(userAgents.phantom);

        assert.ok(browserObject.safari, 'safari detected');
        assert.ok(browserObject.webkit, 'safari is webkit browser');
    });

    QUnit.test('chrome is webkit but not safari', function (assert) {
        const browserObject = browser._fromUA(userAgents.chrome);

        assert.notOk(browserObject.safari, 'chrome is not safari');
        assert.ok(browserObject.webkit, 'chrome is webkit browser');
        assert.ok(browserObject.chrome, 'chrome is true');
        assert.strictEqual(browserObject.version, '56.0', 'chrome version is correct');
    });

    QUnit.test('browser is chrome (mobile)', function (assert) {
        const browserObject = browser._fromUA(userAgents.chrome_ios);

        assert.notOk(browserObject.safari, 'chrome is not safari');
        assert.ok(browserObject.webkit, 'chrome is webkit browser');
        assert.ok(browserObject.chrome, 'chrome is true');
        assert.strictEqual(browserObject.version, '74.0', 'chrome version is correct');
    });

    QUnit.test('browser is mozilla (mobile)', function (assert) {
        const browserObject = browser._fromUA(userAgents.mozilla_ios);

        assert.ok(browserObject.mozilla, 'mozilla detected');
        assert.ok(browserObject.webkit, 'firefox for ios is webkit browser');
        assert.notOk(browserObject.safari, 'firefox is not safari');
        assert.notOk(browserObject.chrome, 'firefox is not chrome');
        assert.equal(browserObject.version, '18.2', 'version was detect correctly');
    });

    QUnit.test('google app is chrome (mobile)', function (assert) {
        const browserObject = browser._fromUA(userAgents.google_app_ios);

        assert.notOk(browserObject.safari, 'google app is not safari');
        assert.notOk(browserObject.chrome, 'google app is not chrome');
        assert.ok(browserObject.webkit, 'google app is webkit browser');
        assert.ok(browserObject.unknown, 'but google app is not known browser name');
        assert.strictEqual(browserObject.version, '605.1.15', 'webkit version is correct');
    });
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/browser"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/browser"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.browser.tests.js.map