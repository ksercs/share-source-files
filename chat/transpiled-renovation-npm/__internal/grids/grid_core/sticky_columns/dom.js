"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GridCoreStickyColumnsDom = void 0;
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _position = require("../../../../core/utils/position");
var _type = require("../../../../core/utils/type");
var _const = require("./const");
var _utils = require("./utils");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
const addStickyColumnBorderLeftClass = ($cell, addWidgetPrefix) => {
  $cell.addClass(addWidgetPrefix(_const.CLASSES.stickyColumnBorderLeft));
};
const addStickyColumnBorderRightClass = ($cell, addWidgetPrefix) => {
  $cell.addClass(addWidgetPrefix(_const.CLASSES.stickyColumnBorderRight));
};
const addStickyColumnClass = ($cell, fixedPosition, addWidgetPrefix) => {
  switch (fixedPosition) {
    case _const.StickyPosition.Right:
      $cell.addClass(addWidgetPrefix(_const.CLASSES.stickyColumnRight));
      break;
    case _const.StickyPosition.Sticky:
      $cell.addClass(addWidgetPrefix(_const.CLASSES.stickyColumn));
      break;
    default:
      $cell.addClass(addWidgetPrefix(_const.CLASSES.stickyColumnLeft));
  }
};
const toggleFirstHeaderClass = ($cell, value, addWidgetPrefix) => {
  $cell.toggleClass(addWidgetPrefix(_const.CLASSES.firstHeader), value);
};
const toggleColumnNoBorderClass = ($cell, value, addWidgetPrefix) => {
  $cell.toggleClass(addWidgetPrefix(_const.CLASSES.columnNoBorder), value);
};
const toggleStickyColumnsClass = ($element, hasStickyColumns, addWidgetPrefix) => {
  $element.toggleClass(addWidgetPrefix(_const.CLASSES.stickyColumns), hasStickyColumns);
};
const isStickyCellPinnedToLeft = ($cell, $container, addWidgetPrefix) => {
  const isStickyCell = $cell.hasClass(addWidgetPrefix(_const.CLASSES.stickyColumn));
  if (!isStickyCell) {
    return false;
  }
  const cellLeft = parseFloat($cell[0].style.left);
  const cellRect = (0, _position.getBoundingRect)($cell[0]);
  const containerRect = (0, _position.getBoundingRect)($container[0]);
  const calculatedCellLeft = cellRect.left - containerRect.left;
  return Math.round(cellLeft) >= Math.round(calculatedCellLeft);
};
const isStickyCellPinnedToRight = ($cell, $container, addWidgetPrefix) => {
  const isStickyCell = $cell.hasClass(addWidgetPrefix(_const.CLASSES.stickyColumn));
  if (!isStickyCell) {
    return false;
  }
  const cellRight = parseFloat($cell[0].style.right);
  const cellRect = (0, _position.getBoundingRect)($cell[0]);
  const containerRect = (0, _position.getBoundingRect)($container[0]);
  const calculatedCellRight = containerRect.right - cellRect.right;
  return Math.round(cellRight) >= Math.round(calculatedCellRight);
};
const isStickyCellPinned = ($cell, $container, addWidgetPrefix) => isStickyCellPinnedToLeft($cell, $container, addWidgetPrefix) || isStickyCellPinnedToRight($cell, $container, addWidgetPrefix);
const isFixedCellPinnedToRight = ($cell, $container, addWidgetPrefix) => $cell.hasClass(addWidgetPrefix(_const.CLASSES.stickyColumnRight)) || isStickyCellPinnedToRight($cell, $container, addWidgetPrefix);
const isLastLeftFixedCell = ($cell, addWidgetPrefix) => $cell.hasClass(addWidgetPrefix(_const.CLASSES.stickyColumnLeft)) && $cell.hasClass(addWidgetPrefix(_const.CLASSES.stickyColumnBorderRight));
const isFirstRightFixedCell = ($cell, addWidgetPrefix) => $cell.hasClass(addWidgetPrefix(_const.CLASSES.stickyColumnRight)) && $cell.hasClass(addWidgetPrefix(_const.CLASSES.stickyColumnBorderLeft));
const isStickyCell = ($cell, addWidgetPrefix) => $cell.hasClass(addWidgetPrefix(_const.CLASSES.stickyColumn));
const isFixedCell = ($cell, addWidgetPrefix) => $cell.hasClass(addWidgetPrefix(_const.CLASSES.stickyColumnLeft)) || $cell.hasClass(addWidgetPrefix(_const.CLASSES.stickyColumnRight)) || $cell.hasClass(addWidgetPrefix(_const.CLASSES.stickyColumn));
const getLeftFixedCells = ($cells, addWidgetPrefix) => $cells
// @ts-expect-error
.filter((_, cell) => (0, _renderer.default)(cell).hasClass(addWidgetPrefix(_const.CLASSES.stickyColumnLeft)));
const getRightFixedCells = ($cells, addWidgetPrefix) => $cells
// @ts-expect-error
.filter((_, cell) => (0, _renderer.default)(cell).hasClass(addWidgetPrefix(_const.CLASSES.stickyColumnRight)));
const getNonFixedAndStickyCells = ($cells, addWidgetPrefix) => $cells
// @ts-expect-error
.filter((_, cell) => (0, _renderer.default)(cell).hasClass(addWidgetPrefix(_const.CLASSES.stickyColumn)) || !isFixedCell((0, _renderer.default)(cell), addWidgetPrefix));
const getLastLeftFixedCell = ($cells, $container, addWidgetPrefix) => {
  // @ts-expect-error
  const rtlEnabled = $container.css('direction') === 'rtl';
  const processedCells = rtlEnabled ? $cells.toArray() : $cells.toArray().reverse();
  const lastLeftFixedCell = processedCells.find(cell => isStickyCellPinnedToLeft((0, _renderer.default)(cell), $container, addWidgetPrefix) || isLastLeftFixedCell((0, _renderer.default)(cell), addWidgetPrefix));
  return (0, _renderer.default)(lastLeftFixedCell ?? '');
};
const getFirstRightFixedCell = ($cells, $container, addWidgetPrefix) => {
  // @ts-expect-error
  const rtlEnabled = $container.css('direction') === 'rtl';
  const processedCells = rtlEnabled ? $cells.toArray().reverse() : $cells.toArray();
  const firstRightFixedCell = processedCells.find(cell => isStickyCellPinnedToRight((0, _renderer.default)(cell), $container, addWidgetPrefix) || isFirstRightFixedCell((0, _renderer.default)(cell), addWidgetPrefix));
  return (0, _renderer.default)(firstRightFixedCell ?? '');
};
const getNonFixedAreaBoundingRect = ($cells, $container, addWidgetPrefix) => {
  const containerRect = (0, _position.getBoundingRect)($container.get(0));
  const result = {
    left: containerRect.left,
    right: containerRect.right
  };
  if ($cells !== null && $cells !== void 0 && $cells.length) {
    const $lastLeftFixedCell = getLastLeftFixedCell($cells, $container, addWidgetPrefix);
    const $firstRightFixedCell = getFirstRightFixedCell($cells, $container, addWidgetPrefix);
    if ($lastLeftFixedCell !== null && $lastLeftFixedCell !== void 0 && $lastLeftFixedCell.length) {
      result.left = Math.round((0, _position.getBoundingRect)($lastLeftFixedCell[0]).right);
    }
    if ($firstRightFixedCell !== null && $firstRightFixedCell !== void 0 && $firstRightFixedCell.length) {
      result.right = Math.round((0, _position.getBoundingRect)($firstRightFixedCell[0]).left);
    }
  }
  return result;
};
const noNeedToCreateResizingPoint = (that, _ref, addWidgetPrefix) => {
  let {
    point,
    column,
    nextColumn
  } = _ref;
  const {
    item,
    isLeftBoundary,
    isRightBoundary
  } = point;
  const $item = (0, _renderer.default)(item);
  const offsetX = Math.round(point.x);
  const rtlEnabled = that.option('rtlEnabled');
  const isSplitPoint = (0, _type.isDefined)(isLeftBoundary) || (0, _type.isDefined)(isRightBoundary);
  const $cells = (0, _renderer.default)(that.getColumnElements() ?? '');
  const $container = (0, _renderer.default)(that.getContent());
  const isFixedPoint = (column === null || column === void 0 ? void 0 : column.fixed) && (nextColumn === null || nextColumn === void 0 ? void 0 : nextColumn.fixed);
  const nonFixedAreaBoundingRect = getNonFixedAreaBoundingRect($cells, $container, addWidgetPrefix);
  if (isFixedPoint || (0, _utils.isFixedEdge)(point, column, nextColumn)) {
    return false;
  }
  if (isSplitPoint) {
    if (isLastLeftFixedCell($item, addWidgetPrefix) || isStickyCellPinnedToLeft($item, $container, addWidgetPrefix)) {
      return isLeftBoundary;
    }
    if (isFirstRightFixedCell($item, addWidgetPrefix) || isStickyCellPinnedToRight($item, $container, addWidgetPrefix)) {
      return isRightBoundary;
    }
  }
  const isOutsideVisibleArea = offsetX < nonFixedAreaBoundingRect.left || offsetX > nonFixedAreaBoundingRect.right;
  const isPointBoundary = offsetX === nonFixedAreaBoundingRect.left || offsetX === nonFixedAreaBoundingRect.right;
  const isLastOrFirstPoint = rtlEnabled ? point.index === 0 : point.index === $cells.length;
  return isOutsideVisibleArea || !isLastOrFirstPoint && isPointBoundary;
};
const noNeedToCreateReorderingPoint = (point, $cells, $container, addWidgetPrefix) => {
  const {
    item,
    isLeftBoundary,
    isRightBoundary
  } = point;
  const $item = (0, _renderer.default)(item);
  const pointX = Math.round(point.x);
  const isSplitPoint = (0, _type.isDefined)(isLeftBoundary) || (0, _type.isDefined)(isRightBoundary);
  const nonFixedAreaBoundingRect = getNonFixedAreaBoundingRect($cells, $container, addWidgetPrefix);
  if (isStickyCellPinnedToLeft($item, $container, addWidgetPrefix)) {
    return isSplitPoint && !isLeftBoundary;
  }
  if (isStickyCellPinnedToRight($item, $container, addWidgetPrefix)) {
    return isSplitPoint && !isRightBoundary;
  }
  return pointX < nonFixedAreaBoundingRect.left || pointX > nonFixedAreaBoundingRect.right;
};
const doesGroupCellEndInFirstColumn = $groupCell => {
  const $groupRow = $groupCell.parent();
  const commandColumns = $groupRow.children().filter(i => i < $groupCell.index());
  const groupColSpanWithoutCommand = $groupCell.attr('colspan') - commandColumns.length;
  return groupColSpanWithoutCommand === 1;
};
const getScrollPadding = ($cells, $container, addWidgetPrefix) => {
  const containerRect = (0, _position.getBoundingRect)($container.get(0));
  const nonFixedAreaBoundingRect = getNonFixedAreaBoundingRect($cells, $container, addWidgetPrefix);
  return {
    left: nonFixedAreaBoundingRect.left - containerRect.left,
    right: containerRect.right - nonFixedAreaBoundingRect.right
  };
};
const isOutsideVisibleArea = ($element, $cells, $container, addWidgetPrefix) => {
  const elementRect = (0, _position.getBoundingRect)($element.get(0));
  const elementRectLeft = Math.round(elementRect.left);
  const elementRectRight = Math.round(elementRect.right);
  const nonFixedAreaBoundingRect = getNonFixedAreaBoundingRect($cells, $container, addWidgetPrefix);
  return elementRectLeft < nonFixedAreaBoundingRect.left || elementRectRight > nonFixedAreaBoundingRect.right;
};
const isLastCell = $cell => {
  if (!$cell.is('td')) {
    return false;
  }
  const $lastCell = $cell.parent().children().last();
  return $cell[0] === $lastCell[0];
};
const needToSkipHeaderCell = $cell => !$cell.is('[tabindex]');
const getNextHeaderCell = function ($cell) {
  let direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'next';
  let $nextCell = $cell;
  let $nextRow = $cell.parent();
  do {
    $nextCell = direction === 'next' ? $nextCell.next() : $nextCell.prev();
    if (!$nextCell.length) {
      $nextRow = direction === 'next' ? $nextRow.next() : $nextRow.prev();
      if ($nextRow.length) {
        $nextCell = direction === 'next' ? $nextRow.children().first() : $nextRow.children().last();
      }
    }
  } while ($nextCell.length && needToSkipHeaderCell($nextCell));
  return $nextCell;
};
const GridCoreStickyColumnsDom = exports.GridCoreStickyColumnsDom = {
  toggleFirstHeaderClass,
  toggleColumnNoBorderClass,
  addStickyColumnClass,
  addStickyColumnBorderLeftClass,
  addStickyColumnBorderRightClass,
  doesGroupCellEndInFirstColumn,
  toggleStickyColumnsClass,
  getLeftFixedCells,
  getRightFixedCells,
  getNonFixedAndStickyCells,
  getScrollPadding,
  getNextHeaderCell,
  noNeedToCreateResizingPoint,
  isFixedCellPinnedToRight,
  noNeedToCreateReorderingPoint,
  isFixedCell,
  isStickyCell,
  isStickyCellPinned,
  isOutsideVisibleArea,
  isLastCell
};