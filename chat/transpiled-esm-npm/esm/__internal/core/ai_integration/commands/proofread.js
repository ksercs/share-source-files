import { BaseCommand } from '../../../core/ai_integration/commands/base';
export class ProofreadCommand extends BaseCommand {
  getTemplateName() {
    return 'proofread';
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