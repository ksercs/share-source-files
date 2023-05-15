!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.array_compare.tests.js"], ["core/utils/array_compare","core/utils/extend"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.core/utils.array_compare.tests.js", ["core/utils/array_compare", "core/utils/extend"], function($__export) {
  "use strict";
  var findChanges,
      extend;
  return {
    setters: [function($__m) {
      findChanges = $__m.findChanges;
    }, function($__m) {
      extend = $__m.extend;
    }],
    execute: function() {
      QUnit.module('findChanges', {beforeEach: function() {
          var $__3 = this;
          var isItemEquals = function(item1, item2) {
            return JSON.stringify(item1) === JSON.stringify(item2);
          };
          this.oldItems = [{
            a: 'Item 0',
            id: 0
          }, {
            a: 'Item 1',
            id: 1
          }];
          this.newItems = extend(true, [], this.oldItems);
          this.findChanges = function() {
            return findChanges($__3.oldItems, $__3.newItems, function(item) {
              return item.id;
            }, isItemEquals);
          };
        }}, function() {
        QUnit.test('add item in the beginning', function(assert) {
          this.newItems.unshift({
            a: 'Item 2',
            id: 2
          });
          var changes = this.findChanges();
          assert.equal(changes.length, 1);
          assert.equal(changes[0].type, 'insert');
          assert.equal(changes[0].data.id, 2);
        });
        QUnit.test('remove item from the beginning', function(assert) {
          this.newItems.shift();
          var changes = this.findChanges();
          assert.equal(changes.length, 1);
          assert.equal(changes[0].type, 'remove');
          assert.equal(changes[0].key, 0);
        });
        QUnit.test('remove(beginning), insert(end), update', function(assert) {
          this.newItems.shift();
          this.newItems.push({
            a: 'Item 2',
            id: 2
          });
          this.newItems[0].a = 'Item 1 updated';
          var changes = this.findChanges();
          assert.equal(changes.length, 3);
          assert.equal(changes[0].type, 'remove');
          assert.equal(changes[0].key, 0);
          assert.equal(changes[1].type, 'update');
          assert.equal(changes[1].data.id, 1);
          assert.equal(changes[2].type, 'insert');
          assert.equal(changes[2].data.id, 2);
        });
        QUnit.test('remove(end), insert(beginning), update', function(assert) {
          this.newItems.pop();
          this.newItems.unshift({
            a: 'Item 2',
            id: 2
          });
          this.newItems[1].a = 'Item 0 updated';
          var changes = this.findChanges();
          assert.equal(changes[0].type, 'insert');
          assert.equal(changes[0].data.id, 2);
          assert.equal(changes[1].type, 'update');
          assert.equal(changes[1].data.id, 0);
          assert.equal(changes[2].type, 'remove');
          assert.equal(changes[2].key, 1);
        });
        QUnit.test('remove(end), update(beginning)', function(assert) {
          this.newItems.pop();
          this.newItems[0].a = 'Item 0 updated';
          var changes = this.findChanges();
          assert.equal(changes[0].type, 'update');
          assert.equal(changes[0].data.id, 0);
          assert.equal(changes[1].type, 'remove');
          assert.equal(changes[1].key, 1);
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/array_compare","core/utils/extend"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/array_compare"), require("core/utils/extend"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.array_compare.tests.js.map