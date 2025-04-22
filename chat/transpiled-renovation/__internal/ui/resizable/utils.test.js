"use strict";

var _globals = require("@jest/globals");
var _utils = require("./utils");
_globals.jest.mock('@js/core/utils/size', () => ({
  getOuterWidth: _ref => {
    let {
      outerWidth
    } = _ref;
    return outerWidth;
  },
  getInnerWidth: _ref2 => {
    let {
      innerWidth
    } = _ref2;
    return innerWidth;
  },
  getOuterHeight: _ref3 => {
    let {
      outerHeight
    } = _ref3;
    return outerHeight;
  },
  getInnerHeight: _ref4 => {
    let {
      innerHeight
    } = _ref4;
    return innerHeight;
  },
  getOffset: _ref5 => {
    let {
      top,
      left
    } = _ref5;
    return {
      left,
      top
    };
  }
}));
const window = {
  innerWidth: 101,
  innerHeight: 102,
  pageXOffset: 90,
  pageYOffset: 101
};
// NOTE: for the "isWindow" check
window.window = window;
(0, _globals.describe)('Utils', () => {
  (0, _globals.describe)('getMovingSides', () => {
    (0, _globals.it)('should detect top side', () => {
      let el = {
        className: 'dx-resizable-handle-corner-top-left'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        top: true
      });
      el = {
        className: 'dx-resizable-handle-top'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        top: true
      });
      el = {
        className: 'dx-resizable-handle-corner-top-right'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        top: true
      });
    });
    (0, _globals.it)('should detect bottom side', () => {
      let el = {
        className: 'dx-resizable-handle-bottom'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        bottom: true
      });
      el = {
        className: 'dx-resizable-handle-corner-bottom-left'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        bottom: true
      });
      el = {
        className: 'dx-resizable-handle-corner-bottom-right'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        bottom: true
      });
    });
    (0, _globals.it)('should detect right side', () => {
      let el = {
        className: 'dx-resizable-handle-right'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        right: true
      });
      el = {
        className: 'dx-resizable-handle-corner-top-right'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        right: true
      });
      el = {
        className: 'dx-resizable-handle-corner-bottom-right'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        right: true
      });
    });
    (0, _globals.it)('should detect left side', () => {
      let el = {
        className: 'dx-resizable-handle-left'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        left: true
      });
      el = {
        className: 'dx-resizable-handle-corner-top-left'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        left: true
      });
      el = {
        className: 'dx-resizable-handle-corner-bottom-left'
      };
      (0, _globals.expect)((0, _utils.getMovingSides)(el)).toMatchObject({
        left: true
      });
    });
  });
  (0, _globals.describe)('Get area', () => {
    const emptyEl = {
      outerWidth: 0,
      outerHeight: 0,
      innerWidth: 0,
      innerHeight: 0,
      style: {
        borderLeftWidth: '0',
        borderTopWidth: '0'
      }
    };
    (0, _globals.describe)('getAreaFromElement', () => {
      (0, _globals.it)('should exclude resizable element\'s border width', () => {
        const areaEl = {
          innerWidth: 101,
          innerHeight: 102,
          left: 10,
          top: 50,
          style: {
            borderLeftWidth: '0',
            borderTopWidth: '0'
          }
        };
        const resizableEl = {
          innerWidth: 30,
          innerHeight: 40,
          outerWidth: 32,
          outerHeight: 44,
          style: {
            borderLeftWidth: '5',
            borderTopWidth: '6'
          }
        };
        (0, _globals.expect)((0, _utils.getAreaFromElement)(areaEl, resizableEl)).toEqual({
          width: 39,
          height: 18,
          offset: {
            left: 15,
            top: 56
          }
        });
      });
      (0, _globals.it)('should include area element\'s left/top border width', () => {
        const areaEl = {
          innerWidth: 101,
          innerHeight: 102,
          left: 10,
          top: 50,
          style: {
            borderLeftWidth: '5',
            borderTopWidth: '6'
          }
        };
        (0, _globals.expect)((0, _utils.getAreaFromElement)(areaEl, emptyEl)).toEqual({
          width: 101,
          height: 102,
          offset: {
            left: 15,
            top: 56
          }
        });
      });
      (0, _globals.it)('should ignore offset if element is window', () => {
        (0, _globals.expect)((0, _utils.getAreaFromElement)(window, emptyEl)).toEqual({
          width: 101,
          height: 102,
          offset: {
            left: 0,
            top: 0
          }
        });
      });
      (0, _globals.it)('should get area from element innerWidth/innerHeight/offset ', () => {
        const areaEl = {
          innerWidth: 101,
          innerHeight: 102,
          top: 22,
          left: 33,
          style: {
            borderLeftWidth: '0',
            borderTopWidth: '0'
          }
        };
        (0, _globals.expect)((0, _utils.getAreaFromElement)(areaEl, emptyEl)).toEqual({
          width: 101,
          height: 102,
          offset: {
            left: 33,
            top: 22
          }
        });
      });
    });
    (0, _globals.describe)('getAreaFromObject', () => {
      (0, _globals.it)('should exclude resizable element\'s border width', () => {
        const resizableEl = {
          innerWidth: 10,
          innerHeight: 12,
          outerWidth: 5,
          outerHeight: 10,
          style: {
            borderLeftWidth: '2',
            borderTopWidth: '3'
          }
        };
        (0, _globals.expect)((0, _utils.getAreaFromObject)({
          left: 30,
          top: 40,
          right: 80,
          bottom: 70
        }, resizableEl)).toEqual({
          width: 35,
          height: 8,
          offset: {
            left: 32,
            top: 43
          }
        });
      });
      (0, _globals.it)('should build area from the object', () => {
        (0, _globals.expect)((0, _utils.getAreaFromObject)({
          left: 3,
          top: 4,
          right: 5,
          bottom: 7
        }, emptyEl)).toEqual({
          width: 2,
          height: 3,
          offset: {
            left: 3,
            top: 4
          }
        });
      });
    });
  });
  (0, _globals.describe)('getDragOffsets', () => {
    (0, _globals.it)('should calculate drag limitations by area size and handle element size', () => {
      const handleEl = {
        outerWidth: 4,
        outerHeight: 6,
        left: 30,
        top: 30
      };
      const area = {
        width: 10,
        height: 20,
        offset: {
          left: 0,
          top: 0
        }
      };
      (0, _globals.expect)((0, _utils.getDragOffsets)(area, handleEl, {})).toEqual({
        maxLeftOffset: 30,
        maxRightOffset: -24,
        maxTopOffset: 30,
        maxBottomOffset: -16
      });
    });
    (0, _globals.it)('should take into account area\'s offset', () => {
      const handleEl = {
        outerWidth: 4,
        outerHeight: 6,
        left: 30,
        top: 30
      };
      const area = {
        width: 10,
        height: 20,
        offset: {
          left: 5,
          top: 6
        }
      };
      (0, _globals.expect)((0, _utils.getDragOffsets)(area, handleEl, {})).toEqual({
        maxLeftOffset: 25,
        maxRightOffset: -19,
        maxTopOffset: 24,
        maxBottomOffset: -10
      });
    });
    (0, _globals.it)('should take into account window\'s page offset', () => {
      const handleEl = {
        outerWidth: 4,
        outerHeight: 6,
        left: 30,
        top: 30
      };
      const area = {
        width: 10,
        height: 20,
        offset: {
          left: 0,
          top: 0
        }
      };
      (0, _globals.expect)((0, _utils.getDragOffsets)(area, handleEl, window)).toEqual({
        maxBottomOffset: 85,
        maxLeftOffset: -60,
        maxRightOffset: 66,
        maxTopOffset: -71
      });
    });
  });
  (0, _globals.describe)('filterOffsets', () => {
    (0, _globals.it)('should exclude horizontal offset if top/bottom handle used', () => {
      const offset = {
        x: 100,
        y: 200
      };
      const handleEl = {
        className: 'dx-resizable-handle-right'
      };
      (0, _globals.expect)((0, _utils.filterOffsets)(offset, handleEl)).toEqual({
        x: 100,
        y: 0
      });
    });
    (0, _globals.it)('should exclude vertical offset if left/right handle used', () => {
      const offset = {
        x: 100,
        y: 200
      };
      const handleEl = {
        className: 'dx-resizable-handle-bottom'
      };
      (0, _globals.expect)((0, _utils.filterOffsets)(offset, handleEl)).toEqual({
        x: 0,
        y: 200
      });
    });
    (0, _globals.it)('should include all offsets for corner handle', () => {
      const offset = {
        x: 100,
        y: 200
      };
      const handleEl = {
        className: 'dx-resizable-handle-corner-top-right'
      };
      (0, _globals.expect)((0, _utils.filterOffsets)(offset, handleEl)).toEqual({
        x: 100,
        y: 200
      });
    });
    (0, _globals.it)('should return zero if handle in not used', () => {
      const offset = {
        x: 100,
        y: 100
      };
      const handleEl = {
        className: ''
      };
      (0, _globals.expect)((0, _utils.filterOffsets)(offset, handleEl)).toEqual({
        x: 0,
        y: 0
      });
    });
  });
});