/**
* DevExtreme (cjs/common/core/localization/globalize/core.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

var _globalize = _interopRequireDefault(require("globalize"));
var _core = _interopRequireDefault(require("../core"));
var _en = require("../cldr-data/en");
var _supplemental = require("../cldr-data/supplemental");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
// eslint-disable-next-line no-restricted-imports

if (_globalize.default && _globalize.default.load) {
  if (!_globalize.default.locale()) {
    _globalize.default.load(_en.enCldr, _supplemental.supplementalCldr);
    _globalize.default.locale('en');
  }
  _core.default.inject({
    locale: function (locale) {
      if (!locale) {
        return _globalize.default.locale().locale;
      }
      _globalize.default.locale(locale);
    }
  });
}
