/**
* DevExtreme (esm/integration/knockout/clean_node.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { afterCleanData, strategyChanging, cleanData } from '../../core/element_data';
// eslint-disable-next-line no-restricted-imports
import ko from 'knockout';
import { compare as compareVersion } from '../../core/utils/version';
import { getClosestNodeWithKoCreation } from './utils';
if (ko) {
  var originalKOCleanExternalData = ko.utils.domNodeDisposal.cleanExternalData;
  var patchCleanData = function patchCleanData() {
    afterCleanData(function (nodes) {
      var i;
      for (i = 0; i < nodes.length; i++) {
        nodes[i].cleanedByJquery = true;
      }
      for (i = 0; i < nodes.length; i++) {
        if (!nodes[i].cleanedByKo) {
          ko.cleanNode(nodes[i]);
        }
        delete nodes[i].cleanedByKo;
      }
      for (i = 0; i < nodes.length; i++) {
        delete nodes[i].cleanedByJquery;
      }
    });
    ko.utils.domNodeDisposal.cleanExternalData = function (node) {
      node.cleanedByKo = true;
      if (getClosestNodeWithKoCreation(node)) {
        if (!node.cleanedByJquery) {
          cleanData([node]);
        }
      }
    };
  };
  var restoreOriginCleanData = function restoreOriginCleanData() {
    afterCleanData(function () {});
    ko.utils.domNodeDisposal.cleanExternalData = originalKOCleanExternalData;
  };
  patchCleanData();
  strategyChanging.add(function (strategy) {
    var isJQuery = !!strategy.fn;
    if (isJQuery && compareVersion(strategy.fn.jquery, [2, 0]) < 0) {
      restoreOriginCleanData();
    }
  });
}
