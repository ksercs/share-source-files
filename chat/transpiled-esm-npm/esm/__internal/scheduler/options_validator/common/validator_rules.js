import { createValidatorRule } from '../core/index';
import { divisibleBy, greaterThan, inRange, isInteger, lessThan } from './validation_functions';
export const mustBeInteger = createValidatorRule('mustBeInteger', value => isInteger(value) || `${value} must be an integer.`);
export const mustBeGreaterThan = function (minimalValue) {
  let strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return createValidatorRule('mustBeGreaterThan', value => greaterThan(value, minimalValue, strict) || `${value} must be ${strict ? '>' : '>='} than ${minimalValue}.`);
};
export const mustBeLessThan = function (maximalValue) {
  let strict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  return createValidatorRule('mustBeLessThan', value => lessThan(value, maximalValue, strict) || `${value} must be ${strict ? '<' : '<='} than ${maximalValue}.`);
};
export const mustBeInRange = range => createValidatorRule('mustBeInRange', value => inRange(value, range) || `${value} must be in range [${range[0]}, ${range[1]}].`);
export const mustBeDivisibleBy = divider => createValidatorRule('mustBeDivisibleBy', value => divisibleBy(value, divider) || `${value} must be divisible by ${divider}.`);