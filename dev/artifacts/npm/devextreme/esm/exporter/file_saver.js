/**
* DevExtreme (esm/exporter/file_saver.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
/* global Windows */
import domAdapter from '../core/dom_adapter';
import { getWindow, getNavigator } from '../core/utils/window';
import errors from '../ui/widget/ui.errors';
import { isDefined, isFunction } from '../core/utils/type';
import { logger } from '../core/utils/console';
var window = getWindow();
var navigator = getNavigator();
var FILE_EXTESIONS = {
  EXCEL: 'xlsx',
  CSS: 'css',
  PNG: 'png',
  JPEG: 'jpeg',
  GIF: 'gif',
  SVG: 'svg',
  PDF: 'pdf'
};
export var MIME_TYPES = {
  CSS: 'text/css',
  EXCEL: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  PNG: 'image/png',
  JPEG: 'image/jpeg',
  GIF: 'image/gif',
  SVG: 'image/svg+xml',
  PDF: 'application/pdf'
};

// Use github.com/eligrey/FileSaver.js library instead this method

export var fileSaver = {
  _revokeObjectURLTimeout: 30000,
  _getDataUri: function _getDataUri(format, data) {
    var mimeType = this._getMimeType(format);
    return "data:".concat(mimeType, ";base64,").concat(data);
  },
  _getMimeType: function _getMimeType(format) {
    return MIME_TYPES[format] || 'application/octet-stream';
  },
  _linkDownloader: function _linkDownloader(fileName, href) {
    var exportLinkElement = domAdapter.createElement('a');
    exportLinkElement.download = fileName;
    exportLinkElement.href = href;
    exportLinkElement.target = '_blank'; // cors policy

    return exportLinkElement;
  },
  _winJSBlobSave: function _winJSBlobSave(blob, fileName, format) {
    var savePicker = new Windows.Storage.Pickers.FileSavePicker();
    savePicker.suggestedStartLocation = Windows.Storage.Pickers.PickerLocationId.documentsLibrary;
    var fileExtension = FILE_EXTESIONS[format];
    if (fileExtension) {
      var mimeType = this._getMimeType(format);
      savePicker.fileTypeChoices.insert(mimeType, ['.' + fileExtension]);
    }
    savePicker.suggestedFileName = fileName;
    savePicker.pickSaveFileAsync().then(function (file) {
      if (file) {
        file.openAsync(Windows.Storage.FileAccessMode.readWrite).then(function (outputStream) {
          var inputStream = blob.msDetachStream();
          Windows.Storage.Streams.RandomAccessStream.copyAsync(inputStream, outputStream).then(function () {
            outputStream.flushAsync().done(function () {
              inputStream.close();
              outputStream.close();
            });
          });
        });
      }
    });
  },
  _click: function _click(link) {
    try {
      // eslint-disable-next-line no-undef
      link.dispatchEvent(new MouseEvent('click', {
        cancelable: true
      }));
    } catch (e) {
      var event = domAdapter.getDocument().createEvent('MouseEvents');
      event.initMouseEvent('click', true, true, window, 0, 0, 0, 80, 20, false, false, false, false, 0, null);
      link.dispatchEvent(event);
    }
  },
  _saveBlobAs: function _saveBlobAs(fileName, format, data) {
    this._blobSaved = false;
    if (isDefined(navigator.msSaveOrOpenBlob)) {
      navigator.msSaveOrOpenBlob(data, fileName);
      this._blobSaved = true;
    } else if (isDefined(window.WinJS)) {
      this._winJSBlobSave(data, fileName, format);
      this._blobSaved = true;
    } else {
      var URL = window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL;
      if (isDefined(URL)) {
        var objectURL = URL.createObjectURL(data);
        var downloadLink = this._linkDownloader(fileName, objectURL);
        setTimeout(() => {
          URL.revokeObjectURL(objectURL);
          this._objectUrlRevoked = true;
        }, this._revokeObjectURLTimeout);
        this._click(downloadLink);
      } else {
        logger.warn('window.URL || window.webkitURL || window.mozURL || window.msURL || window.oURL is not defined');
      }
    }
  },
  saveAs: function saveAs(fileName, format, data) {
    var fileExtension = FILE_EXTESIONS[format];
    if (fileExtension) {
      fileName += '.' + fileExtension;
    }
    if (isFunction(window.Blob)) {
      this._saveBlobAs(fileName, format, data);
    } else {
      if (!isDefined(navigator.userAgent.match(/iPad/i))) errors.log('E1034');
      var downloadLink = this._linkDownloader(fileName, this._getDataUri(format, data));
      this._click(downloadLink);
    }
  }
};
