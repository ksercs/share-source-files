/**
* DevExtreme (esm/renovation/ui/scheduler/workspaces/base/header_panel/date_header/layout.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _objectWithoutPropertiesLoose from "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose";
import _extends from "@babel/runtime/helpers/esm/extends";
var _excluded = ["dateCellTemplate", "dateHeaderData", "groupByDate", "groupOrientation", "groups", "timeCellTemplate"];
import { createFragment, createComponentVNode, normalizeProps } from "inferno";
import { Fragment } from 'inferno';
import { BaseInfernoComponent } from '@devextreme/runtime/inferno';
import { Row } from '../../row';
import { isHorizontalGroupingApplied } from '../../../utils';
import { DateHeaderCell } from './cell';
import getThemeType from '../../../../../../utils/getThemeType';
var {
  isMaterial
} = getThemeType();
export var viewFunction = _ref => {
  var {
    isHorizontalGrouping,
    props: {
      dateCellTemplate,
      dateHeaderData
    }
  } = _ref;
  var {
    dataMap,
    leftVirtualCellCount,
    leftVirtualCellWidth,
    rightVirtualCellCount,
    rightVirtualCellWidth
  } = dateHeaderData;
  return createFragment(dataMap.map((dateHeaderRow, rowIndex) => createComponentVNode(2, Row, {
    "className": "dx-scheduler-header-row",
    "leftVirtualCellWidth": leftVirtualCellWidth,
    "leftVirtualCellCount": leftVirtualCellCount,
    "rightVirtualCellWidth": rightVirtualCellWidth,
    "rightVirtualCellCount": rightVirtualCellCount,
    "isHeaderRow": true,
    children: dateHeaderRow.map(_ref2 => {
      var {
        colSpan,
        endDate,
        groupIndex,
        groups: cellGroups,
        index,
        isFirstGroupCell,
        isLastGroupCell,
        key,
        startDate,
        text,
        today
      } = _ref2;
      return createComponentVNode(2, DateHeaderCell, {
        "startDate": startDate,
        "endDate": endDate,
        "groups": isHorizontalGrouping ? cellGroups : undefined,
        "groupIndex": isHorizontalGrouping ? groupIndex : undefined,
        "today": today,
        "index": index,
        "text": text,
        "isFirstGroupCell": isFirstGroupCell,
        "isLastGroupCell": isLastGroupCell,
        "dateCellTemplate": dateCellTemplate,
        "colSpan": colSpan,
        "splitText": isMaterial
      }, key);
    })
  }, rowIndex.toString())), 0);
};
export var DateHeaderLayoutProps = {
  groupOrientation: 'horizontal',
  groupByDate: false,
  groups: Object.freeze([])
};
var getTemplate = TemplateProp => TemplateProp && (TemplateProp.defaultProps ? props => normalizeProps(createComponentVNode(2, TemplateProp, _extends({}, props))) : TemplateProp);
export class DateHeaderLayout extends BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get isHorizontalGrouping() {
    var {
      groupByDate,
      groupOrientation,
      groups
    } = this.props;
    return isHorizontalGroupingApplied(groups, groupOrientation) && !groupByDate;
  }
  get restAttributes() {
    var _this$props = this.props,
      restProps = _objectWithoutPropertiesLoose(_this$props, _excluded);
    return restProps;
  }
  render() {
    var props = this.props;
    return viewFunction({
      props: _extends({}, props, {
        dateCellTemplate: getTemplate(props.dateCellTemplate),
        timeCellTemplate: getTemplate(props.timeCellTemplate)
      }),
      isHorizontalGrouping: this.isHorizontalGrouping,
      restAttributes: this.restAttributes
    });
  }
}
DateHeaderLayout.defaultProps = DateHeaderLayoutProps;
