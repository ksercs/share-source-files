/**
* DevExtreme (esm/integration/jquery/element_data.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import jQuery from 'jquery';
import { setDataStrategy } from '../../core/element_data';
import useJQueryFn from './use_jquery';
var useJQuery = useJQueryFn();
if (useJQuery) {
  setDataStrategy(jQuery);
}
