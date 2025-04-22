/**
* DevExtreme (esm/__internal/core/r1/runtime/inferno/portal.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { createPortal } from 'inferno';
export const Portal = _ref => {
  let {
    container,
    children
  } = _ref;
  if (container) {
    return createPortal(children, container);
  }
  return null;
};
