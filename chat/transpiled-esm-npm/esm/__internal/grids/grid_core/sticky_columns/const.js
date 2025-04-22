export const STICKY_BORDER_WIDTH = 2;
export var StickyPosition;
(function (StickyPosition) {
  StickyPosition["Left"] = "left";
  StickyPosition["Right"] = "right";
  StickyPosition["Sticky"] = "sticky";
})(StickyPosition || (StickyPosition = {}));
export const CLASSES = {
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