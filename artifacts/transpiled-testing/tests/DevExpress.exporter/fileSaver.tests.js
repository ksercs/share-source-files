!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/fileSaver.tests.js"], ["jquery","exporter","ui/widget/ui.errors","core/utils/type","core/dom_adapter","../../helpers/ariaAccessibilityTestHelper.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/fileSaver.tests.js", ["jquery", "exporter", "ui/widget/ui.errors", "core/utils/type", "core/dom_adapter", "../../helpers/ariaAccessibilityTestHelper.js"], function($__export) {
  "use strict";
  var $,
      fileSaver,
      errors,
      typeUtils,
      domAdapter,
      ariaAccessibilityTestHelper;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      fileSaver = $__m.fileSaver;
    }, function($__m) {
      errors = $__m.default;
    }, function($__m) {
      typeUtils = $__m.default;
    }, function($__m) {
      domAdapter = $__m.default;
    }, function($__m) {
      ariaAccessibilityTestHelper = $__m.default;
    }],
    execute: function() {
      QUnit.module('saveAs');
      QUnit.test('exportLinkElement generate', function(assert) {
        if (!typeUtils.isFunction(window.Blob)) {
          assert.ok(true, 'This browser doesn\'t support Blob function');
          return;
        }
        if (typeUtils.isDefined(navigator.msSaveOrOpenBlob)) {
          assert.ok(true, 'This browser use msSaveOrOpenBlob for save blob');
          return;
        }
        var URL = window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL;
        var helper = new ariaAccessibilityTestHelper(function() {});
        var href = URL.createObjectURL(new Blob([], {type: 'test/plain'}));
        var testExportLink = fileSaver._linkDownloader('test.xlsx', href);
        testExportLink.id = 'link';
        helper.checkAttributes($(testExportLink), {
          id: 'link',
          target: '_blank',
          download: 'test.xlsx',
          href: href
        }, 'downloadLink');
        assert.equal(domAdapter.getDocument().getElementById('link'), null, 'download link not attached to a document');
        var clickHandler = sinon.spy();
        testExportLink.addEventListener('click', function(e) {
          clickHandler(e);
          e.preventDefault();
        });
        fileSaver._click(testExportLink);
        assert.equal(clickHandler.callCount, 1, '\'click\' event dispatched');
        URL.revokeObjectURL(href);
      });
      QUnit.test('saveAs - check revokeObjectURL', function(assert) {
        if (!typeUtils.isFunction(window.Blob)) {
          assert.ok(true, 'This browser doesn\'t support Blob function');
          return;
        }
        if (typeUtils.isDefined(navigator.msSaveOrOpenBlob)) {
          assert.ok(true, 'This browser use msSaveOrOpenBlob for save blob');
          return;
        }
        assert.timeout(1000);
        var done = assert.async();
        assert.expect(5);
        assert.equal(fileSaver._revokeObjectURLTimeout, 30000, 'default fileSaver._revokeObjectURLTimeout');
        var oldRevokeObjectURLTimeout = fileSaver._revokeObjectURLTimeout;
        var oldFileSaverClick = fileSaver._click;
        try {
          fileSaver._revokeObjectURLTimeout = 100;
          fileSaver._objectUrlRevoked = false;
          fileSaver._click = function(link) {
            link.addEventListener('click', function(e) {
              assert.ok(true, 'file should be download');
              e.preventDefault();
            });
            oldFileSaverClick(link);
          };
          fileSaver.saveAs('test', 'EXCEL', new Blob([], {type: 'test/plain'}));
          assert.ok(!fileSaver._objectUrlRevoked, 'objectURL is not revoked immediately');
          setTimeout(function() {
            assert.ok(!fileSaver._objectUrlRevoked, 'objectURL is not revoked immediately');
          }, 50);
          setTimeout(function() {
            assert.ok(fileSaver._objectUrlRevoked, 'objectURL is revoked after fileSaver._revokeObjectURLTimeout');
            done();
          }, 150);
        } finally {
          fileSaver._revokeObjectURLTimeout = oldRevokeObjectURLTimeout;
          fileSaver._click = oldFileSaverClick;
        }
      });
      QUnit.test('Save blob by _winJSBlobSave on winJS devices', function(assert) {
        if (typeUtils.isFunction(window.Blob)) {
          var _winJSBlobSave = fileSaver._winJSBlobSave;
          var isCalled = false;
          try {
            window.WinJS = {};
            fileSaver._winJSBlobSave = function() {
              isCalled = true;
            };
            fileSaver.saveAs('test', 'EXCEL', [], 'testUrl');
            assert.ok(isCalled);
          } finally {
            delete window.WinJS;
            fileSaver._winJSBlobSave = _winJSBlobSave;
          }
        }
      });
      QUnit.test('Save base 64 for Safari', function(assert) {
        if (!typeUtils.isFunction(window.Blob)) {
          var exportLinkElementClicked = false;
          var _linkDownloader = fileSaver._linkDownloader;
          fileSaver._linkDownloader = function() {
            exportLinkElementClicked = true;
          };
          fileSaver.saveAs('test', 'EXCEL');
          assert.ok(exportLinkElementClicked, 'ExportLink href generated');
          fileSaver._linkDownloader = _linkDownloader;
        } else {
          assert.ok(true, 'This test for browsers have no Blob function support ');
          return;
        }
      });
      QUnit.test('No E1034 on iPad', function(assert) {
        if (!typeUtils.isDefined(navigator.userAgent.match(/iPad/i))) {
          assert.ok(true, 'This test for iPad devices');
          return;
        }
        var done = assert.async();
        var warningSend = null;
        var _devExpressLog = errors.log;
        var _fileSaverClick = fileSaver._click;
        var oldRevokeObjectURLTimeout = fileSaver._revokeObjectURLTimeout;
        try {
          fileSaver._click = function() {};
          fileSaver._revokeObjectURLTimeout = 100;
          errors.log = function(errorCode) {
            warningSend = errorCode;
            return;
          };
          fileSaver.saveAs('test', 'EXCEL', new Blob([], {type: 'test/plain'}));
          setTimeout(function() {
            assert.notStrictEqual(warningSend, 'E1034', 'Warning E1034 wasn\'t sent');
            done();
          }, 150);
        } finally {
          errors.log = _devExpressLog;
          fileSaver._click = _fileSaverClick;
          fileSaver._revokeObjectURLTimeout = oldRevokeObjectURLTimeout;
        }
      });
      QUnit.test('SaveBlobAs is called after saveAs', function(assert) {
        if (!typeUtils.isFunction(window.Blob)) {
          assert.ok(true, 'This browser doesn\'t support Blob function');
          return;
        }
        var saveBlobAs = fileSaver._saveBlobAs;
        var isSaveBlobAs = false;
        fileSaver._saveBlobAs = function() {
          isSaveBlobAs = true;
        };
        fileSaver.saveAs('test', 'EXCEl');
        fileSaver._saveBlobAs = saveBlobAs;
        assert.ok(isSaveBlobAs);
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","exporter","ui/widget/ui.errors","core/utils/type","core/dom_adapter","../../helpers/ariaAccessibilityTestHelper.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("exporter"), require("ui/widget/ui.errors"), require("core/utils/type"), require("core/dom_adapter"), require("../../helpers/ariaAccessibilityTestHelper.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=fileSaver.tests.js.map