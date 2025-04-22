import _extends from "@babel/runtime/helpers/esm/extends";
import $ from '../../../core/renderer';
import { styleProp } from '../../../core/utils/style';
import DOMComponent from '../../core/widget/dom_component';
import { ORIENTATION } from './stepper';
export const STEPPER_CONNECTOR_CLASS = 'dx-stepper-connector';
export const STEPPER_CONNECTOR_HORIZONTAL_ORIENTATION_CLASS = 'dx-stepper-connector-horizontal';
export const STEPPER_CONNECTOR_VERTICAL_ORIENTATION_CLASS = 'dx-stepper-connector-vertical';
export const STEPPER_CONNECTOR_CONTAINER_CLASS = 'dx-stepper-connector-container';
export const STEPPER_CONNECTOR_VALUE_CLASS = 'dx-stepper-connector-value';
const PERCENT_UNIT = '%';
const FLEX_GROW = 'flexGrow';
export const MAX_SIZE = 100;
class Connector extends DOMComponent {
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      orientation: 'horizontal',
      size: MAX_SIZE,
      value: 0
    });
  }
  _init() {
    super._init();
    $(this.element()).addClass(STEPPER_CONNECTOR_CLASS);
  }
  _initMarkup() {
    super._initMarkup();
    this._toggleOrientationClass();
    this._renderContent();
    this._updateDimensions();
  }
  _updateDimensions() {
    const isHorizontal = this._isHorizontalOrientation();
    const dimension = isHorizontal ? 'width' : 'height';
    const inverseDimension = isHorizontal ? 'height' : 'width';
    const {
      size
    } = this.option();
    this.option(inverseDimension, null);
    this.option(dimension, `${size}${PERCENT_UNIT}`);
    this._updateConnectorValue();
  }
  _updateConnectorValue() {
    const {
      value
    } = this.option();
    const connectorElement = this._$connectorValue().get(0);
    const ratio = value / MAX_SIZE;
    connectorElement.style[styleProp(FLEX_GROW)] = String(ratio);
  }
  _$connectorValue() {
    return this.$element().find(`.${STEPPER_CONNECTOR_VALUE_CLASS}`);
  }
  _toggleOrientationClass() {
    $(this.element()).toggleClass(STEPPER_CONNECTOR_HORIZONTAL_ORIENTATION_CLASS, this._isHorizontalOrientation()).toggleClass(STEPPER_CONNECTOR_VERTICAL_ORIENTATION_CLASS, !this._isHorizontalOrientation());
  }
  _isHorizontalOrientation() {
    const {
      orientation
    } = this.option();
    return orientation === ORIENTATION.horizontal;
  }
  _renderContent() {
    const $container = $('<div>').addClass(STEPPER_CONNECTOR_CONTAINER_CLASS).appendTo(this.element());
    $('<div>').addClass(STEPPER_CONNECTOR_VALUE_CLASS).appendTo($container);
  }
  _clean() {
    super._clean();
    this.$element().empty();
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case 'orientation':
        this._toggleOrientationClass();
        this._updateDimensions();
        break;
      case 'size':
      case 'value':
        this._updateDimensions();
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default Connector;