/**
* DevExtreme (cjs/__internal/ui/form/m_form.layout_manager.utils.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EDITORS_WITHOUT_LABELS = void 0;
exports.convertToLabelMarkOptions = convertToLabelMarkOptions;
exports.convertToRenderFieldItemOptions = convertToRenderFieldItemOptions;
exports.getLabelMarkText = getLabelMarkText;
var _guid = _interopRequireDefault(require("../../../core/guid"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _extend = require("../../../core/utils/extend");
var _inflector = require("../../../core/utils/inflector");
var _iterator = require("../../../core/utils/iterator");
var _type = require("../../../core/utils/type");
var _constants = require("./constants");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const EDITORS_WITH_ARRAY_VALUE = ['dxTagBox', 'dxRangeSlider', 'dxDateRangeBox'];
const EDITORS_WITH_MULTIPLE_INPUT_FIELDS = ['dxRangeSlider', 'dxDateRangeBox'];
const EDITORS_WITH_SPECIFIC_LABELS = ['dxRangeSlider', 'dxSlider'];
const EDITORS_WITHOUT_LABELS = exports.EDITORS_WITHOUT_LABELS = ['dxCalendar', 'dxCheckBox', 'dxHtmlEditor', 'dxRadioGroup', 'dxRangeSlider', 'dxSlider', 'dxSwitch'];
const DROP_DOWN_EDITORS = ['dxSelectBox', 'dxDropDownBox', 'dxTagBox', 'dxLookup', 'dxAutocomplete', 'dxColorBox', 'dxDateBox', 'dxDateRangeBox'];
function convertToRenderFieldItemOptions(_ref) {
  let {
    $parent,
    rootElementCssClassList,
    formOrLayoutManager,
    createComponentCallback,
    item,
    template,
    labelTemplate,
    name,
    formLabelLocation,
    requiredMessageTemplate,
    validationGroup,
    editorValue,
    canAssignUndefinedValueToEditor,
    editorValidationBoundary,
    editorStylingMode,
    showColonAfterLabel,
    managerLabelLocation,
    itemId,
    managerMarkOptions,
    labelMode,
    onLabelTemplateRendered
  } = _ref;
  const isRequired = (0, _type.isDefined)(item.isRequired) ? item.isRequired : !!_hasRequiredRuleInSet(item.validationRules);
  const isSimpleItem = item.itemType === _constants.SIMPLE_ITEM_TYPE;
  const helpID = item.helpText ? `dx-${new _guid.default()}` : null;
  const labelOptions = _convertToLabelOptions({
    item,
    id: itemId,
    isRequired,
    managerMarkOptions,
    showColonAfterLabel,
    labelLocation: managerLabelLocation,
    formLabelMode: labelMode,
    labelTemplate,
    onLabelTemplateRendered
  });
  const needRenderLabel = labelOptions.visible && (labelOptions.text || labelOptions.labelTemplate && isSimpleItem);
  const {
    location: labelLocation,
    labelID
  } = labelOptions;
  const labelNeedBaselineAlign = labelLocation !== 'top' && ['dxTextArea', 'dxRadioGroup', 'dxCalendar', 'dxHtmlEditor'].includes(item.editorType);
  const editorOptions = _convertToEditorOptions({
    $parent,
    editorType: item.editorType,
    editorValue,
    defaultEditorName: item.dataField,
    canAssignUndefinedValueToEditor,
    externalEditorOptions: item.editorOptions,
    editorInputId: itemId,
    editorValidationBoundary,
    editorStylingMode,
    formLabelMode: labelMode,
    labelText: labelOptions.textWithoutColon,
    labelMark: labelOptions.markOptions.showRequiredMark ? String.fromCharCode(160) + labelOptions.markOptions.requiredMark : ''
  });
  const needRenderOptionalMarkAsHelpText = labelOptions.markOptions.showOptionalMark && !labelOptions.visible && editorOptions.labelMode !== 'hidden' && !(0, _type.isDefined)(item.helpText);
  const helpText = needRenderOptionalMarkAsHelpText ? labelOptions.markOptions.optionalMark : item.helpText;
  return {
    $parent,
    rootElementCssClassList,
    formOrLayoutManager,
    createComponentCallback,
    labelOptions,
    labelNeedBaselineAlign,
    labelLocation,
    needRenderLabel,
    item,
    isSimpleItem,
    isRequired,
    template,
    helpID,
    labelID,
    name,
    helpText,
    formLabelLocation,
    requiredMessageTemplate,
    validationGroup,
    editorOptions
  };
}
function getLabelMarkText(_ref2) {
  let {
    showRequiredMark,
    requiredMark,
    showOptionalMark,
    optionalMark
  } = _ref2;
  if (!showRequiredMark && !showOptionalMark) {
    return '';
  }
  return String.fromCharCode(160) + (showRequiredMark ? requiredMark : optionalMark);
}
function convertToLabelMarkOptions(_ref3, isRequired) {
  let {
    showRequiredMark,
    requiredMark,
    showOptionalMark,
    optionalMark
  } = _ref3;
  return {
    showRequiredMark: showRequiredMark && isRequired,
    requiredMark,
    showOptionalMark: showOptionalMark && !isRequired,
    optionalMark
  };
}
function getDropDownEditorOptions($parent, editorType, editorInputId) {
  const isDropDownEditor = DROP_DOWN_EDITORS.includes(editorType);
  if (!isDropDownEditor) {
    return {};
  }
  return {
    // @ts-expect-error // unpublished option
    onPopupInitialized: _ref4 => {
      let {
        component,
        popup
      } = _ref4;
      const openOnFieldClick = component.option('openOnFieldClick');
      const initialHideOnOutsideClick = popup.option('hideOnOutsideClick');
      // Do not overwrite boolean hideOnOutsideClick
      if (openOnFieldClick && (0, _type.isFunction)(initialHideOnOutsideClick)) {
        const hideOnOutsideClick = e => {
          const $target = (0, _renderer.default)(e.target);
          const $label = $parent.find(`label[for="${editorInputId}"]`);
          const isLabelClicked = !!$target.closest($label).length;
          return !isLabelClicked && initialHideOnOutsideClick(e);
        };
        component.option('dropDownOptions', {
          hideOnOutsideClick
        });
        popup.option({
          hideOnOutsideClick
        });
      }
    }
  };
}
// eslint-disable-next-line @typescript-eslint/naming-convention
function _convertToEditorOptions(_ref5) {
  let {
    $parent,
    editorType,
    defaultEditorName,
    editorValue,
    canAssignUndefinedValueToEditor,
    externalEditorOptions,
    editorInputId,
    editorValidationBoundary,
    editorStylingMode,
    formLabelMode,
    labelText,
    labelMark
  } = _ref5;
  const editorOptionsWithValue = {};
  if (editorValue !== undefined || canAssignUndefinedValueToEditor) {
    editorOptionsWithValue.value = editorValue;
  }
  if (EDITORS_WITH_ARRAY_VALUE.includes(editorType)) {
    editorOptionsWithValue.value = editorOptionsWithValue.value || [];
  }
  let labelMode = externalEditorOptions === null || externalEditorOptions === void 0 ? void 0 : externalEditorOptions.labelMode;
  if (!(0, _type.isDefined)(labelMode)) {
    labelMode = formLabelMode === 'outside' ? 'hidden' : formLabelMode;
  }
  const stylingMode = (externalEditorOptions === null || externalEditorOptions === void 0 ? void 0 : externalEditorOptions.stylingMode) || editorStylingMode;
  const useSpecificLabelOptions = EDITORS_WITH_SPECIFIC_LABELS.includes(editorType);
  const dropDownEditorOptions = getDropDownEditorOptions($parent, editorType, editorInputId);
  const result = (0, _extend.extend)(true, editorOptionsWithValue, externalEditorOptions, dropDownEditorOptions, {
    inputAttr: {
      id: editorInputId
    },
    validationBoundary: editorValidationBoundary,
    stylingMode,
    label: useSpecificLabelOptions ? externalEditorOptions === null || externalEditorOptions === void 0 ? void 0 : externalEditorOptions.label : labelText,
    labelMode,
    labelMark
  });
  if (externalEditorOptions) {
    if (result.dataSource) {
      result.dataSource = externalEditorOptions.dataSource;
    }
    if (result.items) {
      result.items = externalEditorOptions.items;
    }
  }
  if (defaultEditorName) {
    if (EDITORS_WITH_MULTIPLE_INPUT_FIELDS.includes(editorType)) {
      if (editorType === 'dxRangeSlider') {
        if (!result.startName) {
          result.startName = `${defaultEditorName}Start`;
        }
        if (!result.endName) {
          result.endName = `${defaultEditorName}End`;
        }
      }
      if (editorType === 'dxDateRangeBox') {
        if (!result.startDateName) {
          result.startDateName = `${defaultEditorName}Start`;
        }
        if (!result.endDateName) {
          result.endDateName = `${defaultEditorName}End`;
        }
      }
      return result;
    }
    if (!result.name) {
      result.name = defaultEditorName;
    }
  }
  return result;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
function _hasRequiredRuleInSet(rules) {
  let hasRequiredRule;
  if (rules !== null && rules !== void 0 && rules.length) {
    // @ts-expect-error
    (0, _iterator.each)(rules, (index, rule) => {
      if (rule.type === 'required') {
        hasRequiredRule = true;
        return false;
      }
    });
  }
  return hasRequiredRule;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
function _convertToLabelOptions(_ref6) {
  let {
    item,
    id,
    isRequired,
    managerMarkOptions,
    showColonAfterLabel,
    labelLocation,
    labelTemplate,
    formLabelMode,
    onLabelTemplateRendered
  } = _ref6;
  const isEditorWithoutLabels = EDITORS_WITHOUT_LABELS.includes(item.editorType);
  const labelOptions = (0, _extend.extend)({
    showColon: showColonAfterLabel,
    location: labelLocation,
    id,
    visible: formLabelMode === 'outside' || isEditorWithoutLabels && formLabelMode !== 'hidden',
    isRequired
  }, item ? item.label : {}, {
    markOptions: convertToLabelMarkOptions(managerMarkOptions, isRequired),
    labelTemplate,
    onLabelTemplateRendered
  });
  const editorsRequiringIdForLabel = ['dxRadioGroup', 'dxCheckBox', 'dxLookup', 'dxSlider', 'dxRangeSlider', 'dxSwitch', 'dxHtmlEditor', 'dxDateRangeBox']; // TODO: support "dxCalendar"
  if (editorsRequiringIdForLabel.includes(item.editorType)) {
    labelOptions.labelID = `dx-label-${new _guid.default()}`;
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
