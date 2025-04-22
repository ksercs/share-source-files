"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ShortenCommand = void 0;
var _base = require("../../../core/ai_integration/commands/base");
class ShortenCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'shorten';
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
exports.ShortenCommand = ShortenCommand;