!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/clientExporter.tests.js"], ["exporter","core/utils/deferred"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/clientExporter.tests.js", ["exporter", "core/utils/deferred"], function($__export) {
  "use strict";
  var clientExporter,
      Deferred,
      fileSaver;
  function defaultGetBlob(data, options) {
    return new Deferred().resolve();
  }
  return {
    setters: [function($__m) {
      clientExporter = $__m.default;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }],
    execute: function() {
      fileSaver = clientExporter.fileSaver;
      QUnit.module('Client exporter', {
        beforeEach: function() {
          sinon.stub(fileSaver, 'saveAs');
        },
        afterEach: function() {
          fileSaver.saveAs.restore();
        }
      });
      QUnit.test('Save as', function(assert) {
        clientExporter.export({}, {
          fileName: 'testFile',
          format: 'EXCEL'
        }, defaultGetBlob).then(function() {
          assert.equal(fileSaver.saveAs.callCount, 1, 'saveAs was called');
        }).always(assert.async());
      });
      QUnit.test('onExporting', function(assert) {
        var exportingActionStub = sinon.spy();
        clientExporter.export({}, {
          fileName: 'testFile',
          format: 'EXCEL',
          exportingAction: exportingActionStub
        }, defaultGetBlob);
        assert.equal(exportingActionStub.callCount, 1, 'onExporting event');
        assert.deepEqual(exportingActionStub.getCall(0).args[0], {
          cancel: false,
          fileName: 'testFile',
          format: 'EXCEL'
        }, 'onExporting event args');
      });
      QUnit.test('Cancel exporting via onExporting', function(assert) {
        var exportingActionStub = sinon.spy(function(e) {
          e.cancel = true;
        });
        var exportedActionStub = sinon.spy();
        var done = assert.async();
        clientExporter.export({}, {
          fileName: 'testFile',
          format: 'EXCEL',
          exportingAction: exportingActionStub,
          exportedAction: exportedActionStub
        }, defaultGetBlob).then(done);
        assert.equal(exportedActionStub.callCount, 0, 'onExported event');
        assert.equal(fileSaver.saveAs.callCount, 0, 'saveAs was not called');
      });
      QUnit.test('FileName is changed on onExporting event', function(assert) {
        var exportingActionStub = sinon.spy(function(e) {
          e.fileName = 'Excel file name';
        });
        clientExporter.export({}, {
          fileName: 'testFile',
          format: 'EXCEL',
          exportingAction: exportingActionStub
        }, defaultGetBlob).then(function() {
          assert.equal(fileSaver.saveAs.getCall(0).args[0], 'Excel file name', 'file name');
        }).always(assert.async());
      });
      QUnit.test('onExported', function(assert) {
        var exportedActionStub = sinon.spy();
        clientExporter.export({}, {
          fileName: 'testFile',
          format: 'EXCEL',
          exportedAction: exportedActionStub
        }, defaultGetBlob).then(function() {
          assert.equal(exportedActionStub.callCount, 1, 'onExported event');
        }).always(assert.async());
      });
      QUnit.test('onFileSaving without cancel', function(assert) {
        var fileSavingActionStub = sinon.spy();
        var data = 'test-data';
        var getBlob = function(_0, _1) {
          return new Deferred().resolve(data);
        };
        clientExporter.export({}, {
          fileName: 'testFile',
          format: 'EXCEL',
          fileSavingAction: fileSavingActionStub
        }, getBlob).then(function() {
          assert.equal(fileSavingActionStub.callCount, 1, 'onFileSavingCalled called');
          assert.deepEqual(fileSavingActionStub.getCall(0).args[0], {
            fileName: 'testFile',
            data: data,
            format: 'EXCEL',
            cancel: false
          }, 'file saving args');
          assert.equal(fileSaver.saveAs.callCount, 1, 'fileSave called');
        }).always(assert.async());
      });
      QUnit.test('onFileSaving with cancel', function(assert) {
        var fileSavingActionStub = sinon.spy(function(e) {
          e.cancel = true;
        });
        clientExporter.export({}, {
          fileName: 'testFile',
          format: 'EXCEL',
          fileSavingAction: fileSavingActionStub
        }, defaultGetBlob).then(function() {
          assert.equal(fileSavingActionStub.callCount, 1, 'onFileSavingCalled called');
          assert.equal(fileSaver.saveAs.callCount, 0, 'fileSave not called');
        }).always(assert.async());
      });
      QUnit.test('Export to jpeg format', function(assert) {
        var getBlob = sinon.spy(defaultGetBlob);
        clientExporter.export('testData', {
          fileName: 'testFile',
          format: 'JPEG'
        }, getBlob);
        assert.equal(getBlob.callCount, 1, 'getBlob from image creator');
        assert.equal(getBlob.getCall(0).args[0], 'testData', 'data to image creator');
        assert.deepEqual(getBlob.getCall(0).args[1], {
          fileName: 'testFile',
          format: 'JPEG'
        }, 'options to image creator');
      });
      QUnit.test('Export to png format', function(assert) {
        var getBlob = sinon.spy(defaultGetBlob);
        clientExporter.export('testData', {
          fileName: 'testFile',
          format: 'PNG'
        }, getBlob);
        assert.equal(getBlob.callCount, 1, 'getBlob from image creator');
        assert.equal(getBlob.getCall(0).args[0], 'testData', 'data to image creator');
        assert.deepEqual(getBlob.getCall(0).args[1], {
          fileName: 'testFile',
          format: 'PNG'
        }, 'options to image creator');
      });
      QUnit.test('Export to gif format', function(assert) {
        var getBlob = sinon.spy(defaultGetBlob);
        clientExporter.export('testData', {
          fileName: 'testFile',
          format: 'GIF'
        }, getBlob);
        assert.equal(getBlob.callCount, 1, 'getBlob from image creator');
        assert.equal(getBlob.getCall(0).args[0], 'testData', 'data to image creator');
        assert.deepEqual(getBlob.getCall(0).args[1], {
          fileName: 'testFile',
          format: 'GIF'
        }, 'options to image creator');
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["exporter","core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("exporter"), require("core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=clientExporter.tests.js.map