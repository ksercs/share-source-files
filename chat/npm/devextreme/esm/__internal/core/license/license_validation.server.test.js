/**
* DevExtreme (esm/__internal/core/license/license_validation.server.test.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/**
 * @jest-environment node
 */
import { afterEach, beforeEach, describe, expect, jest, test } from '@jest/globals';
import { setLicenseCheckSkipCondition, validateLicense } from './license_validation';
describe('license token', () => {
  beforeEach(() => {
    setLicenseCheckSkipCondition(false);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });
  test('API inside trial_panel should not be triggered on the server', () => {
    expect(() => validateLicense('', '1.0.4')).not.toThrow();
  });
  test('API inside trial_panel should not be triggered in Angular, where HTMLElement is mocked', () => {
    if (global.HTMLElement) {
      throw Error('Wrong environment for this test!');
    }
    try {
      // @ts-expect-error mocking HTMLElement with a symbol
      global.HTMLElement = Symbol('HTMLElement mock');
      expect(() => validateLicense('', '1.0.4')).not.toThrow();
    } finally {
      // @ts-expect-error removing the mock
      delete global.HTMLElement;
    }
  });
});
