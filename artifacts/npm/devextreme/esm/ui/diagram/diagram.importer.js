/**
* DevExtreme (esm/ui/diagram/diagram.importer.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import Errors from '../widget/ui.errors';
import DiagramDefault, * as Diagram from 'devexpress-diagram';
export function getDiagram() {
  if (!DiagramDefault) {
    throw Errors.Error('E1041', 'devexpress-diagram');
  }
  return Diagram;
}
