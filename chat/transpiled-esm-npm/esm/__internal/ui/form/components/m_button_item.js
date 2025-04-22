import $ from '../../../../core/renderer';
import { extend } from '../../../../core/utils/extend';
import { isDefined } from '../../../../core/utils/type';
const FIELD_BUTTON_ITEM_CLASS = 'dx-field-button-item';
export function renderButtonItem(_ref) {
  let {
    item,
    $parent,
    rootElementCssClassList,
    validationGroup,
    createComponentCallback
  } = _ref;
  const $rootElement = $('<div>').appendTo($parent).addClass(rootElementCssClassList.join(' ')).addClass(FIELD_BUTTON_ITEM_CLASS).css('textAlign', convertAlignmentToTextAlign(item.horizontalAlignment));
  // TODO: try to avoid changes in $container.parent() and adjust the created $elements only
  $parent.css('justifyContent', convertAlignmentToJustifyContent(item.verticalAlignment));
  const $button = $('<div>').appendTo($rootElement);
  return {
    $rootElement,
    buttonInstance: createComponentCallback($button, 'dxButton', extend({
      validationGroup
    }, item.buttonOptions))
  };
}
function convertAlignmentToTextAlign(horizontalAlignment) {
  return isDefined(horizontalAlignment) ? horizontalAlignment : 'right';
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