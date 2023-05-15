!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/helpers/ssrEmulator.js"], ["core/dom_adapter","core/utils/window","./serverSideDOMAdapterPatch.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/helpers/ssrEmulator.js", ["core/dom_adapter", "core/utils/window", "./serverSideDOMAdapterPatch.js"], function($__export) {
  "use strict";
  var domAdapter,
      windowUtils,
      serverSideDOMAdapter,
      domAdapterBackup,
      makeDOMAdapterEmpty,
      restoreOriginalDomAdapter,
      windowMock,
      errorFunc,
      windowGetter,
      makeWindowEmpty;
  return {
    setters: [function($__m) {
      domAdapter = $__m.default;
    }, function($__m) {
      windowUtils = $__m.default;
    }, function($__m) {
      serverSideDOMAdapter = $__m.default;
    }],
    execute: function() {
      (function emulateNoContains() {
        var originalContains = Element.prototype.contains;
        Element.prototype.contains = function(element) {
          if (!element) {
            throw new Error('element should be defined');
          }
          return originalContains.apply(this, arguments);
        };
      })();
      (function emulateNoXMLNSAttr() {
        var originalSetAttribute = Element.prototype.setAttribute;
        Element.prototype.setAttribute = function(name, value) {
          if (name.toLowerCase().substring(0, 5) === 'xmlns') {
            throw new Error('the operation is not allowed by Namespaces in XML');
          }
          return originalSetAttribute.apply(this, arguments);
        };
      })();
      (function emulateNoElementSizes() {
        var originalCreateElement = document.createElement;
        document.createElement = function() {
          var result = originalCreateElement.apply(this, arguments);
          ['offsetWidth', 'offsetHeight', 'getBoundingClientRect'].forEach(function(field) {
            Object.defineProperty(result, field, {
              get: function() {
                return undefined;
              },
              set: function() {}
            });
          });
          return result;
        };
        Element.prototype.getClientRects = undefined;
      })();
      (function emulateStyleProps() {
        var originalCreateElement = document.createElement;
        var serverStyles = ['background', 'backgroundAttachment', 'backgroundColor', 'backgroundImage', 'backgroundPosition', 'backgroundRepeat', 'border', 'borderBottom', 'borderBottomColor', 'borderBottomStyle', 'borderBottomWidth', 'borderCollapse', 'borderColor', 'borderLeft', 'borderLeftColor', 'borderLeftStyle', 'borderLeftWidth', 'borderRight', 'borderRightColor', 'borderRightStyle', 'borderRightWidth', 'borderSpacing', 'borderStyle', 'borderTop', 'borderTopColor', 'borderTopStyle', 'borderTopWidth', 'borderWidth', 'bottom', 'captionSide', 'clear', 'clip', 'color', 'content', 'counterIncrement', 'counterReset', 'cssFloat', 'cursor', 'direction', 'display', 'emptyCells', 'font', 'fontFamily', 'fontSize', 'fontSizeAdjust', 'fontStretch', 'fontStyle', 'fontVariant', 'fontWeight', 'height', 'left', 'letterSpacing', 'lineHeight', 'listStyle', 'listStyleImage', 'listStylePosition', 'listStyleType', 'margin', 'marginBottom', 'marginLeft', 'marginRight', 'marginTop', 'markerOffset', 'marks', 'maxHeight', 'maxWidth', 'minHeight', 'minWidth', 'opacity', 'orphans', 'outline', 'outlineColor', 'outlineStyle', 'outlineWidth', 'overflow', 'padding', 'paddingBottom', 'paddingLeft', 'paddingRight', 'paddingTop', 'page', 'pageBreakAfter', 'pageBreakBefore', 'pageBreakInside', 'position', 'quotes', 'right', 'size', 'tableLayout', 'textAlign', 'textDecoration', 'textIndent', 'textShadow', 'textTransform', 'top', 'unicodeBidi', 'verticalAlign', 'visibility', 'whiteSpace', 'widows', 'width', 'wordSpacing', 'zIndex'];
        var styleObj = {};
        serverStyles.forEach(function(style) {
          styleObj[style] = '';
        });
        document.createElement = function(tagName) {
          return tagName === 'dx' ? {style: styleObj} : originalCreateElement.apply(this, arguments);
        };
      })();
      (function emulateIncorrectMatches() {
        var originalMatches = Element.prototype.matches;
        Element.prototype.matches = function(selector) {
          var selectorParts = selector.split(/\s|>/);
          var lastSelectorPart = selectorParts[selectorParts.length - 1];
          if (/^\.[\w|-]+$/.test(lastSelectorPart)) {
            lastSelectorPart = lastSelectorPart.substr(1);
            var index = this.className.indexOf(lastSelectorPart);
            var l = this.className[index + lastSelectorPart.length];
            if (index > -1 && l && l !== ' ') {
              return false;
            }
          }
          return originalMatches.apply(this, arguments);
        };
      })();
      domAdapterBackup = {};
      makeDOMAdapterEmpty = function() {
        for (var field in domAdapter) {
          domAdapterBackup[field] = domAdapter[field];
          delete domAdapter[field];
        }
      };
      restoreOriginalDomAdapter = function() {
        for (var field in domAdapterBackup) {
          domAdapter[field] = domAdapterBackup[field];
        }
      };
      windowMock = {isWindowMock: true};
      errorFunc = function() {
        throw new Error('Window fields using is prevented');
      };
      windowGetter = function() {
        return windowMock;
      };
      for (var field in window) {
        Object.defineProperty(windowMock, field, {
          get: field === 'window' ? windowGetter : errorFunc,
          set: errorFunc
        });
      }
      makeWindowEmpty = function() {
        windowUtils.setWindow(windowMock);
      };
      makeDOMAdapterEmpty();
      makeWindowEmpty();
      QUnit.begin(function() {
        restoreOriginalDomAdapter();
        serverSideDOMAdapter.set();
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["core/dom_adapter","core/utils/window","./serverSideDOMAdapterPatch.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("core/dom_adapter"), require("core/utils/window"), require("./serverSideDOMAdapterPatch.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ssrEmulator.js.map