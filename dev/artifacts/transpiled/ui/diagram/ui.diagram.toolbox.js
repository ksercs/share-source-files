"use strict";

exports.default = void 0;
var _size = require("../../core/utils/size");
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _extend = require("../../core/utils/extend");
var _window = require("../../core/utils/window");
var _deferred = require("../../core/utils/deferred");
var _message = _interopRequireDefault(require("../../localization/message"));
var _text_box = _interopRequireDefault(require("../text_box"));
var _accordion = _interopRequireDefault(require("../accordion"));
var _scroll_view = _interopRequireDefault(require("../scroll_view"));
var _tooltip = _interopRequireDefault(require("../tooltip"));
var _diagram = require("./diagram.importer");
var _uiDiagram = _interopRequireDefault(require("./ui.diagram.floating_panel"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var DIAGRAM_TOOLBOX_MIN_HEIGHT = 130;
var DIAGRAM_TOOLBOX_POPUP_CLASS = 'dx-diagram-toolbox-popup';
var DIAGRAM_TOOLBOX_PANEL_CLASS = 'dx-diagram-toolbox-panel';
var DIAGRAM_TOOLBOX_INPUT_CONTAINER_CLASS = 'dx-diagram-toolbox-input-container';
var DIAGRAM_TOOLBOX_INPUT_CLASS = 'dx-diagram-toolbox-input';
var DIAGRAM_TOOLTIP_DATATOGGLE = 'shape-toolbox-tooltip';
var DIAGRAM_TOOLBOX_START_DRAG_CLASS = '.dxdi-tb-start-drag-flag';
var DiagramToolbox = /*#__PURE__*/function (_DiagramFloatingPanel) {
  _inheritsLoose(DiagramToolbox, _DiagramFloatingPanel);
  function DiagramToolbox() {
    return _DiagramFloatingPanel.apply(this, arguments) || this;
  }
  var _proto = DiagramToolbox.prototype;
  _proto._init = function _init() {
    _DiagramFloatingPanel.prototype._init.call(this);
    this._toolboxes = [];
    this._filterText = '';
    this._createOnShapeCategoryRenderedAction();
    this._createOnFilterChangedAction();
  };
  _proto._getPopupClass = function _getPopupClass() {
    return DIAGRAM_TOOLBOX_POPUP_CLASS;
  };
  _proto._getPopupHeight = function _getPopupHeight() {
    return this.isMobileView() ? '100%' : _DiagramFloatingPanel.prototype._getPopupHeight.call(this);
  };
  _proto._getPopupMaxHeight = function _getPopupMaxHeight() {
    return this.isMobileView() ? '100%' : _DiagramFloatingPanel.prototype._getPopupMaxHeight.call(this);
  };
  _proto._getPopupMinHeight = function _getPopupMinHeight() {
    return DIAGRAM_TOOLBOX_MIN_HEIGHT;
  };
  _proto._getPopupPosition = function _getPopupPosition() {
    var $parent = this.option('offsetParent');
    var position = {
      my: 'left top',
      at: 'left top',
      of: $parent
    };
    if (!this.isMobileView()) {
      return (0, _extend.extend)(position, {
        offset: this.option('offsetX') + ' ' + this.option('offsetY')
      });
    }
    return position;
  };
  _proto._getPopupAnimation = function _getPopupAnimation() {
    var $parent = this.option('offsetParent');
    if (this.isMobileView()) {
      return {
        hide: this._getPopupSlideAnimationObject({
          direction: 'left',
          from: {
            position: {
              my: 'left top',
              at: 'left top',
              of: $parent
            }
          },
          to: {
            position: {
              my: 'right top',
              at: 'left top',
              of: $parent
            }
          }
        }),
        show: this._getPopupSlideAnimationObject({
          direction: 'right',
          from: {
            position: {
              my: 'right top',
              at: 'left top',
              of: $parent
            }
          },
          to: {
            position: {
              my: 'left top',
              at: 'left top',
              of: $parent
            }
          }
        })
      };
    }
    return _DiagramFloatingPanel.prototype._getPopupAnimation.call(this);
  };
  _proto._getPopupOptions = function _getPopupOptions() {
    var options = _DiagramFloatingPanel.prototype._getPopupOptions.call(this);
    if (!this.isMobileView()) {
      return (0, _extend.extend)(options, {
        showTitle: true,
        toolbarItems: [{
          widget: 'dxButton',
          location: 'center',
          options: {
            activeStateEnabled: false,
            focusStateEnabled: false,
            hoverStateEnabled: false,
            icon: 'diagram-toolbox-drag',
            stylingMode: 'outlined',
            type: 'normal'
          }
        }]
      });
    }
    return options;
  };
  _proto._renderPopupContent = function _renderPopupContent($parent) {
    var panelHeight = '100%';
    if (this.option('showSearch')) {
      var $inputContainer = (0, _renderer.default)('<div>').addClass(DIAGRAM_TOOLBOX_INPUT_CONTAINER_CLASS).appendTo($parent);
      this._updateElementWidth($inputContainer);
      this._renderSearchInput($inputContainer);
      if ((0, _window.hasWindow)()) {
        panelHeight = 'calc(100% - ' + (0, _size.getHeight)(this._searchInput.$element()) + 'px)';
      }
    }
    var $panel = (0, _renderer.default)('<div>').addClass(DIAGRAM_TOOLBOX_PANEL_CLASS).appendTo($parent);
    (0, _size.setHeight)($panel, panelHeight);
    this._updateElementWidth($panel);
    this._renderScrollView($panel);
  };
  _proto._updateElementWidth = function _updateElementWidth($element) {
    if (this.option('toolboxWidth') !== undefined) {
      $element.css('width', this.option('toolboxWidth'));
    }
  };
  _proto.updateMaxHeight = function updateMaxHeight() {
    if (this.isMobileView()) return;
    var maxHeight = 6;
    if (this._popup) {
      var $title = this._getPopupTitle();
      maxHeight += (0, _size.getOuterHeight)($title);
    }
    if (this._accordion) {
      maxHeight += (0, _size.getOuterHeight)(this._accordion.$element());
    }
    if (this._searchInput) {
      maxHeight += (0, _size.getOuterHeight)(this._searchInput.$element());
    }
    this.option('maxHeight', maxHeight);
  };
  _proto._renderSearchInput = function _renderSearchInput($parent) {
    var _this = this;
    var $input = (0, _renderer.default)('<div>').addClass(DIAGRAM_TOOLBOX_INPUT_CLASS).appendTo($parent);
    this._searchInput = this._createComponent($input, _text_box.default, {
      stylingMode: 'outlined',
      placeholder: _message.default.format('dxDiagram-uiSearch'),
      onValueChanged: function onValueChanged(data) {
        _this._onInputChanged(data.value);
      },
      valueChangeEvent: 'keyup',
      buttons: [{
        name: 'search',
        location: 'after',
        options: {
          activeStateEnabled: false,
          focusStateEnabled: false,
          hoverStateEnabled: false,
          icon: 'search',
          stylingMode: 'outlined',
          type: 'normal',
          onClick: function onClick() {
            _this._searchInput.focus();
          }
        }
      }]
    });
  };
  _proto._renderScrollView = function _renderScrollView($parent) {
    var _this2 = this;
    var $scrollViewWrapper = (0, _renderer.default)('<div>').appendTo($parent);
    this._scrollView = this._createComponent($scrollViewWrapper, _scroll_view.default);

    // Prevent scroll toolbox content for dragging vertically
    var _moveIsAllowed = this._scrollView._moveIsAllowed.bind(this._scrollView);
    this._scrollView._moveIsAllowed = function (e) {
      for (var i = 0; i < _this2._toolboxes.length; i++) {
        var $element = _this2._toolboxes[i];
        if ((0, _renderer.default)($element).children(DIAGRAM_TOOLBOX_START_DRAG_CLASS).length) {
          return false;
        }
      }
      return _moveIsAllowed(e);
    };
    var $accordion = (0, _renderer.default)('<div>').appendTo(this._scrollView.content());
    this._updateElementWidth($accordion);
    this._renderAccordion($accordion);
  };
  _proto._getAccordionDataSource = function _getAccordionDataSource() {
    var _this3 = this;
    var result = [];
    var toolboxGroups = this.option('toolboxGroups');
    for (var i = 0; i < toolboxGroups.length; i++) {
      var category = toolboxGroups[i].category;
      var title = toolboxGroups[i].title;
      var groupObj = {
        category,
        title: title || category,
        expanded: toolboxGroups[i].expanded,
        displayMode: toolboxGroups[i].displayMode,
        shapes: toolboxGroups[i].shapes,
        onTemplate: function onTemplate(widget, $element, data) {
          var $toolboxElement = (0, _renderer.default)($element);
          _this3._onShapeCategoryRenderedAction({
            category: data.category,
            displayMode: data.displayMode,
            dataToggle: DIAGRAM_TOOLTIP_DATATOGGLE,
            shapes: data.shapes,
            $element: $toolboxElement
          });
          _this3._toolboxes.push($toolboxElement);
          if (_this3._filterText !== '') {
            _this3._onFilterChangedAction({
              text: _this3._filterText,
              filteringToolboxes: _this3._toolboxes.length - 1
            });
          }
          _this3._createTooltips($toolboxElement);
        }
      };
      result.push(groupObj);
    }
    return result;
  };
  _proto._createTooltips = function _createTooltips($toolboxElement) {
    var _this4 = this;
    if (this._isTouchMode()) return;
    var targets = $toolboxElement.find('[data-toggle="' + DIAGRAM_TOOLTIP_DATATOGGLE + '"]');
    var $container = this.$element();
    targets.each(function (index, element) {
      var $target = (0, _renderer.default)(element);
      var title = $target.attr('title');
      if (title) {
        var $tooltip = (0, _renderer.default)('<div>').text(title).appendTo($container);
        _this4._createComponent($tooltip, _tooltip.default, {
          target: $target.get(0),
          showEvent: 'mouseenter',
          hideEvent: 'mouseleave',
          position: 'top',
          animation: {
            show: {
              type: 'fade',
              from: 0,
              to: 1,
              delay: 500
            },
            hide: {
              type: 'fade',
              from: 1,
              to: 0,
              delay: 100
            }
          }
        });
      }
    });
  };
  _proto._isTouchMode = function _isTouchMode() {
    var _getDiagram = (0, _diagram.getDiagram)(),
      Browser = _getDiagram.Browser;
    return Browser.TouchUI;
  };
  _proto._renderAccordion = function _renderAccordion($container) {
    var _this5 = this;
    this._accordion = this._createComponent($container, _accordion.default, {
      multiple: true,
      animationDuration: 0,
      activeStateEnabled: false,
      focusStateEnabled: false,
      hoverStateEnabled: false,
      collapsible: true,
      displayExpr: 'title',
      dataSource: this._getAccordionDataSource(),
      disabled: this.option('disabled'),
      itemTemplate: function itemTemplate(data, index, $element) {
        data.onTemplate(_this5, $element, data);
      },
      onSelectionChanged: function onSelectionChanged(e) {
        _this5._updateScrollAnimateSubscription(e.component);
      },
      onContentReady: function onContentReady(e) {
        e.component.option('selectedItems', []);
        var items = e.component.option('dataSource');
        for (var i = 0; i < items.length; i++) {
          if (items[i].expanded === false) {
            e.component.collapseItem(i);
          } else if (items[i].expanded === true) {
            e.component.expandItem(i);
          }
        }
        // expand first group
        if (items.length && items[0].expanded === undefined) {
          e.component.expandItem(0);
        }
        _this5._updateScrollAnimateSubscription(e.component);
      }
    });
  };
  _proto._updateScrollAnimateSubscription = function _updateScrollAnimateSubscription(component) {
    var _this6 = this;
    component._deferredAnimate = new _deferred.Deferred();
    component._deferredAnimate.done(function () {
      _this6.updateMaxHeight();
      _this6._scrollView.update();
      _this6._updateScrollAnimateSubscription(component);
    });
  };
  _proto._onInputChanged = function _onInputChanged(text) {
    this._filterText = text;
    this._onFilterChangedAction({
      text: this._filterText,
      filteringToolboxes: this._toolboxes.map(function ($element, index) {
        return index;
      })
    });
    this.updateTooltips();
    this.updateMaxHeight();
    this._scrollView.update();
  };
  _proto.updateFilter = function updateFilter() {
    this._onInputChanged(this._filterText);
  };
  _proto.updateTooltips = function updateTooltips() {
    var _this7 = this;
    this._toolboxes.forEach(function ($element) {
      var $tooltipContainer = (0, _renderer.default)($element);
      _this7._createTooltips($tooltipContainer);
    });
  };
  _proto._createOnShapeCategoryRenderedAction = function _createOnShapeCategoryRenderedAction() {
    this._onShapeCategoryRenderedAction = this._createActionByOption('onShapeCategoryRendered');
  };
  _proto._createOnFilterChangedAction = function _createOnFilterChangedAction() {
    this._onFilterChangedAction = this._createActionByOption('onFilterChanged');
  };
  _proto._optionChanged = function _optionChanged(args) {
    switch (args.name) {
      case 'onShapeCategoryRendered':
        this._createOnShapeCategoryRenderedAction();
        break;
      case 'onFilterChanged':
        this._createOnFilterChangedAction();
        break;
      case 'showSearch':
      case 'toolboxWidth':
        this._invalidate();
        break;
      case 'toolboxGroups':
        this._accordion.option('dataSource', this._getAccordionDataSource());
        break;
      default:
        _DiagramFloatingPanel.prototype._optionChanged.call(this, args);
    }
  };
  return DiagramToolbox;
}(_uiDiagram.default);
var _default = DiagramToolbox;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;