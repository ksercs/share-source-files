/**
* DevExtreme (esm/renovation/ui/editors/common/text_editor_props.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { isMaterial, current } from '../../../../ui/themes';
export var TextEditorProps = {
  maxLength: null,
  spellCheck: false,
  valueChangeEvent: 'change',
  get stylingMode() {
    return isMaterial(current()) ? 'filled' : 'outlined';
  },
  defaultValue: ''
};
