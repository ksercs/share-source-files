/**
* DevExtreme (cjs/ui/validation_engine.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _class = _interopRequireDefault(require("../core/class"));
var _extend = require("../core/utils/extend");
var _iterator = require("../core/utils/iterator");
var _events_strategy = require("../core/events_strategy");
var _errors = _interopRequireDefault(require("../core/errors"));
var _common = require("../core/utils/common");
var _type = require("../core/utils/type");
var _number = _interopRequireDefault(require("../localization/number"));
var _message = _interopRequireDefault(require("../localization/message"));
var _deferred = require("../core/utils/deferred");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var EMAIL_VALIDATION_REGEX = /^[\d\w.+_-]+@[\d\w._-]+\.[\w]+$/i;

// STYLE validation

var STATUS = {
  valid: 'valid',
  invalid: 'invalid',
  pending: 'pending'
};
var BaseRuleValidator = /*#__PURE__*/function () {
  function BaseRuleValidator() {
    this.NAME = 'base';
  }
  var _proto = BaseRuleValidator.prototype;
  _proto.defaultMessage = function defaultMessage(value) {
    return _message.default.getFormatter("validation-".concat(this.NAME))(value);
  };
  _proto.defaultFormattedMessage = function defaultFormattedMessage(value) {
    return _message.default.getFormatter("validation-".concat(this.NAME, "-formatted"))(value);
  };
  _proto._isValueEmpty = function _isValueEmpty(value) {
    return !rulesValidators.required.validate(value, {});
  };
  _proto.validate = function validate(value, rule) {
    var _this = this;
    var valueArray = Array.isArray(value) ? value : [value];
    var result = true;
    if (valueArray.length) {
      valueArray.every(function (itemValue) {
        result = _this._validate(itemValue, rule);
        return result;
      });
    } else {
      result = this._validate(null, rule);
    }
    return result;
  };
  return BaseRuleValidator;
}();
var RequiredRuleValidator = /*#__PURE__*/function (_BaseRuleValidator) {
  _inheritsLoose(RequiredRuleValidator, _BaseRuleValidator);
  function RequiredRuleValidator() {
    var _this2;
    _this2 = _BaseRuleValidator.call(this) || this;
    _this2.NAME = 'required';
    return _this2;
  }
  var _proto2 = RequiredRuleValidator.prototype;
  _proto2._validate = function _validate(value, rule) {
    if (!(0, _type.isDefined)(value)) return false;
    if (value === false) {
      return false;
    }
    value = String(value);
    if (rule.trim || !(0, _type.isDefined)(rule.trim)) {
      value = value.trim();
    }
    return value !== '';
  };
  return RequiredRuleValidator;
}(BaseRuleValidator);
var NumericRuleValidator = /*#__PURE__*/function (_BaseRuleValidator2) {
  _inheritsLoose(NumericRuleValidator, _BaseRuleValidator2);
  function NumericRuleValidator() {
    var _this3;
    _this3 = _BaseRuleValidator2.call(this) || this;
    _this3.NAME = 'numeric';
    return _this3;
  }
  var _proto3 = NumericRuleValidator.prototype;
  _proto3._validate = function _validate(value, rule) {
    if (rule.ignoreEmptyValue !== false && this._isValueEmpty(value)) {
      return true;
    }
    if (rule.useCultureSettings && (0, _type.isString)(value)) {
      return !isNaN(_number.default.parse(value));
    } else {
      return (0, _type.isNumeric)(value);
    }
  };
  return NumericRuleValidator;
}(BaseRuleValidator);
var RangeRuleValidator = /*#__PURE__*/function (_BaseRuleValidator3) {
  _inheritsLoose(RangeRuleValidator, _BaseRuleValidator3);
  function RangeRuleValidator() {
    var _this4;
    _this4 = _BaseRuleValidator3.call(this) || this;
    _this4.NAME = 'range';
    return _this4;
  }
  var _proto4 = RangeRuleValidator.prototype;
  _proto4._validate = function _validate(value, rule) {
    if (rule.ignoreEmptyValue !== false && this._isValueEmpty(value)) {
      return true;
    }
    var validNumber = rulesValidators['numeric'].validate(value, rule);
    var validValue = (0, _type.isDefined)(value) && value !== '';
    var number = validNumber ? parseFloat(value) : validValue && value.valueOf();
    var min = rule.min;
    var max = rule.max;
    if (!(validNumber || (0, _type.isDate)(value)) && !validValue) {
      return false;
    }
    if ((0, _type.isDefined)(min)) {
      if ((0, _type.isDefined)(max)) {
        return number >= min && number <= max;
      }
      return number >= min;
    } else {
      if ((0, _type.isDefined)(max)) {
        return number <= max;
      } else {
        throw _errors.default.Error('E0101');
      }
    }
  };
  return RangeRuleValidator;
}(BaseRuleValidator);
var StringLengthRuleValidator = /*#__PURE__*/function (_BaseRuleValidator4) {
  _inheritsLoose(StringLengthRuleValidator, _BaseRuleValidator4);
  function StringLengthRuleValidator() {
    var _this5;
    _this5 = _BaseRuleValidator4.call(this) || this;
    _this5.NAME = 'stringLength';
    return _this5;
  }
  var _proto5 = StringLengthRuleValidator.prototype;
  _proto5._validate = function _validate(value, rule) {
    var _value;
    value = String((_value = value) !== null && _value !== void 0 ? _value : '');
    if (rule.trim || !(0, _type.isDefined)(rule.trim)) {
      value = value.trim();
    }
    if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    return rulesValidators.range.validate(value.length, (0, _extend.extend)({}, rule));
  };
  return StringLengthRuleValidator;
}(BaseRuleValidator);
var CustomRuleValidator = /*#__PURE__*/function (_BaseRuleValidator5) {
  _inheritsLoose(CustomRuleValidator, _BaseRuleValidator5);
  function CustomRuleValidator() {
    var _this6;
    _this6 = _BaseRuleValidator5.call(this) || this;
    _this6.NAME = 'custom';
    return _this6;
  }
  var _proto6 = CustomRuleValidator.prototype;
  _proto6.validate = function validate(value, rule) {
    if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    var validator = rule.validator;
    var dataGetter = validator && (0, _type.isFunction)(validator.option) && validator.option('dataGetter');
    var extraParams = (0, _type.isFunction)(dataGetter) && dataGetter();
    var params = {
      value: value,
      validator: validator,
      rule: rule
    };
    if (extraParams) {
      (0, _extend.extend)(params, extraParams);
    }
    return rule.validationCallback(params);
  };
  return CustomRuleValidator;
}(BaseRuleValidator);
var AsyncRuleValidator = /*#__PURE__*/function (_CustomRuleValidator) {
  _inheritsLoose(AsyncRuleValidator, _CustomRuleValidator);
  function AsyncRuleValidator() {
    var _this7;
    _this7 = _CustomRuleValidator.call(this) || this;
    _this7.NAME = 'async';
    return _this7;
  }
  var _proto7 = AsyncRuleValidator.prototype;
  _proto7.validate = function validate(value, rule) {
    if (!(0, _type.isDefined)(rule.reevaluate)) {
      (0, _extend.extend)(rule, {
        reevaluate: true
      });
    }
    if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    var validator = rule.validator;
    var dataGetter = validator && (0, _type.isFunction)(validator.option) && validator.option('dataGetter');
    var extraParams = (0, _type.isFunction)(dataGetter) && dataGetter();
    var params = {
      value: value,
      validator: validator,
      rule: rule
    };
    if (extraParams) {
      (0, _extend.extend)(params, extraParams);
    }
    var callbackResult = rule.validationCallback(params);
    if (!(0, _type.isPromise)(callbackResult)) {
      throw _errors.default.Error('E0103');
    }
    return this._getWrappedPromise((0, _deferred.fromPromise)(callbackResult).promise());
  };
  _proto7._getWrappedPromise = function _getWrappedPromise(promise) {
    var deferred = new _deferred.Deferred();
    promise.then(function (res) {
      deferred.resolve(res);
    }, function (err) {
      var res = {
        isValid: false
      };
      if ((0, _type.isDefined)(err)) {
        if ((0, _type.isString)(err)) {
          res.message = err;
        } else if ((0, _type.isObject)(err) && (0, _type.isDefined)(err.message) && (0, _type.isString)(err.message)) {
          res.message = err.message;
        }
      }
      deferred.resolve(res);
    });
    return deferred.promise();
  };
  return AsyncRuleValidator;
}(CustomRuleValidator);
var CompareRuleValidator = /*#__PURE__*/function (_BaseRuleValidator6) {
  _inheritsLoose(CompareRuleValidator, _BaseRuleValidator6);
  function CompareRuleValidator() {
    var _this8;
    _this8 = _BaseRuleValidator6.call(this) || this;
    _this8.NAME = 'compare';
    return _this8;
  }
  var _proto8 = CompareRuleValidator.prototype;
  _proto8._validate = function _validate(value, rule) {
    if (!rule.comparisonTarget) {
      throw _errors.default.Error('E0102');
    }
    if (rule.ignoreEmptyValue && this._isValueEmpty(value)) {
      return true;
    }
    (0, _extend.extend)(rule, {
      reevaluate: true
    });
    var otherValue = rule.comparisonTarget();
    var type = rule.comparisonType || '==';
    switch (type) {
      case '==':
        return value == otherValue;
      // eslint-disable-line eqeqeq
      case '!=':
        return value != otherValue;
      // eslint-disable-line eqeqeq
      case '===':
        return value === otherValue;
      case '!==':
        return value !== otherValue;
      case '>':
        return value > otherValue;
      case '>=':
        return value >= otherValue;
      case '<':
        return value < otherValue;
      case '<=':
        return value <= otherValue;
    }
  };
  return CompareRuleValidator;
}(BaseRuleValidator);
var PatternRuleValidator = /*#__PURE__*/function (_BaseRuleValidator7) {
  _inheritsLoose(PatternRuleValidator, _BaseRuleValidator7);
  function PatternRuleValidator() {
    var _this9;
    _this9 = _BaseRuleValidator7.call(this) || this;
    _this9.NAME = 'pattern';
    return _this9;
  }
  var _proto9 = PatternRuleValidator.prototype;
  _proto9._validate = function _validate(value, rule) {
    if (rule.ignoreEmptyValue !== false && this._isValueEmpty(value)) {
      return true;
    }
    var pattern = rule.pattern;
    if ((0, _type.isString)(pattern)) {
      pattern = new RegExp(pattern);
    }
    return pattern.test(value);
  };
  return PatternRuleValidator;
}(BaseRuleValidator);
var EmailRuleValidator = /*#__PURE__*/function (_BaseRuleValidator8) {
  _inheritsLoose(EmailRuleValidator, _BaseRuleValidator8);
  function EmailRuleValidator() {
    var _this10;
    _this10 = _BaseRuleValidator8.call(this) || this;
    _this10.NAME = 'email';
    return _this10;
  }
  var _proto10 = EmailRuleValidator.prototype;
  _proto10._validate = function _validate(value, rule) {
    if (rule.ignoreEmptyValue !== false && this._isValueEmpty(value)) {
      return true;
    }
    return rulesValidators.pattern.validate(value, (0, _extend.extend)({}, rule, {
      pattern: EMAIL_VALIDATION_REGEX
    }));
  };
  return EmailRuleValidator;
}(BaseRuleValidator);
var rulesValidators = {
  'required': new RequiredRuleValidator(),
  'numeric': new NumericRuleValidator(),
  'range': new RangeRuleValidator(),
  'stringLength': new StringLengthRuleValidator(),
  'custom': new CustomRuleValidator(),
  'async': new AsyncRuleValidator(),
  'compare': new CompareRuleValidator(),
  'pattern': new PatternRuleValidator(),
  'email': new EmailRuleValidator()
};
var GroupConfig = _class.default.inherit({
  ctor(group) {
    this.group = group;
    this.validators = [];
    this._pendingValidators = [];
    this._onValidatorStatusChanged = this._onValidatorStatusChanged.bind(this);
    this._resetValidationInfo();
    this._eventsStrategy = new _events_strategy.EventsStrategy(this);
  },
  validate() {
    var _this11 = this;
    var result = {
      isValid: true,
      brokenRules: [],
      validators: [],
      status: STATUS.valid,
      complete: null
    };
    this._unsubscribeFromAllChangeEvents();
    this._pendingValidators = [];
    this._resetValidationInfo();
    (0, _iterator.each)(this.validators, function (_, validator) {
      var validatorResult = validator.validate();
      result.isValid = result.isValid && validatorResult.isValid;
      if (validatorResult.brokenRules) {
        result.brokenRules = result.brokenRules.concat(validatorResult.brokenRules);
      }
      result.validators.push(validator);
      if (validatorResult.status === STATUS.pending) {
        _this11._addPendingValidator(validator);
      }
      _this11._subscribeToChangeEvents(validator);
    });
    if (this._pendingValidators.length) {
      result.status = STATUS.pending;
    } else {
      result.status = result.isValid ? STATUS.valid : STATUS.invalid;
      this._unsubscribeFromAllChangeEvents();
      this._raiseValidatedEvent(result);
    }
    this._updateValidationInfo(result);
    return (0, _extend.extend)({}, this._validationInfo.result);
  },
  _subscribeToChangeEvents(validator) {
    validator.on('validating', this._onValidatorStatusChanged);
    validator.on('validated', this._onValidatorStatusChanged);
  },
  _unsubscribeFromChangeEvents(validator) {
    validator.off('validating', this._onValidatorStatusChanged);
    validator.off('validated', this._onValidatorStatusChanged);
  },
  _unsubscribeFromAllChangeEvents() {
    var _this12 = this;
    (0, _iterator.each)(this.validators, function (_, validator) {
      _this12._unsubscribeFromChangeEvents(validator);
    });
  },
  _updateValidationInfo(result) {
    this._validationInfo.result = result;
    if (result.status !== STATUS.pending) {
      return;
    }
    if (!this._validationInfo.deferred) {
      this._validationInfo.deferred = new _deferred.Deferred();
      this._validationInfo.result.complete = this._validationInfo.deferred.promise();
    }
  },
  _addPendingValidator(validator) {
    var foundValidator = (0, _common.grep)(this._pendingValidators, function (val) {
      return val === validator;
    })[0];
    if (!foundValidator) {
      this._pendingValidators.push(validator);
    }
  },
  _removePendingValidator(validator) {
    var index = this._pendingValidators.indexOf(validator);
    if (index >= 0) {
      this._pendingValidators.splice(index, 1);
    }
  },
  _orderBrokenRules(brokenRules) {
    var orderedRules = [];
    (0, _iterator.each)(this.validators, function (_, validator) {
      var foundRules = (0, _common.grep)(brokenRules, function (rule) {
        return rule.validator === validator;
      });
      if (foundRules.length) {
        orderedRules = orderedRules.concat(foundRules);
      }
    });
    return orderedRules;
  },
  _updateBrokenRules(result) {
    if (!this._validationInfo.result) {
      return;
    }
    var brokenRules = this._validationInfo.result.brokenRules;
    var rules = (0, _common.grep)(brokenRules, function (rule) {
      return rule.validator !== result.validator;
    });
    if (result.brokenRules) {
      brokenRules = rules.concat(result.brokenRules);
    }
    this._validationInfo.result.brokenRules = this._orderBrokenRules(brokenRules);
  },
  _onValidatorStatusChanged(result) {
    if (result.status === STATUS.pending) {
      this._addPendingValidator(result.validator);
      return;
    }
    this._resolveIfComplete(result);
  },
  _resolveIfComplete(result) {
    this._removePendingValidator(result.validator);
    this._updateBrokenRules(result);
    if (!this._pendingValidators.length) {
      this._unsubscribeFromAllChangeEvents();
      if (!this._validationInfo.result) {
        return;
      }
      this._validationInfo.result.status = this._validationInfo.result.brokenRules.length === 0 ? STATUS.valid : STATUS.invalid;
      this._validationInfo.result.isValid = this._validationInfo.result.status === STATUS.valid;
      var res = (0, _extend.extend)({}, this._validationInfo.result, {
        complete: null
      });
      var deferred = this._validationInfo.deferred;
      this._validationInfo.deferred = null;
      this._raiseValidatedEvent(res);
      deferred && setTimeout(function () {
        deferred.resolve(res);
      });
    }
  },
  _raiseValidatedEvent(result) {
    this._eventsStrategy.fireEvent('validated', [result]);
  },
  _resetValidationInfo() {
    this._validationInfo = {
      result: null,
      deferred: null
    };
  },
  _synchronizeValidationInfo() {
    if (this._validationInfo.result) {
      this._validationInfo.result.validators = this.validators;
    }
  },
  removeRegisteredValidator(validator) {
    var index = this.validators.indexOf(validator);
    if (index > -1) {
      this.validators.splice(index, 1);
      this._synchronizeValidationInfo();
      this._resolveIfComplete({
        validator
      });
    }
  },
  registerValidator(validator) {
    if (!this.validators.includes(validator)) {
      this.validators.push(validator);
      this._synchronizeValidationInfo();
    }
  },
  reset() {
    (0, _iterator.each)(this.validators, function (_, validator) {
      validator.reset();
    });
    this._pendingValidators = [];
    this._resetValidationInfo();
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
});
var ValidationEngine = {
  groups: [],
  getGroupConfig(group) {
    var result = (0, _common.grep)(this.groups, function (config) {
      return config.group === group;
    });
    if (result.length) {
      return result[0];
    }
  },
  findGroup($element, model) {
    var _$element$data, _$element$data$dxComp;
    var hasValidationGroup = (_$element$data = $element.data()) === null || _$element$data === void 0 ? void 0 : (_$element$data$dxComp = _$element$data.dxComponents) === null || _$element$data$dxComp === void 0 ? void 0 : _$element$data$dxComp.includes('dxValidationGroup');
    var validationGroup = hasValidationGroup && $element.dxValidationGroup('instance');
    if (validationGroup) {
      return validationGroup;
    }
    // try to find out if this control is child of validation group
    var $dxGroup = $element.parents('.dx-validationgroup').first();
    if ($dxGroup.length) {
      return $dxGroup.dxValidationGroup('instance');
    }

    // Trick to be able to securely get ViewModel instance ($data) in Knockout
    return model;
  },
  initGroups() {
    this.groups = [];
    this.addGroup();
  },
  addGroup(group) {
    var config = this.getGroupConfig(group);
    if (!config) {
      config = new GroupConfig(group);
      this.groups.push(config);
    }
    return config;
  },
  removeGroup(group) {
    var config = this.getGroupConfig(group);
    var index = this.groups.indexOf(config);
    if (index > -1) {
      this.groups.splice(index, 1);
    }
    return config;
  },
  _setDefaultMessage(info) {
    var rule = info.rule,
      validator = info.validator,
      name = info.name;
    if (!(0, _type.isDefined)(rule.message)) {
      if (validator.defaultFormattedMessage && (0, _type.isDefined)(name)) {
        rule.message = validator.defaultFormattedMessage(name);
      } else {
        rule.message = validator.defaultMessage();
      }
    }
  },
  _addBrokenRule(info) {
    var result = info.result,
      rule = info.rule;
    if (!result.brokenRule) {
      result.brokenRule = rule;
    }
    if (!result.brokenRules) {
      result.brokenRules = [];
    }
    result.brokenRules.push(rule);
  },
  validate(value, rules, name) {
    var _rules$,
      _this13 = this;
    var result = {
      name: name,
      value: value,
      brokenRule: null,
      brokenRules: null,
      isValid: true,
      validationRules: rules,
      pendingRules: null,
      status: STATUS.valid,
      complete: null
    };
    var validator = rules === null || rules === void 0 ? void 0 : (_rules$ = rules[0]) === null || _rules$ === void 0 ? void 0 : _rules$.validator;
    var asyncRuleItems = [];
    (0, _iterator.each)(rules || [], function (_, rule) {
      var ruleValidator = rulesValidators[rule.type];
      var ruleValidationResult;
      if (ruleValidator) {
        if ((0, _type.isDefined)(rule.isValid) && rule.value === value && !rule.reevaluate) {
          if (!rule.isValid) {
            result.isValid = false;
            _this13._addBrokenRule({
              result,
              rule
            });
            return false;
          }
          return true;
        }
        rule.value = value;
        if (rule.type === 'async') {
          asyncRuleItems.push({
            rule: rule,
            ruleValidator: ruleValidator
          });
          return true;
        }
        ruleValidationResult = ruleValidator.validate(value, rule);
        rule.isValid = ruleValidationResult;
        if (!ruleValidationResult) {
          result.isValid = false;
          _this13._setDefaultMessage({
            rule,
            validator: ruleValidator,
            name
          });
          _this13._addBrokenRule({
            result,
            rule
          });
        }
        if (!rule.isValid) {
          return false;
        }
      } else {
        throw _errors.default.Error('E0100');
      }
    });
    if (result.isValid && !result.brokenRules && asyncRuleItems.length) {
      result = this._validateAsyncRules({
        value,
        items: asyncRuleItems,
        result,
        name
      });
    }
    this._synchronizeGroupValidationInfo(validator, result);
    result.status = result.pendingRules ? STATUS.pending : result.isValid ? STATUS.valid : STATUS.invalid;
    return result;
  },
  _synchronizeGroupValidationInfo(validator, result) {
    var _result$brokenRules;
    if (!validator) {
      return;
    }
    var groupConfig = ValidationEngine.getGroupConfig(validator._validationGroup);
    groupConfig._updateBrokenRules.call(groupConfig, {
      validator,
      brokenRules: (_result$brokenRules = result.brokenRules) !== null && _result$brokenRules !== void 0 ? _result$brokenRules : []
    });
  },
  _validateAsyncRules(_ref) {
    var _this14 = this;
    var result = _ref.result,
      value = _ref.value,
      items = _ref.items,
      name = _ref.name;
    var asyncResults = [];
    (0, _iterator.each)(items, function (_, item) {
      var validateResult = item.ruleValidator.validate(value, item.rule);
      if (!(0, _type.isPromise)(validateResult)) {
        _this14._updateRuleConfig({
          rule: item.rule,
          ruleResult: _this14._getPatchedRuleResult(validateResult),
          validator: item.ruleValidator,
          name
        });
      } else {
        if (!result.pendingRules) {
          result.pendingRules = [];
        }
        result.pendingRules.push(item.rule);
        var asyncResult = validateResult.then(function (res) {
          var ruleResult = _this14._getPatchedRuleResult(res);
          _this14._updateRuleConfig({
            rule: item.rule,
            ruleResult,
            validator: item.ruleValidator,
            name
          });
          return ruleResult;
        });
        asyncResults.push(asyncResult);
      }
    });
    if (asyncResults.length) {
      result.complete = Promise.all(asyncResults).then(function (values) {
        return _this14._getAsyncRulesResult({
          result,
          values
        });
      });
    }
    return result;
  },
  _updateRuleConfig(_ref2) {
    var rule = _ref2.rule,
      ruleResult = _ref2.ruleResult,
      validator = _ref2.validator,
      name = _ref2.name;
    rule.isValid = ruleResult.isValid;
    if (!ruleResult.isValid) {
      if ((0, _type.isDefined)(ruleResult.message) && (0, _type.isString)(ruleResult.message) && ruleResult.message.length) {
        rule.message = ruleResult.message;
      } else {
        this._setDefaultMessage({
          rule,
          validator: validator,
          name
        });
      }
    }
  },
  _getPatchedRuleResult(ruleResult) {
    var result;
    var isValid = true;
    if ((0, _type.isObject)(ruleResult)) {
      result = (0, _extend.extend)({}, ruleResult);
      if (!(0, _type.isDefined)(result.isValid)) {
        result.isValid = isValid;
      }
    } else {
      result = {
        isValid: (0, _type.isBoolean)(ruleResult) ? ruleResult : isValid
      };
    }
    return result;
  },
  _getAsyncRulesResult(_ref3) {
    var _this15 = this;
    var values = _ref3.values,
      result = _ref3.result;
    (0, _iterator.each)(values, function (index, val) {
      if (val.isValid === false) {
        result.isValid = val.isValid;
        var rule = result.pendingRules[index];
        _this15._addBrokenRule({
          result,
          rule
        });
      }
    });
    result.pendingRules = null;
    result.complete = null;
    result.status = result.isValid ? STATUS.valid : STATUS.invalid;
    return result;
  },
  registerValidatorInGroup(group, validator) {
    var groupConfig = ValidationEngine.addGroup(group);
    groupConfig.registerValidator.call(groupConfig, validator);
  },
  _shouldRemoveGroup(group, validatorsInGroup) {
    var isDefaultGroup = group === undefined;
    var isValidationGroupInstance = group && group.NAME === 'dxValidationGroup';
    return !isDefaultGroup && !isValidationGroupInstance && !validatorsInGroup.length;
  },
  removeRegisteredValidator(group, validator) {
    var config = ValidationEngine.getGroupConfig(group);
    if (config) {
      config.removeRegisteredValidator.call(config, validator);
      var validatorsInGroup = config.validators;
      if (this._shouldRemoveGroup(group, validatorsInGroup)) {
        this.removeGroup(group);
      }
    }
  },
  initValidationOptions(options) {
    var _this16 = this;
    var initedOptions = {};
    if (options) {
      var syncOptions = ['isValid', 'validationStatus', 'validationError', 'validationErrors'];
      syncOptions.forEach(function (prop) {
        if (prop in options) {
          (0, _extend.extend)(initedOptions, _this16.synchronizeValidationOptions({
            name: prop,
            value: options[prop]
          }, options));
        }
      });
    }
    return initedOptions;
  },
  synchronizeValidationOptions(_ref4, options) {
    var name = _ref4.name,
      value = _ref4.value;
    switch (name) {
      case 'validationStatus':
        {
          var isValid = value === STATUS.valid || value === STATUS.pending;
          return options.isValid !== isValid ? {
            isValid
          } : {};
        }
      case 'isValid':
        {
          var validationStatus = options.validationStatus;
          var newStatus = validationStatus;
          if (value && validationStatus === STATUS.invalid) {
            newStatus = STATUS.valid;
          } else if (!value && validationStatus !== STATUS.invalid) {
            newStatus = STATUS.invalid;
          }
          return newStatus !== validationStatus ? {
            validationStatus: newStatus
          } : {};
        }
      case 'validationErrors':
        {
          var validationError = !value || !value.length ? null : value[0];
          return options.validationError !== validationError ? {
            validationError
          } : {};
        }
      case 'validationError':
        {
          var validationErrors = options.validationErrors;
          if (!value && validationErrors) {
            return {
              validationErrors: null
            };
          } else if (value && !validationErrors) {
            return {
              validationErrors: [value]
            };
          } else if (value && validationErrors && value !== validationErrors[0]) {
            validationErrors[0] = value;
            return {
              validationErrors: validationErrors.slice()
            };
          }
        }
    }
    return {};
  },
  validateGroup(group) {
    var groupConfig = ValidationEngine.getGroupConfig(group);
    if (!groupConfig) {
      throw _errors.default.Error('E0110');
    }
    return groupConfig.validate();
  },
  resetGroup(group) {
    var groupConfig = ValidationEngine.getGroupConfig(group);
    if (!groupConfig) {
      throw _errors.default.Error('E0110');
    }
    return groupConfig.reset();
  }
};
ValidationEngine.initGroups();
var _default = ValidationEngine;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
