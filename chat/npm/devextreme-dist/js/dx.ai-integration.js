/*!
* DevExtreme (dx.ai-integration.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 55390:
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.BaseCommand = void 0;
class BaseCommand {
  constructor(promptManager, requestManager) {
    this.promptManager = promptManager;
    this.requestManager = requestManager;
  }
  execute(params, callbacks) {
    const templateName = this.getTemplateName();
    const data = this.buildPromptData(params);
    const prompt = this.promptManager.buildPrompt(templateName, data);
    const requestManagerCallbacks = {
      onChunk: chunk => {
        var _callbacks$onChunk;
        callbacks === null || callbacks === void 0 || (_callbacks$onChunk = callbacks.onChunk) === null || _callbacks$onChunk === void 0 || _callbacks$onChunk.call(callbacks, chunk);
      },
      onComplete: result => {
        var _callbacks$onComplete;
        const finalResponse = this.parseResult(result);
        callbacks === null || callbacks === void 0 || (_callbacks$onComplete = callbacks.onComplete) === null || _callbacks$onComplete === void 0 || _callbacks$onComplete.call(callbacks, finalResponse);
      },
      onError: error => {
        var _callbacks$onError;
        callbacks === null || callbacks === void 0 || (_callbacks$onError = callbacks.onError) === null || _callbacks$onError === void 0 || _callbacks$onError.call(callbacks, error);
      }
    };
    const abort = this.requestManager.sendRequest(prompt, requestManagerCallbacks);
    return abort;
  }
}
exports.BaseCommand = BaseCommand;

/***/ }),

/***/ 5654:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ChangeStyleCommand = void 0;
var _base = __webpack_require__(55390);
class ChangeStyleCommand extends _base.BaseCommand {
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
exports.ChangeStyleCommand = ChangeStyleCommand;

/***/ }),

/***/ 16927:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ChangeToneCommand = void 0;
var _base = __webpack_require__(55390);
class ChangeToneCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'changeTone';
  }
  buildPromptData(params) {
    return {
      system: {
        tone: params.tone
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
exports.ChangeToneCommand = ChangeToneCommand;

/***/ }),

/***/ 15436:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ExecuteCommand = void 0;
var _base = __webpack_require__(55390);
class ExecuteCommand extends _base.BaseCommand {
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
exports.ExecuteCommand = ExecuteCommand;

/***/ }),

/***/ 37887:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ExpandCommand = void 0;
var _base = __webpack_require__(55390);
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

/***/ }),

/***/ 39171:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
Object.defineProperty(exports, "BaseCommand", ({
  enumerable: true,
  get: function () {
    return _base.BaseCommand;
  }
}));
Object.defineProperty(exports, "ChangeStyleCommand", ({
  enumerable: true,
  get: function () {
    return _changeStyle.ChangeStyleCommand;
  }
}));
Object.defineProperty(exports, "ChangeToneCommand", ({
  enumerable: true,
  get: function () {
    return _changeTone.ChangeToneCommand;
  }
}));
Object.defineProperty(exports, "ExecuteCommand", ({
  enumerable: true,
  get: function () {
    return _execute.ExecuteCommand;
  }
}));
Object.defineProperty(exports, "ExpandCommand", ({
  enumerable: true,
  get: function () {
    return _expand.ExpandCommand;
  }
}));
Object.defineProperty(exports, "ProofreadCommand", ({
  enumerable: true,
  get: function () {
    return _proofread.ProofreadCommand;
  }
}));
Object.defineProperty(exports, "ShortenCommand", ({
  enumerable: true,
  get: function () {
    return _shorten.ShortenCommand;
  }
}));
Object.defineProperty(exports, "SummarizeCommand", ({
  enumerable: true,
  get: function () {
    return _summarize.SummarizeCommand;
  }
}));
Object.defineProperty(exports, "TranslateCommand", ({
  enumerable: true,
  get: function () {
    return _translate.TranslateCommand;
  }
}));
var _base = __webpack_require__(55390);
var _changeStyle = __webpack_require__(5654);
var _changeTone = __webpack_require__(16927);
var _execute = __webpack_require__(15436);
var _expand = __webpack_require__(37887);
var _proofread = __webpack_require__(11121);
var _shorten = __webpack_require__(36050);
var _summarize = __webpack_require__(15162);
var _translate = __webpack_require__(37025);

