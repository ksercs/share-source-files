/**
* DevExtreme (cjs/viz/axes/datetime_breaks.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.generateDateBreaks = generateDateBreaks;
var _date = _interopRequireDefault(require("../../core/utils/date"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
var days = [0, 1, 2, 3, 4, 5, 6];
function getWeekendDays(workdays) {
  return days.filter(function (day) {
    return !workdays.some(function (workDay) {
      return workDay === day;
    });
  });
}
function getNextDayIndex(dayIndex) {
  return (dayIndex + 1) % 7;
}
function dayBetweenWeekend(weekend, day) {
  var start = weekend.start;
  var end = weekend.end;
  while (start !== end) {
    if (start === day) {
      return true;
    }
    start = getNextDayIndex(start);
  }
  return false;
}
function getDaysDistance(day, end) {
  var length = 0;
  while (day !== end) {
    day = getNextDayIndex(day);
    length++;
  }
  return length;
}
function separateBreak(scaleBreak, day) {
  var result = [];
  var dayEnd = new Date(day);
  dayEnd.setDate(day.getDate() + 1);
  if (day > scaleBreak.from) {
    result.push({
      from: scaleBreak.from,
      to: day
    });
  }
  if (dayEnd < scaleBreak.to) {
    result.push({
      from: dayEnd,
      to: scaleBreak.to
    });
  }
  return result;
}
function getWeekEndDayIndices(workDays) {
  var indices = getWeekendDays(workDays);
  if (indices.length < 7) {
    while (getNextDayIndex(indices[indices.length - 1]) === indices[0]) {
      indices.unshift(indices.pop());
    }
  }
  return indices;
}
function generateDateBreaksForWeekend(min, max, weekendDayIndices) {
  var day = min.getDate();
  var breaks = [];
  var weekends = weekendDayIndices.reduce(function (obj, day) {
    var currentWeekEnd = obj[1];
    if (currentWeekEnd.start === undefined) {
      currentWeekEnd = {
        start: day,
        end: getNextDayIndex(day)
      };
      obj[0].push(currentWeekEnd);
      return [obj[0], currentWeekEnd];
    } else if (currentWeekEnd.end === day) {
      currentWeekEnd.end = getNextDayIndex(day);
      return obj;
    }
    currentWeekEnd = {
      start: day,
      end: getNextDayIndex(day)
    };
    obj[0].push(currentWeekEnd);
    return [obj[0], currentWeekEnd];
  }, [[], {}]);
  weekends[0].forEach(function (weekend) {
    var currentDate = new Date(min);
    currentDate = _date.default.trimTime(currentDate);
    while (currentDate < max) {
      day = currentDate.getDay();
      var date = currentDate.getDate();
      if (dayBetweenWeekend(weekend, day)) {
        var from = new Date(currentDate);
        currentDate.setDate(date + getDaysDistance(day, weekend.end));
        var to = new Date(currentDate);
        breaks.push({
          from: from,
          to: to
        });
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
  });
  return breaks;
}
function excludeWorkDaysFromWeekEndBreaks(breaks, exactWorkDays) {
  var result = breaks.slice();
  var i;
  var processWorkDay = function processWorkDay(workday) {
    workday = _date.default.trimTime(new Date(workday));
    if (result[i].from <= workday && result[i].to > workday) {
      var separatedBreak = separateBreak(result[i], workday);
      if (separatedBreak.length === 2) {
        result.splice(i, 1, separatedBreak[0], separatedBreak[1]);
      } else if (separatedBreak.length === 1) {
        result.splice(i, 1, separatedBreak[0]);
      } else {
        result.splice(i, 1);
      }
    }
  };
  for (i = 0; i < result.length; i++) {
    exactWorkDays.forEach(processWorkDay);
  }
  return result;
}
function generateBreaksForHolidays(min, max, holidays, weekendDayIndices) {
  var day;
  var dayInWeekend = function dayInWeekend(dayIndex) {
    return dayIndex === day;
  };
  var adjustedMin = _date.default.trimTime(min);
  var adjustedMax = _date.default.trimTime(max);
  adjustedMax.setDate(max.getDate() + 1);
  return holidays.reduce(function (breaks, holiday) {
    var holidayStart;
    var holidayEnd;
    holiday = new Date(holiday);
    day = holiday.getDay();
    if (!weekendDayIndices.some(dayInWeekend) && holiday >= adjustedMin && holiday <= adjustedMax) {
      holidayStart = _date.default.trimTime(holiday);
      holidayEnd = new Date(holidayStart);
      holidayEnd.setDate(holidayStart.getDate() + 1);
      breaks.push({
        from: holidayStart,
        to: holidayEnd
      });
    }
    return breaks;
  }, []);
}
function calculateGaps(breaks) {
  return breaks.map(function (b) {
    return {
      from: b.from,
      to: b.to,
      gapSize: _date.default.convertMillisecondsToDateUnits(b.to - b.from)
    };
  });
}
function generateDateBreaks(min, max, workWeek, singleWorkdays, holidays) {
  var weekendDayIndices = getWeekEndDayIndices(workWeek);
  var breaks = generateDateBreaksForWeekend(min, max, weekendDayIndices);
  breaks.push.apply(breaks, generateBreaksForHolidays(min, max, holidays || [], weekendDayIndices));
  return calculateGaps(excludeWorkDaysFromWeekEndBreaks(breaks, singleWorkdays || []));
}
