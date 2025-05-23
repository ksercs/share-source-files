/**
* DevExtreme (esm/renovation/ui/box/box.j.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import BaseComponent from '../../component_wrapper/common/component';
import { Box as BoxComponent } from './box';
export default class Box extends BaseComponent {
  get _propsInfo() {
    return {
      twoWay: [],
      allowNull: [],
      elements: [],
      templates: [],
      props: ['direction', 'align', 'crossAlign']
    };
  }
  get _viewComponent() {
    return BoxComponent;
  }
}
registerComponent('dxBox', Box);
