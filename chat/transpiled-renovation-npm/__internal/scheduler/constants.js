"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.VIEW_TYPES = exports.VIEWS = exports.VERTICAL_GROUP_ORIENTATION = exports.TIMELINE_VIEWS = exports.LIST_ITEM_DATA_KEY = exports.LIST_ITEM_CLASS = exports.HORIZONTAL_GROUP_ORIENTATION = exports.APPOINTMENT_SETTINGS_KEY = void 0;
const LIST_ITEM_DATA_KEY = exports.LIST_ITEM_DATA_KEY = 'dxListItemData';
const LIST_ITEM_CLASS = exports.LIST_ITEM_CLASS = 'dx-list-item';
const APPOINTMENT_SETTINGS_KEY = exports.APPOINTMENT_SETTINGS_KEY = 'dxAppointmentSettings';
const VERTICAL_GROUP_ORIENTATION = exports.VERTICAL_GROUP_ORIENTATION = 'vertical';
const HORIZONTAL_GROUP_ORIENTATION = exports.HORIZONTAL_GROUP_ORIENTATION = 'horizontal';
const VIEWS = exports.VIEWS = {
  DAY: 'day',
  WEEK: 'week',
  WORK_WEEK: 'workWeek',
  MONTH: 'month',
  TIMELINE_DAY: 'timelineDay',
  TIMELINE_WEEK: 'timelineWeek',
  TIMELINE_WORK_WEEK: 'timelineWorkWeek',
  TIMELINE_MONTH: 'timelineMonth',
  AGENDA: 'agenda'
};
const VIEW_TYPES = exports.VIEW_TYPES = Object.values(VIEWS);
const TIMELINE_VIEWS = exports.TIMELINE_VIEWS = [VIEWS.TIMELINE_DAY, VIEWS.TIMELINE_WEEK, VIEWS.TIMELINE_WORK_WEEK, VIEWS.TIMELINE_MONTH];