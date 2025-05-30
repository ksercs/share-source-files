/**
* DevExtreme (cjs/__internal/core/license/license_validation.test.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _license_validation = require("./license_validation");
describe('license token', function () {
  it.each([{
    token: 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.DiDceRbil4IzXl5av7pNkKieyqHHhRf+CM477zDu4N9fyrhkQsjRourYvgVfkbSm+EQplkXhlMBc3s8Vm9n+VtPaMbeWXis92cdW/6HiT+Dm54xw5vZ5POGunKRrNYUzd9zTbYcz0bYA/dc/mHFeUdXA0UlKcx1uMaXmtJrkK74=',
    payload: {
      customerId: 'b1140b46-fde1-41bd-a280-4db9f8e7d9bd',
      maxVersionAllowed: 231
    }
  }, {
    token: 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjYxMjFmMDIyLTFjMTItNDNjZC04YWE0LTkwNzJkNDU4YjYxNCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMyCn0=.RENyZ3Ga5rCB7/XNKYbk2Ffv1n9bUexYNhyOlqcAD02YVnPw6XyQcN+ZORScKDU9gOInJ4o7vPxkgh10KvMZNn+FuBK8UcUR7kchk7z0CHGuOcIn2jD5X2hG6SYJ0UCBG/JDG35AL09T7Uv/pGj4PolRsANxtuMpoqmvX2D2vkU=',
    payload: {
      customerId: '6121f022-1c12-43cd-8aa4-9072d458b614',
      maxVersionAllowed: 232
    }
  }, {
    token: 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjM3Yjg4ZjBmLWQ0MmMtNDJiZS05YjhkLTU1ZGMwYzUzYzAxZiIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjIxCn0=.NVsilC5uWlD5QGS6bocLMlsVVK0VpZXYwU2DstUiLRpEI79/onuR8dGWasCLBo4PORDHPkNA/Ej8XeCHzJ0EkXRRZ7E2LrP/xlEfHRXTruvW4IEbZt3LiwJBt6/isLz+wzXtYtjV7tpE07/Y0TFoy+mWpHoU11GVtwKh6weRxkg=',
    payload: {
      customerId: '37b88f0f-d42c-42be-9b8d-55dc0c53c01f',
      maxVersionAllowed: 221
    }
  }])('verifies and decodes payload [%#]', function (_ref) {
    var token = _ref.token,
      expected = _ref.payload;
    var license = (0, _license_validation.parseToken)(token);
    expect(license.kind).toBe('verified');
    if (license.kind === 'verified') {
      expect(license.payload).toEqual(expected);
    }
  });
  it('verifies and decodes payload with extra fields', function () {
    var license = (0, _license_validation.parseToken)('ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxLAogICJleHRyYUZpZWxkIjogIkE5OTk5OTkiCn0=.fqm8mVhQ9+x/R7E7MVwUP3nJaYL3KldhYffVXdDqPVyHIQi66Z2XZ2RdygH4J0jvUpjhZ6yzmGPV0J0WoPbKyhtnY4ELhove/IAwpn8WGfRw3wLSxfR+RWuaKcw2yvlUA1JqrQUrIrN23UwNQodbJ/hGm30s0h1bf8zCvQ/d31k=');
    expect(license.kind).toBe('verified');
    if (license.kind === 'verified') {
      expect(license.payload).toEqual({
        customerId: 'b1140b46-fde1-41bd-a280-4db9f8e7d9bd',
        maxVersionAllowed: 231,
        extraField: 'A999999'
      });
    }
  });
  it('fails if payload is not verified', function () {
    var license = (0, _license_validation.parseToken)('ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.NVsilC5uWlD5QGS6bocLMlsVVK0VpZXYwU2DstUiLRpEI79/onuR8dGWasCLBo4PORDHPkNA/Ej8XeCHzJ0EkXRRZ7E2LrP/xlEfHRXTruvW4IEbZt3LiwJBt6/isLz+wzXtYtjV7tpE07/Y0TFoy+mWpHoU11GVtwKh6weRxkg=');
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('verification');
    }
  });
  it('fails if payload is invalid JSON', function () {
    var license = (0, _license_validation.parseToken)('YWJj.vjx6wAI9jVkHJAnKcsuYNZ5UvCq3UhypQ+0f+kZ37/Qc1uj4BM6//Kfi4SVsXGOaOTFYWgzesROnHCp3jZRqphJwal4yXHD1sGFi6FEdB4MgdgNZvsZSnxNWLs/7s07CzuHLTpJrAG7sTdHVkQWZNnSCKjzV7909c/Stl9+hkLo=');
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('deserialization');
    }
  });
  it('fails if payload is invalid Base64', function () {
    var license = (0, _license_validation.parseToken)('ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogIjM3Yjg4ZjBmLWQ0MmMtNDJiZS05YjhkLTU1ZGMwYzUzYzAxZiIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjIxCn0-.EnP/RDKg0eSyaPU1eDUFll1lqOdYbhN3u73LhN1op8vjNwA0P1vKiT1DfQRmXudlleGWgDkLA2OmJYUER8j7I3LSFf3hLkBAoWoBErgveTb2zkbz8P1i9lE+XmzIXeYHyZBYUt0IPkNfajF9zzbSDDin1CvW7pnADi0vIeZ5ICQ=');
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('decoding');
    }
  });
  it.each(['ewogICJmb3JtYXQiOiAxLAogICJtYXhWZXJzaW9uQWxsb3dlZCI6IDIzMQp9.WH30cajUFcKqw/fwt4jITM/5tzVwPpbdbezhhdBi5oeOvU06zKY0J4M8gQy8GQ++RPYVCAo2md6vI9D80FD2CC4w+hpQLJNJJgNUHYPrgG6CX1yAB3M+NKHsPP9S71bXAgwvignb5uPo0R5emQzr4RKDhWQMKtgqEcRe+yme2mU=', 'ewogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.ok32DBaAgf3ijLmNQb+A0kUV2AiSivqvZJADdF607qqlAaduAVnotJtgdwm/Ib3MErfaGrDohCYoFMnKQevkRxFkA7tK3kOBnTZPUnZY0r3wyulMQmr4Qo+Sjf/fyXs4IYpGsC7/uJjgrCos8uzBegfmgfM93XSt6pKl9+c5xvc=', 'ewogICJmb3JtYXQiOiAxLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIKfQ==.resgTqmazrorRNw7mmtV31XQnmTSw0uLEArsmpzCjWMQJLocBfAjpFvKBf+SAG9q+1iOSFySj64Uv2xBVqHnyeNVBRbouOKOnAB8RpkKvN4sc5SDc8JAG5TkwPVSzK/VLBpQxpqbxlcrRfHwz9gXqQoPt4/ZVATn285iw3DW0CU='])('fails if payload misses required fields [%#]', function (token) {
    var license = (0, _license_validation.parseToken)(token);
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('payload');
    }
  });
  it('fails if payload has unsupported version', function () {
    var license = (0, _license_validation.parseToken)('ewogICJmb3JtYXQiOiAyLAogICJjdXN0b21lcklkIjogImIxMTQwYjQ2LWZkZTEtNDFiZC1hMjgwLTRkYjlmOGU3ZDliZCIsCiAgIm1heFZlcnNpb25BbGxvd2VkIjogMjMxCn0=.tTBymZMROsYyMiP6ldXFqGurbzqjhSQIu/pjyEUJA3v/57VgToomYl7FVzBj1asgHpadvysyTUiX3nFvPxbp166L3+LB3Jybw9ueMnwePu5vQOO0krqKLBqRq+TqHKn7k76uYRbkCIo5UajNfzetHhlkin3dJf3x2K/fcwbPW5A=');
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('version');
    }
  });
  it.each(['', '.', 'a', 'a.', '.a', '.a.', '.a.', '.a.b', 'a.b.', '.a.b.'])('is not parsed from invalid input [%#]', function (invalidInput) {
    var license = (0, _license_validation.parseToken)(invalidInput);
    expect(license.kind).toBe('corrupted');
    if (license.kind === 'corrupted') {
      expect(license.error).toBe('general');
    }
  });
});
