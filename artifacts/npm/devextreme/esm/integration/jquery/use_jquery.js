/**
* DevExtreme (esm/integration/jquery/use_jquery.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import jQuery from 'jquery';
import config from '../../core/config';
var useJQuery = config().useJQuery;
if (jQuery && useJQuery !== false) {
  config({
    useJQuery: true
  });
}
export default function () {
  return jQuery && config().useJQuery;
}
