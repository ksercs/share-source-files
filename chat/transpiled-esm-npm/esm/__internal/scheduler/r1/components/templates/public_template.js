import _extends from "@babel/runtime/helpers/esm/extends";
import { createFragment } from "inferno";
import { equalByValue } from '../../../../../core/utils/common';
import { getTemplate } from '../../../../core/r1/utils/index';
// eslint-disable-next-line @stylistic/comma-dangle
export const PublicTemplate = _ref => {
  let {
    template,
    templateProps,
    renderOptions
  } = _ref;
  if (template === undefined) {
    return createFragment();
  }
  const templateFn = getTemplate(template);
  const templatePropsWithComparer = _extends({}, templateProps, {
    data: _extends({}, templateProps.data ?? {}, {
      // NOTE Fix for the T1251590
      // template_wrapper extract isEqual from props.data.isEqual
      // and use it on the shouldComponentUpdateHook
      isEqual: (renderOptions === null || renderOptions === void 0 ? void 0 : renderOptions.propsComparer) ?? equalByValue
    })
  });
  return templateFn === null || templateFn === void 0 ? void 0 : templateFn(templatePropsWithComparer);
};