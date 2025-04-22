"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _ui = _interopRequireDefault(require("../../../../ui/widget/ui.errors"));
var _m_custom = _interopRequireDefault(require("./m_custom"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TEXTEDITOR_BUTTONS_CONTAINER_CLASS = 'dx-texteditor-buttons-container';
function checkButtonInfo(buttonInfo) {
  const checkButtonType = () => {
    if (!buttonInfo || typeof buttonInfo !== 'object' || Array.isArray(buttonInfo)) {
      throw _ui.default.Error('E1053');
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
      throw _ui.default.Error('E1054');
    }
  };
  const checkNameIsString = () => {
    const {
      name
    } = buttonInfo;
    if (typeof name !== 'string') {
      throw _ui.default.Error('E1055');
    }
  };
  checkButtonType();
  checkNameIsDefined();
  checkNameIsString();
  checkLocation();
}
function checkNamesUniqueness(existingNames, newName) {
  if (existingNames.includes(newName)) {
    throw _ui.default.Error('E1055', newName);
  }
  existingNames.push(newName);
}
function isPredefinedButtonName(name, predefinedButtonsInfo) {
  return !!predefinedButtonsInfo.find(info => info.name === name);
}
class TextEditorButtonCollection {
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
          throw _ui.default.Error('E1056', this.editor.NAME, button);
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
        Ctor: _m_custom.default
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
      $buttonsContainer = $buttonsContainer ?? (0, _renderer.default)('<div>').addClass(TEXTEDITOR_BUTTONS_CONTAINER_CLASS);
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
exports.default = TextEditorButtonCollection;