/**
* DevExtreme (esm/__internal/core/m_inferno_renderer.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import domAdapter from '../../core/dom_adapter';
import { cleanDataRecursive } from '../../core/element_data';
import injector from '../../core/utils/dependency_injector';
import { hydrate, InfernoEffectHost } from '../core/r1/runtime/inferno/index';
import { render } from 'inferno';
// eslint-disable-next-line import/no-extraneous-dependencies
import { createElement } from 'inferno-create-element';
const remove = element => {
  const {
    parentNode
  } = element;
  if (parentNode) {
    const {
      nextSibling
    } = element;
    cleanDataRecursive(element);
    parentNode.$V = element.$V;
    render(null, parentNode);
    parentNode.insertBefore(element, nextSibling);
    element.innerHTML = '';
    delete parentNode.$V;
  }
  delete element.$V;
};
const infernoRenderer = injector({
  createElement: (component, props) => createElement(component, props),
  remove,
  onAfterRender: () => {
    InfernoEffectHost.callEffects();
  },
  onPreRender: () => {
    InfernoEffectHost.lock();
  },
  render: (component, props, container, replace) => {
    if (!replace) {
      const {
        parentNode
      } = container;
      const nextNode = container === null || container === void 0 ? void 0 : container.nextSibling;
      const rootNode = domAdapter.createElement('div');
      rootNode.appendChild(container);
      const mountNode = domAdapter.createDocumentFragment().appendChild(rootNode);
      const vNodeAlreadyExists = !!container.$V;
      vNodeAlreadyExists && remove(container);
      hydrate(createElement(component, props), mountNode);
      // @ts-expect-error need to change type to inferno element
      container.$V = mountNode.$V;
      if (parentNode) {
        parentNode.insertBefore(container, nextNode);
      }
    } else {
      render(createElement(component, props), container);
    }
  }
});
export { infernoRenderer };
