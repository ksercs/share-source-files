/**
* DevExtreme (esm/ui/text_box/utils.caret.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { isDefined } from '../../core/utils/type';
import devices from '../../core/devices';
import domAdapter from '../../core/dom_adapter';
var {
  ios,
  mac
} = devices.real();
var isFocusingOnCaretChange = ios || mac;
var getCaret = function getCaret(input) {
  var range;
  try {
    range = {
      start: input.selectionStart,
      end: input.selectionEnd
    };
  } catch (e) {
    range = {
      start: 0,
      end: 0
    };
  }
  return range;
};
var setCaret = function setCaret(input, position) {
  var body = domAdapter.getBody();
  if (!body.contains(input) && !body.contains(input.getRootNode().host)) {
    return;
  }
  try {
    input.selectionStart = position.start;
    input.selectionEnd = position.end;
  } catch (e) {}
};
var caret = function caret(input, position) {
  var force = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  input = $(input).get(0);
  if (!isDefined(position)) {
    return getCaret(input);
  }

  // NOTE: AppleWebKit-based browsers focuses element input after caret position has changed
  if (!force && isFocusingOnCaretChange && domAdapter.getActiveElement(input) !== input) {
    return;
  }
  setCaret(input, position);
};
export default caret;
