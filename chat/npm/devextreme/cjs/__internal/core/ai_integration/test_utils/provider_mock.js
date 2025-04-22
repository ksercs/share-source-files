/**
* DevExtreme (cjs/__internal/core/ai_integration/test_utils/provider_mock.js)
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
exports.Provider = void 0;
class Provider {
  sendRequest(params) {
    const {
      onChunk
    } = params;
    const promise = new Promise(resolve => {
      onChunk('AI');
      onChunk(' response');
      resolve('AI response');
    });
    const abort = () => {};
    return {
      promise,
      abort
    };
  }
}
exports.Provider = Provider;
