/**
* DevExtreme (esm/integration/jquery/renderer.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import jQuery from 'jquery';
import rendererBase from '../../core/renderer_base';
import useJQueryFn from './use_jquery';
var useJQuery = useJQueryFn();
if (useJQuery) {
  rendererBase.set(jQuery);
}
