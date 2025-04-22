"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineClasses = void 0;
const combineClasses = classesMap => Object.keys(classesMap).filter(cssClass => !!cssClass && classesMap[cssClass]).join(' ');
exports.combineClasses = combineClasses;