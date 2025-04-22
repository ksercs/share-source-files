/**
* DevExtreme (esm/__internal/core/m_http_request.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import injector from '../../core/utils/dependency_injector';
import { getWindow } from '../../core/utils/window';
const window = getWindow();
const nativeXMLHttpRequest = {
  getXhr() {
    // @ts-expect-error no XMLHttpRequest on Window
    return new window.XMLHttpRequest();
  }
};
const httpRequest = injector(nativeXMLHttpRequest);
export { httpRequest };
