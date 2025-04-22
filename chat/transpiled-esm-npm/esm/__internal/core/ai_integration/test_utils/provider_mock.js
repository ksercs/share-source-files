export class Provider {
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