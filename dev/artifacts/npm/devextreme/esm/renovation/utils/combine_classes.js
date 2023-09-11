/**
* DevExtreme (esm/renovation/utils/combine_classes.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function combineClasses(classesMap) {
  return Object.keys(classesMap).filter(p => classesMap[p]).join(' ');
}
