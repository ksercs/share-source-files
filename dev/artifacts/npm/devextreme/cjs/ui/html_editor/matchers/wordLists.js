/**
* DevExtreme (cjs/ui/html_editor/matchers/wordLists.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
function getListType(matches) {
  var prefix = matches[1];
  return prefix.match(/\S+\./) ? 'ordered' : 'bullet';
}
function getIndent(node) {
  var style = node.getAttribute('style');
  if (style) {
    var level = style.replace(/\n+/g, '').match(/level(\d+)/);
    return level ? level[1] - 1 : 0;
  } else {
    return false;
  }
}
function removeNewLineChar(operations) {
  var newLineOperation = operations[operations.length - 1];
  newLineOperation.insert = newLineOperation.insert.trim();
}
var getMatcher = function getMatcher(quill) {
  var Delta = quill.import('delta');
  return function (node, delta) {
    var ops = delta.ops.slice();
    var insertOperation = ops[0];
    insertOperation.insert = insertOperation.insert.replace(/^\s+/, '');
    var listDecoratorMatches = insertOperation.insert.match(/^(\S+)\s+/);
    var indent = listDecoratorMatches && getIndent(node);
    if (!listDecoratorMatches || indent === false) {
      return delta;
    }
    insertOperation.insert = insertOperation.insert.substring(listDecoratorMatches[0].length, insertOperation.insert.length);
    removeNewLineChar(ops);
    ops.push({
      insert: '\n',
      attributes: {
        list: getListType(listDecoratorMatches),
        indent
      }
    });
    return new Delta(ops);
  };
};
var _default = getMatcher;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