/***/ }),

/***/ 11121:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ProofreadCommand = void 0;
var _base = __webpack_require__(55390);
class ProofreadCommand extends _base.BaseCommand {
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
exports.ProofreadCommand = ProofreadCommand;

/***/ }),

/***/ 36050:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ShortenCommand = void 0;
var _base = __webpack_require__(55390);
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

/***/ }),

/***/ 15162:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.SummarizeCommand = void 0;
var _base = __webpack_require__(55390);
class SummarizeCommand extends _base.BaseCommand {
  getTemplateName() {
    return 'summarize';
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
exports.SummarizeCommand = SummarizeCommand;

/***/ }),

/***/ 37025:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.TranslateCommand = void 0;
var _base = __webpack_require__(55390);
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

/***/ }),

/***/ 49691:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.CommandNames = exports.COMMANDS = exports.AIIntegration = void 0;
var _index = __webpack_require__(39171);
var _prompt_manager = __webpack_require__(76542);
var _request_manager = __webpack_require__(17083);
var CommandNames;
(function (CommandNames) {
  CommandNames["ChangeStyle"] = "changeStyle";
  CommandNames["ChangeTone"] = "changeTone";
  CommandNames["Execute"] = "execute";
  CommandNames["Expand"] = "expand";
  CommandNames["Proofread"] = "proofread";
  CommandNames["Shorten"] = "shorten";
  CommandNames["Summarize"] = "summarize";
  CommandNames["Translate"] = "translate";
})(CommandNames || (exports.CommandNames = CommandNames = {}));
const COMMANDS = exports.COMMANDS = {
  [CommandNames.ChangeStyle]: _index.ChangeStyleCommand,
  [CommandNames.ChangeTone]: _index.ChangeToneCommand,
  [CommandNames.Execute]: _index.ExecuteCommand,
  [CommandNames.Expand]: _index.ExpandCommand,
  [CommandNames.Proofread]: _index.ProofreadCommand,
  [CommandNames.Shorten]: _index.ShortenCommand,
  [CommandNames.Summarize]: _index.SummarizeCommand,
  [CommandNames.Translate]: _index.TranslateCommand
};
class AIIntegration {
  constructor(provider) {
    this.promptManager = new _prompt_manager.PromptManager();
    this.requestManager = new _request_manager.RequestManager(provider);
    this.commands = new Map();
  }
  executeCommand(commandName, params, callbacks) {
    let command = this.commands.get(commandName);
    if (!command) {
      const Command = COMMANDS[commandName];
      command = new Command(this.promptManager, this.requestManager);
      this.commands.set(commandName, command);
    }
    return command.execute(params, callbacks);
  }
  changeStyle(params, callbacks) {
    return this.executeCommand(CommandNames.ChangeStyle, params, callbacks);
  }
  changeTone(params, callbacks) {
    return this.executeCommand(CommandNames.ChangeTone, params, callbacks);
  }
  execute(params, callbacks) {
    return this.executeCommand(CommandNames.Execute, params, callbacks);
  }
  expand(params, callbacks) {
    return this.executeCommand(CommandNames.Expand, params, callbacks);
  }
  proofread(params, callbacks) {
    return this.executeCommand(CommandNames.Proofread, params, callbacks);
  }
  shorten(params, callbacks) {
    return this.executeCommand(CommandNames.Shorten, params, callbacks);
  }
  summarize(params, callbacks) {
    return this.executeCommand(CommandNames.Summarize, params, callbacks);
  }
  translate(params, callbacks) {
    return this.executeCommand(CommandNames.Translate, params, callbacks);
  }
}
exports.AIIntegration = AIIntegration;

/***/ }),

