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