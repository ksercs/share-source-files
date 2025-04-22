import { BaseCommand } from '../../../core/ai_integration/commands/base';
export class ExecuteCommand extends BaseCommand {
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