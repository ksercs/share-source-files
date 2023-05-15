/**
* DevExtreme (esm/__internal/grids/grid_core/row_dragging/dom.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
