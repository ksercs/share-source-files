/**
* DevExtreme (esm/__internal/core/r1/utils/dom.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function querySelectorInSameDocument(el, selector) {
  var _el$getRootNode;
  const root = ((_el$getRootNode = el.getRootNode) === null || _el$getRootNode === void 0 ? void 0 : _el$getRootNode.call(el)) ?? document;
  return root.querySelector(selector);
}
