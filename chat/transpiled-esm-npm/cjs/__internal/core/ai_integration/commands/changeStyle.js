"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ChangeStyleCommand = void 0;
var _base = require("../../../core/ai_integration/commands/base");
class ChangeStyleCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'changeStyle';
  }
  buildPromptData(params) {
    return {
      system: {
        writingStyle: params.writingStyle
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
exports.ChangeStyleCommand = ChangeStyleCommand;