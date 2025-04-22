/**
* DevExtreme (esm/ui/gantt/ui.gantt.templates.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { getPublicElement } from '../../core/element';
export class GanttTemplatesManager {
  constructor(gantt) {
    this._gantt = gantt;
  }
  getTaskTooltipContentTemplateFunc(taskTooltipContentTemplateOption) {
    const isTooltipShowing = true;
    const template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
    const createTemplateFunction = template && ((container, item, callback) => {
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
    const isTooltipShowing = true;
    const template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
    const createTemplateFunction = template && ((container, item, callback) => {
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
    const isTooltipShowing = true;
    const template = taskTooltipContentTemplateOption && this._gantt._getTemplate(taskTooltipContentTemplateOption);
    const createTemplateFunction = template && ((container, item, callback) => {
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
    const isTaskShowing = true;
    const template = taskContentTemplateOption && this._gantt._getTemplate(taskContentTemplateOption);
    const createTemplateFunction = template && ((container, item, callback, index) => {
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
