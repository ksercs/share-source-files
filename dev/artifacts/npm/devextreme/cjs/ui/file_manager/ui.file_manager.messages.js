/**
* DevExtreme (cjs/ui/file_manager/ui.file_manager.messages.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

Object.defineProperty(exports, "ErrorCode", {
  enumerable: true,
  get: function get() {
    return _error_codes.default;
  }
});
exports.FileManagerMessages = void 0;
var _message = _interopRequireDefault(require("../../localization/message"));
var _error_codes = _interopRequireDefault(require("../../file_management/error_codes"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var FileManagerMessages = {
  get: function get(errorCode, args) {
    switch (errorCode) {
      case _error_codes.default.NoAccess:
        return _message.default.format('dxFileManager-errorNoAccess');
      case _error_codes.default.FileExists:
        return _message.default.format('dxFileManager-errorFileExistsFormat', args);
      case _error_codes.default.FileNotFound:
        return _message.default.format('dxFileManager-errorFileNotFoundFormat', args);
      case _error_codes.default.DirectoryExists:
        return _message.default.format('dxFileManager-errorDirectoryExistsFormat', args);
      case _error_codes.default.DirectoryNotFound:
        return _message.default.format('dxFileManager-errorDirectoryNotFoundFormat', args);
      case _error_codes.default.WrongFileExtension:
        return _message.default.format('dxFileManager-errorWrongFileExtension');
      case _error_codes.default.MaxFileSizeExceeded:
        return _message.default.format('dxFileManager-errorMaxFileSizeExceeded');
      case _error_codes.default.InvalidSymbols:
        return _message.default.format('dxFileManager-errorInvalidSymbols');
    }
    return _message.default.format('dxFileManager-errorDefault');
  }
};
exports.FileManagerMessages = FileManagerMessages;
