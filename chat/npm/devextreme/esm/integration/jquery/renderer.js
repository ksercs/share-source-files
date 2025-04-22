/**
* DevExtreme (esm/integration/jquery/renderer.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import jQuery from 'jquery';
import rendererBase from '../../core/renderer_base';
import useJQueryFn from './use_jquery';
const useJQuery = useJQueryFn();
if (useJQuery) {
  rendererBase.set(jQuery);
}
