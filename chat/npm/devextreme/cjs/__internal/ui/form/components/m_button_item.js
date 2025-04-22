/**
* DevExtreme (cjs/__internal/ui/form/components/m_button_item.js)
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
exports.renderButtonItem = renderButtonItem;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _extend = require("../../../../core/utils/extend");
var _type = require("../../../../core/utils/type");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const FIELD_BUTTON_ITEM_CLASS = 'dx-field-button-item';
function renderButtonItem(_ref) {
  let {
    item,
    $parent,
    rootElementCssClassList,
    validationGroup,
    createComponentCallback
  } = _ref;
  const $rootElement = (0, _renderer.default)('<div>').appendTo($parent).addClass(rootElementCssClassList.join(' ')).addClass(FIELD_BUTTON_ITEM_CLASS).css('textAlign', convertAlignmentToTextAlign(item.horizontalAlignment));
  // TODO: try to avoid changes in $container.parent() and adjust the created $elements only
  $parent.css('justifyContent', convertAlignmentToJustifyContent(item.verticalAlignment));
  const $button = (0, _renderer.default)('<div>').appendTo($rootElement);
  return {
    $rootElement,
    buttonInstance: createComponentCallback($button, 'dxButton', (0, _extend.extend)({
      validationGroup
    }, item.buttonOptions))
  };
}
function convertAlignmentToTextAlign(horizontalAlignment) {
  return (0, _type.isDefined)(horizontalAlignment) ? horizontalAlignment : 'right';
}
function convertAlignmentToJustifyContent(verticalAlignment) {
  switch (verticalAlignment) {
    case 'center':
      return 'center';
    case 'bottom':
      return 'flex-end';
    default:
      return 'flex-start';
  }
}
