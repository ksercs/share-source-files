/**
* DevExtreme (esm/ui/form/ui.form.layout_manager.utils.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from '../../core/utils/extend';
import { isDefined } from '../../core/utils/type';
import { each } from '../../core/utils/iterator';
import { captionize } from '../../core/utils/inflector';
import Guid from '../../core/guid';
import { SIMPLE_ITEM_TYPE } from './constants';
var EDITORS_WITH_ARRAY_VALUE = ['dxTagBox', 'dxRangeSlider', 'dxDateRangeBox'];
export var EDITORS_WITHOUT_LABELS = ['dxCalendar', 'dxCheckBox', 'dxHtmlEditor', 'dxRadioGroup', 'dxRangeSlider', 'dxSlider', 'dxSwitch'];
export function convertToRenderFieldItemOptions(_ref) {
  var {
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
  var isRequired = isDefined(item.isRequired) ? item.isRequired : !!_hasRequiredRuleInSet(item.validationRules);
  var isSimpleItem = item.itemType === SIMPLE_ITEM_TYPE;
  var helpID = item.helpText ? 'dx-' + new Guid() : null;
  var labelOptions = _convertToLabelOptions({
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
  var needRenderLabel = labelOptions.visible && (labelOptions.text || labelOptions.labelTemplate && isSimpleItem);
  var {
    location: labelLocation,
    labelID
  } = labelOptions;
  var labelNeedBaselineAlign = labelLocation !== 'top' && ['dxTextArea', 'dxRadioGroup', 'dxCalendar', 'dxHtmlEditor'].includes(item.editorType);
  var editorOptions = _convertToEditorOptions({
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
  var needRenderOptionalMarkAsHelpText = labelOptions.markOptions.showOptionalMark && !labelOptions.visible && editorOptions.labelMode !== 'hidden' && !isDefined(item.helpText);
  var helpText = needRenderOptionalMarkAsHelpText ? labelOptions.markOptions.optionalMark : item.helpText;
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
export function getLabelMarkText(_ref2) {
  var {
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
export function convertToLabelMarkOptions(_ref3, isRequired) {
  var {
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
function _convertToEditorOptions(_ref4) {
  var {
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
  } = _ref4;
  var editorOptionsWithValue = {};
  if (editorValue !== undefined || canAssignUndefinedValueToEditor) {
    editorOptionsWithValue.value = editorValue;
  }
  if (EDITORS_WITH_ARRAY_VALUE.indexOf(editorType) !== -1) {
    editorOptionsWithValue.value = editorOptionsWithValue.value || [];
  }
  var labelMode = externalEditorOptions === null || externalEditorOptions === void 0 ? void 0 : externalEditorOptions.labelMode;
  if (!isDefined(labelMode)) {
    labelMode = formLabelMode === 'outside' ? 'hidden' : formLabelMode;
  }
  var stylingMode = (externalEditorOptions === null || externalEditorOptions === void 0 ? void 0 : externalEditorOptions.stylingMode) || editorStylingMode;
  var result = extend(true, editorOptionsWithValue, externalEditorOptions, {
    inputAttr: {
      id: editorInputId
    },
    validationBoundary: editorValidationBoundary,
    stylingMode,
    label: labelText,
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
  if (defaultEditorName && !result.name) {
    result.name = defaultEditorName;
  }
  return result;
}
function _hasRequiredRuleInSet(rules) {
  var hasRequiredRule;
  if (rules && rules.length) {
    each(rules, function (index, rule) {
      if (rule.type === 'required') {
        hasRequiredRule = true;
        return false;
      }
    });
  }
  return hasRequiredRule;
}
function _convertToLabelOptions(_ref5) {
  var {
    item,
    id,
    isRequired,
    managerMarkOptions,
    showColonAfterLabel,
    labelLocation,
    labelTemplate,
    formLabelMode,
    onLabelTemplateRendered
  } = _ref5;
  var isEditorWithoutLabels = EDITORS_WITHOUT_LABELS.includes(item.editorType);
  var labelOptions = extend({
    showColon: showColonAfterLabel,
    location: labelLocation,
    id: id,
    visible: formLabelMode === 'outside' || isEditorWithoutLabels && formLabelMode !== 'hidden',
    isRequired: isRequired
  }, item ? item.label : {}, {
    markOptions: convertToLabelMarkOptions(managerMarkOptions, isRequired),
    labelTemplate,
    onLabelTemplateRendered
  });
  var editorsRequiringIdForLabel = ['dxRadioGroup', 'dxCheckBox', 'dxLookup', 'dxSlider', 'dxRangeSlider', 'dxSwitch', 'dxHtmlEditor', 'dxDateRangeBox']; // TODO: support "dxCalendar"
  if (editorsRequiringIdForLabel.includes(item.editorType)) {
    labelOptions.labelID = "dx-label-".concat(new Guid());
  }
  if (!labelOptions.text && item.dataField) {
    labelOptions.text = captionize(item.dataField);
  }
  if (labelOptions.text) {
    labelOptions.textWithoutColon = labelOptions.text;
    labelOptions.text += labelOptions.showColon ? ':' : '';
  }
  return labelOptions;
}
