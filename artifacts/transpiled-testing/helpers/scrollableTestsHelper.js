!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/scrollableTestsHelper.js"], ["core/devices","__internal/grids/pivot_grid/module_widget_utils"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/helpers/scrollableTestsHelper.js", ["core/devices", "__internal/grids/pivot_grid/module_widget_utils"], function($__export) {
  "use strict";
  var devices,
      calculateScrollbarWidth,
      SCROLLABLE_CONTAINER,
      SCROLLABLE_CONTENT;
  function checkScrollableSizes(assert, $rootContainer, $__1) {
    var $__2 = $__1,
        id = $__2.id,
        width = $__2.width,
        height = $__2.height,
        containerWidth = $__2.containerWidth,
        containerScrollWidth = $__2.containerScrollWidth,
        containerHeight = $__2.containerHeight,
        containerScrollHeight = $__2.containerScrollHeight,
        nestedElementWidth = $__2.nestedElementWidth,
        nestedElementHeight = $__2.nestedElementHeight,
        overflowX = $__2.overflowX,
        overflowY = $__2.overflowY,
        useNativeScrolling = $__2.useNativeScrolling,
        configDetails = $__2.configDetails;
    var nativeScrollbarWidth = calculateScrollbarWidth();
    var expectedContainerClientWidth = containerWidth;
    if (useNativeScrolling && overflowY) {
      expectedContainerClientWidth = containerWidth - nativeScrollbarWidth;
    }
    var expectedContainerClientHeight = containerHeight;
    if (useNativeScrolling && overflowX) {
      expectedContainerClientHeight = containerHeight - nativeScrollbarWidth;
    }
    var expectedContainerScrollWidth = containerScrollWidth;
    if (!overflowX && useNativeScrolling && overflowY) {
      expectedContainerScrollWidth = containerScrollWidth - nativeScrollbarWidth;
    }
    var expectedContainerScrollHeight = containerScrollHeight;
    if (devices.real().ios) {
      if (useNativeScrolling) {
        expectedContainerScrollHeight = containerScrollHeight + (overflowY ? 0 : 1);
      }
    } else if (useNativeScrolling && overflowX && !overflowY) {
      expectedContainerScrollHeight = containerScrollHeight - nativeScrollbarWidth;
    }
    var $scrollable = $rootContainer.find(("#" + id));
    assert.equal($scrollable[0].clientWidth, width, (id + ": scrollable.clientWidth"));
    assert.equal($scrollable[0].clientHeight, height, (id + ": scrollable.clientHeight"));
    var $container = $scrollable.find(("." + SCROLLABLE_CONTAINER));
    assert.strictEqual($container[0].clientWidth, expectedContainerClientWidth, (id + ": container.clientWidth"));
    assert.strictEqual($container[0].scrollWidth, expectedContainerScrollWidth, (id + ": container.scrollWidth"));
    assert.strictEqual($container[0].clientHeight, expectedContainerClientHeight, (id + ": container.clientHeight"));
    if (Array.isArray(containerScrollHeight)) {
      assert.ok($container[0].scrollHeight > containerScrollHeight[0] && $container[0].scrollHeight < containerScrollHeight[1], 'container.scrollHeight(' + $container[0].scrollHeight + ')');
    } else {
      assert.strictEqual($container[0].scrollHeight, expectedContainerScrollHeight, (id + ": container.scrollHeigh"));
    }
    var $content = $scrollable.find(("." + SCROLLABLE_CONTENT)).children();
    assert.equal($content[0].clientWidth, nestedElementWidth, (id + ": content.clientWidth"));
    if (Array.isArray(nestedElementHeight)) {
      assert.ok($content[0].clientHeight > nestedElementHeight[0] && $content[0].clientHeight < nestedElementHeight[1], (id + ": content.clientHeight(" + $content[0].clientHeight + ")"));
    } else {
      assert.equal($content[0].clientHeight, nestedElementHeight, (id + ": content.clientHeight"));
    }
  }
  function QUnitTestIfSupported(name, isSupported, testCallback) {
    if (isSupported) {
      QUnit.test.call(null, name, testCallback);
    } else {
      QUnit.skip.call(null, 'TODO: ' + name, testCallback);
    }
  }
  $__export("checkScrollableSizes", checkScrollableSizes);
  $__export("QUnitTestIfSupported", QUnitTestIfSupported);
  return {
    setters: [function($__m) {
      devices = $__m.default;
    }, function($__m) {
      calculateScrollbarWidth = $__m.calculateScrollbarWidth;
    }],
    execute: function() {
      SCROLLABLE_CONTAINER = 'dx-scrollable-container';
      SCROLLABLE_CONTENT = 'dx-scrollable-content';
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/devices","__internal/grids/pivot_grid/module_widget_utils"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/devices"), require("__internal/grids/pivot_grid/module_widget_utils"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=scrollableTestsHelper.js.map