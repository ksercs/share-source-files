"use strict";

exports.renderButtonItem = renderButtonItem;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _type = require("../../../core/utils/type");
var _extend = require("../../../core/utils/extend");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var FIELD_BUTTON_ITEM_CLASS = 'dx-field-button-item';
function renderButtonItem(_ref) {
  var item = _ref.item,
    $parent = _ref.$parent,
    rootElementCssClassList = _ref.rootElementCssClassList,
    validationGroup = _ref.validationGroup,
    createComponentCallback = _ref.createComponentCallback;
  var $rootElement = (0, _renderer.default)('<div>').appendTo($parent).addClass(rootElementCssClassList.join(' ')).addClass(FIELD_BUTTON_ITEM_CLASS).css('textAlign', convertAlignmentToTextAlign(item.horizontalAlignment));

  // TODO: try to avoid changes in $container.parent() and adjust the created $elements only
  $parent.css('justifyContent', convertAlignmentToJustifyContent(item.verticalAlignment));
  var $button = (0, _renderer.default)('<div>').appendTo($rootElement);
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