!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid_utils.js"], ["../commonParts/objectAssignHelper.js","jspdf","core/utils/type","core/utils/extend","jquery"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.exporter/jspdfParts/jspdf.dataGrid_utils.js", ["../commonParts/objectAssignHelper.js", "jspdf", "core/utils/type", "core/utils/extend", "jquery"], function($__export) {
  "use strict";
  var clearDxObjectAssign,
      initializeDxObjectAssign,
      jsPDF,
      isFunction,
      isObject,
      isDefined,
      extend,
      $,
      moduleConfig;
  function argumentsToString() {
    var items = [];
    for (var i = 0; i < arguments.length; i++) {
      items.push(arguments[i]);
    }
    var $__3 = function(i) {
      var item = items[i];
      if (isObject(item)) {
        items[i] = '{' + Object.keys(item).map(function(key) {
          return key + ':' + item[key];
        }).join(',') + '}';
      }
    };
    for (var i$__2 = items.length - 1; i$__2 >= 0; i$__2--) {
      $__3(i$__2);
    }
    return items.toString();
  }
  function createMockPdfDoc(options) {
    var _jsPDF = isFunction(jsPDF) ? jsPDF : jsPDF.jsPDF;
    var unit = isDefined(options) && isDefined(options.unit) ? options.init : 'pt';
    var pdfOptions = extend(options || {}, {unit: unit});
    var result = _jsPDF(pdfOptions);
    result.__log = [];
    result.__logOptions = {textOptions: {}};
    result.__setDrawColor = result.setDrawColor;
    result.setDrawColor = function() {
      this.__log.push('setDrawColor,' + argumentsToString.apply(null, arguments));
      this.__setDrawColor.apply(this, arguments);
    };
    result.__setFillColor = result.setFillColor;
    result.setFillColor = function() {
      this.__log.push('setFillColor,' + argumentsToString.apply(null, arguments));
      this.__setFillColor.apply(this, arguments);
    };
    result.__setFont = result.setFont;
    result.setFont = function() {
      this.__log.push('setFont,' + argumentsToString.apply(null, arguments));
      this.__setFont.apply(this, arguments);
    };
    result.__setFontSize = result.setFontSize;
    result.setFontSize = function() {
      this.__log.push('setFontSize,' + argumentsToString.apply(null, arguments));
      this.__setFontSize.apply(this, arguments);
    };
    result.__setLineHeightFactor = result.setLineHeightFactor;
    result.setLineHeightFactor = function() {
      this.__log.push('setLineHeightFactor,' + argumentsToString.apply(null, arguments));
      this.__setLineHeightFactor.apply(this, arguments);
    };
    result.__setTextColor = result.setTextColor;
    result.setTextColor = function() {
      this.__log.push('setTextColor,' + argumentsToString.apply(null, arguments));
      this.__setTextColor.apply(this, arguments);
    };
    result.__rect = result.rect;
    result.rect = function() {
      this.__log.push('rect,' + argumentsToString.apply(null, arguments));
      this.__rect.apply(this, arguments);
    };
    result.__line = result.line;
    result.line = function() {
      this.__log.push('line,' + argumentsToString.apply(null, arguments));
      this.__line.apply(this, arguments);
    };
    result.__setLineWidth = result.setLineWidth;
    result.setLineWidth = function() {
      this.__log.push('setLineWidth,' + argumentsToString.apply(null, arguments));
      this.__setLineWidth.apply(this, arguments);
    };
    result.__text = result.text;
    result.text = function() {
      if (this.__logOptions.textOptions === false) {
        arguments[3] = undefined;
      } else if (this.__logOptions.textOptions.hAlign !== true && arguments.length >= 3 && isDefined(arguments[3]) && arguments[3].align === 'left') {
        delete arguments[3].align;
      }
      this.__log.push('text,' + argumentsToString.apply(null, arguments));
      this.__text.apply(this, arguments);
    };
    result.__moveTo = result.moveTo;
    result.moveTo = function() {
      this.__log.push('moveTo,' + argumentsToString.apply(null, arguments));
      this.__moveTo.apply(this, arguments);
    };
    result.__lineTo = result.lineTo;
    result.lineTo = function() {
      this.__log.push('lineTo,' + argumentsToString.apply(null, arguments));
      this.__lineTo.apply(this, arguments);
    };
    result.__clip = result.clip;
    result.clip = function() {
      this.__log.push('clip,' + argumentsToString.apply(null, arguments));
      this.__clip.apply(this, arguments);
    };
    result.__discardPath = result.discardPath;
    result.discardPath = function() {
      this.__log.push('discardPath,' + argumentsToString.apply(null, arguments));
      this.__discardPath.apply(this, arguments);
    };
    result.__saveGraphicsState = result.saveGraphicsState;
    result.saveGraphicsState = function() {
      this.__log.push('saveGraphicsState,' + argumentsToString.apply(null, arguments));
      this.__saveGraphicsState.apply(this, arguments);
    };
    result.__restoreGraphicsState = result.restoreGraphicsState;
    result.restoreGraphicsState = function() {
      this.__log.push('restoreGraphicsState,' + argumentsToString.apply(null, arguments));
      this.__restoreGraphicsState.apply(this, arguments);
    };
    result.__addPage = result.addPage;
    result.addPage = function() {
      this.__log.push('addPage,' + argumentsToString.apply(null, arguments));
      this.__addPage.apply(this, arguments);
    };
    return result;
  }
  function createDataGrid(options) {
    if (!isDefined(options.loadingTimeout)) {
      options.loadingTimeout = null;
    }
    return $('#dataGrid').dxDataGrid(options).dxDataGrid('instance');
  }
  return {
    setters: [function($__m) {
      clearDxObjectAssign = $__m.clearDxObjectAssign;
      initializeDxObjectAssign = $__m.initializeDxObjectAssign;
    }, function($__m) {
      jsPDF = $__m.jsPDF;
    }, function($__m) {
      isFunction = $__m.isFunction;
      isObject = $__m.isObject;
      isDefined = $__m.isDefined;
    }, function($__m) {
      extend = $__m.extend;
    }, function($__m) {
      $ = $__m.default;
    }],
    execute: function() {
      moduleConfig = {
        before: function() {
          initializeDxObjectAssign();
        },
        beforeEach: function() {
          var _jsPDF = isFunction(jsPDF) ? jsPDF : jsPDF.jsPDF;
          this.jsPDFDocument = _jsPDF();
          this.customizeCellCallCount = 0;
        },
        after: function() {
          clearDxObjectAssign();
        }
      };
      $__export("moduleConfig", moduleConfig), $__export("createDataGrid", createDataGrid), $__export("createMockPdfDoc", createMockPdfDoc);
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../commonParts/objectAssignHelper.js","jspdf","core/utils/type","core/utils/extend","jquery"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../commonParts/objectAssignHelper.js"), require("jspdf"), require("core/utils/type"), require("core/utils/extend"), require("jquery"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=jspdf.dataGrid_utils.js.map