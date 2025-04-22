/**
* DevExtreme (cjs/__internal/core/ai_integration/core/prompt_manager.js)
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
exports.PromptManager = exports.ERROR_MESSAGES = void 0;
var _index = require("../../../core/ai_integration/templates/index");
const ERROR_MESSAGES = exports.ERROR_MESSAGES = {
  TEMPLATE_NOT_FOUND: 'Template not found'
};
class PromptManager {
  constructor() {
    this.templates = new Map(Object.entries(_index.templates));
  }
  buildPrompt(templateName, data) {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(ERROR_MESSAGES.TEMPLATE_NOT_FOUND);
    }
    const system = this.generateMessage(template.system, data.system);
    const user = this.generateMessage(template.user, data.user);
    const prompt = {
      system,
      user
    };
    return prompt;
  }
  generateMessage(promptTemplate, placeholders) {
    if (!placeholders && !promptTemplate) {
      return undefined;
    }
    if (!promptTemplate && placeholders) {
      return Object.keys(placeholders).reduce((acc, key) => `${acc} ${placeholders[key]}`, '').trim();
    }
    if (!placeholders && promptTemplate) {
      return promptTemplate;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const result = this.replacePlaceholders(promptTemplate, placeholders);
    return result;
  }
  replacePlaceholders(promptTemplate, placeholders) {
    const result = Object.entries(placeholders).reduce(
    // @ts-expect-error 'replaceAll' does not exist on type 'string'
    (acc, _ref) => {
      let [key, value] = _ref;
      return acc.replaceAll(`{{${key}}}`, value);
    }, promptTemplate);
    return result;
  }
}
exports.PromptManager = PromptManager;
