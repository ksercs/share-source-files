!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.data/dataSourceCreating.tests.js"], ["data/data_source/data_source","data/array_store","data/custom_store","data/local_store","data/odata/store","../../helpers/ajaxMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.data/dataSourceCreating.tests.js", ["data/data_source/data_source", "data/array_store", "data/custom_store", "data/local_store", "data/odata/store", "../../helpers/ajaxMock.js"], function($__export) {
  "use strict";
  var DataSource,
      ArrayStore,
      CustomStore,
      LocalStore,
      ODataStore,
      ajaxMock;
  return {
    setters: [function($__m) {
      DataSource = $__m.DataSource;
    }, function($__m) {
      ArrayStore = $__m.default;
    }, function($__m) {
      CustomStore = $__m.default;
    }, function($__m) {
      LocalStore = $__m.default;
    }, function($__m) {
      ODataStore = $__m.default;
    }, function($__m) {
      ajaxMock = $__m.default;
    }],
    execute: function() {
      QUnit.test('no options', function(assert) {
        var ds = new DataSource();
        assert.ok(ds.store() instanceof ArrayStore);
      });
      QUnit.test('empty options', function(assert) {
        var ds = new DataSource({});
        assert.ok(ds.store() instanceof ArrayStore);
      });
      QUnit.test('options are array', function(assert) {
        var done = assert.async();
        var ds = new DataSource([1, 2, 3]);
        assert.ok(ds.store() instanceof ArrayStore);
        ds.load().done(function(r) {
          assert.deepEqual(r, [1, 2, 3]);
          done();
        });
      });
      QUnit.test('options are store', function(assert) {
        var store = new ArrayStore([1, 2, 3]);
        var ds = new DataSource(store);
        assert.strictEqual(ds.store(), store);
      });
      QUnit.test('options.store is Store', function(assert) {
        var store = new ArrayStore([1, 2, 3]);
        var ds = new DataSource({store: store});
        assert.strictEqual(ds.store(), store);
      });
      QUnit.test('options.store is array', function(assert) {
        var ds = new DataSource({store: [1, 2, 3]});
        assert.ok(ds.store() instanceof ArrayStore);
      });
      QUnit.test('options.load provided', function(assert) {
        function loadFunc() {
          return [1, 2, 3];
        }
        var ds = new DataSource({
          key: 'key1',
          load: loadFunc,
          sort: 'abc'
        });
        assert.ok(ds.store() instanceof CustomStore);
        assert.equal(ds.store().key(), 'key1');
        assert.equal(ds._storeLoadOptions.sort, 'abc');
        assert.strictEqual(ds.store()._loadFunc, loadFunc);
      });
      QUnit.test('options.load and raw load mode', function(assert) {
        var ds = new DataSource({
          load: function() {},
          loadMode: 'raw',
          cacheRawData: false
        });
        var store = ds.store();
        assert.equal(store._loadMode, 'raw');
        assert.equal(store._cacheRawData, false);
      });
      QUnit.test('options.store is ODataStore config', function(assert) {
        var url = 'http://service.test';
        var source = new DataSource({store: {
            type: 'odata',
            url: url
          }});
        assert.ok(source.store() instanceof ODataStore);
        assert.equal(source.store()._requestDispatcher.url, url);
      });
      QUnit.test('options.store is LocalStore config', function(assert) {
        var source = new DataSource({store: {
            type: 'local',
            name: 'MyTestStore',
            immediate: true
          }});
        assert.ok(source.store() instanceof LocalStore);
      });
      QUnit.test('options.store is ArrayStore config', function(assert) {
        var source = new DataSource({store: {
            type: 'array',
            data: [1, 2, 3]
          }});
        assert.ok(source.store() instanceof ArrayStore);
        assert.deepEqual(source.store()._array, [1, 2, 3]);
      });
      QUnit.test('unknown value of options.store.type throws', function(assert) {
        assert.throws(function() {
          new DataSource({store: {type: 'unknown'}});
        });
      });
      QUnit.test('create from bare url', function(assert) {
        var goFurther = assert.async();
        ajaxMock.setup({
          url: 'some.url',
          responseText: [1, 2, 3]
        });
        new DataSource('some.url').load().done(function(r) {
          assert.ok(r.length, 3);
        }).always(function() {
          ajaxMock.clear();
        }).always(goFurther);
      });
      QUnit.test('create from bare url, JSONP', function(assert) {
        var done = assert.async();
        ajaxMock.setup({
          url: 'some.url?callback=?',
          responseText: {jsonp: 'works'}
        });
        new DataSource('some.url?callback=?').load().done(function(r) {
          assert.ok(r[0].jsonp, 'works');
        }).done(function() {
          ajaxMock.clear();
        }).always(done);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["data/data_source/data_source","data/array_store","data/custom_store","data/local_store","data/odata/store","../../helpers/ajaxMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("data/data_source/data_source"), require("data/array_store"), require("data/custom_store"), require("data/local_store"), require("data/odata/store"), require("../../helpers/ajaxMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dataSourceCreating.tests.js.map