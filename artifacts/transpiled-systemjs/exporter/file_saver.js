!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/exporter/file_saver.js"], ["../core/dom_adapter","../core/utils/window","../ui/widget/ui.errors","../core/utils/type","../core/utils/console"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/exporter/file_saver.js", ["../core/dom_adapter", "../core/utils/window", "../ui/widget/ui.errors", "../core/utils/type", "../core/utils/console"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.fileSaver = exports.MIME_TYPES = void 0;
  var _dom_adapter = _interopRequireDefault($__require("../core/dom_adapter"));
  var _window = $__require("../core/utils/window");
  var _ui = _interopRequireDefault($__require("../ui/widget/ui.errors"));
  var _type = $__require("../core/utils/type");
  var _console = $__require("../core/utils/console");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  /* global Windows */

  var window = (0, _window.getWindow)();
  var navigator = (0, _window.getNavigator)();
  var FILE_EXTESIONS = {
    EXCEL: 'xlsx',
    CSS: 'css',
    PNG: 'png',
    JPEG: 'jpeg',
    GIF: 'gif',
    SVG: 'svg',
    PDF: 'pdf'
  };
  var MIME_TYPES = {
    CSS: 'text/css',
    EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    GIF: 'image/gif',
    SVG: 'image/svg+xml',
    PDF: 'application/pdf'
  };

  // Use github.com/eligrey/FileSaver.js library instead this method
  exports.MIME_TYPES = MIME_TYPES;
  var fileSaver = {
    _revokeObjectURLTimeout: 30000,
    _getDataUri: function _getDataUri(format, data) {
      var mimeType = this._getMimeType(format);
      return "data:".concat(mimeType, ";base64,").concat(data);
    },
    _getMimeType: function _getMimeType(format) {
      return MIME_TYPES[format] || 'application/octet-stream';
    },
    _linkDownloader: function _linkDownloader(fileName, href) {
      var exportLinkElement = _dom_adapter.default.createElement('a');
      exportLinkElement.download = fileName;
      exportLinkElement.href = href;
      exportLinkElement.target = '_blank'; // cors policy

      return exportLinkElement;
    },
    _winJSBlobSave: function _winJSBlobSave(blob, fileName, format) {
      var savePicker = new Windows.Storage.Pickers.FileSavePicker();
      savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
      var fileExtension = FILE_EXTESIONS[format];
      if (fileExtension) {
        var mimeType = this._getMimeType(format);
        savePicker.fileTypeChoices.insert(mimeType, ['.' + fileExtension]);
      }
      savePicker.suggestedFileName = fileName;
      savePicker.pickSaveFileAsync().then(function (file) {
        if (file) {
          file.openAsync(Windows.Storage.FileAccessMode.readWrite).then(function (outputStream) {
            var inputStream = blob.msDetachStream();
            Windows.Storage.Streams.RandomAccessStream.copyAsync(inputStream, outputStream).then(function () {
              outputStream.flushAsync().done(function () {
                inputStream.close();
                outputStream.close();
              });
            });
          });
        }
      });
    },
    _click: function _click(link) {
      try {
        // eslint-disable-next-line no-undef
        link.dispatchEvent(new MouseEvent('click', {
          cancelable: true
        }));
      } catch (e) {
        var event = _dom_adapter.default.getDocument().createEvent('MouseEvents');
        event.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
        link.dispatchEvent(event);
      }
    },
    _saveBlobAs: function _saveBlobAs(fileName, format, data) {
      var _this = this;
      this._blobSaved = false;
      if ((0, _type.isDefined)(navigator.msSaveOrOpenBlob)) {
        navigator.msSaveOrOpenBlob(data, fileName);
        this._blobSaved = true;
      } else if ((0, _type.isDefined)(window.WinJS)) {
        this._winJSBlobSave(data, fileName, format);
        this._blobSaved = true;
      } else {
        var URL = window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL;
        if ((0, _type.isDefined)(URL)) {
          var objectURL = URL.createObjectURL(data);
          var downloadLink = this._linkDownloader(fileName, objectURL);
          setTimeout(function () {
            URL.revokeObjectURL(objectURL);
            _this._objectUrlRevoked = true;
          }, this._revokeObjectURLTimeout);
          this._click(downloadLink);
        } else {
          _console.logger.warn('window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL is not defined');
        }
      }
    },
    saveAs: function saveAs(fileName, format, data) {
      var fileExtension = FILE_EXTESIONS[format];
      if (fileExtension) {
        fileName += '.' + fileExtension;
      }
      if ((0, _type.isFunction)(window.Blob)) {
        this._saveBlobAs(fileName, format, data);
      } else {
        if (!(0, _type.isDefined)(navigator.userAgent.match(/iPad/i))) _ui.default.log('E1034');
        var downloadLink = this._linkDownloader(fileName, this._getDataUri(format, data));
        this._click(downloadLink);
      }
    }
  };
  exports.fileSaver = fileSaver;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/dom_adapter","../core/utils/window","../ui/widget/ui.errors","../core/utils/type","../core/utils/console"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/dom_adapter"), require("../core/utils/window"), require("../ui/widget/ui.errors"), require("../core/utils/type"), require("../core/utils/console"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=file_saver.js.map