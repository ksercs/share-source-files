"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getElementMaxHeightByWindow = void 0;
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _size = require("../../../core/utils/size");
var _type = require("../../../core/utils/type");
var _m_window = _interopRequireDefault(require("../../core/utils/m_window"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const WINDOW_HEIGHT_PERCENT = 0.9;
const getElementMaxHeightByWindow = ($element, startLocation) => {
  const $window = (0, _renderer.default)(_m_window.default.getWindow());
  // @ts-expect-error
  const {
    top: elementOffset
  } = $element.offset();
  let actualOffset;
  if ((0, _type.isNumeric)(startLocation)) {
    if (startLocation < elementOffset) {
      return elementOffset - startLocation;
    }
    // @ts-expect-error
    actualOffset = (0, _size.getInnerHeight)($window) - startLocation + $window.scrollTop();
  } else {
    // @ts-expect-error
    const offsetTop = elementOffset - $window.scrollTop();
    const offsetBottom = (0, _size.getInnerHeight)($window) - offsetTop - (0, _size.getOuterHeight)($element);
    actualOffset = Math.max(offsetTop, offsetBottom);
  }
  return actualOffset * WINDOW_HEIGHT_PERCENT;
};
exports.getElementMaxHeightByWindow = getElementMaxHeightByWindow;