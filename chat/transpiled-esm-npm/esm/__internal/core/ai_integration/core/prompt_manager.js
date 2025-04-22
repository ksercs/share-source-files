import { templates } from '../../../core/ai_integration/templates/index';
export const ERROR_MESSAGES = {
  TEMPLATE_NOT_FOUND: 'Template not found'
};
export class PromptManager {
  constructor() {
    this.templates = new Map(Object.entries(templates));
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