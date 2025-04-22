/* eslint-disable no-cond-assign */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-return-assign */
/* eslint-disable no-multi-assign */
/* eslint-disable @stylistic/no-extra-parens */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable prefer-destructuring */
/* eslint-disable @typescript-eslint/prefer-optional-chain */
/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* eslint-disable no-param-reassign */
/* eslint-disable no-bitwise */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/init-declarations */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable spellcheck/spell-checker */
/* eslint-disable @stylistic/max-len */
/* eslint-disable simple-import-sort/imports */
/* eslint-disable @typescript-eslint/consistent-type-imports */
import { _CI, _HI, _M, _MCCC, _ME, _MFCC, _MP, _MR, EMPTY_OBJ, render, _RFC as renderFunctionalComponent, AnimationQueues } from 'inferno';
import { isFunction, isInvalid, isNull, isNullOrUndef, throwError } from './shared';
import { ChildFlags, VNodeFlags } from './vnode-flags';
function isSameInnerHTML(dom, innerHTML) {
  const tempdom = document.createElement('i');
  tempdom.innerHTML = innerHTML;
  return tempdom.innerHTML === dom.innerHTML;
}
function findLastDOMFromVNode(vNode) {
  let flags;
  let children;
  while (vNode) {
    flags = vNode.flags;
    if (flags & VNodeFlags.DOMRef) {
      return vNode.dom;
    }
    children = vNode.children;
    if (flags & VNodeFlags.Fragment) {
      vNode = vNode.childFlags === ChildFlags.HasVNodeChildren ? children : children[children.length - 1];
    } else if (flags & VNodeFlags.ComponentClass) {
      vNode = children.$LI;
    } else {
      vNode = children;
    }
  }
  return null;
}
function isSamePropsInnerHTML(dom, props) {
  return Boolean(props && props.dangerouslySetInnerHTML && props.dangerouslySetInnerHTML.__html && isSameInnerHTML(dom, props.dangerouslySetInnerHTML.__html));
}
function hydrateComponent(vNode, parentDOM, dom, context, isSVG, isClass, lifecycle, animations) {
  const type = vNode.type;
  const ref = vNode.ref;
  const props = vNode.props || EMPTY_OBJ;
  let currentNode;
  if (isClass) {
    const instance = _CI(vNode, type, props, context, isSVG, lifecycle);
    const input = instance.$LI;
    currentNode = hydrateVNode(input, parentDOM, dom, instance.$CX, isSVG, lifecycle, animations);
    _MCCC(ref, instance, lifecycle, animations);
  } else {
    const input = _HI(renderFunctionalComponent(vNode, context));
    currentNode = hydrateVNode(input, parentDOM, dom, context, isSVG, lifecycle, animations);
    vNode.children = input;
    _MFCC(vNode, lifecycle, animations);
  }
  return currentNode;
}
function hydrateChildren(parentVNode, parentNode, currentNode, context, isSVG, lifecycle, animations) {
  const childFlags = parentVNode.childFlags;
  const children = parentVNode.children;
  const props = parentVNode.props;
  const flags = parentVNode.flags;
  if (childFlags !== ChildFlags.HasInvalidChildren) {
    if (childFlags === ChildFlags.HasVNodeChildren) {
      if (isNull(currentNode)) {
        _M(children, parentNode, context, isSVG, null, lifecycle, animations);
      } else {
        currentNode = hydrateVNode(children, parentNode, currentNode, context, isSVG, lifecycle, animations);
        currentNode = currentNode ? currentNode.nextSibling : null;
      }
    } else if (childFlags === ChildFlags.HasTextChildren) {
      if (isNull(currentNode)) {
        parentNode.appendChild(document.createTextNode(children));
      } else if (parentNode.childNodes.length !== 1 || currentNode.nodeType !== 3) {
        parentNode.textContent = children;
      } else if (currentNode.nodeValue !== children) {
        currentNode.nodeValue = children;
      }
      currentNode = null;
    } else if (childFlags & ChildFlags.MultipleChildren) {
      let prevVNodeIsTextNode = false;
      for (let i = 0, len = children.length; i < len; ++i) {
        const child = children[i];
        if (isNull(currentNode) || prevVNodeIsTextNode && (child.flags & VNodeFlags.Text) > 0) {
          _M(child, parentNode, context, isSVG, currentNode, lifecycle, animations);
        } else {
          currentNode = hydrateVNode(child, parentNode, currentNode, context, isSVG, lifecycle, animations);
          currentNode = currentNode ? currentNode.nextSibling : null;
        }
        prevVNodeIsTextNode = (child.flags & VNodeFlags.Text) > 0;
      }
    }
    // clear any other DOM nodes, there should be only a single entry for the root
    if ((flags & VNodeFlags.Fragment) === 0) {
      let nextSibling = null;
      while (currentNode) {
        nextSibling = currentNode.nextSibling;
        parentNode.removeChild(currentNode);
        currentNode = nextSibling;
      }
    }
  } else if (!isNull(parentNode.firstChild) && !isSamePropsInnerHTML(parentNode, props)) {
    parentNode.textContent = ''; // dom has content, but VNode has no children remove everything from DOM
    if (flags & VNodeFlags.FormElement) {
      // If element is form element, we need to clear defaultValue also
      parentNode.defaultValue = '';
    }
  }
}
function hydrateElement(vNode, parentDOM, dom, context, isSVG, lifecycle, animations) {
  const props = vNode.props;
  const className = vNode.className;
  const flags = vNode.flags;
  const ref = vNode.ref;
  isSVG = isSVG || (flags & VNodeFlags.SvgElement) > 0;
  if (dom.nodeType !== 1) {
    _ME(vNode, null, context, isSVG, null, lifecycle, animations);
    parentDOM.replaceChild(vNode.dom, dom);
  } else {
    vNode.dom = dom;
    hydrateChildren(vNode, dom, dom.firstChild, context, isSVG, lifecycle, animations);
    if (!isNull(props)) {
      _MP(vNode, flags, props, dom, isSVG, animations);
    }
    if (isNullOrUndef(className)) {
      if (dom.className !== '') {
        dom.removeAttribute('class');
      }
    } else if (isSVG) {
      dom.setAttribute('class', className);
    } else {
      dom.className = className;
    }
    _MR(ref, dom, lifecycle);
  }
  return vNode.dom;
}
function hydrateText(vNode, parentDOM, dom) {
  if (dom.nodeType !== 3) {
    parentDOM.replaceChild(vNode.dom = document.createTextNode(vNode.children), dom);
  } else {
    const text = vNode.children;
    if (dom.nodeValue !== text) {
      dom.nodeValue = text;
    }
    vNode.dom = dom;
  }
  return vNode.dom;
}
function hydrateFragment(vNode, parentDOM, dom, context, isSVG, lifecycle, animations) {
  const children = vNode.children;
  if (vNode.childFlags === ChildFlags.HasVNodeChildren) {
    hydrateText(children, parentDOM, dom);
    return children.dom;
  }
  hydrateChildren(vNode, parentDOM, dom, context, isSVG, lifecycle, animations);
  return findLastDOMFromVNode(children[children.length - 1]);
}
function hydrateVNode(vNode, parentDOM, currentDom, context, isSVG, lifecycle, animations) {
  const flags = vNode.flags |= VNodeFlags.InUse;
  if (flags & VNodeFlags.Component) {
    return hydrateComponent(vNode, parentDOM, currentDom, context, isSVG, (flags & VNodeFlags.ComponentClass) > 0, lifecycle, animations);
  }
  if (flags & VNodeFlags.Element) {
    return hydrateElement(vNode, parentDOM, currentDom, context, isSVG, lifecycle, animations);
  }
  if (flags & VNodeFlags.Text) {
    return hydrateText(vNode, parentDOM, currentDom);
  }
  if (flags & VNodeFlags.Void) {
    return vNode.dom = currentDom;
  }
  if (flags & VNodeFlags.Fragment) {
    return hydrateFragment(vNode, parentDOM, currentDom, context, isSVG, lifecycle, animations);
  }
  throwError();
  return null;
}
export function hydrate(input, parentDOM, callback) {
  let dom = parentDOM.firstChild;
  if (isNull(dom)) {
    render(input, parentDOM, callback);
  } else {
    const lifecycle = [];
    const animations = new AnimationQueues();
    if (!isInvalid(input)) {
      dom = hydrateVNode(input, parentDOM, dom, {}, false, lifecycle, animations);
    }
    // clear any other DOM nodes, there should be only a single entry for the root
    while (dom && (dom = dom.nextSibling)) {
      parentDOM.removeChild(dom);
    }
    if (lifecycle.length > 0) {
      let listener;
      while ((listener = lifecycle.shift()) !== undefined) {
        listener();
      }
    }
  }
  parentDOM.$V = input;
  if (isFunction(callback)) {
    callback();
  }
}