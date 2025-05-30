/**
* DevExtreme (esm/core/utils/public_component.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { data as elementData } from '../../core/element_data';
import eventsEngine from '../../events/core/events_engine';
import { isDefined } from './type';
import { removeEvent } from '../../events/remove';
var COMPONENT_NAMES_DATA_KEY = 'dxComponents';
var ANONYMOUS_COMPONENT_DATA_KEY = 'dxPrivateComponent';
var componentNames = new WeakMap();
var nextAnonymousComponent = 0;
var getName = function getName(componentClass, newName) {
  if (isDefined(newName)) {
    componentNames.set(componentClass, newName);
    return;
  }
  if (!componentNames.has(componentClass)) {
    var generatedName = ANONYMOUS_COMPONENT_DATA_KEY + nextAnonymousComponent++;
    componentNames.set(componentClass, generatedName);
    return generatedName;
  }
  return componentNames.get(componentClass);
};
export function attachInstanceToElement($element, componentInstance, disposeFn) {
  var data = elementData($element.get(0));
  var name = getName(componentInstance.constructor);
  data[name] = componentInstance;
  if (disposeFn) {
    eventsEngine.one($element, removeEvent, function () {
      disposeFn.call(componentInstance);
    });
  }
  if (!data[COMPONENT_NAMES_DATA_KEY]) {
    data[COMPONENT_NAMES_DATA_KEY] = [];
  }
  data[COMPONENT_NAMES_DATA_KEY].push(name);
}
export function getInstanceByElement($element, componentClass) {
  var name = getName(componentClass);
  return elementData($element.get(0), name);
}
export { getName as name };
