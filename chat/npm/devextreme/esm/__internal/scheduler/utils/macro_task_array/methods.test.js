/**
* DevExtreme (esm/__internal/scheduler/utils/macro_task_array/methods.test.js)
* Version: 25.1.0
* Build date: Tue Apr 22 2025
*
* Copyright (c) 2012 - 2025 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import _extends from "@babel/runtime/helpers/esm/extends";
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import dispatcher from './dispatcher';
import { macroTaskArrayForEach, macroTaskArrayMap } from './methods';
jest.mock('./dispatcher', () => {
  const actualModule = jest.requireActual('./dispatcher');
  return _extends({}, actualModule.default, {
    schedule: jest.fn()
  });
});
const scheduleFnMock = jest.fn();
jest.useFakeTimers();
describe('Scheduler', () => {
  describe('MacroTaskArray', () => {
    describe('Methods', () => {
      beforeEach(() => {
        scheduleFnMock.mockReset();
        dispatcher.schedule = scheduleFnMock;
      });
      describe('macroTaskArrayForEach', () => {
        it.each([{
          arraySize: 10,
          step: 1,
          expectedCalls: 10
        }, {
          arraySize: 10,
          step: 2,
          expectedCalls: 5
        }, {
          arraySize: 10,
          step: 3,
          expectedCalls: 4
        }, {
          arraySize: 3,
          step: 4,
          expectedCalls: 1
        }, {
          arraySize: 0,
          step: 10,
          expectedCalls: 0
        }])('should split array into batches (arraySize = $arraySize | step = $step)', async _ref => {
          let {
            arraySize,
            step,
            expectedCalls
          } = _ref;
          await macroTaskArrayForEach(new Array(arraySize), jest.fn(), step);
          expect(scheduleFnMock).toHaveBeenCalledTimes(expectedCalls);
        });
        it.each([{
          arraySize: 10,
          step: 1
        }, {
          arraySize: 10,
          step: 2
        }, {
          arraySize: 10,
          step: 3
        }, {
          arraySize: 3,
          step: 4
        }, {
          arraySize: 0,
          step: 10
        }])('should call callback for each array item (arraySize = $arraySize | step = $step)', async _ref2 => {
          let {
            arraySize,
            step
          } = _ref2;
          const callbackMock = jest.fn();
          scheduleFnMock.mockImplementation(callback => {
            callback();
            return Promise.resolve();
          });
          const array = new Array(arraySize).fill(0).map((_, idx) => idx);
          await macroTaskArrayForEach(array, callbackMock, step);
          expect(callbackMock).toHaveBeenCalledTimes(arraySize);
          expect(callbackMock.mock.calls).toEqual(array.map(item => [item]));
        });
        it('should pass macroTaskTimeoutMs to dispatcher', async () => {
          const testDelayMs = 12345;
          await macroTaskArrayForEach(new Array(10), jest.fn(), 100, testDelayMs);
          expect(scheduleFnMock).toHaveBeenCalledTimes(1);
          expect(scheduleFnMock).toHaveBeenCalledWith(expect.anything(), testDelayMs);
        });
      });
      describe('macroTaskArrayMap', () => {
        it.each([{
          arraySize: 10,
          step: 1,
          expectedCalls: 10
        }, {
          arraySize: 10,
          step: 2,
          expectedCalls: 5
        }, {
          arraySize: 10,
          step: 3,
          expectedCalls: 4
        }, {
          arraySize: 3,
          step: 4,
          expectedCalls: 1
        }, {
          arraySize: 0,
          step: 10,
          expectedCalls: 0
        }])('should split array into batches (arraySize = $arraySize | step = $step)', async _ref3 => {
          let {
            arraySize,
            step,
            expectedCalls
          } = _ref3;
          await macroTaskArrayMap(new Array(arraySize), jest.fn(), step);
          expect(scheduleFnMock).toHaveBeenCalledTimes(expectedCalls);
        });
        it.each([{
          arraySize: 10,
          step: 1
        }, {
          arraySize: 10,
          step: 2
        }, {
          arraySize: 10,
          step: 3
        }, {
          arraySize: 3,
          step: 4
        }, {
          arraySize: 0,
          step: 10
        }])('should call callback for each array item (arraySize = $arraySize | step = $step)', async _ref4 => {
          let {
            arraySize,
            step
          } = _ref4;
          const callbackMock = jest.fn();
          scheduleFnMock.mockImplementation(callback => {
            callback();
            return Promise.resolve();
          });
          const array = new Array(arraySize).fill(0).map((_, idx) => idx);
          await macroTaskArrayMap(array, callbackMock, step);
          expect(callbackMock).toHaveBeenCalledTimes(arraySize);
          expect(callbackMock.mock.calls).toEqual(array.map(item => [item]));
        });
        it('should return mapped result', async () => {
          const callbackFn = item => `${item}_processed`;
          scheduleFnMock.mockImplementation(callback => {
            callback();
            return Promise.resolve();
          });
          const array = new Array(10).fill(0).map((_, idx) => idx);
          const result = await macroTaskArrayMap(array, callbackFn, 10);
          expect(result).toEqual(array.map(callbackFn));
        });
        it('should pass macroTaskTimeoutMs to dispatcher', async () => {
          const testDelayMs = 12345;
          await macroTaskArrayMap(new Array(10), jest.fn(), 100, testDelayMs);
          expect(scheduleFnMock).toHaveBeenCalledTimes(1);
          expect(scheduleFnMock).toHaveBeenCalledWith(expect.anything(), testDelayMs);
        });
      });
    });
  });
});
