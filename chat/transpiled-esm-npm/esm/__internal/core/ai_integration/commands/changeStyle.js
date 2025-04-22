import { BaseCommand } from '../../../core/ai_integration/commands/base';
export class ChangeStyleCommand extends BaseCommand {
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