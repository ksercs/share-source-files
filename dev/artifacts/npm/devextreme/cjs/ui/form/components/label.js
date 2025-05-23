/**
* DevExtreme (cjs/ui/form/components/label.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.GET_LABEL_WIDTH_BY_TEXT_CLASS = exports.FIELD_ITEM_REQUIRED_MARK_CLASS = exports.FIELD_ITEM_OPTIONAL_MARK_CLASS = exports.FIELD_ITEM_LABEL_TEXT_CLASS = exports.FIELD_ITEM_LABEL_LOCATION_CLASS = void 0;
exports.renderLabel = renderLabel;
exports.setLabelWidthByMaxLabelWidth = setLabelWidthByMaxLabelWidth;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _type = require("../../../core/utils/type");
var _element = require("../../../core/element");
var _uiFormLayout_manager = require("../ui.form.layout_manager.utils");
var _constants = require("../constants");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
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
      onRendered() {
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
