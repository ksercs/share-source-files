!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/html_editor/utils/table_helper.js"], ["../../../core/renderer","../../../core/utils/iterator","../../../core/utils/inflector"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/html_editor/utils/table_helper.js", ["../../../core/renderer", "../../../core/utils/iterator", "../../../core/utils/inflector"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.TABLE_OPERATIONS = void 0;
  exports.getAutoSizedElements = getAutoSizedElements;
  exports.getColumnElements = getColumnElements;
  exports.getLineElements = getLineElements;
  exports.getRowElements = getRowElements;
  exports.getTableFormats = getTableFormats;
  exports.getTableOperationHandler = getTableOperationHandler;
  exports.hasEmbedContent = hasEmbedContent;
  exports.setLineElementsFormat = setLineElementsFormat;
  exports.unfixTableWidth = unfixTableWidth;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _iterator = $__require("../../../core/utils/iterator");
  var _inflector = $__require("../../../core/utils/inflector");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var TABLE_FORMATS = ['table', 'tableHeaderCell'];
  var TABLE_OPERATIONS = ['insertTable', 'insertHeaderRow', 'insertRowAbove', 'insertRowBelow', 'insertColumnLeft', 'insertColumnRight', 'deleteColumn', 'deleteRow', 'deleteTable', 'cellProperties', 'tableProperties'];
  exports.TABLE_OPERATIONS = TABLE_OPERATIONS;
  function getTableFormats(quill) {
    var tableModule = quill.getModule('table');

    // backward compatibility with an old devextreme-quill packages
    return tableModule !== null && tableModule !== void 0 && tableModule.tableFormats ? tableModule.tableFormats() : TABLE_FORMATS;
  }
  function hasEmbedContent(module, selection) {
    return !!selection && module.quill.getText(selection).length < selection.length;
  }
  function unfixTableWidth($table, _ref) {
    var tableBlot = _ref.tableBlot,
        quill = _ref.quill;
    var unfixValue = 'initial';
    var formatBlot = tableBlot !== null && tableBlot !== void 0 ? tableBlot : quill.scroll.find($table.get(0));
    formatBlot.format('tableWidth', unfixValue);
  }
  function getColumnElements($table) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return $table.find('tr').eq(index).find('th, td');
  }
  function getAutoSizedElements($table) {
    var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'horizontal';
    var result = [];
    var isHorizontal = direction === 'horizontal';
    var $lineElements = isHorizontal ? getColumnElements($table) : getRowElements($table);
    $lineElements.each(function (index, element) {
      var $element = (0, _renderer.default)(element);
      if ($element.get(0).style[isHorizontal ? 'width' : 'height'] === '') {
        result.push($element);
      }
    });
    return result;
  }
  function setLineElementsFormat(module, _ref2) {
    var elements = _ref2.elements,
        property = _ref2.property,
        value = _ref2.value;
    var tableBlotNames = module.quill.getModule('table').tableBlots;
    var fullPropertyName = "cell".concat((0, _inflector.camelize)(property, true));
    (0, _iterator.each)(elements, function (i, element) {
      var _formatBlot;
      var formatBlot = module.quill.scroll.find(element);
      if (!tableBlotNames.includes(formatBlot.statics.blotName)) {
        var descendBlot = formatBlot.descendant(function (blot) {
          return tableBlotNames.includes(blot.statics.blotName);
        });
        formatBlot = descendBlot ? descendBlot[0] : null;
      }
      (_formatBlot = formatBlot) === null || _formatBlot === void 0 ? void 0 : _formatBlot.format(fullPropertyName, value + 'px');
    });
  }
  function getLineElements($table, index) {
    var direction = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'horizontal';
    return direction === 'horizontal' ? getRowElements($table, index) : getColumnElements($table, index);
  }
  function getRowElements($table) {
    var index = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return $table.find("th:nth-child(".concat(1 + index, "), td:nth-child(").concat(1 + index, ")"));
  }
  function getTableOperationHandler(quill, operationName) {
    for (var _len = arguments.length, rest = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      rest[_key - 2] = arguments[_key];
    }
    return function () {
      var table = quill.getModule('table');
      if (!table) {
        return;
      }
      quill.focus();
      return table[operationName].apply(table, rest);
    };
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../../core/utils/iterator","../../../core/utils/inflector"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../../core/utils/iterator"), require("../../../core/utils/inflector"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=table_helper.js.map