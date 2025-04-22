"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildCommandsMap = buildCommandsMap;
exports.getDefaultOptionsByCommand = exports.defaultCommandNames = void 0;
var _capitalize = require("../../../core/utils/capitalize");
const defaultCommandNames = exports.defaultCommandNames = {
  summarize: 'Summarize',
  proofread: 'Proofread',
  expand: 'Expand',
  shorten: 'Shorten',
  changeStyle: 'Change Style',
  changeTone: 'Change Tone',
  translate: 'Translate',
  askAI: 'Ask AI'
};
const htmlEditorAIChangeStyleOptions = ['formal', 'informal', 'technical', 'business', 'creative', 'journalistic', 'academic', 'persuasive', 'narrative', 'expository', 'descriptive', 'conversational'];
const htmlEditorAIChangeToneOptions = ['professional', 'casual', 'straightforward', 'confident', 'friendly'];
const htmlEditorAITranslateOptions = ['arabic', 'chinese', 'english', 'french', 'german', 'japanese', 'spanish'];
const getDefaultOptionsByCommand = command => {
  const commandToOptionsMap = {
    changeStyle: htmlEditorAIChangeStyleOptions,
    changeTone: htmlEditorAIChangeToneOptions,
    translate: htmlEditorAITranslateOptions
  };
  return commandToOptionsMap[command];
};
exports.getDefaultOptionsByCommand = getDefaultOptionsByCommand;
function createDefinitionFromString(commandName) {
  var _getDefaultOptionsByC;
  const text = defaultCommandNames[commandName] ?? (0, _capitalize.capitalize)(commandName);
  const defaultOptions = (_getDefaultOptionsByC = getDefaultOptionsByCommand(commandName)) === null || _getDefaultOptionsByC === void 0 ? void 0 : _getDefaultOptionsByC.map(_capitalize.capitalize);
  return {
    text,
    name: commandName,
    options: defaultOptions
  };
}
function createDefinitionFromObject(name, text, rawOptions) {
  var _getDefaultOptionsByC2;
  const capitalizedRaw = rawOptions === null || rawOptions === void 0 ? void 0 : rawOptions.map(_capitalize.capitalize);
  const options = capitalizedRaw ?? ((_getDefaultOptionsByC2 = getDefaultOptionsByCommand(name)) === null || _getDefaultOptionsByC2 === void 0 ? void 0 : _getDefaultOptionsByC2.map(_capitalize.capitalize));
  const displayText = text ?? defaultCommandNames[name] ?? (0, _capitalize.capitalize)(name);
  return {
    name,
    text: displayText,
    options
  };
}
function buildCommandsMap(commands) {
  const map = {};
  commands === null || commands === void 0 || commands.forEach(command => {
    if (typeof command === 'string') {
      map[command] = createDefinitionFromString(command);
    } else {
      const {
        name,
        text,
        options
      } = command;
      map[name] = createDefinitionFromObject(name, text, options);
    }
  });
  return map;
}