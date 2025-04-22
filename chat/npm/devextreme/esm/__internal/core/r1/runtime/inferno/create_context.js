/**
* DevExtreme (esm/__internal/core/r1/runtime/inferno/create_context.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from 'inferno';
let contextId = 0;
export const createContext = function (defaultValue) {
  const id = contextId++;
  return {
    id,
    defaultValue,
    Provider: class extends Component {
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
