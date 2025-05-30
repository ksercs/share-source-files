"use strict";

exports.default = void 0;
var _inferno = require("inferno");
var _inferno2 = require("@devextreme/runtime/inferno");
var _infernoCreateElement = require("inferno-create-element");
var _dom_adapter = _interopRequireDefault(require("./dom_adapter"));
var _element_data = require("./element_data");
var _dependency_injector = _interopRequireDefault(require("./utils/dependency_injector"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var remove = function remove(element) {
  var parentNode = element.parentNode;
  if (parentNode) {
    var nextSibling = element.nextSibling;
    (0, _element_data.cleanDataRecursive)(element);
    parentNode.$V = element.$V;
    (0, _inferno.render)(null, parentNode);
    parentNode.insertBefore(element, nextSibling);
    element.innerHTML = '';
    delete parentNode.$V;
  }
  delete element.$V;
};
var _default = (0, _dependency_injector.default)({
  createElement: function createElement(component, props) {
    return (0, _infernoCreateElement.createElement)(component, props);
  },
  remove,
  onAfterRender: function onAfterRender() {
    _inferno2.InfernoEffectHost.callEffects();
  },
  onPreRender: function onPreRender() {
    _inferno2.InfernoEffectHost.lock();
  },
  render: function render(component, props, container, replace) {
    if (!replace) {
      var parentNode = container.parentNode;
      var nextNode = container === null || container === void 0 ? void 0 : container.nextSibling;
      var rootNode = _dom_adapter.default.createElement('div');
      rootNode.appendChild(container);
      var mountNode = _dom_adapter.default.createDocumentFragment().appendChild(rootNode);
      var vNodeAlreadyExists = !!container.$V;
      vNodeAlreadyExists && remove(container);
      (0, _inferno2.hydrate)((0, _infernoCreateElement.createElement)(component, props), mountNode);
      container.$V = mountNode.$V;
      if (parentNode) {
        parentNode.insertBefore(container, nextNode);
      }
    } else {
      (0, _inferno.render)((0, _infernoCreateElement.createElement)(component, props), container);
    }
  }
});
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;