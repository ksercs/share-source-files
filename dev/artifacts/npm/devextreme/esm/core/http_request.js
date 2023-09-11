/**
* DevExtreme (esm/core/http_request.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWindow } from './utils/window';
var window = getWindow();
import injector from './utils/dependency_injector';
var nativeXMLHttpRequest = {
  getXhr: function getXhr() {
    return new window.XMLHttpRequest();
  }
};
export default injector(nativeXMLHttpRequest);
