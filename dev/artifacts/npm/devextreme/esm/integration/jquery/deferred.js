/**
* DevExtreme (esm/integration/jquery/deferred.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import jQuery from 'jquery';
import { setStrategy } from '../../core/utils/deferred';
import { compare as compareVersion } from '../../core/utils/version';
import useJQueryFn from './use_jquery';
var useJQuery = useJQueryFn();
if (useJQuery) {
  var Deferred = jQuery.Deferred;
  var strategy = {
    Deferred: Deferred
  };
  strategy.when = compareVersion(jQuery.fn.jquery, [3]) < 0 ? jQuery.when : function (singleArg) {
    if (arguments.length === 0) {
      return new Deferred().resolve();
    } else if (arguments.length === 1) {
      return singleArg && singleArg.then ? singleArg : new Deferred().resolve(singleArg);
    } else {
      return jQuery.when.apply(jQuery, arguments);
    }
  };
  setStrategy(strategy);
}
