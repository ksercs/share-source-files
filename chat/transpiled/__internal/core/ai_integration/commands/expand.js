"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ExpandCommand = void 0;
var _base = require("../../../core/ai_integration/commands/base");
class ExpandCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'expand';
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
exports.ExpandCommand = ExpandCommand;