!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/form/components/field_item.js"], ["../../../core/renderer","../../../events/core/events_engine","../../../events/click","../../../core/element","../../../core/utils/inflector","../../../core/utils/string","../../themes","../../widget/ui.errors","../../validator","../constants","./label"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/form/components/field_item.js", ["../../../core/renderer", "../../../events/core/events_engine", "../../../events/click", "../../../core/element", "../../../core/utils/inflector", "../../../core/utils/string", "../../themes", "../../widget/ui.errors", "../../validator", "../constants", "./label"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.TOGGLE_CONTROLS_PADDING_CLASS = exports.LABEL_VERTICAL_ALIGNMENT_CLASS = exports.LABEL_HORIZONTAL_ALIGNMENT_CLASS = exports.FLEX_LAYOUT_CLASS = exports.FIELD_ITEM_REQUIRED_CLASS = exports.FIELD_ITEM_OPTIONAL_CLASS = exports.FIELD_ITEM_LABEL_ALIGN_CLASS = exports.FIELD_ITEM_HELP_TEXT_CLASS = exports.FIELD_ITEM_CONTENT_WRAPPER_CLASS = exports.FIELD_ITEM_CONTENT_LOCATION_CLASS = void 0;
  exports.renderFieldItem = renderFieldItem;
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../../events/core/events_engine"));
  var _click = $__require("../../../events/click");
  var _element = $__require("../../../core/element");
  var _inflector = $__require("../../../core/utils/inflector");
  var _string = $__require("../../../core/utils/string");
  var _themes = $__require("../../themes");
  var _ui = _interopRequireDefault($__require("../../widget/ui.errors"));
  var _validator = _interopRequireDefault($__require("../../validator"));
  var _constants = $__require("../constants");
  var _label = $__require("./label");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var FLEX_LAYOUT_CLASS = 'dx-flex-layout';
  exports.FLEX_LAYOUT_CLASS = FLEX_LAYOUT_CLASS;
  var FIELD_ITEM_OPTIONAL_CLASS = 'dx-field-item-optional';
  exports.FIELD_ITEM_OPTIONAL_CLASS = FIELD_ITEM_OPTIONAL_CLASS;
  var FIELD_ITEM_REQUIRED_CLASS = 'dx-field-item-required';
  exports.FIELD_ITEM_REQUIRED_CLASS = FIELD_ITEM_REQUIRED_CLASS;
  var FIELD_ITEM_CONTENT_WRAPPER_CLASS = 'dx-field-item-content-wrapper';
  exports.FIELD_ITEM_CONTENT_WRAPPER_CLASS = FIELD_ITEM_CONTENT_WRAPPER_CLASS;
  var FIELD_ITEM_CONTENT_LOCATION_CLASS = 'dx-field-item-content-location-';
  exports.FIELD_ITEM_CONTENT_LOCATION_CLASS = FIELD_ITEM_CONTENT_LOCATION_CLASS;
  var FIELD_ITEM_LABEL_ALIGN_CLASS = 'dx-field-item-label-align';
  exports.FIELD_ITEM_LABEL_ALIGN_CLASS = FIELD_ITEM_LABEL_ALIGN_CLASS;
  var FIELD_ITEM_HELP_TEXT_CLASS = 'dx-field-item-help-text';
  exports.FIELD_ITEM_HELP_TEXT_CLASS = FIELD_ITEM_HELP_TEXT_CLASS;
  var LABEL_VERTICAL_ALIGNMENT_CLASS = 'dx-label-v-align';
  exports.LABEL_VERTICAL_ALIGNMENT_CLASS = LABEL_VERTICAL_ALIGNMENT_CLASS;
  var LABEL_HORIZONTAL_ALIGNMENT_CLASS = 'dx-label-h-align';
  exports.LABEL_HORIZONTAL_ALIGNMENT_CLASS = LABEL_HORIZONTAL_ALIGNMENT_CLASS;
  var TOGGLE_CONTROLS_PADDING_CLASS = 'dx-toggle-controls-paddings';
  exports.TOGGLE_CONTROLS_PADDING_CLASS = TOGGLE_CONTROLS_PADDING_CLASS;
  var TEMPLATE_WRAPPER_CLASS = 'dx-template-wrapper';
  var VALIDATION_TARGET_CLASS = 'dx-validation-target';
  var INVALID_CLASS = 'dx-invalid';
  function renderFieldItem(_ref) {
    var $parent = _ref.$parent,
        rootElementCssClassList = _ref.rootElementCssClassList,
        formOrLayoutManager = _ref.formOrLayoutManager,
        createComponentCallback = _ref.createComponentCallback,
        labelOptions = _ref.labelOptions,
        labelNeedBaselineAlign = _ref.labelNeedBaselineAlign,
        labelLocation = _ref.labelLocation,
        needRenderLabel = _ref.needRenderLabel,
        formLabelLocation = _ref.formLabelLocation,
        item = _ref.item,
        editorOptions = _ref.editorOptions,
        isSimpleItem = _ref.isSimpleItem,
        isRequired = _ref.isRequired,
        template = _ref.template,
        helpID = _ref.helpID,
        labelID = _ref.labelID,
        name = _ref.name,
        helpText = _ref.helpText,
        requiredMessageTemplate = _ref.requiredMessageTemplate,
        validationGroup = _ref.validationGroup;
    var $rootElement = (0, _renderer.default)('<div>').addClass(rootElementCssClassList.join(' ')).appendTo($parent);
    $rootElement.addClass(isRequired ? FIELD_ITEM_REQUIRED_CLASS : FIELD_ITEM_OPTIONAL_CLASS);
    if (isSimpleItem) {
      $rootElement.addClass(FLEX_LAYOUT_CLASS);
    }
    if (isSimpleItem && labelNeedBaselineAlign) {
      // TODO: label related code, execute ony if needRenderLabel ?
      $rootElement.addClass(FIELD_ITEM_LABEL_ALIGN_CLASS);
    }

    //
    // Setup field editor container:
    //

    var $fieldEditorContainer = (0, _renderer.default)('<div>');
    $fieldEditorContainer.data('dx-form-item', item);
    var locationClassSuffix = {
      right: 'left',
      left: 'right',
      top: 'bottom'
    };
    $fieldEditorContainer.addClass(_constants.FIELD_ITEM_CONTENT_CLASS).addClass(FIELD_ITEM_CONTENT_LOCATION_CLASS + locationClassSuffix[formLabelLocation]);

    //
    // Setup $label:
    //

    var $label = null;
    if (needRenderLabel) {
      if (labelOptions.labelTemplate) {
        labelOptions.labelTemplateData = getTemplateData(item, editorOptions, formOrLayoutManager);
      }
      $label = (0, _label.renderLabel)(labelOptions);
    }
    if ($label) {
      var editorType = item.editorType;
      $rootElement.append($label);
      if (labelLocation === 'top' || labelLocation === 'left') {
        $rootElement.append($fieldEditorContainer);
      }
      if (labelLocation === 'right') {
        $rootElement.prepend($fieldEditorContainer);
      }
      if (labelLocation === 'top') {
        $rootElement.addClass(LABEL_VERTICAL_ALIGNMENT_CLASS);
      } else {
        $rootElement.addClass(LABEL_HORIZONTAL_ALIGNMENT_CLASS);
      }
      if (editorType === 'dxCheckBox' || editorType === 'dxSwitch') {
        _events_engine.default.on($label, _click.name, function () {
          _events_engine.default.trigger($fieldEditorContainer.children(), _click.name);
        });
      }
      var toggleControls = ['dxCheckBox', 'dxSwitch', 'dxRadioGroup'];
      var isToggleControls = toggleControls.includes(editorType);
      var labelAlignment = labelOptions.alignment;
      var isLabelAlignmentLeft = labelAlignment === 'left' || !labelAlignment;
      var hasNotTemplate = !template;
      var isLabelOnTop = labelLocation === 'top';
      if (hasNotTemplate && isToggleControls && isLabelOnTop && isLabelAlignmentLeft) {
        $fieldEditorContainer.addClass(TOGGLE_CONTROLS_PADDING_CLASS);
      }
    } else {
      $rootElement.append($fieldEditorContainer);
    }

    //
    // Append field editor:
    //

    var widgetInstance;
    if (template) {
      template.render({
        container: (0, _element.getPublicElement)($fieldEditorContainer),
        model: getTemplateData(item, editorOptions, formOrLayoutManager),
        onRendered: function onRendered() {
          var $validationTarget = getValidationTarget($fieldEditorContainer);
          var validationTargetInstance = tryGetValidationTargetInstance($validationTarget);
          subscribeWrapperInvalidClassToggle(validationTargetInstance);
        }
      });
    } else {
      var $div = (0, _renderer.default)('<div>').appendTo($fieldEditorContainer);
      try {
        widgetInstance = createComponentCallback($div, item.editorType, editorOptions);
        widgetInstance.setAria('describedby', helpID);
        if (labelID) widgetInstance.setAria('labelledby', labelID);
        widgetInstance.setAria('required', isRequired);
      } catch (e) {
        _ui.default.log('E1035', e.message);
      }
    }

    //
    // Setup $validation:
    //

    var $validationTarget = getValidationTarget($fieldEditorContainer);
    var validationTargetInstance = $validationTarget && $validationTarget.data(VALIDATION_TARGET_CLASS);
    if (validationTargetInstance) {
      var isItemHaveCustomLabel = item.label && item.label.text;
      var itemName = isItemHaveCustomLabel ? null : name;
      var fieldName = isItemHaveCustomLabel ? item.label.text : itemName && (0, _inflector.captionize)(itemName);
      var validationRules;
      if (isSimpleItem) {
        if (item.validationRules) {
          validationRules = item.validationRules;
        } else {
          var requiredMessage = (0, _string.format)(requiredMessageTemplate, fieldName || '');
          validationRules = item.isRequired ? [{
            type: 'required',
            message: requiredMessage
          }] : null;
        }
      }
      if (Array.isArray(validationRules) && validationRules.length) {
        createComponentCallback($validationTarget, _validator.default, {
          validationRules: validationRules,
          validationGroup: validationGroup,
          dataGetter: function dataGetter() {
            return {
              formItem: item
            };
          }
        });
      }
      subscribeWrapperInvalidClassToggle(validationTargetInstance);
    }

    //
    // Append help text elements:
    //

    if (helpText && isSimpleItem) {
      var $editorParent = $fieldEditorContainer.parent();

      // TODO: DOM hierarchy is changed here: new node is added between $editor and $editor.parent()
      $editorParent.append((0, _renderer.default)('<div>').addClass(FIELD_ITEM_CONTENT_WRAPPER_CLASS).append($fieldEditorContainer).append((0, _renderer.default)('<div>').addClass(FIELD_ITEM_HELP_TEXT_CLASS).attr('id', helpID).text(helpText)));
    }
    return {
      $fieldEditorContainer: $fieldEditorContainer,
      $rootElement: $rootElement,
      widgetInstance: widgetInstance
    };
  }
  function getValidationTarget($fieldEditorContainer) {
    var $editor = $fieldEditorContainer.children().first();
    return $editor.hasClass(TEMPLATE_WRAPPER_CLASS) ? $editor.children().first() : $editor;
  }
  function tryGetValidationTargetInstance($validationTarget) {
    var _$validationTarget$pa, _$validationTarget$pa2;
    return ($validationTarget === null || $validationTarget === void 0 ? void 0 : $validationTarget.data(VALIDATION_TARGET_CLASS)) || ($validationTarget === null || $validationTarget === void 0 ? void 0 : (_$validationTarget$pa = $validationTarget.parent) === null || _$validationTarget$pa === void 0 ? void 0 : (_$validationTarget$pa2 = _$validationTarget$pa.call($validationTarget)) === null || _$validationTarget$pa2 === void 0 ? void 0 : _$validationTarget$pa2.data(VALIDATION_TARGET_CLASS));
  }
  function subscribeWrapperInvalidClassToggle(validationTargetInstance) {
    if (validationTargetInstance && (0, _themes.isMaterial)()) {
      var wrapperClass = ".".concat(FIELD_ITEM_CONTENT_WRAPPER_CLASS);
      var toggleInvalidClass = function toggleInvalidClass(_ref2) {
        var element = _ref2.element,
            component = _ref2.component;
        var _component$option = component.option(),
            isValid = _component$option.isValid,
            validationMessageMode = _component$option.validationMessageMode;
        (0, _renderer.default)(element).parents(wrapperClass).toggleClass(INVALID_CLASS, isValid === false && (component._isFocused() || validationMessageMode === 'always'));
      };
      validationTargetInstance.on('optionChanged', function (e) {
        if (e.name !== 'isValid') return;
        toggleInvalidClass(e);
      });
      validationTargetInstance.on('focusIn', toggleInvalidClass).on('focusOut', toggleInvalidClass).on('enterKey', toggleInvalidClass);
    }
  }
  function getTemplateData(item, editorOptions, formOrLayoutManager) {
    return {
      dataField: item.dataField,
      editorType: item.editorType,
      editorOptions: editorOptions,
      component: formOrLayoutManager,
      name: item.name
    };
  }
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","../../../events/core/events_engine","../../../events/click","../../../core/element","../../../core/utils/inflector","../../../core/utils/string","../../themes","../../widget/ui.errors","../../validator","../constants","./label"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("../../../events/core/events_engine"), require("../../../events/click"), require("../../../core/element"), require("../../../core/utils/inflector"), require("../../../core/utils/string"), require("../../themes"), require("../../widget/ui.errors"), require("../../validator"), require("../constants"), require("./label"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=field_item.js.map