/**
* DevExtreme (esm/integration/knockout/event_registrator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import eventsEngine from '../../events/core/events_engine';
// eslint-disable-next-line no-restricted-imports
import ko from 'knockout';
import { isPlainObject } from '../../core/utils/type';
import eventRegistratorCallbacks from '../../events/core/event_registrator_callbacks';
import { addNamespace } from '../../events/utils/index';
if (ko) {
  eventRegistratorCallbacks.add(function (name) {
    var koBindingEventName = addNamespace(name, name + 'Binding');
    ko.bindingHandlers[name] = {
      update: function update(element, valueAccessor, allBindingsAccessor, viewModel) {
        var $element = $(element);
        var unwrappedValue = ko.utils.unwrapObservable(valueAccessor());
        var eventSource = unwrappedValue.execute ? unwrappedValue.execute : unwrappedValue;
        eventsEngine.off($element, koBindingEventName);
        eventsEngine.on($element, koBindingEventName, isPlainObject(unwrappedValue) ? unwrappedValue : {}, function (e) {
          eventSource.call(viewModel, viewModel, e);
        });
      }
    };
  });
}
