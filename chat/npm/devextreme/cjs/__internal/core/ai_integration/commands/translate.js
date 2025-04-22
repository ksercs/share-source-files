/**
* DevExtreme (cjs/__internal/core/ai_integration/commands/translate.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
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
