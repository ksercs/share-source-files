export class Validator {
  constructor(valueSelector, rules) {
    this.valueSelector = valueSelector;
    this.rules = rules;
  }
  validate(options) {
    const value = this.valueSelector(options);
    const errors = this.rules.reduce((result, rule) => {
      const validationResult = rule(value);
      if (validationResult !== true) {
        result[rule.name] = validationResult;
      }
      return result;
    }, {});
    return Object.keys(errors).length ? errors : true;
  }
}