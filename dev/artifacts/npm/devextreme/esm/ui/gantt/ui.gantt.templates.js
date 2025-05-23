/**
* DevExtreme (esm/ui/gantt/ui.gantt.templates.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { getPublicElement } from '../../core/element';
export class GanttTemplatesManager {
  constructor(gantt) {
    this._gantt = gantt;
  }
  getTaskTooltipContentTemplateFunc(taskTooltipContentTemplateOption) {
    var isTooltipShowing = true;
    var template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
    var createTemplateFunction = template && ((container, item, callback) => {
      template.render({
        model: this._gantt.getTaskDataByCoreData(item),
        container: getPublicElement($(container)),
        onRendered: () => {
          callback();
        }
      });
      return isTooltipShowing;
    });
    return createTemplateFunction;
  }
  getTaskProgressTooltipContentTemplateFunc(taskTooltipContentTemplateOption) {
    var isTooltipShowing = true;
    var template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
    var createTemplateFunction = template && ((container, item, callback) => {
      template.render({
        model: item,
        container: getPublicElement($(container)),
        onRendered: () => {
          callback();
        }
      });
      return isTooltipShowing;
    });
    return createTemplateFunction;
  }
  getTaskTimeTooltipContentTemplateFunc(taskTooltipContentTemplateOption) {
    var isTooltipShowing = true;
    var template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
    var createTemplateFunction = template && ((container, item, callback) => {
      template.render({
        model: item,
        container: getPublicElement($(container)),
        onRendered: () => {
          callback();
        }
      });
      return isTooltipShowing;
    });
    return createTemplateFunction;
  }
  getTaskContentTemplateFunc(taskContentTemplateOption) {
    var isTaskShowing = true;
    var template = taskContentTemplateOption && this._gantt._getTemplate(taskContentTemplateOption);
    var createTemplateFunction = template && ((container, item, callback, index) => {
      item.taskData = this._gantt.getTaskDataByCoreData(item.taskData);
      template.render({
        model: item,
        container: getPublicElement($(container)),
        onRendered: () => {
          callback(container, index);
        }
      });
      return isTaskShowing;
    });
    return createTemplateFunction;
  }
}
