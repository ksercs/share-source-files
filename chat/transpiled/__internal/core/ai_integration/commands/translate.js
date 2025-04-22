"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TranslateCommand = void 0;
var _base = require("../../../core/ai_integration/commands/base");
class TranslateCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'translate';
  }
  buildPromptData(params) {
    return {
      system: {
        lang: params.lang
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
exports.TranslateCommand = TranslateCommand;