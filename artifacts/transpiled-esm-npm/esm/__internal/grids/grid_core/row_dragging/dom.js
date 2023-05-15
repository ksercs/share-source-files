/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import $ from '../../../../core/renderer';
// eslint-disable-next-line @typescript-eslint/no-restricted-imports
import gridCoreUtils from '../module_utils';
import { ATTRIBUTES, CLASSES } from './const';
var createHandleTemplateFunc = addWidgetPrefix => (container, options) => {
  var $container = $(container);
  $container.attr(ATTRIBUTES.dragCell, '');
  if (options.rowType === 'data') {
    $container.addClass(CLASSES.cellFocusDisabled);
    return $('<span>').addClass(addWidgetPrefix(CLASSES.handleIcon));
  }
  gridCoreUtils.setEmptyText($container);
  return undefined;
};
export var GridCoreRowDraggingDom = {
  createHandleTemplateFunc
};