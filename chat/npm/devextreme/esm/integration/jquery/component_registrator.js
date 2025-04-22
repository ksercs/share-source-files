/**
* DevExtreme (esm/integration/jquery/component_registrator.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
// eslint-disable-next-line no-restricted-imports
import jQuery from 'jquery';
import componentRegistratorCallbacks from '../../core/component_registrator_callbacks';
import errors from '../../core/errors';
if (jQuery) {
  const registerJQueryComponent = function (name, componentClass) {
    jQuery.fn[name] = function (options) {
      const isMemberInvoke = typeof options === 'string';
      let result;
      if (isMemberInvoke) {
        const memberName = options;
        const memberArgs = [].slice.call(arguments).slice(1);
        this.each(function () {
          const instance = componentClass.getInstance(this);
          if (!instance) {
            throw errors.Error('E0009', name);
          }
          const member = instance[memberName];
          const memberValue = member.apply(instance, memberArgs);
          if (result === undefined) {
            result = memberValue;
          }
        });
      } else {
        this.each(function () {
          const instance = componentClass.getInstance(this);
          if (instance) {
            instance.option(options);
          } else {
            new componentClass(this, options);
          }
        });
        result = this;
      }
      return result;
    };
  };
  componentRegistratorCallbacks.add(registerJQueryComponent);
}
