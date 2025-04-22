/**
* DevExtreme (esm/__internal/ui/html_editor/formats/m_font.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Quill from 'devextreme-quill';
// eslint-disable-next-line import/no-mutable-exports
let FontStyle = {};
if (Quill) {
  FontStyle = Quill.import('attributors/style/font');
  // @ts-expect-error
  FontStyle.whitelist = null;
}
export default FontStyle;
