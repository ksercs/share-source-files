!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/form/components/label.js"], ["../../../core/renderer","../../../core/utils/type","../../../core/element","../ui.form.layout_manager.utils","../constants"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/form/components/label.js", ["../../../core/renderer", "../../../core/utils/type", "../../../core/element", "../ui.form.layout_manager.utils", "../constants"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = exports.FIELD_ITEM_REQUIRED_MARK_CLASS = exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = exports.FIELD_ITEM_LABEL_TEXT_CLASS = exports.FIELD_ITEM_LABEL_LOCATION_CLASS = void 0;
  exports.renderLabel = renderLabel;
  exports.setLabelWidthByMaxLabelWidth = setLabelWidthByMaxLabelWidth;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _type = $__require("../../../core/utils/type");
  var _element = $__require("../../../core/element");
  var _uiFormLayout_manager = $__require("../ui.form.layout_manager.utils");
  var _constants = $__require("../constants");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  // TODO: exported for tests only
  var GET_LABEL_WIDTH_BY_TEXT_CLASS = 'dx-layout-manager-hidden-label';
  exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = GET_LABEL_WIDTH_BY_TEXT_CLASS;
  var FIELD_ITEM_REQUIRED_MARK_CLASS = 'dx-field-item-required-mark';
  exports.FIELD_ITEM_REQUIRED_MARK_CLASS = FIELD_ITEM_REQUIRED_MARK_CLASS;
  var FIELD_ITEM_LABEL_LOCATION_CLASS = 'dx-field-item-label-location-';
  exports.FIELD_ITEM_LABEL_LOCATION_CLASS = FIELD_ITEM_LABEL_LOCATION_CLASS;
  var FIELD_ITEM_OPTIONAL_MARK_CLASS = 'dx-field-item-optional-mark';
  exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = FIELD_ITEM_OPTIONAL_MARK_CLASS;
  var FIELD_ITEM_LABEL_TEXT_CLASS = 'dx-field-item-label-text';
  exports.FIELD_ITEM_LABEL_TEXT_CLASS = FIELD_ITEM_LABEL_TEXT_CLASS;
  function renderLabel(_ref) {
    var text = _ref.text,
        id = _ref.id,
        location = _ref.location,
        alignment = _ref.alignment,
        _ref$labelID = _ref.labelID,
        labelID = _ref$labelID === void 0 ? null : _ref$labelID,
        _ref$markOptions = _ref.markOptions,
        markOptions = _ref$markOptions === void 0 ? {} : _ref$markOptions,
        labelTemplate = _ref.labelTemplate,
        labelTemplateData = _ref.labelTemplateData,
        onLabelTemplateRendered = _ref.onLabelTemplateRendered;
    if ((!(0, _type.isDefined)(text) || text.length <= 0) && !(0, _type.isDefined)(labelTemplate)) {
      return null;
    }
    var $label = (0, _renderer.default)('<label>').addClass(_constants.FIELD_ITEM_LABEL_CLASS + ' ' + FIELD_ITEM_LABEL_LOCATION_CLASS + location).attr('for', id).attr('id', labelID).css('textAlign', alignment);
    var $labelContainer = (0, _renderer.default)('<span>').addClass(_constants.FIELD_ITEM_LABEL_CONTENT_CLASS);
    var $labelContent = (0, _renderer.default)('<span>').addClass(FIELD_ITEM_LABEL_TEXT_CLASS).text(text);
    if (labelTemplate) {
      $labelContent = (0, _renderer.default)('<div>').addClass('dx-field-item-custom-label-content');
      labelTemplateData.text = text;
      labelTemplate.render({
        container: (0, _element.getPublicElement)($labelContent),
        model: labelTemplateData,
        onRendered: function onRendered() {
          onLabelTemplateRendered === null || onLabelTemplateRendered === void 0 ? void 0 : onLabelTemplateRendered();
        }
      });
    }
    return $label.append($labelContainer.append($labelContent, _renderLabelMark(markOptions)));
  }
  function _renderLabelMark(markOptions) {
    var markText = (0, _uiFormLayout_manager.getLabelMarkText)(markOptions);
    if (markText === '') {
      return null;
    }
    return (0, _renderer.default)('<span>').addClass(markOptions.showRequiredMark ? FIELD_ITEM_REQUIRED_MARK_CLASS : FIELD_ITEM_OPTIONAL_MARK_CLASS).text(markText);
  }
  function setLabelWidthByMaxLabelWidth($targetContainer, labelsSelector, labelMarkOptions) {
    var FIELD_ITEM_LABEL_CONTENT_CLASS_Selector = "".concat(labelsSelector, " > .").concat(_constants.FIELD_ITEM_LABEL_CLASS, ":not(.").concat(FIELD_ITEM_LABEL_LOCATION_CLASS, "top) > .").concat(_constants.FIELD_ITEM_LABEL_CONTENT_CLASS);
    var $FIELD_ITEM_LABEL_CONTENT_CLASS_Items = $targetContainer.find(FIELD_ITEM_LABEL_CONTENT_CLASS_Selector);
    var FIELD_ITEM_LABEL_CONTENT_CLASS_Length = $FIELD_ITEM_LABEL_CONTENT_CLASS_Items.length;
    var labelWidth;
    var i;
    var maxWidth = 0;
    for (i = 0; i < FIELD_ITEM_LABEL_CONTENT_CLASS_Length; i++) {
      labelWidth = getLabelWidthByHTML($FIELD_ITEM_LABEL_CONTENT_CLASS_Items[i]);
      if (labelWidth > maxWidth) {
        maxWidth = labelWidth;
      }
    }
    for (i = 0; i < FIELD_ITEM_LABEL_CONTENT_CLASS_Length; i++) {
      $FIELD_ITEM_LABEL_CONTENT_CLASS_Items[i].style.width = maxWidth + 'px';
    }
  }
  function getLabelWidthByHTML(labelContent) {
    var result = 0;
    var itemsCount = labelContent.children.length;
    for (var i = 0; i < itemsCount; i++) {
      var child = labelContent.children[i];
      result = result + child.offsetWidth;
    }
    return result;
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../../core/utils/type","../../../core/element","../ui.form.layout_manager.utils","../constants"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../../core/utils/type"), require("../../../core/element"), require("../ui.form.layout_manager.utils"), require("../constants"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=label.js.map