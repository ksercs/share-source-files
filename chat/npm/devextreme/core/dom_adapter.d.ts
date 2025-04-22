/**
* DevExtreme (core/dom_adapter.d.ts)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export interface DomAdapter {
  querySelectorAll: (element, selector) => any;
  elementMatches: (element, selector) => any;
  getActiveElement: (element?: HTMLElement | null) => HTMLElement;
  getDocument: () => Document;
  getDocumentElement: () => HTMLDocument & {
    scrollLeft: number;
    scrollTop: number;
    clientWidth: number;
    scrollHeight: number;
    offsetHeight: number;
    clientHeight: number;
  };
  getHead: () => any;
  listen: (element, event, callback, options?) => any;
  getReadyState: () => DocumentReadyState;
  isNode: (node: unknown) => boolean;
  isDocument: (element: any) => boolean;
  isDocumentFragment: (element: any) => boolean;
  getBody: () => HTMLBodyElement;
  getRootNode: (element: HTMLElement) => Document | DocumentFragment;
  getAttribute: (element, name) => any;
  setAttribute: (element, name, value) => void;
  removeAttribute: (element, name) => void;
  isElementNode: (element: any) => boolean;
  createElement: (tagName: string, context?: Document) => HTMLElement;
  createDocumentFragment: () => DocumentFragment;
  createTextNode: (text: any, context?: any) => any;
  setClass: (element: HTMLElement, className: string, isAdd: boolean) => void;
  setText: (element, text) => void;
  setProperty: (element, name, value) => void;
  removeElement: (element: HTMLElement) => void;
  inject: (obj: Record<string, unknown>) => void;
  setStyle: (element: HTMLElement, name: string, value: string) => void;
  insertElement: (parentElement: HTMLElement, newElement: HTMLElement, nextSiblingElement?: HTMLElement) => void;
}

declare const domAdapter: DomAdapter;
export default domAdapter;
