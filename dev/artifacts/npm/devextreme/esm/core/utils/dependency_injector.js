/**
* DevExtreme (esm/core/utils/dependency_injector.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { extend } from './extend';
import { isFunction } from './type';
import { each } from './iterator';
import Class from '../class';
export default function (object) {
  var BaseClass = Class.inherit(object);
  var InjectedClass = BaseClass;
  var instance = new InjectedClass(object);
  var initialFields = {};
  var injectFields = function injectFields(injectionObject, initial) {
    each(injectionObject, function (key) {
      if (isFunction(instance[key])) {
        if (initial || !object[key]) {
          object[key] = function () {
            return instance[key].apply(object, arguments);
          };
        }
      } else {
        if (initial) {
          initialFields[key] = object[key];
        }
        object[key] = instance[key];
      }
    });
  };
  injectFields(object, true);
  object.inject = function (injectionObject) {
    InjectedClass = InjectedClass.inherit(injectionObject);
    instance = new InjectedClass();
    injectFields(injectionObject);
  };
  object.resetInjection = function () {
    extend(object, initialFields);
    InjectedClass = BaseClass;
    instance = new BaseClass();
  };
  return object;
}
