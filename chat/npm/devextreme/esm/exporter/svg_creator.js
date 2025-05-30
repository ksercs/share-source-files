/**
* DevExtreme (esm/exporter/svg_creator.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../core/renderer';
import ajax from '../core/utils/ajax';
import { getWindow } from '../core/utils/window';
const window = getWindow();
import { isFunction } from '../core/utils/type';
import { each } from '../core/utils/iterator';
import svgUtils from '../__internal/core/utils/m_svg';
import { when, Deferred } from '../core/utils/deferred';
export const svgCreator = {
  _markup: '',
  _imageArray: {},
  _imageDeferreds: [],
  _getBinaryFile: function (src, callback) {
    ajax.sendRequest({
      url: src,
      method: 'GET',
      responseType: 'arraybuffer'
    }).done(callback).fail(function () {
      callback(false);
    });
  },
  _loadImages: function () {
    const that = this;
    each(that._imageArray, function (src) {
      const deferred = new Deferred();
      that._imageDeferreds.push(deferred);
      that._getBinaryFile(src, function (response) {
        if (!response) {
          delete that._imageArray[src]; // ToDo Warning
          deferred.resolve();
          return;
        }
        let i;
        let binary = '';
        const bytes = new Uint8Array(response);
        const length = bytes.byteLength;
        for (i = 0; i < length; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        that._imageArray[src] = 'data:image/png;base64,' + window.btoa(binary);
        deferred.resolve();
      });
    });
  },
  _parseImages: function (element) {
    let href;
    const that = this;
    if (element.tagName === 'image') {
      href = $(element).attr('href') || $(element).attr('xlink:href');
      if (!that._imageArray[href]) {
        that._imageArray[href] = '';
      }
    }
    each(element.childNodes, function (_, element) {
      that._parseImages(element);
    });
  },
  _prepareImages: function (svgElem) {
    this._parseImages(svgElem);
    this._loadImages();
    return when.apply($, this._imageDeferreds);
  },
  getData: function (data, options) {
    let markup;
    const that = this;
    const xmlVersion = '<?xml version="1.0" encoding="UTF-8" standalone="yes" ?>';
    const svgElem = svgUtils.getSvgElement(data);
    const $svgObject = $(svgElem);
    $svgObject.find(`[${svgUtils.HIDDEN_FOR_EXPORT}]`).remove();
    markup = xmlVersion + svgUtils.getSvgMarkup($svgObject.get(0), options.backgroundColor);
    return that._prepareImages(svgElem).then(() => {
      each(that._imageArray, function (href, dataURI) {
        const regexpString = `href=['|"]${href}['|"]`;
        markup = markup.replace(new RegExp(regexpString, 'gi'), `href="${dataURI}"`);
      });
      return isFunction(window.Blob) ? that._getBlob(markup) : that._getBase64(markup);
    });
  },
  _getBlob: function (markup) {
    return new window.Blob([markup], {
      type: 'image/svg+xml'
    });
  },
  _getBase64: function (markup) {
    return window.btoa(markup);
  }
};
export function getData(data, options) {
  return svgCreator.getData(data, options);
}
