/**
* DevExtreme (esm/integration/angular/event_registrator.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import eventRegistratorCallbacks from '../../events/core/event_registrator_callbacks';
import eventsEngine from '../../events/core/events_engine';
import ngModule from './module';
// eslint-disable-next-line no-restricted-imports
import angular from 'angular';
if (angular) {
  eventRegistratorCallbacks.add(function (name) {
    var ngEventName = name.slice(0, 2) + name.charAt(2).toUpperCase() + name.slice(3);
    ngModule.directive(ngEventName, ['$parse', function ($parse) {
      return function (scope, element, attr) {
        var attrValue = attr[ngEventName].trim();
        var handler;
        var eventOptions = {};
        if (attrValue.charAt(0) === '{') {
          eventOptions = scope.$eval(attrValue);
          handler = $parse(eventOptions.execute);
        } else {
          handler = $parse(attr[ngEventName]);
        }
        eventsEngine.on(element, name, eventOptions, function (e) {
          scope.$apply(function () {
            handler(scope, {
              $event: e
            });
          });
        });
      };
    }]);
  });
}
