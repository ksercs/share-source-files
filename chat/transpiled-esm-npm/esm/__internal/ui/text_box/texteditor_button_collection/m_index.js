import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../../core/renderer';
import errors from '../../../../ui/widget/ui.errors';
import CustomButton from './m_custom';
const TEXTEDITOR_BUTTONS_CONTAINER_CLASS = 'dx-texteditor-buttons-container';
function checkButtonInfo(buttonInfo) {
  const checkButtonType = () => {
    if (!buttonInfo || typeof buttonInfo !== 'object' || Array.isArray(buttonInfo)) {
      throw errors.Error('E1053');
    }
  };
  const checkLocation = () => {
    const {
      location
    } = buttonInfo;
    if ('location' in buttonInfo && location !== 'after' && location !== 'before') {
      buttonInfo.location = 'after';
    }
  };
  const checkNameIsDefined = () => {
    if (!('name' in buttonInfo)) {
      throw errors.Error('E1054');
    }
  };
  const checkNameIsString = () => {
    const {
      name
    } = buttonInfo;
    if (typeof name !== 'string') {
      throw errors.Error('E1055');
    }
  };
  checkButtonType();
  checkNameIsDefined();
  checkNameIsString();
  checkLocation();
}
function checkNamesUniqueness(existingNames, newName) {
  if (existingNames.includes(newName)) {
    throw errors.Error('E1055', newName);
  }
  existingNames.push(newName);
}
function isPredefinedButtonName(name, predefinedButtonsInfo) {
  return !!predefinedButtonsInfo.find(info => info.name === name);
}
export default class TextEditorButtonCollection {
  constructor(editor, defaultButtonsInfo) {
    this.buttons = [];
    this.defaultButtonsInfo = defaultButtonsInfo;
    this.editor = editor;
  }
  _compileButtonInfo(buttons) {
    const names = [];
    return buttons.map(button => {
      const isStringButton = typeof button === 'string';
      if (!isStringButton) {
        checkButtonInfo(button);
      }
      const isDefaultButton = isStringButton || isPredefinedButtonName(button.name, this.defaultButtonsInfo);
      if (isDefaultButton) {
        const defaultButtonInfo = this.defaultButtonsInfo.find(
        // @ts-expect-error ts-error
        _ref => {
          let {
            name
          } = _ref;
          return name === button || name === button.name;
        });
        if (!defaultButtonInfo) {
          throw errors.Error('E1056', this.editor.NAME, button);
        }
        checkNamesUniqueness(names, button);
        return defaultButtonInfo;
      }
      const {
        name
      } = button;
      // @ts-expect-error @ts-error
      checkNamesUniqueness(names, name);
      return _extends({}, button, {
        Ctor: CustomButton
      });
    });
  }
  _createButton(buttonsInfo) {
    const {
      Ctor,
      options,
      name
    } = buttonsInfo;
    // @ts-expect-error ts-error
    const button = new Ctor(name, this.editor, options);
    this.buttons.push(button);
    return button;
  }
  _renderButtons(buttons, $container, targetLocation) {
    let $buttonsContainer = null;
    const buttonsInfo = buttons ? this._compileButtonInfo(buttons) : this.defaultButtonsInfo;
    const getButtonsContainer = () => {
      $buttonsContainer = $buttonsContainer ?? $('<div>').addClass(TEXTEDITOR_BUTTONS_CONTAINER_CLASS);
      if (targetLocation === 'before') {
        $container.prepend($buttonsContainer);
      } else {
        $container.append($buttonsContainer);
      }
      return $buttonsContainer;
    };
    buttonsInfo.forEach(buttonInfo => {
      const {
        location = 'after'
      } = buttonInfo;
      if (location === targetLocation) {
        this._createButton(buttonInfo).render(getButtonsContainer());
      }
    });
    return $buttonsContainer;
  }
  clean() {
    this.buttons.forEach(button => button.dispose());
    this.buttons = [];
  }
  getButton(buttonName) {
    const button = this.buttons.find(_ref2 => {
      let {
        name
      } = _ref2;
      return name === buttonName;
    });
    return button === null || button === void 0 ? void 0 : button.instance;
  }
  renderAfterButtons(buttons, $container) {
    return this._renderButtons(buttons, $container, 'after');
  }
  renderBeforeButtons(buttons, $container) {
    return this._renderButtons(buttons, $container, 'before');
  }
  updateButtons(names) {
    this.buttons.forEach(button => {
      if (!names || names.includes(button.name)) {
        button.update();
      }
    });
  }
}