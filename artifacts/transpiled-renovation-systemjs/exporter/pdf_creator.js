!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/exporter/pdf_creator.js"], ["../core/version","../core/utils/window","./image_creator","../core/utils/type","../core/utils/extend"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/exporter/pdf_creator.js", ["../core/version", "../core/utils/window", "./image_creator", "../core/utils/type", "../core/utils/extend"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.__tests = void 0;
  exports.getData = getData;
  var _version = $__require("../core/version");
  var _window = $__require("../core/utils/window");
  var _image_creator = $__require("./image_creator");
  var _type = $__require("../core/utils/type");
  var _extend = $__require("../core/utils/extend");
  var window = (0, _window.getWindow)();
  var mainPageTemplate = '%PDF-1.3\r\n2 0 obj\r\n<</ProcSet[/PDF/ImageB/ImageC/ImageI]/XObject<</I0 5 0 R>>>>\r\nendobj\r\n4 0 obj\r\n<</Type/Pages/Kids[1 0 R]/Count 1>>\r\nendobj\r\n7 0 obj\r\n<</OpenAction[1 0 R /FitH null]/Type/Catalog/Pages 4 0 R/PageLayout/OneColumn>>\r\nendobj\r\n1 0 obj\r\n<</Type/Page/Resources 2 0 R/MediaBox[0 0 _width_ _height_]/Contents 3 0 R/Parent 4 0 R>>\r\nendobj\r\n';
  var contentTemplate = '3 0 obj\r\n<</Length 52>>stream\r\n0.20 w\n0 G\nq _width_ 0 0 _height_ 0.00 0.00 cm /I0 Do Q\r\nendstream\r\nendobj\r\n';
  var infoTemplate = '6 0 obj\r\n<</CreationDate _date_/Producer(DevExtreme _version_)>>\r\nendobj\r\n';
  var imageStartTemplate = '5 0 obj\r\n<</Type/XObject/Subtype/Image/Width _width_/Height _height_/ColorSpace/DeviceRGB/BitsPerComponent 8/Filter/DCTDecode/Length _length_>>stream\r\n';
  var imageEndTemplate = '\r\nendstream\r\nendobj\r\n';
  var trailerTemplate = 'trailer\r\n<<\r\n/Size 8\r\n/Root 7 0 R\r\n/Info 6 0 R\r\n>>\r\nstartxref\r\n_length_\r\n%%EOF';
  var xrefTemplate = 'xref\r\n0 8\r\n0000000000 65535 f\r\n0000000241 00000 n\r\n0000000010 00000 n\r\n_main_ 00000 n\r\n0000000089 00000 n\r\n_image_ 00000 n\r\n_info_ 00000 n\r\n0000000143 00000 n\r\n';
  var pad = function pad(str, len) {
    return str.length < len ? pad('0' + str, len) : str;
  };
  var composePdfString = function composePdfString(imageString, options, curDate) {
    var margin = (options.margin || 0) * 2;
    var _calcScaledInfo = (0, _image_creator.calcScaledInfo)(options.width, options.height),
        width = _calcScaledInfo.width,
        height = _calcScaledInfo.height;
    width += margin;
    height += margin;
    var widthPt = (width * 0.75).toFixed(2);
    var heightPt = (height * 0.75).toFixed(2);
    var flooredWidth = Math.floor(width);
    var flooredHeight = Math.floor(height);
    var mainPage = mainPageTemplate.replace('_width_', widthPt).replace('_height_', heightPt);
    var content = contentTemplate.replace('_width_', widthPt).replace('_height_', heightPt);
    var info = infoTemplate.replace('_date_', curDate).replace('_version_', _version.version);
    var image = imageStartTemplate.replace('_width_', flooredWidth).replace('_height_', flooredHeight).replace('_length_', imageString.length) + imageString + imageEndTemplate;
    var xref = getXref(mainPage.length, content.length, info.length);
    var mainContent = mainPage + content + info + image;
    var trailer = trailerTemplate.replace('_length_', mainContent.length);
    return mainContent + xref + trailer;
  };
  function getXref(mainPageLength, contentLength, infoLength) {
    return xrefTemplate.replace('_main_', pad(mainPageLength + '', 10)).replace('_info_', pad(mainPageLength + contentLength + '', 10)).replace('_image_', pad(mainPageLength + contentLength + infoLength + '', 10));
  }
  var getCurDate = function getCurDate() {
    return new Date();
  };
  var getBlob = function getBlob(binaryData) {
    var i = 0;
    var dataArray = new Uint8Array(binaryData.length);
    for (; i < binaryData.length; i++) {
      dataArray[i] = binaryData.charCodeAt(i);
    }
    return new window.Blob([dataArray.buffer], {
      type: 'application/pdf'
    });
  };
  var getBase64 = function getBase64(binaryData) {
    return window.btoa(binaryData);
  };
  function getTwoDigitValue(value) {
    var stringValue = value.toString();
    if (stringValue.length === 1) {
      return "0".concat(value);
    }
    return value;
  }
  function convertToPdfDateFormat(date) {
    var dateUnits = [date.getUTCFullYear(), getTwoDigitValue(date.getUTCMonth()), getTwoDigitValue(date.getUTCDate()), getTwoDigitValue(date.getUTCHours()), getTwoDigitValue(date.getUTCMinutes()), getTwoDigitValue(date.getUTCSeconds())];
    return "(D:".concat(dateUnits.join(''), "Z00'00')");
  }
  function getData(data, options) {
    return _image_creator.imageCreator.getImageData(data, (0, _extend.extend)({}, options, {
      format: 'JPEG'
    })).then(function (imageString) {
      var binaryData = composePdfString(imageString, options, convertToPdfDateFormat(getCurDate()));
      var pdfData = (0, _type.isFunction)(window.Blob) ? getBlob(binaryData) : getBase64(binaryData);
      return pdfData;
    });
  }

  ///#DEBUG
  var __tests = {
    set_composePdfString: function set_composePdfString(func) {
      __tests.composePdfString = composePdfString;
      composePdfString = func;
    },
    restore_composePdfString: function restore_composePdfString(func) {
      if (__tests.composePdfString) {
        composePdfString = __tests.composePdfString;
        __tests.composePdfString = null;
      }
    },
    set_getCurDate: function set_getCurDate(func) {
      __tests.getCurDate = getCurDate;
      getCurDate = func;
    },
    restore_getCurDate: function restore_getCurDate(func) {
      if (__tests.getCurDate) {
        getCurDate = __tests.getCurDate;
        __tests.getCurDate = null;
      }
    },
    set_getBlob: function set_getBlob(func) {
      __tests.getBlob = getBlob;
      getBlob = func;
    },
    restore_getBlob: function restore_getBlob(func) {
      if (__tests.getBlob) {
        getBlob = __tests.getBlob;
        __tests.getBlob = null;
      }
    },
    set_getBase64: function set_getBase64(func) {
      __tests.getBase64 = getBase64;
      getBase64 = func;
    },
    restore_getBase64: function restore_getBase64(func) {
      if (__tests.getBase64) {
        getBase64 = __tests.getBase64;
        __tests.getBase64 = null;
      }
    }
  };
  ///#ENDDEBUG
  exports.__tests = __tests;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/version","../core/utils/window","./image_creator","../core/utils/type","../core/utils/extend"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/version"), require("../core/utils/window"), require("./image_creator"), require("../core/utils/type"), require("../core/utils/extend"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=pdf_creator.js.map