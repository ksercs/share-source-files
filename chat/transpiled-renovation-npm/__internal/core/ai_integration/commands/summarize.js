"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SummarizeCommand = void 0;
var _base = require("../../../core/ai_integration/commands/base");
class SummarizeCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'summarize';
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
exports.SummarizeCommand = SummarizeCommand;