!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.icon.tests.js"], ["core/utils/icon"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.core/utils.icon.tests.js", ["core/utils/icon"], function($__export) {
  "use strict";
  var getImageSourceType,
      getImageContainer,
      testModule,
      test,
      ICON_CLASS,
      SVG_ICON_CLASS;
  return {
    setters: [function($__m) {
      getImageSourceType = $__m.getImageSourceType;
      getImageContainer = $__m.getImageContainer;
    }],
    execute: function() {
      var $__3;
      (($__3 = QUnit, testModule = $__3.module, test = $__3.test, $__3));
      ICON_CLASS = 'dx-icon';
      SVG_ICON_CLASS = 'dx-svg-icon';
      testModule('icon utils', {beforeEach: function() {
          this.sourceArray = [{
            source: 'data:image/png;base64,qwertyuiopasdfghjklzxcvbmnQWERTYUIOPLKJHGFDSAZXCVBNM/+0987654321',
            result: 'image'
          }, {
            source: '../folder/123.jgp',
            result: 'image'
          }, {
            source: 'localhost/JFLSKDksjdhfolHWThr30oi',
            result: 'image'
          }, {
            source: 'glyphicon glyphicon-icon',
            result: 'fontIcon'
          }, {
            source: 'glyphicon-icon glyphicon',
            result: 'fontIcon'
          }, {
            source: 'fa fa-icon',
            result: 'fontIcon'
          }, {
            source: 'fa-lg fa-icon fa',
            result: 'fontIcon'
          }, {
            source: 'ion ion-icon',
            result: 'fontIcon'
          }, {
            source: 'ionicons ion-icon',
            result: 'fontIcon'
          }, {
            source: 'icon_-190',
            result: 'dxIcon'
          }, {
            source: 'my my-icon',
            result: 'fontIcon'
          }, {
            source: '<svg></svg>',
            result: 'svg'
          }, {
            source: "<svg>\n                <path />\n            </svg>",
            result: 'svg'
          }, {
            source: "<svg>\n                <path />\n            </svg>\n            <html>",
            result: false
          }, {
            source: "test\n            <svg>\n            <path />\n            </svg>",
            result: false
          }, {
            source: "  <svg>\n            <path />\n            </svg>",
            result: 'svg'
          }, {
            source: 'http://test.test/image.jpg',
            result: 'image'
          }, {
            source: 'image.png',
            result: 'image'
          }, {
            source: ' custom-icon',
            result: 'fontIcon'
          }, {
            source: '<svg>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n',
            result: false
          }];
        }}, function() {
        test('getImageSourceType', function(assert) {
          assert.expect(20);
          this.sourceArray.forEach(function($__4) {
            var $__5 = $__4,
                source = $__5.source,
                result = $__5.result;
            assert.strictEqual(getImageSourceType(source), result);
          });
        });
        test('getImageContainer', function(assert) {
          this.sourceArray.forEach(function($__4) {
            var $__5 = $__4,
                source = $__5.source,
                result = $__5.result;
            var $iconElement = getImageContainer(source);
            switch (result) {
              case 'dxIcon':
                assert.ok($iconElement.hasClass(ICON_CLASS), ("correct for " + result));
                assert.notOk($iconElement.hasClass(SVG_ICON_CLASS), ("correct for " + result));
                assert.ok($iconElement.hasClass((ICON_CLASS + "-" + source)), ("correct for " + result));
                assert.strictEqual($iconElement.get(0).tagName, 'I', ("correct for " + result));
                break;
              case 'fontIcon':
                assert.ok($iconElement.hasClass(ICON_CLASS), ("correct for " + result));
                assert.notOk($iconElement.hasClass(SVG_ICON_CLASS), ("correct for " + result));
                assert.ok($iconElement.hasClass(source.trim()), ("correct for " + result));
                assert.strictEqual($iconElement.get(0).tagName, 'I', ("correct for " + result));
                break;
              case 'image':
                assert.ok($iconElement.hasClass(ICON_CLASS), ("correct for " + result));
                assert.notOk($iconElement.hasClass(SVG_ICON_CLASS), ("correct for " + result));
                assert.strictEqual($iconElement.attr('src'), source, ("correct for " + result));
                assert.strictEqual($iconElement.get(0).tagName, 'IMG', ("correct for " + result));
                break;
              case 'svg':
                assert.ok($iconElement.hasClass(ICON_CLASS), ("correct for " + result));
                assert.ok($iconElement.hasClass(SVG_ICON_CLASS), ("correct for " + result));
                assert.strictEqual($iconElement.get(0).tagName, 'I', ("correct for " + result));
                assert.strictEqual($iconElement.children().get(0).tagName.toUpperCase(), 'SVG', ("correct for " + result));
                break;
              case false:
                assert.strictEqual($iconElement, null, 'element isn\'t created');
                break;
              default:
                break;
            }
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/utils/icon"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/utils/icon"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.icon.tests.js.map