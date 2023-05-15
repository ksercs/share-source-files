!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/form/ui.form.layout_manager.utils.js"], ["../../core/utils/extend","../../core/utils/type","../../core/utils/iterator","../../core/utils/inflector","../../core/guid","./constants"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/form/ui.form.layout_manager.utils.js", ["../../core/utils/extend", "../../core/utils/type", "../../core/utils/iterator", "../../core/utils/inflector", "../../core/guid", "./constants"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.EDITORS_WITHOUT_LABELS = void 0;
  exports.convertToLabelMarkOptions = convertToLabelMarkOptions;
  exports.convertToRenderFieldItemOptions = convertToRenderFieldItemOptions;
  exports.getLabelMarkText = getLabelMarkText;
  var _extend = $__require("../../core/utils/extend");
  var _type = $__require("../../core/utils/type");
  var _iterator = $__require("../../core/utils/iterator");
  var _inflector = $__require("../../core/utils/inflector");
  var _guid = _interopRequireDefault($__require("../../core/guid"));
  var _constants = $__require("./constants");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var EDITORS_WITH_ARRAY_VALUE = ['dxTagBox', 'dxRangeSlider'];
  var EDITORS_WITHOUT_LABELS = ['dxCalendar', 'dxCheckBox', 'dxHtmlEditor', 'dxRadioGroup', 'dxRangeSlider', 'dxSlider', 'dxSwitch'];
  exports.EDITORS_WITHOUT_LABELS = EDITORS_WITHOUT_LABELS;
  function convertToRenderFieldItemOptions(_ref) {
    var $parent = _ref.$parent,
        rootElementCssClassList = _ref.rootElementCssClassList,
        formOrLayoutManager = _ref.formOrLayoutManager,
        createComponentCallback = _ref.createComponentCallback,
        item = _ref.item,
        template = _ref.template,
        labelTemplate = _ref.labelTemplate,
        name = _ref.name,
        formLabelLocation = _ref.formLabelLocation,
        requiredMessageTemplate = _ref.requiredMessageTemplate,
        validationGroup = _ref.validationGroup,
        editorValue = _ref.editorValue,
        canAssignUndefinedValueToEditor = _ref.canAssignUndefinedValueToEditor,
        editorValidationBoundary = _ref.editorValidationBoundary,
        editorStylingMode = _ref.editorStylingMode,
        showColonAfterLabel = _ref.showColonAfterLabel,
        managerLabelLocation = _ref.managerLabelLocation,
        itemId = _ref.itemId,
        managerMarkOptions = _ref.managerMarkOptions,
        labelMode = _ref.labelMode,
        onLabelTemplateRendered = _ref.onLabelTemplateRendered;
    var isRequired = (0, _type.isDefined)(item.isRequired) ? item.isRequired : !!_hasRequiredRuleInSet(item.validationRules);
    var isSimpleItem = item.itemType === _constants.SIMPLE_ITEM_TYPE;
    var helpID = item.helpText ? 'dx-' + new _guid.default() : null;
    var labelOptions = _convertToLabelOptions({
      item: item,
      id: itemId,
      isRequired: isRequired,
      managerMarkOptions: managerMarkOptions,
      showColonAfterLabel: showColonAfterLabel,
      labelLocation: managerLabelLocation,
      formLabelMode: labelMode,
      labelTemplate: labelTemplate,
      onLabelTemplateRendered: onLabelTemplateRendered
    });
    var needRenderLabel = labelOptions.visible && (labelOptions.text || labelOptions.labelTemplate && isSimpleItem);
    var labelLocation = labelOptions.location,
        labelID = labelOptions.labelID;
    var labelNeedBaselineAlign = labelLocation !== 'top' && ['dxTextArea', 'dxRadioGroup', 'dxCalendar', 'dxHtmlEditor'].includes(item.editorType);
    var editorOptions = _convertToEditorOptions({
      editorType: item.editorType,
      editorValue: editorValue,
      defaultEditorName: item.dataField,
      canAssignUndefinedValueToEditor: canAssignUndefinedValueToEditor,
      externalEditorOptions: item.editorOptions,
      editorInputId: itemId,
      editorValidationBoundary: editorValidationBoundary,
      editorStylingMode: editorStylingMode,
      formLabelMode: labelMode,
      labelText: labelOptions.textWithoutColon,
      labelMark: labelOptions.markOptions.showRequiredMark ? String.fromCharCode(160) + labelOptions.markOptions.requiredMark : ''
    });
    var needRenderOptionalMarkAsHelpText = labelOptions.markOptions.showOptionalMark && !labelOptions.visible && editorOptions.labelMode !== 'hidden' && !(0, _type.isDefined)(item.helpText);
    var helpText = needRenderOptionalMarkAsHelpText ? labelOptions.markOptions.optionalMark : item.helpText;
    return {
      $parent: $parent,
      rootElementCssClassList: rootElementCssClassList,
      formOrLayoutManager: formOrLayoutManager,
      createComponentCallback: createComponentCallback,
      labelOptions: labelOptions,
      labelNeedBaselineAlign: labelNeedBaselineAlign,
      labelLocation: labelLocation,
      needRenderLabel: needRenderLabel,
      item: item,
      isSimpleItem: isSimpleItem,
      isRequired: isRequired,
      template: template,
      helpID: helpID,
      labelID: labelID,
      name: name,
      helpText: helpText,
      formLabelLocation: formLabelLocation,
      requiredMessageTemplate: requiredMessageTemplate,
      validationGroup: validationGroup,
      editorOptions: editorOptions
    };
  }
  function getLabelMarkText(_ref2) {
    var showRequiredMark = _ref2.showRequiredMark,
        requiredMark = _ref2.requiredMark,
        showOptionalMark = _ref2.showOptionalMark,
        optionalMark = _ref2.optionalMark;
    if (!showRequiredMark && !showOptionalMark) {
      return '';
    }
    return String.fromCharCode(160) + (showRequiredMark ? requiredMark : optionalMark);
  }
  function convertToLabelMarkOptions(_ref3, isRequired) {
    var showRequiredMark = _ref3.showRequiredMark,
        requiredMark = _ref3.requiredMark,
        showOptionalMark = _ref3.showOptionalMark,
        optionalMark = _ref3.optionalMark;
    return {
      showRequiredMark: showRequiredMark && isRequired,
      requiredMark: requiredMark,
      showOptionalMark: showOptionalMark && !isRequired,
      optionalMark: optionalMark
    };
  }
  function _convertToEditorOptions(_ref4) {
    var editorType = _ref4.editorType,
        defaultEditorName = _ref4.defaultEditorName,
        editorValue = _ref4.editorValue,
        canAssignUndefinedValueToEditor = _ref4.canAssignUndefinedValueToEditor,
        externalEditorOptions = _ref4.externalEditorOptions,
        editorInputId = _ref4.editorInputId,
        editorValidationBoundary = _ref4.editorValidationBoundary,
        editorStylingMode = _ref4.editorStylingMode,
        formLabelMode = _ref4.formLabelMode,
        labelText = _ref4.labelText,
        labelMark = _ref4.labelMark;
    var editorOptionsWithValue = {};
    if (editorValue !== undefined || canAssignUndefinedValueToEditor) {
      editorOptionsWithValue.value = editorValue;
    }
    if (EDITORS_WITH_ARRAY_VALUE.indexOf(editorType) !== -1) {
      editorOptionsWithValue.value = editorOptionsWithValue.value || [];
    }
    var labelMode = externalEditorOptions === null || externalEditorOptions === void 0 ? void 0 : externalEditorOptions.labelMode;
    if (!(0, _type.isDefined)(labelMode)) {
      labelMode = formLabelMode === 'outside' ? 'hidden' : formLabelMode;
    }
    var stylingMode = (externalEditorOptions === null || externalEditorOptions === void 0 ? void 0 : externalEditorOptions.stylingMode) || editorStylingMode;
    var result = (0, _extend.extend)(true, editorOptionsWithValue, externalEditorOptions, {
      inputAttr: {
        id: editorInputId
      },
      validationBoundary: editorValidationBoundary,
      stylingMode: stylingMode,
      label: labelText,
      labelMode: labelMode,
      labelMark: labelMark
    });
    if (externalEditorOptions) {
      if (result.dataSource) {
        result.dataSource = externalEditorOptions.dataSource;
      }
      if (result.items) {
        result.items = externalEditorOptions.items;
      }
    }
    if (defaultEditorName && !result.name) {
      result.name = defaultEditorName;
    }
    return result;
  }
  function _hasRequiredRuleInSet(rules) {
    var hasRequiredRule;
    if (rules && rules.length) {
      (0, _iterator.each)(rules, function (index, rule) {
        if (rule.type === 'required') {
          hasRequiredRule = true;
          return false;
        }
      });
    }
    return hasRequiredRule;
  }
  function _convertToLabelOptions(_ref5) {
    var item = _ref5.item,
        id = _ref5.id,
        isRequired = _ref5.isRequired,
        managerMarkOptions = _ref5.managerMarkOptions,
        showColonAfterLabel = _ref5.showColonAfterLabel,
        labelLocation = _ref5.labelLocation,
        labelTemplate = _ref5.labelTemplate,
        formLabelMode = _ref5.formLabelMode,
        onLabelTemplateRendered = _ref5.onLabelTemplateRendered;
    var isEditorWithoutLabels = EDITORS_WITHOUT_LABELS.includes(item.editorType);
    var labelOptions = (0, _extend.extend)({
      showColon: showColonAfterLabel,
      location: labelLocation,
      id: id,
      visible: formLabelMode === 'outside' || isEditorWithoutLabels && formLabelMode !== 'hidden',
      isRequired: isRequired
    }, item ? item.label : {}, {
      markOptions: convertToLabelMarkOptions(managerMarkOptions, isRequired),
      labelTemplate: labelTemplate,
      onLabelTemplateRendered: onLabelTemplateRendered
    });
    var editorsRequiringIdForLabel = ['dxRadioGroup', 'dxCheckBox', 'dxLookup', 'dxSlider', 'dxRangeSlider', 'dxSwitch', 'dxHtmlEditor']; // TODO: support "dxCalendar"
    if (editorsRequiringIdForLabel.includes(item.editorType)) {
      labelOptions.labelID = "dx-label-".concat(new _guid.default());
    }
    if (!labelOptions.text && item.dataField) {
      labelOptions.text = (0, _inflector.captionize)(item.dataField);
    }
    if (labelOptions.text) {
      labelOptions.textWithoutColon = labelOptions.text;
      labelOptions.text += labelOptions.showColon ? ':' : '';
    }
    return labelOptions;
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../../core/utils/type","../../core/utils/iterator","../../core/utils/inflector","../../core/guid","./constants"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../../core/utils/type"), require("../../core/utils/iterator"), require("../../core/utils/inflector"), require("../../core/guid"), require("./constants"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.form.layout_manager.utils.js.map