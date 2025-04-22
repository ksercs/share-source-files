import _extends from "@babel/runtime/helpers/esm/extends";
import { name as clickEventName } from '../../../common/core/events/click';
import eventsEngine from '../../../common/core/events/core/events_engine';
import { addNamespace } from '../../../common/core/events/utils/index';
import registerComponent from '../../../core/component_registrator';
import devices from '../../../core/devices';
import $ from '../../../core/renderer';
import Editor from '../../ui/editor/editor';
const RADIO_BUTTON_CLASS = 'dx-radiobutton';
const RADIO_BUTTON_ICON_CLASS = 'dx-radiobutton-icon';
const RADIO_BUTTON_ICON_DOT_CLASS = 'dx-radiobutton-icon-dot';
const RADIO_BUTTON_CHECKED_CLASS = 'dx-radiobutton-checked';
const RADIO_BUTTON_ICON_CHECKED_CLASS = 'dx-radiobutton-icon-checked';
class RadioButton extends Editor {
  // eslint-disable-next-line @typescript-eslint/no-invalid-void-type
  _supportedKeys() {
    const click = function (e) {
      e.preventDefault();
      this._clickAction({
        event: e
      });
    };
    return _extends({}, super._supportedKeys(), {
      space: click
    });
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      activeStateEnabled: true,
      value: false
    });
  }
  // eslint-disable-next-line class-methods-use-this
  _canValueBeChangedByClick() {
    return true;
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device() {
        return devices.real().deviceType === 'desktop' && !devices.isSimulator();
      },
      options: {
        focusStateEnabled: true
      }
    }]);
  }
  _init() {
    super._init();
    this.$element().addClass(RADIO_BUTTON_CLASS);
  }
  _initMarkup() {
    super._initMarkup();
    this._renderIcon();
    this._renderCheckedState(this.option('value'));
    this._renderClick();
    this.setAria('role', 'radio');
  }
  _renderIcon() {
    this._$icon = $('<div>').addClass(RADIO_BUTTON_ICON_CLASS);
    $('<div>').addClass(RADIO_BUTTON_ICON_DOT_CLASS).appendTo(this._$icon);
    this.$element().append(this._$icon);
  }
  _renderCheckedState(checked) {
    this.$element().toggleClass(RADIO_BUTTON_CHECKED_CLASS, checked).find(`.${RADIO_BUTTON_ICON_CLASS}`).toggleClass(RADIO_BUTTON_ICON_CHECKED_CLASS, checked);
    this.setAria('checked', checked);
  }
  _renderClick() {
    // @ts-expect-error ts-error
    const eventName = addNamespace(clickEventName, this.NAME);
    this._clickAction = this._createAction(args => {
      this._clickHandler(args.event);
    });
    eventsEngine.off(this.$element(), eventName);
    eventsEngine.on(this.$element(), eventName, e => {
      var _this$_clickAction;
      (_this$_clickAction = this._clickAction) === null || _this$_clickAction === void 0 || _this$_clickAction.call(this, {
        event: e
      });
    });
  }
  _clickHandler(e) {
    this._saveValueChangeEvent(e);
    this.option('value', true);
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'value':
        this._renderCheckedState(args.value);
        super._optionChanged(args);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
registerComponent('dxRadioButton', RadioButton);
export default RadioButton;