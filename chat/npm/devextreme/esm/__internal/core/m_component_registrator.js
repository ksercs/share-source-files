/**
* DevExtreme (esm/__internal/core/m_component_registrator.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import callbacks from '../../core/component_registrator_callbacks';
import errors from '../../core/errors';
import $ from '../../core/renderer';
import { name as publicComponentName } from '../../core/utils/public_component';
const registerComponent = function (name, namespace, componentClass) {
  if (!componentClass) {
    componentClass = namespace;
  } else {
    namespace[name] = componentClass;
  }
  publicComponentName(componentClass, name);
  callbacks.fire(name, componentClass);
};
const registerRendererComponent = function (name, componentClass) {
  // @ts-expect-error 'fn' does not exist on type '(selector?: string | Element | dxElementWrapper | undefined) => dxElementWrapper'
  $.fn[name] = function (options) {
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
          // eslint-disable-next-line new-cap, no-new
          new componentClass(this, options);
        }
      });
      result = this;
    }
    return result;
  };
};
callbacks.add(registerRendererComponent);
export { registerComponent };
