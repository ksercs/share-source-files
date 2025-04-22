"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.combineClasses = combineClasses;
function combineClasses(classesMap) {
  return Object.keys(classesMap).filter(p => classesMap[p]).join(' ');
}