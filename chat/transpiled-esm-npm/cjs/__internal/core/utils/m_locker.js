"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Locker = void 0;
var _errors = _interopRequireDefault(require("../../../core/errors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const Locker = function () {
  const info = {};
  const currentCount = function (lockName) {
    return info[lockName] || 0;
  };
  return {
    obtain(lockName) {
      info[lockName] = currentCount(lockName) + 1;
    },
    release(lockName) {
      const count = currentCount(lockName);
      if (count < 1) {
        throw _errors.default.Error('E0014');
      }
      if (count === 1) {
        // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
        delete info[lockName];
      } else {
        info[lockName] = count - 1;
      }
    },
    locked(lockName) {
      return currentCount(lockName) > 0;
    }
  };
};
exports.Locker = Locker;