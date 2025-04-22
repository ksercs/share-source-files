/**
* DevExtreme (esm/__internal/scheduler/appointments/utils/countVisibleAppointments.test.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { describe, expect, it } from '@jest/globals';
import { countVisibleAppointments } from './countVisibleAppointments';
describe('countVisibleAppointments', () => {
  it('should return correct number of visible appointments', () => {
    expect(countVisibleAppointments([{
      needRepaint: true,
      needRemove: false,
      settings: [{}, {}, {}]
    }, {
      needRepaint: true,
      needRemove: true,
      settings: [{}, {}, {}]
    }, {
      needRepaint: true,
      needRemove: false,
      settings: [{}]
    }])).toBe(4);
  });
  it('should return correct number of visible appointments with parts', () => {
    expect(countVisibleAppointments([{
      needRepaint: true,
      needRemove: false,
      settings: [{
        partIndex: 1,
        partTotalCount: 2
      }, {}, {
        partIndex: 0,
        partTotalCount: 2
      }, {
        partIndex: 1,
        partTotalCount: 2
      }, {}, {
        partIndex: 0,
        partTotalCount: 2
      }]
    }, {
      needRepaint: true,
      needRemove: true,
      settings: [{}, {}, {}]
    }, {
      needRepaint: true,
      needRemove: false,
      settings: [{
        partIndex: 0,
        partTotalCount: 2
      }]
    }])).toBe(6);
  });
});
