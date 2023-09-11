/**
* DevExtreme (esm/renovation/utils/type_conversion.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
export function toNumber(attribute) {
  return attribute ? Number(attribute.replace('px', '')) : 0;
}
