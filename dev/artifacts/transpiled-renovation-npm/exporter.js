"use strict";

exports.export = _export;
Object.defineProperty(exports, "fileSaver", {
  enumerable: true,
  get: function get() {
    return _file_saver.fileSaver;
  }
});
exports.svg = exports.pdf = exports.image = void 0;
var _file_saver = require("./exporter/file_saver");
var _image_creator = require("./exporter/image_creator");
var _svg_creator = require("./exporter/svg_creator");
var _type = require("./core/utils/type");
var _deferred = require("./core/utils/deferred");
var _pdf_creator = require("./exporter/pdf_creator");
function _export(data, options, getData) {
  if (!data) {
    return new _deferred.Deferred().resolve();
  }

  // TODO: Can the following actions be not defined? (since they are provided by a widget not by a user)
  var exportingAction = options.exportingAction;
  var exportedAction = options.exportedAction;
  var fileSavingAction = options.fileSavingAction;
  var eventArgs = {
    fileName: options.fileName,
    format: options.format,
    cancel: false
  };
  if ((0, _type.isBoolean)(options.selectedRowsOnly)) {
    eventArgs.selectedRowsOnly = options.selectedRowsOnly;
  }
  (0, _type.isFunction)(exportingAction) && exportingAction(eventArgs);
  if (!eventArgs.cancel) {
    return getData(data, options).then(function (blob) {
      (0, _type.isFunction)(exportedAction) && exportedAction();
      if ((0, _type.isFunction)(fileSavingAction)) {
        eventArgs.data = blob;
        fileSavingAction(eventArgs);
      }
      if (!eventArgs.cancel) {
        var format = options.format === 'xlsx' ? 'EXCEL' : options.format;
        _file_saver.fileSaver.saveAs(eventArgs.fileName, format, blob);
      }
    });
  }
  return new _deferred.Deferred().resolve();
}
var image = {
  creator: _image_creator.imageCreator,
  getData: _image_creator.getData,
  testFormats: _image_creator.testFormats
};
exports.image = image;
var pdf = {
  getData: _pdf_creator.getData
};
exports.pdf = pdf;
var svg = {
  creator: _svg_creator.svgCreator,
  getData: _svg_creator.getData
};
exports.svg = svg;