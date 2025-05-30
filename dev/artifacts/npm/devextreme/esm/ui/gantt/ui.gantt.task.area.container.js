/**
* DevExtreme (esm/ui/gantt/ui.gantt.task.area.container.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import dxScrollView from '../scroll_view';
export class TaskAreaContainer {
  constructor(element, ganttViewWidget) {
    this._element = element;
    this._scrollView = ganttViewWidget._createComponent(this._element, dxScrollView, {
      scrollByContent: false,
      scrollByThumb: true,
      showScrollbar: 'onHover',
      direction: 'both',
      onScroll: () => {
        ganttViewWidget.updateView();
      }
    });
  }

  // ITaskAreaContainer
  get scrollTop() {
    return this._scrollView.scrollTop();
  }
  set scrollTop(value) {
    var diff = value - this._scrollView.scrollTop();
    if (diff !== 0) {
      this._scrollView.scrollBy({
        left: 0,
        top: diff
      });
    }
  }
  get scrollLeft() {
    return this._scrollView.scrollLeft();
  }
  set scrollLeft(value) {
    var diff = value - this._scrollView.scrollLeft();
    if (diff !== 0) {
      this._scrollView.scrollBy({
        left: diff,
        top: 0
      });
    }
  }
  get scrollWidth() {
    return this._scrollView.scrollWidth();
  }
  get scrollHeight() {
    return this._scrollView.scrollHeight();
  }
  get isExternal() {
    return true;
  }
  getWidth() {
    return this._element.offsetWidth;
  }
  getHeight() {
    return this._element.offsetHeight;
  }
  getElement() {
    return this._element;
  }
}
