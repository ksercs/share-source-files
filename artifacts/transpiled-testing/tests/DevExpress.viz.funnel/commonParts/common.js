!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.viz.funnel/commonParts/common.js"], ["jquery","../../../helpers/vizMocks.js","viz/core/renderers/renderer","viz/funnel/tiling","viz/funnel/funnel","viz/themes"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.viz.funnel/commonParts/common.js", ["jquery", "../../../helpers/vizMocks.js", "viz/core/renderers/renderer", "viz/funnel/tiling", "viz/funnel/funnel", "viz/themes"], function($__export) {
  "use strict";
  var $,
      vizMocks,
      rendererModule,
      tiling,
      stubAlgorithm,
      environment;
  function createFunnel(options) {
    var defaultOptions = {
      legend: {visible: false},
      valueField: 'value',
      argumentField: 'argument'
    };
    return $('#test-container').dxFunnel($.extend({}, defaultOptions, options)).dxFunnel('instance');
  }
  function checkNumbersWithError(actual, expected, error) {
    return actual === expected || (actual < expected + error && actual > expected - error);
  }
  $__export("createFunnel", createFunnel);
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      vizMocks = $__m.default;
    }, function($__m) {
      rendererModule = $__m.default;
    }, function($__m) {
      tiling = $__m.default;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      stubAlgorithm = {
        normalizeValues: sinon.stub(),
        getFigures: sinon.stub()
      };
      $__export("stubAlgorithm", stubAlgorithm);
      tiling.addAlgorithm('stub', stubAlgorithm);
      $('#qunit-fixture').append('<div id="test-container"></div>');
      environment = {
        beforeEach: function() {
          var that = this;
          this.renderer = new vizMocks.Renderer();
          stubAlgorithm.normalizeValues.reset();
          stubAlgorithm.getFigures.reset();
          stubAlgorithm.normalizeValues.returns([]);
          stubAlgorithm.getFigures.returns([]);
          this.itemGroupNumber = 0;
          sinon.stub(rendererModule, 'Renderer').callsFake(function() {
            return that.renderer;
          });
        },
        afterEach: function() {
          rendererModule.Renderer.restore();
        },
        itemsGroup: function() {
          return this.renderer.g.getCall(this.itemGroupNumber).returnValue;
        },
        items: function() {
          return this.itemsGroup().children;
        },
        item: function(index) {
          return this.items[index];
        }
      };
      $__export("environment", environment);
      QUnit.assert.checkItem = function(actual, expected, error, message) {
        var check = true;
        var i;
        if (!error) {
          error = 0.1;
        }
        for (i = 0; i < actual.length; i++) {
          check = checkNumbersWithError(actual[i], expected[i], error) && check;
        }
        this.pushResult({
          result: check,
          actual: actual,
          expected: !check && expected,
          message: message
        });
      };
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","../../../helpers/vizMocks.js","viz/core/renderers/renderer","viz/funnel/tiling","viz/funnel/funnel","viz/themes"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("../../../helpers/vizMocks.js"), require("viz/core/renderers/renderer"), require("viz/funnel/tiling"), require("viz/funnel/funnel"), require("viz/themes"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=common.js.map