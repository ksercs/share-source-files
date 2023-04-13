import _extends from "@babel/runtime/helpers/esm/extends";
var isHeader = rect => (rect === null || rect === void 0 ? void 0 : rect.sourceCellInfo.gridCell.rowType) === 'header';
var spitMultiPageRows = (rectsToPatch, isCurrentPageContainsOnlyHeader, firstRectYAdjustment, splitMultiPageRowFunc, checkIsFitToPageFunc) => {
  var [newPageRects, remainPageRects] = splitMultiPageRowFunc(isCurrentPageContainsOnlyHeader, rectsToPatch);
  var newPageRectsArray = [isCurrentPageContainsOnlyHeader ? newPageRects.map(rect => _extends({}, rect, {
    y: firstRectYAdjustment
  })) : newPageRects];
  while (!checkIsFitToPageFunc(false, remainPageRects[0].h)) {
    [newPageRects, remainPageRects] = splitMultiPageRowFunc(false, remainPageRects);
    newPageRectsArray.push(newPageRects);
  }
  return [newPageRectsArray, remainPageRects];
};
var patchRects = (rectsToSplit, rectsToPatch, remainPageRects) => {
  rectsToPatch.forEach((rect, rectIndex) => {
    rect.sourceCellInfo.text = remainPageRects[rectIndex].sourceCellInfo.text;
    rect.h = remainPageRects[rectIndex].h;
  });
  var untouchedRowIdx = rectsToSplit.indexOf(rectsToPatch[rectsToPatch.length - 1]) + 1;
  if (untouchedRowIdx >= rectsToSplit.length) {
    return;
  }
  var delta = rectsToSplit[untouchedRowIdx].y - (rectsToPatch[0].y + remainPageRects[0].h);
  for (var idx = untouchedRowIdx; idx < rectsToSplit.length; idx++) {
    rectsToSplit[idx].y = rectsToSplit[idx].y - delta;
  }
};
export var checkPageContainsOnlyHeader = (pageRects, isFirstPage) => isFirstPage && isHeader(pageRects[pageRects.length - 1]);
export var getMultiPageRowPages = (currentPageRects, rectsToSplit, isCurrentPageContainsOnlyHeader, splitMultiPageRowFunc, checkIsFitToPageFunc) => {
  if (!splitMultiPageRowFunc) {
    return [];
  }
  var currentPageLastRect = currentPageRects[currentPageRects.length - 1];
  var nextPageFirstRect = rectsToSplit[currentPageRects.length];
  if (!nextPageFirstRect || isHeader(nextPageFirstRect)) {
    return [];
  }
  var isRectsFitsToPage = checkIsFitToPageFunc(isCurrentPageContainsOnlyHeader, nextPageFirstRect.h);
  if (isRectsFitsToPage && !isCurrentPageContainsOnlyHeader) {
    return [];
  }
  var rectsToPatch = rectsToSplit.filter(_ref => {
    var {
      y
    } = _ref;
    return y === nextPageFirstRect.y;
  });
  var firstRectYAdjustment = currentPageLastRect.y + currentPageLastRect.h;
  var [multiPageRowPages, remainPageRects] = spitMultiPageRows(rectsToPatch, isCurrentPageContainsOnlyHeader, firstRectYAdjustment, splitMultiPageRowFunc, checkIsFitToPageFunc);
  patchRects(rectsToSplit, rectsToPatch, remainPageRects);
  return multiPageRowPages;
};