/**
* DevExtreme (esm/ui/widget/swatch_container.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { value } from '../../core/utils/view_port';
const SWATCH_CONTAINER_CLASS_PREFIX = 'dx-swatch-';
const getSwatchContainer = element => {
  const $element = $(element);
  const swatchContainer = $element.closest(`[class^="${SWATCH_CONTAINER_CLASS_PREFIX}"], [class*=" ${SWATCH_CONTAINER_CLASS_PREFIX}"]`);
  const viewport = value();
  if (!swatchContainer.length) return viewport;
  const swatchClassRegex = new RegExp(`(\\s|^)(${SWATCH_CONTAINER_CLASS_PREFIX}.*?)(\\s|$)`);
  const swatchClass = swatchContainer[0].className.match(swatchClassRegex)[2];
  let viewportSwatchContainer = viewport.children('.' + swatchClass);
  if (!viewportSwatchContainer.length) {
    viewportSwatchContainer = $('<div>').addClass(swatchClass).appendTo(viewport);
  }
  return viewportSwatchContainer;
};
export default {
  getSwatchContainer: getSwatchContainer
};
