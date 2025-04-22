export const ERROR_MESSAGES = {
  METHOD_NOT_IMPLEMENTED: 'No method for queries has been implemented'
};
export class RequestManager {
  constructor(provider) {
    this.provider = provider;
  }
  sendRequest(prompt, callbacks) {
    if (typeof this.provider.sendRequest === 'function') {
      const params = {
        prompt,
        onChunk: chunk => {
          var _callbacks$onChunk;
          callbacks === null || callbacks === void 0 || (_callbacks$onChunk = callbacks.onChunk) === null || _callbacks$onChunk === void 0 || _callbacks$onChunk.call(callbacks, chunk);
        }
      };
      const {
        promise,
        abort
      } = this.provider.sendRequest(params);
      promise.then(response => {
        var _callbacks$onComplete;
        callbacks === null || callbacks === void 0 || (_callbacks$onComplete = callbacks.onComplete) === null || _callbacks$onComplete === void 0 || _callbacks$onComplete.call(callbacks, response);
      }).catch(e => {
        var _callbacks$onError;
        callbacks === null || callbacks === void 0 || (_callbacks$onError = callbacks.onError) === null || _callbacks$onError === void 0 || _callbacks$onError.call(callbacks, e);
      });
      return abort;
    }
    throw new Error(ERROR_MESSAGES.METHOD_NOT_IMPLEMENTED);
  }
}