!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/validation_engine.js"], ["../core/class","../core/utils/extend","../core/utils/iterator","../core/events_strategy","../core/errors","../core/utils/common","../core/utils/type","../localization/number","../localization/message","../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/validation_engine.js", ["../core/class", "../core/utils/extend", "../core/utils/iterator", "../core/events_strategy", "../core/errors", "../core/utils/common", "../core/utils/type", "../localization/number", "../localization/message", "../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _class = _interopRequireDefault($__require("../core/class"));
  var _extend = $__require("../core/utils/extend");
  var _iterator = $__require("../core/utils/iterator");
  var _events_strategy = $__require("../core/events_strategy");
  var _errors = _interopRequireDefault($__require("../core/errors"));
  var _common = $__require("../core/utils/common");
  var _type = $__require("../core/utils/type");
  var _number = _interopRequireDefault($__require("../localization/number"));
  var _message = _interopRequireDefault($__require("../localization/message"));
  var _deferred = $__require("../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
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
        pattern: /^[\d\w._-]+@[\d\w._-]+\.[\w]+$/i
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
    ctor: function ctor(group) {
      this.group = group;
      this.validators = [];
      this._pendingValidators = [];
      this._onValidatorStatusChanged = this._onValidatorStatusChanged.bind(this);
      this._resetValidationInfo();
      this._eventsStrategy = new _events_strategy.EventsStrategy(this);
    },
    validate: function validate() {
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
    _subscribeToChangeEvents: function _subscribeToChangeEvents(validator) {
      validator.on('validating', this._onValidatorStatusChanged);
      validator.on('validated', this._onValidatorStatusChanged);
    },
    _unsubscribeFromChangeEvents: function _unsubscribeFromChangeEvents(validator) {
      validator.off('validating', this._onValidatorStatusChanged);
      validator.off('validated', this._onValidatorStatusChanged);
    },
    _unsubscribeFromAllChangeEvents: function _unsubscribeFromAllChangeEvents() {
      var _this12 = this;
      (0, _iterator.each)(this.validators, function (_, validator) {
        _this12._unsubscribeFromChangeEvents(validator);
      });
    },
    _updateValidationInfo: function _updateValidationInfo(result) {
      this._validationInfo.result = result;
      if (result.status !== STATUS.pending) {
        return;
      }
      if (!this._validationInfo.deferred) {
        this._validationInfo.deferred = new _deferred.Deferred();
        this._validationInfo.result.complete = this._validationInfo.deferred.promise();
      }
    },
    _addPendingValidator: function _addPendingValidator(validator) {
      var foundValidator = (0, _common.grep)(this._pendingValidators, function (val) {
        return val === validator;
      })[0];
      if (!foundValidator) {
        this._pendingValidators.push(validator);
      }
    },
    _removePendingValidator: function _removePendingValidator(validator) {
      var index = this._pendingValidators.indexOf(validator);
      if (index >= 0) {
        this._pendingValidators.splice(index, 1);
      }
    },
    _orderBrokenRules: function _orderBrokenRules(brokenRules) {
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
    _updateBrokenRules: function _updateBrokenRules(result) {
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
    _onValidatorStatusChanged: function _onValidatorStatusChanged(result) {
      if (result.status === STATUS.pending) {
        this._addPendingValidator(result.validator);
        return;
      }
      this._resolveIfComplete(result);
    },
    _resolveIfComplete: function _resolveIfComplete(result) {
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
    _raiseValidatedEvent: function _raiseValidatedEvent(result) {
      this._eventsStrategy.fireEvent('validated', [result]);
    },
    _resetValidationInfo: function _resetValidationInfo() {
      this._validationInfo = {
        result: null,
        deferred: null
      };
    },
    _synchronizeValidationInfo: function _synchronizeValidationInfo() {
      if (this._validationInfo.result) {
        this._validationInfo.result.validators = this.validators;
      }
    },
    removeRegisteredValidator: function removeRegisteredValidator(validator) {
      var index = this.validators.indexOf(validator);
      if (index > -1) {
        this.validators.splice(index, 1);
        this._synchronizeValidationInfo();
        this._resolveIfComplete({
          validator: validator
        });
      }
    },
    registerValidator: function registerValidator(validator) {
      if (!this.validators.includes(validator)) {
        this.validators.push(validator);
        this._synchronizeValidationInfo();
      }
    },
    reset: function reset() {
      (0, _iterator.each)(this.validators, function (_, validator) {
        validator.reset();
      });
      this._pendingValidators = [];
      this._resetValidationInfo();
    },
    on: function on(eventName, eventHandler) {
      this._eventsStrategy.on(eventName, eventHandler);
      return this;
    },
    off: function off(eventName, eventHandler) {
      this._eventsStrategy.off(eventName, eventHandler);
      return this;
    }
  });
  var ValidationEngine = {
    groups: [],
    getGroupConfig: function getGroupConfig(group) {
      var result = (0, _common.grep)(this.groups, function (config) {
        return config.group === group;
      });
      if (result.length) {
        return result[0];
      }
    },
    findGroup: function findGroup($element, model) {
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
    initGroups: function initGroups() {
      this.groups = [];
      this.addGroup();
    },
    addGroup: function addGroup(group) {
      var config = this.getGroupConfig(group);
      if (!config) {
        config = new GroupConfig(group);
        this.groups.push(config);
      }
      return config;
    },
    removeGroup: function removeGroup(group) {
      var config = this.getGroupConfig(group);
      var index = this.groups.indexOf(config);
      if (index > -1) {
        this.groups.splice(index, 1);
      }
      return config;
    },
    _setDefaultMessage: function _setDefaultMessage(info) {
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
    _addBrokenRule: function _addBrokenRule(info) {
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
    validate: function validate(value, rules, name) {
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
                result: result,
                rule: rule
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
              rule: rule,
              validator: ruleValidator,
              name: name
            });
            _this13._addBrokenRule({
              result: result,
              rule: rule
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
          value: value,
          items: asyncRuleItems,
          result: result,
          name: name
        });
      }
      this._synchronizeGroupValidationInfo(validator, result);
      result.status = result.pendingRules ? STATUS.pending : result.isValid ? STATUS.valid : STATUS.invalid;
      return result;
    },
    _synchronizeGroupValidationInfo: function _synchronizeGroupValidationInfo(validator, result) {
      var _result$brokenRules;
      if (!validator) {
        return;
      }
      var groupConfig = ValidationEngine.getGroupConfig(validator._validationGroup);
      groupConfig._updateBrokenRules.call(groupConfig, {
        validator: validator,
        brokenRules: (_result$brokenRules = result.brokenRules) !== null && _result$brokenRules !== void 0 ? _result$brokenRules : []
      });
    },
    _validateAsyncRules: function _validateAsyncRules(_ref) {
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
            name: name
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
              ruleResult: ruleResult,
              validator: item.ruleValidator,
              name: name
            });
            return ruleResult;
          });
          asyncResults.push(asyncResult);
        }
      });
      if (asyncResults.length) {
        result.complete = Promise.all(asyncResults).then(function (values) {
          return _this14._getAsyncRulesResult({
            result: result,
            values: values
          });
        });
      }
      return result;
    },
    _updateRuleConfig: function _updateRuleConfig(_ref2) {
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
            rule: rule,
            validator: validator,
            name: name
          });
        }
      }
    },
    _getPatchedRuleResult: function _getPatchedRuleResult(ruleResult) {
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
    _getAsyncRulesResult: function _getAsyncRulesResult(_ref3) {
      var _this15 = this;
      var values = _ref3.values,
          result = _ref3.result;
      (0, _iterator.each)(values, function (index, val) {
        if (val.isValid === false) {
          result.isValid = val.isValid;
          var rule = result.pendingRules[index];
          _this15._addBrokenRule({
            result: result,
            rule: rule
          });
        }
      });
      result.pendingRules = null;
      result.complete = null;
      result.status = result.isValid ? STATUS.valid : STATUS.invalid;
      return result;
    },
    registerValidatorInGroup: function registerValidatorInGroup(group, validator) {
      var groupConfig = ValidationEngine.addGroup(group);
      groupConfig.registerValidator.call(groupConfig, validator);
    },
    _shouldRemoveGroup: function _shouldRemoveGroup(group, validatorsInGroup) {
      var isDefaultGroup = group === undefined;
      var isValidationGroupInstance = group && group.NAME === 'dxValidationGroup';
      return !isDefaultGroup && !isValidationGroupInstance && !validatorsInGroup.length;
    },
    removeRegisteredValidator: function removeRegisteredValidator(group, validator) {
      var config = ValidationEngine.getGroupConfig(group);
      if (config) {
        config.removeRegisteredValidator.call(config, validator);
        var validatorsInGroup = config.validators;
        if (this._shouldRemoveGroup(group, validatorsInGroup)) {
          this.removeGroup(group);
        }
      }
    },
    initValidationOptions: function initValidationOptions(options) {
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
    synchronizeValidationOptions: function synchronizeValidationOptions(_ref4, options) {
      var name = _ref4.name,
          value = _ref4.value;
      switch (name) {
        case 'validationStatus':
          {
            var isValid = value === STATUS.valid || value === STATUS.pending;
            return options.isValid !== isValid ? {
              isValid: isValid
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
              validationError: validationError
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
    validateGroup: function validateGroup(group) {
      var groupConfig = ValidationEngine.getGroupConfig(group);
      if (!groupConfig) {
        throw _errors.default.Error('E0110');
      }
      return groupConfig.validate();
    },
    resetGroup: function resetGroup(group) {
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/class","../core/utils/extend","../core/utils/iterator","../core/events_strategy","../core/errors","../core/utils/common","../core/utils/type","../localization/number","../localization/message","../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/class"), require("../core/utils/extend"), require("../core/utils/iterator"), require("../core/events_strategy"), require("../core/errors"), require("../core/utils/common"), require("../core/utils/type"), require("../localization/number"), require("../localization/message"), require("../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=validation_engine.js.map