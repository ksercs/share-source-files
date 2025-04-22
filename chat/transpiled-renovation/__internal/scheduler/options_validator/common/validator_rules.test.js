"use strict";

var _globals = require("@jest/globals");
var _validator_rules = require("../../../scheduler/options_validator/common/validator_rules");
var validationFunctions = _interopRequireWildcard(require("./validation_functions"));
function _getRequireWildcardCache(e) { if ("function" != typeof WeakMap) return null; var r = new WeakMap(), t = new WeakMap(); return (_getRequireWildcardCache = function (e) { return e ? t : r; })(e); }
function _interopRequireWildcard(e, r) { if (!r && e && e.__esModule) return e; if (null === e || "object" != typeof e && "function" != typeof e) return { default: e }; var t = _getRequireWildcardCache(r); if (t && t.has(e)) return t.get(e); var n = { __proto__: null }, a = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) { var i = a ? Object.getOwnPropertyDescriptor(e, u) : null; i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u]; } return n.default = e, t && t.set(e, n), n; }
(0, _globals.describe)('mustBeInteger', () => {
  const mock = _globals.jest.spyOn(validationFunctions, 'isInteger');
  (0, _globals.afterEach)(() => {
    mock === null || mock === void 0 || mock.mockReset();
  });
  (0, _globals.it)('should call isInteger function', () => {
    (0, _validator_rules.mustBeInteger)(10);
    (0, _globals.expect)(mock).toHaveBeenCalledWith(10);
  });
  (0, _globals.it)('should return true if valid', () => {
    mock === null || mock === void 0 || mock.mockImplementation(() => true);
    const result = (0, _validator_rules.mustBeInteger)(10);
    (0, _globals.expect)(result).toBe(true);
  });
  (0, _globals.it)('should return error (string) if invalid', () => {
    mock === null || mock === void 0 || mock.mockImplementation(() => false);
    const result = (0, _validator_rules.mustBeInteger)(10.5);
    (0, _globals.expect)(result).toBe('10.5 must be an integer.');
  });
  (0, _globals.it)('should be the function with the correct name', () => {
    const func = _validator_rules.mustBeInteger;
    (0, _globals.expect)(func.name).toBe('mustBeInteger');
  });
});
(0, _globals.describe)('mustBeGreaterThan', () => {
  const mock = _globals.jest.spyOn(validationFunctions, 'greaterThan');
  (0, _globals.afterEach)(() => {
    mock === null || mock === void 0 || mock.mockReset();
  });
  (0, _globals.it)('should call greaterThan function', () => {
    const func = (0, _validator_rules.mustBeGreaterThan)(10, true);
    func(15);
    (0, _globals.expect)(mock).toHaveBeenCalledWith(15, 10, true);
  });
  (0, _globals.it)('should return true if valid', () => {
    mock === null || mock === void 0 || mock.mockImplementation(() => true);
    const func = (0, _validator_rules.mustBeGreaterThan)(10, true);
    const result = func(15);
    (0, _globals.expect)(result).toBe(true);
  });
  (0, _globals.it)('should return error (string) if invalid with strict: true', () => {
    mock === null || mock === void 0 || mock.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeGreaterThan)(15, true);
    const result = func(10);
    (0, _globals.expect)(result).toBe('10 must be > than 15.');
  });
  (0, _globals.it)('should return error (string) if invalid with strict: false', () => {
    mock === null || mock === void 0 || mock.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeGreaterThan)(15, false);
    const result = func(10);
    (0, _globals.expect)(result).toBe('10 must be >= than 15.');
  });
  (0, _globals.it)('should be the function with the correct name', () => {
    const func = (0, _validator_rules.mustBeGreaterThan)(15, false);
    (0, _globals.expect)(func.name).toBe('mustBeGreaterThan');
  });
});
(0, _globals.describe)('mustBeLessThan', () => {
  const mock = _globals.jest.spyOn(validationFunctions, 'lessThan');
  (0, _globals.afterEach)(() => {
    mock === null || mock === void 0 || mock.mockReset();
  });
  (0, _globals.it)('should call lessThan function', () => {
    const func = (0, _validator_rules.mustBeLessThan)(10, true);
    func(5);
    (0, _globals.expect)(mock).toHaveBeenCalledWith(5, 10, true);
  });
  (0, _globals.it)('should return true if valid', () => {
    mock === null || mock === void 0 || mock.mockImplementation(() => true);
    const func = (0, _validator_rules.mustBeLessThan)(10, true);
    const result = func(5);
    (0, _globals.expect)(result).toBe(true);
  });
  (0, _globals.it)('should return error (string) if invalid with strict: true', () => {
    mock === null || mock === void 0 || mock.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeLessThan)(10, true);
    const result = func(15);
    (0, _globals.expect)(result).toBe('15 must be < than 10.');
  });
  (0, _globals.it)('should return error (string) if invalid with strict: false', () => {
    mock === null || mock === void 0 || mock.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeLessThan)(10, false);
    const result = func(15);
    (0, _globals.expect)(result).toBe('15 must be <= than 10.');
  });
  (0, _globals.it)('should be the function with the correct name', () => {
    const func = (0, _validator_rules.mustBeLessThan)(15, false);
    (0, _globals.expect)(func.name).toBe('mustBeLessThan');
  });
});
(0, _globals.describe)('mustBeInRange', () => {
  const mock = _globals.jest.spyOn(validationFunctions, 'inRange');
  (0, _globals.afterEach)(() => {
    mock === null || mock === void 0 || mock.mockReset();
  });
  (0, _globals.it)('should call inRange function', () => {
    const func = (0, _validator_rules.mustBeInRange)([0, 10]);
    func(5);
    (0, _globals.expect)(mock).toHaveBeenCalledWith(5, [0, 10]);
  });
  (0, _globals.it)('should return true if valid', () => {
    mock === null || mock === void 0 || mock.mockImplementation(() => true);
    const func = (0, _validator_rules.mustBeInRange)([0, 10]);
    const result = func(5);
    (0, _globals.expect)(result).toBe(true);
  });
  (0, _globals.it)('should return error (string) if invalid ', () => {
    mock === null || mock === void 0 || mock.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeInRange)([0, 10]);
    const result = func(15);
    (0, _globals.expect)(result).toBe('15 must be in range [0, 10].');
  });
  (0, _globals.it)('should be the function with the correct name', () => {
    const func = (0, _validator_rules.mustBeInRange)([0, 10]);
    (0, _globals.expect)(func.name).toBe('mustBeInRange');
  });
});
(0, _globals.describe)('mustBeDivisibleBy', () => {
  let mock = _globals.jest.spyOn(validationFunctions, 'divisibleBy');
  (0, _globals.beforeEach)(() => {
    mock = _globals.jest.spyOn(validationFunctions, 'divisibleBy');
  });
  (0, _globals.afterEach)(() => {
    var _mock;
    (_mock = mock) === null || _mock === void 0 || _mock.mockReset();
  });
  (0, _globals.it)('should call divisibleBy function', () => {
    const func = (0, _validator_rules.mustBeDivisibleBy)(10);
    func(100);
    (0, _globals.expect)(mock).toHaveBeenCalledWith(100, 10);
  });
  (0, _globals.it)('should return true if valid', () => {
    var _mock2;
    (_mock2 = mock) === null || _mock2 === void 0 || _mock2.mockImplementation(() => true);
    const func = (0, _validator_rules.mustBeDivisibleBy)(5);
    const result = func(10);
    (0, _globals.expect)(result).toBe(true);
  });
  (0, _globals.it)('should return error (string) if invalid ', () => {
    var _mock3;
    (_mock3 = mock) === null || _mock3 === void 0 || _mock3.mockImplementation(() => false);
    const func = (0, _validator_rules.mustBeDivisibleBy)(5);
    const result = func(6);
    (0, _globals.expect)(result).toBe('6 must be divisible by 5.');
  });
  (0, _globals.it)('should be the function with the correct name', () => {
    const func = (0, _validator_rules.mustBeDivisibleBy)(5);
    (0, _globals.expect)(func.name).toBe('mustBeDivisibleBy');
  });
});