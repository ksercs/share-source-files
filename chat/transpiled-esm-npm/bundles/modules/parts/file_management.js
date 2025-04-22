"use strict";

var _core = _interopRequireDefault(require("./core"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
/* eslint-disable import/no-commonjs */

/// BUNDLER_PARTS
/* fileManagement (dx.module-core.js) */

const fileManagement = require('../../../bundles/modules/file_management');
_core.default.fileManagement = fileManagement;

/// BUNDLER_PARTS_END

module.exports = fileManagement;