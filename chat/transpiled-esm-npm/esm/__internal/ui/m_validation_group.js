import registerComponent from '../../core/component_registrator';
import DOMComponent from '../../core/dom_component';
import $ from '../../core/renderer';
import ValidationEngine from './m_validation_engine';
import ValidationSummary from './m_validation_summary';
import Validator from './m_validator';
const VALIDATION_ENGINE_CLASS = 'dx-validationgroup';
const VALIDATOR_CLASS = 'dx-validator';
const VALIDATION_SUMMARY_CLASS = 'dx-validationsummary';
class ValidationGroup extends DOMComponent {
  _getDefaultOptions() {
    // @ts-expect-error
    return super._getDefaultOptions();
  }
  _init() {
    // @ts-expect-error ts-error
    super._init();
    ValidationEngine.addGroup(this, false);
  }
  _initMarkup() {
    const $element = this.$element();
    $element.addClass(VALIDATION_ENGINE_CLASS);
    // @ts-expect-error ts-error
    $element.find(`.${VALIDATOR_CLASS}`).each((_, validatorContainer) => {
      Validator.getInstance($(validatorContainer))._initGroupRegistration();
    });
    // @ts-expect-error ts-error
    $element.find(`.${VALIDATION_SUMMARY_CLASS}`).each((_, summaryContainer) => {
      ValidationSummary.getInstance($(summaryContainer)).refreshValidationGroup();
    });
    // @ts-expect-error ts-error
    super._initMarkup();
  }
  validate() {
    return ValidationEngine.validateGroup(this);
  }
  reset() {
    return ValidationEngine.resetGroup(this);
  }
  _dispose() {
    ValidationEngine.removeGroup(this);
    this.$element().removeClass(VALIDATION_ENGINE_CLASS);
    // @ts-expect-error ts-error
    super._dispose();
  }
  // eslint-disable-next-line class-methods-use-this
  _useTemplates() {
    return false;
  }
}
registerComponent('dxValidationGroup', ValidationGroup);
export default ValidationGroup;