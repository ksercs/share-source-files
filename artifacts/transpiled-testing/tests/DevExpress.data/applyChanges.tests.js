!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.data/applyChanges.tests.js"], ["core/utils/extend","data/errors","data/apply_changes","data/array_utils"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.data/applyChanges.tests.js", ["core/utils/extend", "data/errors", "data/apply_changes", "data/array_utils"], function($__export) {
  "use strict";
  var extend,
      errors,
      applyChanges,
      applyBatch;
  return {
    setters: [function($__m) {
      extend = $__m.extend;
    }, function($__m) {
      errors = $__m.errors;
    }, function($__m) {
      applyChanges = $__m.default;
    }, function($__m) {
      applyBatch = $__m.applyBatch;
    }],
    execute: function() {
      QUnit.module('Apply Changes', {beforeEach: function() {
          var $__4 = this;
          this.data = [{
            id: 1,
            name: 'test1'
          }, {
            id: 2,
            name: 'test2'
          }, {
            id: 3,
            name: 'test3'
          }, {
            id: 4,
            name: 'test4'
          }, {
            id: 5,
            name: 'test5'
          }];
          this.changes = [{
            type: 'insert',
            data: {
              id: 345,
              name: 'test new'
            }
          }, {
            type: 'remove',
            key: 3
          }, {
            type: 'update',
            key: 4,
            data: {name: 'new name'}
          }];
          this.keyExpr = 'id';
          this.addOptions = function(config) {
            if (!$__4.options) {
              $__4.options = {};
            }
            extend($__4.options, config);
          };
        }}, function() {
        [false, true].forEach(function(withKeyExpr) {
          var keyExprSpecified = ("'keyExpr' is " + (withKeyExpr ? '' : 'not') + " specified");
          [true, false].forEach(function(withImmutable) {
            var immutableSpecified = ("'immutable' is " + (withImmutable ? '' : 'not') + " specified");
            QUnit.test(("Items should be updated with immutability when " + immutableSpecified + " and " + keyExprSpecified), function(assert) {
              withKeyExpr && this.addOptions({keyExpr: this.keyExpr});
              withImmutable && this.addOptions({immutable: true});
              var result = applyChanges(this.data, this.changes, this.options);
              assert.equal(this.data.length, 5, 'data length');
              assert.equal(result.length, 5, 'result length');
              assert.notEqual(result, this.data, 'original and result arrays are not equal');
              assert.equal(this.data[0], result[0], 'first items are equal');
              assert.equal(this.data[1], result[1], 'second items are equal');
              assert.notEqual(this.data[2], result[2], 'third items are not equal');
              assert.deepEqual(this.data[2], {
                id: 3,
                name: 'test3'
              }, 'third item value of the original array');
              assert.deepEqual(result[2], {
                id: 4,
                name: 'new name'
              }, 'third item value of the result array');
              assert.notEqual(this.data[3], result[3], 'fourth items are not equal');
              assert.deepEqual(this.data[3], {
                id: 4,
                name: 'test4'
              }, 'fourth item value of the original array');
              assert.deepEqual(result[3], {
                id: 5,
                name: 'test5'
              }, 'fourth item value of the result array');
              assert.notEqual(this.data[4], result[4], 'fifth items are not equal');
              assert.deepEqual(this.data[4], {
                id: 5,
                name: 'test5'
              }, 'fifth item value of the original array');
              assert.deepEqual(result[4], {
                id: 345,
                name: 'test new'
              }, 'fifth item value of the result array');
            });
          });
          QUnit.test(("Items should be updated with mutability when 'immutable' is specified and " + keyExprSpecified), function(assert) {
            this.addOptions({immutable: false});
            withKeyExpr && this.addOptions({keyExpr: this.keyExpr});
            var result = applyChanges(this.data, this.changes, this.options);
            assert.equal(this.data.length, 5, 'data length');
            assert.equal(result, this.data, 'original and result arrays are equal');
            assert.deepEqual(this.data[0], {
              id: 1,
              name: 'test1'
            }, 'first item value of the original array');
            assert.deepEqual(this.data[1], {
              id: 2,
              name: 'test2'
            }, 'second item value of the original array');
            assert.deepEqual(this.data[2], {
              id: 4,
              name: 'new name'
            }, 'third item value of the original array');
            assert.deepEqual(this.data[3], {
              id: 5,
              name: 'test5'
            }, 'fourth item value of the original array');
            assert.deepEqual(this.data[4], {
              id: 345,
              name: 'test new'
            }, 'first item value of the original array');
          });
        });
        QUnit.test('Errors should be logged in the console when key values are not correct', function(assert) {
          this.data = [{
            id: 1,
            name: 'test1'
          }, {
            id: 2,
            name: 'test2'
          }, {
            id: 3,
            name: 'test3'
          }, {
            id: 4,
            name: 'test4'
          }, {
            id: 5,
            name: 'test5'
          }];
          this.changes = [{
            type: 'insert',
            data: {
              id: 5,
              name: 'test new'
            }
          }, {
            type: 'remove',
            key: 6
          }, {
            type: 'update',
            key: 7,
            data: {name: 'new name'}
          }];
          var errorsLogSpy = sinon.spy(errors, 'log');
          var result = applyChanges(this.data, this.changes);
          assert.deepEqual(result, this.data, 'result and data should be the same');
          assert.equal(errorsLogSpy.callCount, 3, 'error.log call count');
          assert.equal(errorsLogSpy.getCall(0).args[0], 'E4008', 'insert error');
          assert.equal(errorsLogSpy.getCall(1).args[0], 'E4009', 'remove error');
          assert.equal(errorsLogSpy.getCall(2).args[0], 'E4009', 'update error');
          errorsLogSpy.restore();
        });
        QUnit.test('applyBatch should not log errors when the logError parameter is not set to true', function(assert) {
          this.data = [{
            id: 1,
            name: 'test1'
          }, {
            id: 2,
            name: 'test2'
          }, {
            id: 3,
            name: 'test3'
          }, {
            id: 4,
            name: 'test4'
          }, {
            id: 5,
            name: 'test5'
          }];
          this.changes = [{
            type: 'insert',
            data: {
              id: 5,
              name: 'test new'
            }
          }, {
            type: 'remove',
            key: 6
          }, {
            type: 'update',
            key: 7,
            data: {name: 'new name'}
          }];
          var keyInfo = {
            key: function() {
              return 'id';
            },
            keyOf: function(obj) {
              return obj.id;
            }
          };
          var errorsLogSpy = sinon.spy(errors, 'log');
          applyBatch({
            keyInfo: keyInfo,
            data: this.data,
            changes: this.changes
          });
          assert.equal(errorsLogSpy.callCount, 0, 'error.log should not be called');
          errorsLogSpy.restore();
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/extend","data/errors","data/apply_changes","data/array_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/extend"), require("data/errors"), require("data/apply_changes"), require("data/array_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=applyChanges.tests.js.map