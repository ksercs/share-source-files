import { capitalize } from '../../../core/utils/capitalize';
export const defaultCommandNames = {
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
export const getDefaultOptionsByCommand = command => {
  const commandToOptionsMap = {
    changeStyle: htmlEditorAIChangeStyleOptions,
    changeTone: htmlEditorAIChangeToneOptions,
    translate: htmlEditorAITranslateOptions
  };
  return commandToOptionsMap[command];
};
function createDefinitionFromString(commandName) {
  var _getDefaultOptionsByC;
  const text = defaultCommandNames[commandName] ?? capitalize(commandName);
  const defaultOptions = (_getDefaultOptionsByC = getDefaultOptionsByCommand(commandName)) === null || _getDefaultOptionsByC === void 0 ? void 0 : _getDefaultOptionsByC.map(capitalize);
  return {
    text,
    name: commandName,
    options: defaultOptions
  };
}
function createDefinitionFromObject(name, text, rawOptions) {
  var _getDefaultOptionsByC2;
  const capitalizedRaw = rawOptions === null || rawOptions === void 0 ? void 0 : rawOptions.map(capitalize);
  const options = capitalizedRaw ?? ((_getDefaultOptionsByC2 = getDefaultOptionsByCommand(name)) === null || _getDefaultOptionsByC2 === void 0 ? void 0 : _getDefaultOptionsByC2.map(capitalize));
  const displayText = text ?? defaultCommandNames[name] ?? capitalize(name);
  return {
    name,
    text: displayText,
    options
  };
}
export function buildCommandsMap(commands) {
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