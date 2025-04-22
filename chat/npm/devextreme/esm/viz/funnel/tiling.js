/**
* DevExtreme (esm/viz/funnel/tiling.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { normalizeEnum as _normalizeEnum } from '../core/utils';
const algorithms = {};
let defaultAlgorithm;
export function getAlgorithm(name) {
  return algorithms[_normalizeEnum(name)] || defaultAlgorithm;
}
export function addAlgorithm(name, callback, setDefault) {
  algorithms[name] = callback;
  if (setDefault) {
    defaultAlgorithm = algorithms[name];
  }
}
