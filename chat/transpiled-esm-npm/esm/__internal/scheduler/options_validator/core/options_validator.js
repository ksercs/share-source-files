export class OptionsValidator {
  constructor(validators) {
    this.validators = validators;
  }
  validate(options) {
    const errors = Object.entries(this.validators).reduce((result, _ref) => {
      let [validatorName, validator] = _ref;
      const validatorResult = validator.validate(options);
      if (validatorResult !== true) {
        result[validatorName] = validatorResult;
      }
      return result;
    }, {});
    return Object.keys(errors).length > 0 ? errors : true;
  }
}