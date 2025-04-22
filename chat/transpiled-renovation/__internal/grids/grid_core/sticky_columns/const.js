"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StickyPosition = exports.STICKY_BORDER_WIDTH = exports.CLASSES = void 0;
const STICKY_BORDER_WIDTH = exports.STICKY_BORDER_WIDTH = 2;
var StickyPosition;
(function (StickyPosition) {
  StickyPosition["Left"] = "left";
  StickyPosition["Right"] = "right";
  StickyPosition["Sticky"] = "sticky";
})(StickyPosition || (exports.StickyPosition = StickyPosition = {}));
const CLASSES = exports.CLASSES = {
  stickyColumn: 'sticky-column',
  stickyColumnLeft: 'sticky-column-left',
  stickyColumnRight: 'sticky-column-right',
  stickyColumnBorderRight: 'sticky-column-border-right',
  stickyColumnBorderLeft: 'sticky-column-border-left',
  stickyColumns: 'sticky-columns',
  firstHeader: 'first-header',
  columnNoBorder: 'column-no-border',
  groupRowContainer: 'group-row-container',
  focusedFixedElement: 'dx-focused-fixed-element',
  focused: 'dx-focused',
  hidden: 'dx-hidden'
};