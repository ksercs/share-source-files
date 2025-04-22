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