/**
* DevExtreme (esm/renovation/viz/sparklines/bullet.j.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import registerComponent from '../../../core/component_registrator';
import BaseComponent from '../../component_wrapper/common/component';
import { Bullet as BulletComponent } from './bullet';
export default class Bullet extends BaseComponent {
  _getActionConfigs() {
    return {
      onTooltipHidden: {},
      onTooltipShown: {}
    };
  }
  get _propsInfo() {
    return {
      twoWay: [['canvas', 'defaultCanvas', 'canvasChange']],
      allowNull: [],
      elements: [],
      templates: [],
      props: ['value', 'color', 'target', 'targetColor', 'targetWidth', 'showTarget', 'showZeroLevel', 'startScaleValue', 'endScaleValue', 'tooltip', 'onTooltipHidden', 'onTooltipShown', 'size', 'margin', 'disabled', 'rtlEnabled', 'classes', 'className', 'defaultCanvas', 'pointerEvents', 'canvasChange', 'canvas']
    };
  }
  get _viewComponent() {
    return BulletComponent;
  }
}
registerComponent('dxBullet', Bullet);
