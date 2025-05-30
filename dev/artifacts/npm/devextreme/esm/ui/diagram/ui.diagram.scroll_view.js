/**
* DevExtreme (esm/ui/diagram/ui.diagram.scroll_view.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getWidth, getHeight } from '../../core/utils/size';
import $ from '../../core/renderer';
import Widget from '../widget/ui.widget';
import ScrollView from '../scroll_view';
// TODO: Can we get rid of this dependency of the PivotGrid here?
import { calculateScrollbarWidth } from '../../__internal/grids/pivot_grid/m_widget_utils';
import { getDiagram } from './diagram.importer';
class DiagramScrollView extends Widget {
  _init() {
    super._init();
    var {
      EventDispatcher
    } = getDiagram();
    this.onScroll = new EventDispatcher();
    this._createOnCreateDiagramAction();
  }
  _initMarkup() {
    super._initMarkup();
    var $scrollViewWrapper = $('<div>').appendTo(this.$element());
    var options = {
      direction: 'both',
      bounceEnabled: false,
      scrollByContent: false,
      onScroll: _ref => {
        var {
          scrollOffset
        } = _ref;
        this._raiseOnScroll(scrollOffset.left, scrollOffset.top);
      }
    };
    var useNativeScrolling = this.option('useNativeScrolling');
    if (useNativeScrolling !== undefined) {
      options.useNative = useNativeScrolling;
    }
    this._scrollView = this._createComponent($scrollViewWrapper, ScrollView, options);
    this._onCreateDiagramAction({
      $parent: $(this._scrollView.content()),
      scrollView: this
    });
  }
  setScroll(left, top) {
    this._scrollView.scrollTo({
      left,
      top
    });
    this._raiseOnScrollWithoutPoint();
  }
  offsetScroll(left, top) {
    this._scrollView.scrollBy({
      left,
      top
    });
    this._raiseOnScrollWithoutPoint();
  }
  getSize() {
    var {
      Size
    } = getDiagram();
    var $element = this._scrollView.$element();
    return new Size(Math.floor(getWidth($element)), Math.floor(getHeight($element)));
  }
  getScrollContainer() {
    return this._scrollView.$element()[0];
  }
  getScrollBarWidth() {
    return this.option('useNativeScrolling') ? calculateScrollbarWidth() : 0;
  }
  detachEvents() {}
  _raiseOnScroll(left, top) {
    var {
      Point
    } = getDiagram();
    this.onScroll.raise('notifyScrollChanged', () => {
      return new Point(left, top);
    });
  }
  _raiseOnScrollWithoutPoint() {
    var {
      Point
    } = getDiagram();
    this.onScroll.raise('notifyScrollChanged', () => {
      return new Point(this._scrollView.scrollLeft(), this._scrollView.scrollTop());
    });
  }
  _createOnCreateDiagramAction() {
    this._onCreateDiagramAction = this._createActionByOption('onCreateDiagram');
  }
  _optionChanged(args) {
    switch (args.name) {
      case 'onCreateDiagram':
        this._createOnCreateDiagramAction();
        break;
      case 'useNativeScrolling':
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default DiagramScrollView;
