/**
* DevExtreme (cjs/localization/globalize/core.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globalize = _interopRequireDefault(require("globalize"));
var _core = _interopRequireDefault(require("../core"));
var _en = require("../cldr-data/en");
var _supplemental = require("../cldr-data/supplemental");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// eslint-disable-next-line no-restricted-imports

if (_globalize.default && _globalize.default.load) {
  if (!_globalize.default.locale()) {
    _globalize.default.load(_en.enCldr, _supplemental.supplementalCldr);
    _globalize.default.locale('en');
  }
  _core.default.inject({
    locale: function locale(_locale) {
      if (!_locale) {
        return _globalize.default.locale().locale;
      }
      _globalize.default.locale(_locale);
    }
  });
}
