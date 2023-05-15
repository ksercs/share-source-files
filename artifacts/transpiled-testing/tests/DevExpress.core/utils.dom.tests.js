!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.core/utils.dom.tests.js"], ["jquery","core/utils/dom","core/utils/support","core/utils/style","core/devices","mobile/init_mobile_viewport","../../helpers/keyboardMock.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.core/utils.dom.tests.js", ["jquery", "core/utils/dom", "core/utils/support", "core/utils/style", "core/devices", "mobile/init_mobile_viewport", "../../helpers/keyboardMock.js"], function($__export) {
  "use strict";
  var $,
      domUtils,
      support,
      styleUtils,
      devices,
      initMobileViewport,
      keyboardMock;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      domUtils = $__m.default;
    }, function($__m) {
      support = $__m.default;
    }, function($__m) {
      styleUtils = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      initMobileViewport = $__m.default;
    }, function($__m) {
      keyboardMock = $__m.default;
    }],
    execute: function() {
      QUnit.module('createMarkup');
      QUnit.test('normalizeTemplateElement with script element', function(assert) {
        var domElement = document.createElement('script');
        domElement.innerHTML = 'Test';
        var $result = domUtils.normalizeTemplateElement(domElement);
        assert.equal($result.text(), 'Test', 'template based on script element works fine');
      });
      QUnit.module('clipboard');
      QUnit.test('get text from clipboard', function(assert) {
        var clipboardText = '';
        var $input = $('<input>').appendTo('#qunit-fixture');
        var keyboard = keyboardMock($input);
        $input.on('paste', function(e) {
          clipboardText = domUtils.clipboardText(e);
        });
        keyboard.paste('test');
        assert.equal(clipboardText, 'test', 'text from clipboard is correct');
      });
      QUnit.module('selection');
      QUnit.test('clearSelection should not run if selectionType is \'Caret\'', function(assert) {
        var originalGetSelection = window.getSelection;
        try {
          var cleared = 0;
          var selectionMockObject = {
            empty: function() {
              cleared++;
            },
            type: 'Range'
          };
          window.getSelection = function() {
            return selectionMockObject;
          };
          domUtils.clearSelection();
          assert.equal(cleared, 1, 'selection should clear if type is Range');
          selectionMockObject.type = 'Caret';
          domUtils.clearSelection();
          assert.equal(cleared, 1, 'selection should not clear if type is Caret');
        } finally {
          window.getSelection = originalGetSelection;
        }
      });
      QUnit.module('initMobileViewPort');
      QUnit.test('allowSelection should be detected by realDevice', function(assert) {
        if (!support.supportProp('userSelect')) {
          assert.expect(0);
          return;
        }
        var $viewPort = $('<div>').addClass('dx-viewport');
        var originalRealDevice = devices.real();
        var originalCurrentDevice = devices.current();
        $viewPort.appendTo('#qunit-fixture');
        try {
          devices.real({
            platform: 'ios',
            deviceType: 'mobile'
          });
          devices.current({
            platform: 'generic',
            deviceType: 'desktop'
          });
          initMobileViewport();
          assert.equal($viewPort.css(styleUtils.styleProp('userSelect')), 'none', 'allow selection detected by real device');
        } finally {
          devices.real(originalRealDevice);
          devices.current(originalCurrentDevice);
        }
      });
      QUnit.module('Contains');
      QUnit.test('it correctly detect the html element', function(assert) {
        var html = document.documentElement;
        assert.ok(domUtils.contains(document, html), 'Document contains the html element');
      });
      QUnit.test('it correctly detect the body element', function(assert) {
        var body = document.body;
        assert.ok(domUtils.contains(document, body), 'Document contains the body element');
      });
      QUnit.test('it does not raise error if element is a href', function(assert) {
        var hrefElement = $('<a>').attr({href: 'text'}).get(0);
        try {
          domUtils.contains(document, hrefElement);
        } catch (e) {
          assert.ok(false, ("error is raised: " + e.message));
        } finally {
          assert.ok(true, 'no error raised');
        }
      });
      QUnit.test('it correctly detects the window element', function(assert) {
        assert.ok(domUtils.contains(window, document.body), 'Window contains the body element');
      });
      QUnit.test('it correctly works with svg elements', function(assert) {
        var svgContainer = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        var childElement = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        svgContainer.appendChild(childElement);
        assert.ok(domUtils.contains(svgContainer, childElement));
      });
      QUnit.test('element in shadow dom should be detected if container is window', function(assert) {
        var $div = $('<div>').appendTo('#qunit-fixture');
        var divContent = $div.get(0);
        divContent.attachShadow({mode: 'open'});
        divContent.shadowRoot.innerHTML = '<p>Inner Text</p>';
        var textElement = divContent.shadowRoot.querySelector('p');
        assert.ok(domUtils.contains(window, textElement));
      });
      QUnit.test('element in shadow dom should be detected if container is div element', function(assert) {
        var $div = $('<div>').appendTo('#qunit-fixture');
        var divContent = $div.get(0);
        divContent.attachShadow({mode: 'open'});
        divContent.shadowRoot.innerHTML = '<p>Inner Text</p>';
        var textElement = divContent.shadowRoot.querySelector('p');
        assert.ok(domUtils.contains(divContent, textElement));
      });
      QUnit.test('element in shadow dom should be detected if container is document', function(assert) {
        var $div = $('<div>').appendTo('#qunit-fixture');
        var divContent = $div.get(0);
        divContent.attachShadow({mode: 'open'});
        divContent.shadowRoot.innerHTML = '<p>Inner Text</p>';
        var textElement = divContent.shadowRoot.querySelector('p');
        assert.ok(domUtils.contains(document, textElement));
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","core/utils/dom","core/utils/support","core/utils/style","core/devices","mobile/init_mobile_viewport","../../helpers/keyboardMock.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("core/utils/dom"), require("core/utils/support"), require("core/utils/style"), require("core/devices"), require("mobile/init_mobile_viewport"), require("../../helpers/keyboardMock.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=utils.dom.tests.js.map