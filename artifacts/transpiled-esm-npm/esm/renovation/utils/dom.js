export function querySelectorInSameDocument(el, selector) {
  var _el$getRootNode, _el$getRootNode2;
  var root = (_el$getRootNode = (_el$getRootNode2 = el.getRootNode) === null || _el$getRootNode2 === void 0 ? void 0 : _el$getRootNode2.call(el)) !== null && _el$getRootNode !== void 0 ? _el$getRootNode : document;
  return root.querySelector(selector);
}