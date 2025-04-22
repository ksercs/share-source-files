"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ProofreadCommand = void 0;
var _base = require("../../../core/ai_integration/commands/base");
class ProofreadCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'proofread';
  }
  buildPromptData(params) {
    return {
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
}
exports.ProofreadCommand = ProofreadCommand;