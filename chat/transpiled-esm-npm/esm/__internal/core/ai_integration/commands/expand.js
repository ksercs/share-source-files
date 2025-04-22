import { BaseCommand } from '../../../core/ai_integration/commands/base';
export class ExpandCommand extends BaseCommand {
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