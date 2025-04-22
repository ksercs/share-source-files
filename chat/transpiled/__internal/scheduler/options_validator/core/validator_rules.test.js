"use strict";

var _globals = require("@jest/globals");
var _validator_rules = require("../../../scheduler/options_validator/core/validator_rules");
(0, _globals.describe)('createValidatorRule', () => {
  (0, _globals.it)('should add the "name" property to the passed function', () => {
    const expectedResult = 'test-name';
    const result = (0, _validator_rules.createValidatorRule)(expectedResult, () => true);
    (0, _globals.expect)(result.name).toBe(expectedResult);
  });
});