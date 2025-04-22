/**
* DevExtreme (esm/integration/knockout/event_registrator.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import eventsEngine from '../../common/core/events/core/events_engine';
// eslint-disable-next-line no-restricted-imports
import ko from 'knockout';
import { isPlainObject } from '../../core/utils/type';
import eventRegistratorCallbacks from '../../common/core/events/core/event_registrator_callbacks';
import { addNamespace } from '../../common/core/events/utils/index';
if (ko) {
  eventRegistratorCallbacks.add(function (name) {
    const koBindingEventName = addNamespace(name, name + 'Binding');
    ko.bindingHandlers[name] = {
      update: function (element, valueAccessor, allBindingsAccessor, viewModel) {
        const $element = $(element);
        const unwrappedValue = ko.utils.unwrapObservable(valueAccessor());
        const eventSource = unwrappedValue.execute ? unwrappedValue.execute : unwrappedValue;
        eventsEngine.off($element, koBindingEventName);
        eventsEngine.on($element, koBindingEventName, isPlainObject(unwrappedValue) ? unwrappedValue : {}, function (e) {
          eventSource.call(viewModel, viewModel, e);
        });
      }
    };
  });
}
