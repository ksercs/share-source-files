/**
* DevExtreme (esm/exporter.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { fileSaver } from './exporter/file_saver';
import { imageCreator, testFormats, getData as getImageData } from './exporter/image_creator';
import { svgCreator, getData as getSvgData } from './exporter/svg_creator';
import { isFunction as _isFunction, isBoolean } from './core/utils/type';
import { Deferred } from './core/utils/deferred';
import { getData } from './exporter/pdf_creator';
function _export(data, options, getData) {
  if (!data) {
    return new Deferred().resolve();
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
  if (isBoolean(options.selectedRowsOnly)) {
    eventArgs.selectedRowsOnly = options.selectedRowsOnly;
  }
  _isFunction(exportingAction) && exportingAction(eventArgs);
  if (!eventArgs.cancel) {
    return getData(data, options).then(blob => {
      _isFunction(exportedAction) && exportedAction();
      if (_isFunction(fileSavingAction)) {
        eventArgs.data = blob;
        fileSavingAction(eventArgs);
      }
      if (!eventArgs.cancel) {
        var format = options.format === 'xlsx' ? 'EXCEL' : options.format;
        fileSaver.saveAs(eventArgs.fileName, format, blob);
      }
    });
  }
  return new Deferred().resolve();
}
export { _export as export, fileSaver };
export var image = {
  creator: imageCreator,
  getData: getImageData,
  testFormats: testFormats
};
export var pdf = {
  getData: getData
};
export var svg = {
  creator: svgCreator,
  getData: getSvgData
};
