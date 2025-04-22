export class BaseCommand {
  constructor(promptManager, requestManager) {
    this.promptManager = promptManager;
    this.requestManager = requestManager;
  }
  execute(params, callbacks) {
    const templateName = this.getTemplateName();
    const data = this.buildPromptData(params);
    const prompt = this.promptManager.buildPrompt(templateName, data);
    const requestManagerCallbacks = {
      onChunk: chunk => {
        var _callbacks$onChunk;
        callbacks === null || callbacks === void 0 || (_callbacks$onChunk = callbacks.onChunk) === null || _callbacks$onChunk === void 0 || _callbacks$onChunk.call(callbacks, chunk);
      },
      onComplete: result => {
        var _callbacks$onComplete;
        const finalResponse = this.parseResult(result);
        callbacks === null || callbacks === void 0 || (_callbacks$onComplete = callbacks.onComplete) === null || _callbacks$onComplete === void 0 || _callbacks$onComplete.call(callbacks, finalResponse);
      },
      onError: error => {
        var _callbacks$onError;
        callbacks === null || callbacks === void 0 || (_callbacks$onError = callbacks.onError) === null || _callbacks$onError === void 0 || _callbacks$onError.call(callbacks, error);
      }
    };
    const abort = this.requestManager.sendRequest(prompt, requestManagerCallbacks);
    return abort;
  }
}