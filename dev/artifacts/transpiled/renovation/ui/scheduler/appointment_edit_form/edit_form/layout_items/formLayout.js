"use strict";

exports.getFormLayoutConfig = void 0;
var _description = require("./description");
var _const = require("./const");
var _dateBoxGroup = require("./groups/dateBoxGroup");
var _switchGroup = require("./groups/switchGroup");
var LayoutGroupNames = {
  Main: 'mainGroup',
  Recurrence: 'recurrenceGroup'
};
var createMainItems = function createMainItems(dataExpr, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate, allDayEditorTemplate, repeatEditorTemplate, descriptionEditorTemplate) {
  return [{
    dataField: dataExpr.textExpr,
    editorType: 'dxTextBox',
    colSpan: 2,
    label: {
      text: _const.ItemLabels.subject
    }
  }, (0, _dateBoxGroup.getDateBoxGroupConfig)(dataExpr, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate), (0, _switchGroup.getSwitchGroupConfig)(allDayEditorTemplate, repeatEditorTemplate, dataExpr.allDayExpr), {
    itemType: 'empty',
    colSpan: 2
  }, (0, _description.getDescriptionLayoutItemConfig)(descriptionEditorTemplate, dataExpr.descriptionExpr, _const.ItemLabels.description), {
    itemType: 'empty',
    colSpan: 2
  }];
};
var getMainLayout = function getMainLayout(colSpan, dateExpr, recurrenceEditorVisibility, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate, allDayEditorTemplate, repeatEditorTemplate, descriptionEditorTemplate) {
  return [{
    itemType: 'group',
    name: LayoutGroupNames.Main,
    colCountByScreen: {
      lg: 2,
      xs: 1
    },
    colSpan,
    items: createMainItems(dateExpr, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate, allDayEditorTemplate, repeatEditorTemplate, descriptionEditorTemplate)
  }, {
    itemType: 'group',
    name: LayoutGroupNames.Recurrence,
    visible: recurrenceEditorVisibility,
    colSpan,
    items: []
  }];
};
var getFormLayoutConfig = function getFormLayoutConfig(fieldExpr, formData, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate, allDayEditorTemplate, repeatEditorTemplate, descriptionEditorTemplate) {
  var recurrenceEditorVisibility = !!formData[fieldExpr.recurrenceRuleExpr];
  var colSpan = recurrenceEditorVisibility ? 1 : 2;
  return getMainLayout(colSpan, fieldExpr, recurrenceEditorVisibility, allowTimeZoneEditing, startDateEditorTemplate, endDateEditorTemplate, startDatetimeZoneEditorTemplate, endDateTimeZoneEditorTemplate, allDayEditorTemplate, repeatEditorTemplate, descriptionEditorTemplate);
};
exports.getFormLayoutConfig = getFormLayoutConfig;