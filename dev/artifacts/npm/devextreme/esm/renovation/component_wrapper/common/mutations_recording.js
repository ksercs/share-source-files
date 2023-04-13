/**
* DevExtreme (esm/renovation/component_wrapper/common/mutations_recording.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
function isChildNode(node) {
  return typeof node.remove === 'function';
}
function revertMutation(_ref) {
  var {
    addedNodes,
    type
  } = _ref;
  switch (type) {
    case 'childList':
      addedNodes.forEach(n => isChildNode(n) && n.remove());
      break;
    default:
      break;
  }
}
export function recordMutations(target, func) {
  var observer = new MutationObserver(() => {});
  observer.observe(target, {
    childList: true,
    subtree: false
  });
  func();
  var mutations = observer.takeRecords();
  observer.disconnect();
  return () => mutations.forEach(revertMutation);
}
