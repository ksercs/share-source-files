!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/diagram/ui.diagram.toolbox.js"], ["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/window","../../core/utils/deferred","../../localization/message","../text_box","../accordion","../scroll_view","../tooltip","./diagram.importer","./ui.diagram.floating_panel"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/diagram/ui.diagram.toolbox.js", ["../../core/utils/size", "../../core/renderer", "../../core/utils/extend", "../../core/utils/window", "../../core/utils/deferred", "../../localization/message", "../text_box", "../accordion", "../scroll_view", "../tooltip", "./diagram.importer", "./ui.diagram.floating_panel"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _size = $__require("../../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _window = $__require("../../core/utils/window");
  var _deferred = $__require("../../core/utils/deferred");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  var _text_box = _interopRequireDefault($__require("../text_box"));
  var _accordion = _interopRequireDefault($__require("../accordion"));
  var _scroll_view = _interopRequireDefault($__require("../scroll_view"));
  var _tooltip = _interopRequireDefault($__require("../tooltip"));
  var _diagram = $__require("./diagram.importer");
  var _uiDiagram = _interopRequireDefault($__require("./ui.diagram.floating_panel"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
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
          category: category,
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
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/size","../../core/renderer","../../core/utils/extend","../../core/utils/window","../../core/utils/deferred","../../localization/message","../text_box","../accordion","../scroll_view","../tooltip","./diagram.importer","./ui.diagram.floating_panel"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/size"), require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/window"), require("../../core/utils/deferred"), require("../../localization/message"), require("../text_box"), require("../accordion"), require("../scroll_view"), require("../tooltip"), require("./diagram.importer"), require("./ui.diagram.floating_panel"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.diagram.toolbox.js.map