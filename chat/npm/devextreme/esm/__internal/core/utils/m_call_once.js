/**
* DevExtreme (esm/__internal/core/utils/m_call_once.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
const callOnce = function (handler) {
  let result;
  let wrappedHandler = function () {
    result = handler.apply(this, arguments);
    wrappedHandler = function () {
      return result;
    };
    return result;
  };
  return function () {
    // @ts-expect-error Iarguments not assignable to []
    return wrappedHandler.apply(this, arguments);
  };
};
export { callOnce };
