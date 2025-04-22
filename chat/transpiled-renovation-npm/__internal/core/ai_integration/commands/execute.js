"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExecuteCommand = void 0;
var _base = require("../../../core/ai_integration/commands/base");
class ExecuteCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'execute';
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
exports.ExecuteCommand = ExecuteCommand;