!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/core/utils/dom.js"], ["../../core/dom_adapter","../../core/renderer","./iterator","./type","./window"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/core/utils/dom.js", ["../../core/dom_adapter", "../../core/renderer", "./iterator", "./type", "./window"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.resetActiveElement = exports.replaceWith = exports.normalizeTemplateElement = exports.isElementInDom = exports.insertBefore = exports.extractTemplateMarkup = exports.createTextElementHiddenCopy = exports.contains = exports.closestCommonParent = exports.clipboardText = exports.clearSelection = void 0;
  var _dom_adapter = _interopRequireDefault($__require("../../core/dom_adapter"));
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _iterator = $__require("./iterator");
  var _type = $__require("./type");
  var _window = $__require("./window");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var getRootNodeHost = function getRootNodeHost(element) {
    if (!element.getRootNode) {
      return undefined;
    }
    var host = element.getRootNode().host;

    // NOTE: getRootNode().host can return a string if element is detached "a" element
    if ((0, _type.isString)(host)) {
      return undefined;
    }
    return host;
  };
  var resetActiveElement = function resetActiveElement() {
    var activeElement = _dom_adapter.default.getActiveElement();
    if (activeElement && activeElement !== _dom_adapter.default.getBody()) {
      var _activeElement$blur;
      (_activeElement$blur = activeElement.blur) === null || _activeElement$blur === void 0 ? void 0 : _activeElement$blur.call(activeElement);
    }
  };
  exports.resetActiveElement = resetActiveElement;
  var clearSelection = function clearSelection() {
    var selection = window.getSelection();
    if (!selection) return;
    if (selection.type === 'Caret') return;
    if (selection.empty) {
      selection.empty();
    } else if (selection.removeAllRanges) {
      // T522811
      try {
        selection.removeAllRanges();
      } catch (e) {}
    }
  };
  exports.clearSelection = clearSelection;
  var closestCommonParent = function closestCommonParent(startTarget, endTarget) {
    var $startTarget = (0, _renderer.default)(startTarget);
    var $endTarget = (0, _renderer.default)(endTarget);
    if ($startTarget[0] === $endTarget[0]) {
      return $startTarget[0];
    }
    var $startParents = $startTarget.parents();
    var $endParents = $endTarget.parents();
    var startingParent = Math.min($startParents.length, $endParents.length);
    for (var i = -startingParent; i < 0; i++) {
      if ($startParents.get(i) === $endParents.get(i)) {
        return $startParents.get(i);
      }
    }
  };
  exports.closestCommonParent = closestCommonParent;
  var extractTemplateMarkup = function extractTemplateMarkup(element) {
    element = (0, _renderer.default)(element);
    var templateTag = element.length && element.filter(function isNotExecutableScript() {
      var $node = (0, _renderer.default)(this);
      return $node.is('script[type]') && $node.attr('type').indexOf('script') < 0;
    });
    if (templateTag.length) {
      return templateTag.eq(0).html();
    } else {
      element = (0, _renderer.default)('<div>').append(element);
      return element.html();
    }
  };
  exports.extractTemplateMarkup = extractTemplateMarkup;
  var normalizeTemplateElement = function normalizeTemplateElement(element) {
    var $element = (0, _type.isDefined)(element) && (element.nodeType || (0, _type.isRenderer)(element)) ? (0, _renderer.default)(element) : (0, _renderer.default)('<div>').html(element).contents();
    if ($element.length === 1) {
      if ($element.is('script')) {
        $element = normalizeTemplateElement($element.html().trim());
      } else if ($element.is('table')) {
        $element = $element.children('tbody').contents();
      }
    }
    return $element;
  };
  exports.normalizeTemplateElement = normalizeTemplateElement;
  var clipboardText = function clipboardText(event, text) {
    var clipboard = event.originalEvent && event.originalEvent.clipboardData || window.clipboardData;
    if (!text) {
      return clipboard && clipboard.getData('Text');
    }
    clipboard && clipboard.setData('Text', text);
  };
  exports.clipboardText = clipboardText;
  var contains = function contains(container, element) {
    if (!element) {
      return false;
    }
    if ((0, _type.isWindow)(container)) {
      return contains(container.document, element);
    }
    return container.contains(element) || contains(container, getRootNodeHost(element));
  };
  exports.contains = contains;
  var createTextElementHiddenCopy = function createTextElementHiddenCopy(element, text, options) {
    var elementStyles = window.getComputedStyle((0, _renderer.default)(element).get(0));
    var includePaddings = options && options.includePaddings;
    return (0, _renderer.default)('<div>').text(text).css({
      'fontStyle': elementStyles.fontStyle,
      'fontVariant': elementStyles.fontVariant,
      'fontWeight': elementStyles.fontWeight,
      'fontSize': elementStyles.fontSize,
      'fontFamily': elementStyles.fontFamily,
      'letterSpacing': elementStyles.letterSpacing,
      'border': elementStyles.border,
      'paddingTop': includePaddings ? elementStyles.paddingTop : '',
      'paddingRight': includePaddings ? elementStyles.paddingRight : '',
      'paddingBottom': includePaddings ? elementStyles.paddingBottom : '',
      'paddingLeft': includePaddings ? elementStyles.paddingLeft : '',
      'visibility': 'hidden',
      'whiteSpace': 'pre',
      'position': 'absolute',
      'float': 'left'
    });
  };
  exports.createTextElementHiddenCopy = createTextElementHiddenCopy;
  var insertBefore = function insertBefore(element, newElement) {
    if (newElement) {
      _dom_adapter.default.insertElement(element.parentNode, newElement, element);
    }
    return element;
  };
  exports.insertBefore = insertBefore;
  var replaceWith = function replaceWith(element, newElement) {
    if (!(newElement && newElement[0])) return;
    if (newElement.is(element)) return element;
    (0, _iterator.each)(newElement, function (_, currentElement) {
      insertBefore(element[0], currentElement);
    });
    element.remove();
    return newElement;
  };
  exports.replaceWith = replaceWith;
  var isElementInDom = function isElementInDom($element) {
    var element = $element === null || $element === void 0 ? void 0 : $element.get(0);
    var shadowHost = element === null || element === void 0 ? void 0 : element.getRootNode().host;
    return !!(0, _renderer.default)(shadowHost || element).closest((0, _window.getWindow)().document).length;
  };
  exports.isElementInDom = isElementInDom;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/dom_adapter","../../core/renderer","./iterator","./type","./window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/dom_adapter"), require("../../core/renderer"), require("./iterator"), require("./type"), require("./window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dom.js.map