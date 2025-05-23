"use strict";

exports.EDITORS_WITHOUT_LABELS = void 0;
exports.convertToLabelMarkOptions = convertToLabelMarkOptions;
exports.convertToRenderFieldItemOptions = convertToRenderFieldItemOptions;
exports.getLabelMarkText = getLabelMarkText;
var _extend = require("../../core/utils/extend");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _inflector = require("../../core/utils/inflector");
var _guid = _interopRequireDefault(require("../../core/guid"));
var _constants = require("./constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var EDITORS_WITH_ARRAY_VALUE = ['dxTagBox', 'dxRangeSlider', 'dxDateRangeBox'];
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
  var labelLocation = labelOptions.location,
    labelID = labelOptions.labelID;
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
  var needRenderOptionalMarkAsHelpText = labelOptions.markOptions.showOptionalMark && !labelOptions.visible && editorOptions.labelMode !== 'hidden' && !(0, _type.isDefined)(item.helpText);
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
    requiredMark,
    showOptionalMark: showOptionalMark && !isRequired,
    optionalMark
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
    labelTemplate,
    onLabelTemplateRendered
  });
  var editorsRequiringIdForLabel = ['dxRadioGroup', 'dxCheckBox', 'dxLookup', 'dxSlider', 'dxRangeSlider', 'dxSwitch', 'dxHtmlEditor', 'dxDateRangeBox']; // TODO: support "dxCalendar"
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