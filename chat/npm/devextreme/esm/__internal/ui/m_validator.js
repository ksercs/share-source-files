/**
* DevExtreme (esm/__internal/ui/m_validator.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import registerComponent from '../../core/component_registrator';
import { data as elementData } from '../../core/element_data';
import Guid from '../../core/guid';
import Callbacks from '../../core/utils/callbacks';
import { Deferred } from '../../core/utils/deferred';
import { extend } from '../../core/utils/extend';
import { map } from '../../core/utils/iterator';
import errors from '../../ui/widget/ui.errors';
import DOMComponent from '../core/widget/dom_component';
import ValidationEngine from './m_validation_engine';
import DefaultAdapter from './validation/m_default_adapter';
const VALIDATOR_CLASS = 'dx-validator';
const VALIDATION_STATUS_VALID = 'valid';
const VALIDATION_STATUS_INVALID = 'invalid';
const VALIDATION_STATUS_PENDING = 'pending';
class Validator extends DOMComponent {
  _initOptions(options) {
    // @ts-expect-error ts-error
    super._initOptions.apply(this, arguments);
    this.option(ValidationEngine.initValidationOptions(options));
  }
  _getDefaultOptions() {
    return _extends({}, super._getDefaultOptions(), {
      validationRules: []
    });
  }
  _init() {
    super._init();
    this._initGroupRegistration();
    this.focused = Callbacks();
    this._initAdapter();
    this._validationInfo = {
      // @ts-expect-error ts-error
      result: null,
      deferred: null,
      skipValidation: false
    };
  }
  _initGroupRegistration() {
    const group = this._findGroup();
    if (!this._groupWasInit) {
      this.on('disposing', args => {
        ValidationEngine.removeRegisteredValidator(args.component._validationGroup, args.component);
      });
    }
    if (!this._groupWasInit || this._validationGroup !== group) {
      ValidationEngine.removeRegisteredValidator(this._validationGroup, this);
      this._groupWasInit = true;
      this._validationGroup = group;
      ValidationEngine.registerValidatorInGroup(group, this);
    }
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      validationGroup: true
    });
  }
  _getEditor() {
    const element = this.$element()[0];
    return elementData(element, 'dx-validation-target');
  }
  _initAdapter() {
    const dxStandardEditor = this._getEditor();
    let {
      adapter
    } = this.option();
    if (!adapter) {
      if (dxStandardEditor) {
        var _adapter;
        // @ts-expect-error ts-error
        adapter = new DefaultAdapter(dxStandardEditor, this);
        (_adapter = adapter) === null || _adapter === void 0 || (_adapter = _adapter.validationRequestsCallbacks) === null || _adapter === void 0 || _adapter.push(args => {
          var _this$_validationInfo;
          if ((_this$_validationInfo = this._validationInfo) !== null && _this$_validationInfo !== void 0 && _this$_validationInfo.skipValidation) {
            return;
          }
          this.validate(args);
        });
        this.option('adapter', adapter);
        return;
      }
      throw errors.Error('E0120');
    }
    const callbacks = adapter.validationRequestsCallbacks;
    if (callbacks) {
      callbacks.push(args => {
        this.validate(args);
      });
    }
  }
  _toggleRTLDirection(isRtl) {
    var _adapter$editor;
    const {
      adapter
    } = this.option();
    // @ts-expect-error ts-error
    const rtlEnabled = (adapter === null || adapter === void 0 || (_adapter$editor = adapter.editor) === null || _adapter$editor === void 0 ? void 0 : _adapter$editor.option('rtlEnabled')) ?? isRtl;
    super._toggleRTLDirection(rtlEnabled);
  }
  _initMarkup() {
    this.$element().addClass(VALIDATOR_CLASS);
    super._initMarkup();
  }
  _render() {
    super._render();
    this._toggleAccessibilityAttributes();
  }
  _toggleAccessibilityAttributes() {
    const dxStandardEditor = this._getEditor();
    if (dxStandardEditor) {
      const rules = this.option('validationRules') || [];
      // @ts-expect-error ts-error
      const isRequired = rules.some(_ref => {
        let {
          type
        } = _ref;
        return type === 'required';
      }) || null;
      if (dxStandardEditor.isInitialized()) {
        dxStandardEditor.setAria('required', isRequired);
      }
      dxStandardEditor.option('_onMarkupRendered', () => {
        dxStandardEditor.setAria('required', isRequired);
      });
    }
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._initGroupRegistration();
    }
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'validationGroup':
        this._initGroupRegistration();
        return;
      case 'validationRules':
        this._resetValidationRules();
        this._toggleAccessibilityAttributes();
        this.option('isValid') !== undefined && this.validate();
        return;
      case 'adapter':
        this._initAdapter();
        break;
      case 'isValid':
      case 'validationStatus':
        this.option(ValidationEngine.synchronizeValidationOptions(args, this.option()));
        break;
      default:
        super._optionChanged(args);
    }
  }
  _getValidationRules() {
    if (!this._validationRules) {
      this._validationRules = map(this.option('validationRules'), (rule, index) => extend({}, rule, {
        validator: this,
        index
      }));
    }
    return this._validationRules;
  }
  _findGroup() {
    const $element = this.$element();
    const {
      validationGroup
    } = this.option();
    return validationGroup
    // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    || ValidationEngine.findGroup($element, this._modelByElement($element));
  }
  _resetValidationRules() {
    delete this._validationRules;
  }
  validate(args) {
    var _adapter$bypass, _adapter$getValue, _adapter$getCurrentVa, _this$_validationInfo2, _result$complete;
    const {
      adapter,
      name
    } = this.option();
    const bypass = adapter === null || adapter === void 0 || (_adapter$bypass = adapter.bypass) === null || _adapter$bypass === void 0 ? void 0 : _adapter$bypass.call(adapter);
    const value = args && args.value !== undefined ? args.value : adapter === null || adapter === void 0 || (_adapter$getValue = adapter.getValue) === null || _adapter$getValue === void 0 ? void 0 : _adapter$getValue.call(adapter);
    // @ts-expect-error ts-error
    const currentError = adapter === null || adapter === void 0 || (_adapter$getCurrentVa = adapter.getCurrentValidationError) === null || _adapter$getCurrentVa === void 0 ? void 0 : _adapter$getCurrentVa.call(adapter);
    const rules = this._getValidationRules();
    const currentResult = (_this$_validationInfo2 = this._validationInfo) === null || _this$_validationInfo2 === void 0 ? void 0 : _this$_validationInfo2.result;
    if (currentResult && currentResult.status === VALIDATION_STATUS_PENDING && currentResult.value === value) {
      return extend({}, currentResult);
    }
    let result;
    if (bypass) {
      result = {
        isValid: true,
        status: VALIDATION_STATUS_VALID
      };
    } else if (currentError !== null && currentError !== void 0 && currentError.editorSpecific) {
      currentError.validator = this;
      result = {
        isValid: false,
        status: VALIDATION_STATUS_INVALID,
        brokenRule: currentError,
        brokenRules: [currentError]
      };
    } else {
      result = ValidationEngine.validate(value, rules, name);
    }
    result.id = new Guid().toString();
    this._applyValidationResult(result, adapter);
    (_result$complete = result.complete) === null || _result$complete === void 0 || _result$complete.then(res => {
      // @ts-expect-error ts-error
      if (res.id === this._validationInfo.result.id) {
        this._applyValidationResult(res, adapter);
      }
    });
    return extend({}, this._validationInfo.result);
  }
  reset() {
    const {
      adapter
    } = this.option();
    const result = {
      id: null,
      isValid: true,
      brokenRule: null,
      brokenRules: null,
      pendingRules: null,
      status: VALIDATION_STATUS_VALID,
      complete: null
    };
    this._validationInfo.skipValidation = true;
    // @ts-expect-error ts-error
    adapter.reset();
    this._validationInfo.skipValidation = false;
    this._resetValidationRules();
    this._applyValidationResult(result, adapter);
  }
  _updateValidationResult(result) {
    // @ts-expect-error ts-error
    if (!this._validationInfo.result || this._validationInfo.result.id !== result.id) {
      const complete = this._validationInfo.deferred && this._validationInfo.result.complete;
      this._validationInfo.result = extend({}, result, {
        complete
      });
    } else {
      // eslint-disable-next-line no-restricted-syntax
      for (const prop in result) {
        if (prop !== 'id' && prop !== 'complete') {
          this._validationInfo.result[prop] = result[prop];
        }
      }
    }
  }
  _applyValidationResult(result, adapter) {
    const validatedAction = this._createActionByOption('onValidated', {
      excludeValidators: ['readOnly']
    });
    result.validator = this;
    this._updateValidationResult(result);
    // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
    adapter.applyValidationResults && adapter.applyValidationResults(this._validationInfo.result);
    this.option({
      validationStatus: this._validationInfo.result.status
    });
    if (this._validationInfo.result.status === VALIDATION_STATUS_PENDING) {
      if (!this._validationInfo.deferred) {
        this._validationInfo.deferred = Deferred();
        this._validationInfo.result.complete = this._validationInfo.deferred.promise();
      }
      this._eventsStrategy.fireEvent('validating', [this._validationInfo.result]);
      return;
    }
    // @ts-expect-error ts-error
    if (this._validationInfo.result.status !== VALIDATION_STATUS_PENDING) {
      validatedAction(result);
      if (this._validationInfo.deferred) {
        this._validationInfo.deferred.resolve(result);
        this._validationInfo.deferred = null;
      }
    }
  }
  focus() {
    const {
      adapter
    } = this.option();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions, @typescript-eslint/prefer-optional-chain
    adapter && adapter.focus && adapter.focus();
  }
  _useTemplates() {
    return false;
  }
}
registerComponent('dxValidator', Validator);
export default Validator;
