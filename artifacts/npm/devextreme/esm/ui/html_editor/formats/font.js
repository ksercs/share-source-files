/**
* DevExtreme (esm/ui/html_editor/formats/font.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Quill from 'devextreme-quill';
var FontStyle = {};
if (Quill) {
  FontStyle = Quill.import('attributors/style/font');
  FontStyle.whitelist = null;
}
export default FontStyle;
