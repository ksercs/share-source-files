/**
* DevExtreme (esm/__internal/ui/button/wrapper.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { getImageSourceType } from '../../../core/utils/icon';
import ValidationEngine from '../../../ui/validation_engine';
import { ComponentWrapper } from '../../core/r1/component_wrapper';
export default class ButtonWrapper extends ComponentWrapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  get _validationGroupConfig() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return ValidationEngine.getGroupConfig(this._findGroup());
  }
  getDefaultTemplateNames() {
    return ['content'];
  }
  getSupportedKeyNames() {
    return ['space', 'enter'];
  }
  getProps() {
    const props = super.getProps();
    props.onClick = _ref => {
      let {
        event
      } = _ref;
      this._clickAction({
        event,
        validationGroup: this._validationGroupConfig
      });
    };
    const iconType = getImageSourceType(props.icon);
    if (iconType === 'svg') {
      props.iconTemplate = this._createTemplateComponent(() => props.icon);
    }
    return props;
  }
  get _templatesInfo() {
    return {
      template: 'content'
    };
  }
  _toggleActiveState(_, value) {
    const button = this.viewRef;
    value ? button.activate() : button.deactivate();
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _getSubmitAction() {
    let needValidate = true;
    let validationStatus = 'valid';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this._createAction(_ref2 => {
      let {
        event,
        submitInput
      } = _ref2;
      if (needValidate) {
        const validationGroup = this._validationGroupConfig;
        if (validationGroup !== undefined && validationGroup !== '') {
          const validationResult = validationGroup.validate();
          validationStatus = validationResult.status;
          if (validationResult.status === 'pending') {
            needValidate = false;
            this.option('disabled', true);
            validationResult.complete.then(_ref3 => {
              let {
                status
              } = _ref3;
              this.option('disabled', false);
              validationStatus = status;
              validationStatus === 'valid' && submitInput.click();
              needValidate = true;
            });
          }
        }
      }
      validationStatus !== 'valid' && event.preventDefault();
      event.stopPropagation();
    });
  }
  _initializeComponent() {
    super._initializeComponent();
    this._addAction('onSubmit', this._getSubmitAction());
    this._clickAction = this._createClickAction();
  }
  _initMarkup() {
    super._initMarkup();
    const $content = this.$element().find('.dx-button-content').first();
    const $template = $content.children().filter('.dx-template-wrapper');
    const $input = $content.children().filter('.dx-button-submit-input');
    if ($template.length) {
      $template.addClass('dx-button-content');
      $template.append($input);
      $content.replaceWith($template);
    }
  }
  _patchOptionValues(options) {
    return super._patchOptionValues(_extends({}, options, {
      templateData: options._templateData
    }));
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  _findGroup() {
    const $element = this.$element();
    const validationGroup = this.option('validationGroup');
    return validationGroup !== undefined && validationGroup !== '' ? validationGroup
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    : ValidationEngine.findGroup($element, this._modelByElement($element));
  }
  _createClickAction() {
    // @ts-expect-error
    return this._createActionByOption('onClick', {
      excludeValidators: ['readOnly']
    });
  }
  _optionChanged(option) {
    switch (option.name) {
      case 'onClick':
        this._clickAction = this._createClickAction();
        break;
      default:
        break;
    }
    super._optionChanged(option);
  }
}
/* eslint-enable @typescript-eslint/no-unsafe-member-access */
