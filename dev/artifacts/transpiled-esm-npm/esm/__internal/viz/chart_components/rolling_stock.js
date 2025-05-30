export class RollingStock {
  constructor(label, isRotated, shiftFunction) {
    var bBox = label.getBoundingRect();
    var {
      x
    } = bBox;
    var {
      y
    } = bBox;
    var endX = bBox.x + bBox.width;
    var endY = bBox.y + bBox.height;
    this.labels = [label];
    this.shiftFunction = shiftFunction;
    this.bBox = {
      start: isRotated ? x : y,
      width: isRotated ? bBox.width : bBox.height,
      end: isRotated ? endX : endY,
      oppositeStart: isRotated ? y : x,
      oppositeEnd: isRotated ? endY : endX
    };
    this.initialPosition = isRotated ? bBox.x : bBox.y;
  }
  toChain(nextRollingStock) {
    var nextRollingStockBBox = nextRollingStock.getBoundingRect();
    nextRollingStock.shift(nextRollingStockBBox.start - this.bBox.end);
    this.changeBoxWidth(nextRollingStockBBox.width);
    this.labels = this.labels.concat(nextRollingStock.labels);
  }
  getBoundingRect() {
    return this.bBox;
  }
  shift(shiftLength) {
    this.labels.forEach(label => {
      var bBox = label.getBoundingRect();
      var coords = this.shiftFunction(bBox, shiftLength);
      if (!label.hideInsideLabel(coords)) {
        label.shift(coords.x, coords.y);
      }
    });
    this.bBox.end -= shiftLength;
    this.bBox.start -= shiftLength;
  }
  setRollingStockInCanvas(canvas) {
    if (this.bBox.end > canvas.end) {
      this.shift(this.bBox.end - canvas.end);
    }
  }
  getLabels() {
    return this.labels;
  }
  value() {
    return this.labels[0].getData().value;
  }
  getInitialPosition() {
    return this.initialPosition;
  }
  changeBoxWidth(width) {
    this.bBox.end += width;
    this.bBox.width += width;
  }
}