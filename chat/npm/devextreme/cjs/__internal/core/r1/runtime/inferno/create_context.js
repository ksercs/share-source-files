/**
* DevExtreme (cjs/__internal/core/r1/runtime/inferno/create_context.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createContext = void 0;
var _inferno = require("inferno");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); } /* eslint-disable @typescript-eslint/no-unsafe-return */ /* eslint-disable @typescript-eslint/explicit-function-return-type */ /* eslint-disable no-plusplus */ /* eslint-disable @typescript-eslint/no-explicit-any */
let contextId = 0;
const createContext = function (defaultValue) {
  const id = contextId++;
  return {
    id,
    defaultValue,
    Provider: class extends _inferno.Component {
      getChildContext() {
        return _extends({}, this.context, {
          [id]: this.props.value || defaultValue
        });
      }
      render() {
        return this.props.children;
      }
    }
  };
};
exports.createContext = createContext;
