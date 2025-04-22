"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeToneCommand = void 0;
var _base = require("../../../core/ai_integration/commands/base");
class ChangeToneCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'changeTone';
  }
  buildPromptData(params) {
    return {
      system: {
        tone: params.tone
      },
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
}
exports.ChangeToneCommand = ChangeToneCommand;