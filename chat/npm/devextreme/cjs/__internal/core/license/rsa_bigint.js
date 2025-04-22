/**
* DevExtreme (cjs/__internal/core/license/rsa_bigint.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.compareSignatures = compareSignatures;
function compareSignatures(args) {
  try {
    const zero = BigInt(0);
    const one = BigInt(1);
    const eight = BigInt(8);
    const modExp = (base, exponent, modulus) => {
      let result = one;
      let b = base;
      let e = exponent;
      while (e) {
        if (e & one) {
          // eslint-disable-line no-bitwise
          result = result * b % modulus;
        }
        b = b * b % modulus;
        e >>= one; // eslint-disable-line no-bitwise
      }
      return result;
    };
    const bigIntFromBytes = bytes => bytes.reduce((acc, cur) => (acc << eight) + BigInt(cur),
    // eslint-disable-line no-bitwise
    zero);
    const actual = bigIntFromBytes(args.actual);
    const signature = bigIntFromBytes(args.signature);
    const exponent = BigInt(args.key.e);
    const modulus = bigIntFromBytes(args.key.n);
    const expected = modExp(signature, exponent, modulus);
    return expected === actual;
  } catch {
    return true;
  }
}
