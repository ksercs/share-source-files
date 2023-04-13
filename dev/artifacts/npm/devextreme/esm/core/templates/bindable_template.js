/**
* DevExtreme (esm/core/templates/bindable_template.js)
* Version: 23.1.1
* Build date: Thu Apr 13 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../renderer';
import { TemplateBase } from './template_base';
import eventsEngine from '../../events/core/events_engine';
import { removeEvent } from '../../events/remove';
import { isPrimitive } from '../utils/type';
var watchChanges = function () {
  var globalWatch = (data, watchMethod, callback) => watchMethod(() => data, callback);
  var fieldsWatch = function fieldsWatch(data, watchMethod, fields, fieldsMap, callback) {
    var resolvedData = {};
    var missedFields = fields.slice();
    var watchHandlers = fields.map(function (name) {
      var fieldGetter = fieldsMap[name];
      return watchMethod(fieldGetter ? () => fieldGetter(data) : () => data[name], function (value) {
        resolvedData[name] = value;
        if (missedFields.length) {
          var index = missedFields.indexOf(name);
          if (index >= 0) {
            missedFields.splice(index, 1);
          }
        }
        if (!missedFields.length) {
          callback(resolvedData);
        }
      });
    });
    return function () {
      watchHandlers.forEach(dispose => dispose());
    };
  };
  return function (rawData, watchMethod, fields, fieldsMap, callback) {
    var fieldsDispose;
    var globalDispose = globalWatch(rawData, watchMethod, function (dataWithRawFields) {
      fieldsDispose && fieldsDispose();
      if (isPrimitive(dataWithRawFields)) {
        callback(dataWithRawFields);
        return;
      }
      fieldsDispose = fieldsWatch(dataWithRawFields, watchMethod, fields, fieldsMap, callback);
    });
    return function () {
      fieldsDispose && fieldsDispose();
      globalDispose && globalDispose();
    };
  };
}();
export class BindableTemplate extends TemplateBase {
  constructor(render, fields, watchMethod, fieldsMap) {
    super();
    this._render = render;
    this._fields = fields;
    this._fieldsMap = fieldsMap || {};
    this._watchMethod = watchMethod;
  }
  _renderCore(options) {
    var $container = $(options.container);
    var dispose = watchChanges(options.model, this._watchMethod, this._fields, this._fieldsMap, data => {
      $container.empty();
      this._render($container, data, options.model);
    });
    eventsEngine.on($container, removeEvent, dispose);
    return $container.contents();
  }
}
