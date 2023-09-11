/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/time_panel/cell.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["allDay", "ariaLabel", "children", "className", "contentTemplateProps", "endDate", "groupIndex", "groups", "index", "isFirstGroupCell", "isLastGroupCell", "startDate", "text", "timeCellTemplate"];
import { createVNode, createComponentVNode, normalizeProps } from "inferno";
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { CellBase as Cell, CellBaseProps } from '../cell';
export var viewFunction = _ref => {
  var {
    props: {
      className,
      isFirstGroupCell,
      isLastGroupCell,
      text,
      timeCellTemplate: TimeCellTemplate
    },
    timeCellTemplateProps
  } = _ref;
  return createComponentVNode(2, Cell, {
    "isFirstGroupCell": isFirstGroupCell,
    "isLastGroupCell": isLastGroupCell,
    "className": "dx-scheduler-time-panel-cell dx-scheduler-cell-sizes-vertical ".concat(className),
    children: [!TimeCellTemplate && createVNode(1, "div", null, text, 0), !!TimeCellTemplate && TimeCellTemplate({
      index: timeCellTemplateProps.index,
      data: timeCellTemplateProps.data
    })]
  });
};
export var TimePanelCellProps = CellBaseProps;
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class TimePanelCell extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.__getterCache = {};
  }
  get timeCellTemplateProps() {
    if (this.__getterCache['timeCellTemplateProps'] !== undefined) {
      return this.__getterCache['timeCellTemplateProps'];
    }
    return this.__getterCache['timeCellTemplateProps'] = (() => {
      var {
        groupIndex,
        groups,
        index,
        startDate,
        text
      } = this.props;
      return {
        data: {
          date: startDate,
          groups,
          groupIndex,
          text
        },
        index
      };
    })();
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  componentWillUpdate(nextProps, nextState, context) {
    if (this.props['groupIndex'] !== nextProps['groupIndex'] || this.props['groups'] !== nextProps['groups'] || this.props['index'] !== nextProps['index'] || this.props['startDate'] !== nextProps['startDate'] || this.props['text'] !== nextProps['text']) {
      this.__getterCache['timeCellTemplateProps'] = undefined;
    }
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        timeCellTemplate: getTemplate(props.timeCellTemplate)
      }),
      timeCellTemplateProps: this.timeCellTemplateProps,
      restAttributes: this.restAttributes
    });
  }
}
TimePanelCell.defaultProps = TimePanelCellProps;
