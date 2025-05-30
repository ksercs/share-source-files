/**
* DevExtreme (cjs/viz/range_selector/range_view.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.RangeView = RangeView;
// TODO: Move it inside the "SeriesDataSource"
function drawSeriesView(root, seriesDataSource, canvas, isAnimationEnabled) {
  var seriesList = seriesDataSource.getSeries();
  if (!seriesList.length) {
    return;
  }
  var valueAxis = seriesList[0].getValueAxis();
  valueAxis.updateCanvas({
    top: canvas.top,
    bottom: 0,
    height: canvas.height + canvas.top
  });
  seriesDataSource.adjustSeriesDimensions();
  var valueRange = seriesDataSource.getBoundRange().val;
  valueRange.sortCategories(valueAxis.getCategoriesSorter());
  valueAxis.setBusinessRange(valueRange);
  seriesList.forEach(function (series) {
    series._extGroups.seriesGroup = series._extGroups.labelsGroup = root;
    series.draw(isAnimationEnabled);
  });
}
function merge(a, b) {
  return a !== undefined ? a : b;
}
function RangeView(params) {
  this._params = params;
  this._clipRect = params.renderer.clipRect();
  params.root.attr({
    'clip-path': this._clipRect.id
  });
}
RangeView.prototype = {
  constructor: RangeView,
  update: function update(backgroundOption, backgroundTheme, canvas, isCompactMode, isAnimationEnabled, seriesDataSource) {
    var renderer = this._params.renderer;
    var root = this._params.root;
    var canvasWidth = canvas.width - canvas.left;
    var seriesGroup;
    backgroundOption = backgroundOption || {};
    root.clear();
    this._clipRect.attr({
      x: canvas.left,
      y: canvas.top,
      width: canvasWidth,
      height: canvas.height
    });
    if (!isCompactMode) {
      if (merge(backgroundOption.visible, backgroundTheme.visible)) {
        if (backgroundOption.color) {
          renderer.rect(canvas.left, canvas.top, canvasWidth + 1, canvas.height).attr({
            // Seems that "backgroundTheme.color" is never used and so can be removed both from here and from themes
            // TODO: Check it (special attention to WidgetsGallery) and remove the option
            fill: merge(backgroundOption.color, backgroundTheme.color),
            'class': 'dx-range-selector-background'
          }).append(root);
        }
        if (backgroundOption.image && backgroundOption.image.url) {
          renderer.image(canvas.left, canvas.top, canvasWidth + 1, canvas.height, backgroundOption.image.url, merge(backgroundOption.image.location, backgroundTheme.image.location)).append(root);
        }
      }
      if (seriesDataSource && seriesDataSource.isShowChart()) {
        seriesGroup = renderer.g().attr({
          'class': 'dxrs-series-group'
        }).append(root);
        drawSeriesView(seriesGroup, seriesDataSource, canvas, isAnimationEnabled);
      }
    }
  }
};
