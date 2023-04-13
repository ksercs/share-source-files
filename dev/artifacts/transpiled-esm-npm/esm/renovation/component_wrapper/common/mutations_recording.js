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