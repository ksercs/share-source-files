/**
* DevExtreme (cjs/integration/knockout/clean_node_old.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _knockout = _interopRequireDefault(require("knockout"));
var _version = require("../../core/utils/version");
var _element_data = require("../../core/element_data");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line no-restricted-imports

if (_knockout.default) {
  var patchCleanData = function patchCleanData(jQuery) {
    var cleanKoData = function cleanKoData(element, andSelf) {
      var cleanNode = function cleanNode() {
        _knockout.default.cleanNode(this);
      };
      if (andSelf) {
        element.each(cleanNode);
      } else {
        element.find('*').each(cleanNode);
      }
    };
    var originalEmpty = jQuery.fn.empty;
    jQuery.fn.empty = function () {
      cleanKoData(this, false);
      return originalEmpty.apply(this, arguments);
    };
    var originalRemove = jQuery.fn.remove;
    jQuery.fn.remove = function (selector, keepData) {
      if (!keepData) {
        var subject = this;
        if (selector) {
          subject = subject.filter(selector);
        }
        cleanKoData(subject, true);
      }
      return originalRemove.call(this, selector, keepData);
    };
    var originalHtml = jQuery.fn.html;
    jQuery.fn.html = function (value) {
      if (typeof value === 'string') {
        cleanKoData(this, false);
      }
      return originalHtml.apply(this, arguments);
    };
    var originalReplaceWith = jQuery.fn.replaceWith;
    jQuery.fn.replaceWith = function () {
      var result = originalReplaceWith.apply(this, arguments);
      if (!this.parent().length) {
        cleanKoData(this, true);
      }
      return result;
    };
  };
  _element_data.strategyChanging.add(function (strategy) {
    var isJQuery = !!strategy.fn;
    if (isJQuery && (0, _version.compare)(strategy.fn.jquery, [2, 0]) < 0) {
      patchCleanData(strategy);
    }
  });
}