/***/ 76542:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PromptManager = exports.ERROR_MESSAGES = void 0;
var _index = __webpack_require__(31764);
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

/***/ }),

/***/ 17083:
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.RequestManager = exports.ERROR_MESSAGES = void 0;
const ERROR_MESSAGES = exports.ERROR_MESSAGES = {
  METHOD_NOT_IMPLEMENTED: 'No method for queries has been implemented'
};
class RequestManager {
  constructor(provider) {
    this.provider = provider;
  }
  sendRequest(prompt, callbacks) {
    if (typeof this.provider.sendRequest === 'function') {
      const params = {
        prompt,
        onChunk: chunk => {
          var _callbacks$onChunk;
          callbacks === null || callbacks === void 0 || (_callbacks$onChunk = callbacks.onChunk) === null || _callbacks$onChunk === void 0 || _callbacks$onChunk.call(callbacks, chunk);
        }
      };
      const {
        promise,
        abort
      } = this.provider.sendRequest(params);
      promise.then(response => {
        var _callbacks$onComplete;
        callbacks === null || callbacks === void 0 || (_callbacks$onComplete = callbacks.onComplete) === null || _callbacks$onComplete === void 0 || _callbacks$onComplete.call(callbacks, response);
      }).catch(e => {
        var _callbacks$onError;
        callbacks === null || callbacks === void 0 || (_callbacks$onError = callbacks.onError) === null || _callbacks$onError === void 0 || _callbacks$onError.call(callbacks, e);
      });
      return abort;
    }
    throw new Error(ERROR_MESSAGES.METHOD_NOT_IMPLEMENTED);
  }
}
exports.RequestManager = RequestManager;

/***/ }),

/***/ 31764:
/***/ (function(__unused_webpack_module, exports) {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.templates = void 0;
const templates = exports.templates = {
  changeStyle: {
    system: 'Rewrite the text provided to match the {{writingStyle}} writing style. Ensure the rewritten text follows the grammatical rules and stylistic conventions of the specified style. Preserve the original meaning and context. Use complete sentences and a professional tone. Return answer with no markdown formatting.'
  },
  changeTone: {
    system: 'Rewrite the following text to keep its original meaning but change its tone to {{tone}}. Provide only the rewritten text as plain text without any comments or formatting.'
  },
  execute: {
    system: 'Return answer with no markdown formatting.'
  },
  expand: {
    system: 'Expand the following text by adding relevant details, examples, and context while keeping the main point intact. Ensure the expanded text is coherent and logically structured. Return answer with no markdown formatting.'
  },
  proofread: {
    system: 'Proofread the following text for grammar, punctuation, and style errors. Make corrections to ensure clarity and conciseness while preserving the original meaning. Use a formal writing style unless otherwise specified. Return only the revised text without any formatting or explanations.'
  },
  shorten: {
    system: 'Please shorten the text provided by summarizing its content while retaining the main point and essential details. Aim to reduce the text to approximately 50% of its original length. Ensure that the key message remains clear and intact. Return answer with no markdown formatting.'
  },
  summarize: {
    system: 'First, identify the key points of the provided text. Then, generate an abstractive summary by paraphrasing these points, ensuring the summary captures the core ideas and is approximately 20% of the text\'s length. Return answer with no markdown formatting.'
  },
  translate: {
    system: 'Translate the text provided into {{lang}}. Ensure the translation retains the original meaning and tone. Provide only the translated text in your response, without any additional formatting or commentary.'
  }
};

/***/ }),

/***/ 63223:
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



var _aiIntegration = __webpack_require__(94977);
/* global DevExpress */
/* eslint-disable import/no-commonjs */

module.exports = DevExpress.aiIntegration = _aiIntegration.AIIntegration;

/***/ }),

/***/ 94977:
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {



Object.defineProperty(exports, "AIIntegration", ({
  enumerable: true,
  get: function () {
    return _ai_integration.AIIntegration;
  }
}));
var _ai_integration = __webpack_require__(49691);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(63223);
/******/ 	
/******/ })()
;
