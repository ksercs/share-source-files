/**
* DevExtreme (esm/integration/knockout/components.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import ko from 'knockout';
import { getImageContainer } from '../../core/utils/icon';
if (ko) {
  ko.bindingHandlers.dxControlsDescendantBindings = {
    init: function (_, valueAccessor) {
      return {
        controlsDescendantBindings: ko.unwrap(valueAccessor())
      };
    }
  };
  ko.bindingHandlers.dxIcon = {
    init: function (element, valueAccessor) {
      const options = ko.utils.unwrapObservable(valueAccessor()) || {};
      const iconElement = getImageContainer(options);
      ko.virtualElements.emptyNode(element);
      if (iconElement) {
        ko.virtualElements.prepend(element, iconElement.get(0));
      }
    },
    update: function (element, valueAccessor) {
      const options = ko.utils.unwrapObservable(valueAccessor()) || {};
      const iconElement = getImageContainer(options);
      ko.virtualElements.emptyNode(element);
      if (iconElement) {
        ko.virtualElements.prepend(element, iconElement.get(0));
      }
    }
  };
  ko.virtualElements.allowedBindings.dxIcon = true;
}
