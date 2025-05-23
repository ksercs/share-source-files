import { getSelectedCells } from '../../../renovation/ui/scheduler/workspaces/base/utils';
export default class CellsSelectionState {
  constructor(_viewDataProvider) {
    this._viewDataProvider = _viewDataProvider;
    this._focusedCell = null;
    this._selectedCells = null;
    this._firstSelectedCell = null;
    this._prevFocusedCell = null;
    this._prevSelectedCells = null;
  }
  get viewDataProvider() {
    return this._viewDataProvider;
  }
  get focusedCell() {
    var focusedCell = this._focusedCell;
    if (!focusedCell) {
      return undefined;
    }
    var {
      groupIndex,
      startDate,
      allDay
    } = focusedCell;
    var cellInfo = {
      groupIndex,
      startDate,
      isAllDay: allDay,
      index: focusedCell.index
    };
    var cellPosition = this.viewDataProvider.findCellPositionInMap(cellInfo);
    return {
      coordinates: cellPosition,
      cellData: focusedCell
    };
  }
  setFocusedCell(rowIndex, columnIndex, isAllDay) {
    if (rowIndex >= 0) {
      var cell = this._viewDataProvider.getCellData(rowIndex, columnIndex, isAllDay);
      this._focusedCell = cell;
    }
  }
  setSelectedCells(lastCellCoordinates) {
    var firstCellCoordinates = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : undefined;
    var viewDataProvider = this._viewDataProvider;
    var {
      rowIndex: lastRowIndex,
      columnIndex: lastColumnIndex,
      allDay: isLastCellAllDay
    } = lastCellCoordinates;
    if (lastRowIndex < 0) {
      return;
    }
    var firstCell = firstCellCoordinates ? viewDataProvider.getCellData(firstCellCoordinates.rowIndex, firstCellCoordinates.columnIndex, firstCellCoordinates.allDay) : this._firstSelectedCell;
    var lastCell = viewDataProvider.getCellData(lastRowIndex, lastColumnIndex, isLastCellAllDay);
    this._firstSelectedCell = firstCell;
    this._selectedCells = getSelectedCells(this._viewDataProvider, firstCell, lastCell, isLastCellAllDay);
  }
  setSelectedCellsByData(selectedCellsData) {
    this._selectedCells = selectedCellsData;
  }
  getSelectedCells() {
    return this._selectedCells;
  }
  releaseSelectedAndFocusedCells() {
    this.releaseSelectedCells();
    this.releaseFocusedCell();
  }
  releaseSelectedCells() {
    this._prevSelectedCells = this._selectedCells;
    this._prevFirstSelectedCell = this._firstSelectedCell;
    this._selectedCells = null;
    this._firstSelectedCell = null;
  }
  releaseFocusedCell() {
    this._prevFocusedCell = this._focusedCell;
    this._focusedCell = null;
  }
  restoreSelectedAndFocusedCells() {
    this._selectedCells = this._selectedCells || this._prevSelectedCells;
    this._focusedCell = this._focusedCell || this._prevFocusedCell;
    this._firstSelectedCell = this._firstSelectedCell || this._prevFirstSelectedCell;
    this._prevSelectedCells = null;
    this._prevFirstSelectedCell = null;
    this._prevFocusedCell = null;
  }
  clearSelectedAndFocusedCells() {
    this._prevSelectedCells = null;
    this._selectedCells = null;
    this._prevFocusedCell = null;
    this._focusedCell = null;
  }
}