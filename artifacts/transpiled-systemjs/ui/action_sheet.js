!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/action_sheet.js"], ["../core/renderer","../core/utils/window","../core/utils/common","../localization/message","../core/component_registrator","../core/utils/extend","./button","./collection/ui.collection_widget.edit","./popup/ui.popup","./popover/ui.popover","../core/templates/bindable_template","../core/utils/deferred"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/action_sheet.js", ["../core/renderer", "../core/utils/window", "../core/utils/common", "../localization/message", "../core/component_registrator", "../core/utils/extend", "./button", "./collection/ui.collection_widget.edit", "./popup/ui.popup", "./popover/ui.popover", "../core/templates/bindable_template", "../core/utils/deferred"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _window = $__require("../core/utils/window");
  var _common = $__require("../core/utils/common");
  var _message = _interopRequireDefault($__require("../localization/message"));
  var _component_registrator = _interopRequireDefault($__require("../core/component_registrator"));
  var _extend = $__require("../core/utils/extend");
  var _button = _interopRequireDefault($__require("./button"));
  var _uiCollection_widget = _interopRequireDefault($__require("./collection/ui.collection_widget.edit"));
  var _ui = _interopRequireDefault($__require("./popup/ui.popup"));
  var _ui2 = _interopRequireDefault($__require("./popover/ui.popover"));
  var _bindable_template = $__require("../core/templates/bindable_template");
  var _deferred = $__require("../core/utils/deferred");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  // STYLE actionSheet

  var ACTION_SHEET_CLASS = 'dx-actionsheet';
  var ACTION_SHEET_CONTAINER_CLASS = 'dx-actionsheet-container';
  var ACTION_SHEET_POPUP_WRAPPER_CLASS = 'dx-actionsheet-popup-wrapper';
  var ACTION_SHEET_POPOVER_WRAPPER_CLASS = 'dx-actionsheet-popover-wrapper';
  var ACTION_SHEET_CANCEL_BUTTON_CLASS = 'dx-actionsheet-cancel';
  var ACTION_SHEET_ITEM_CLASS = 'dx-actionsheet-item';
  var ACTION_SHEET_ITEM_DATA_KEY = 'dxActionSheetItemData';
  var ACTION_SHEET_WITHOUT_TITLE_CLASS = 'dx-actionsheet-without-title';
  var ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE = 'outlined';
  var ActionSheet = _uiCollection_widget.default.inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        usePopover: false,
        target: null,
        title: '',
        showTitle: true,
        showCancelButton: true,
        cancelText: _message.default.format('Cancel'),
        onCancelClick: null,
        visible: false,
        /**
        * @name dxActionSheetOptions.noDataText
        * @hidden
        */
        noDataText: '',
        /**
        * @name dxActionSheetOptions.activeStateEnabled
        * @hidden
        */

        /**
        * @name dxActionSheetOptions.selectedIndex
        * @hidden
        */

        /**
        * @name dxActionSheetOptions.selectedItem
        * @hidden
        */

        /**
        * @name dxActionSheetOptions.onSelectionChanged
        * @action
        * @hidden
        */

        /**
        * @name dxActionSheetOptions.selectedItems
        * @hidden
        */

        /**
        * @name dxActionSheetOptions.selectedItemKeys
        * @hidden
        */

        /**
        * @name dxActionSheetOptions.keyExpr
        * @hidden
        */

        /**
        * @name dxActionSheetOptions.accessKey
        * @hidden
        */

        /**
        * @name dxActionSheetOptions.tabIndex
        * @hidden
        */

        /**
         * @name dxActionSheetOptions.focusStateEnabled
         * @type boolean
         * @default false
         * @hidden
         */
        focusStateEnabled: false,
        selectByClick: false
      });
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: {
          platform: 'ios',
          tablet: true
        },
        options: {
          usePopover: true
        }
      }]);
    },
    _initTemplates: function _initTemplates() {
      this.callBase();
      /**
      * @name dxActionSheetItem.visible
      * @type boolean
      * @default true
      * @hidden
      */
      /**
      * @name dxActionSheetItem.html
      * @type String
      * @hidden
      */
      this._templateManager.addDefaultTemplates({
        item: new _bindable_template.BindableTemplate(function ($container, data) {
          var button = new _button.default((0, _renderer.default)('<div>'), (0, _extend.extend)({
            onClick: data && data.click,
            stylingMode: data && data.stylingMode || ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE
          }, data));
          $container.append(button.$element());
        }, ['disabled', 'icon', 'text', 'type', 'onClick', 'click', 'stylingMode'], this.option('integrationOptions.watchMethod'))
      });
    },
    _itemContainer: function _itemContainer() {
      return this._$itemContainer;
    },
    _itemClass: function _itemClass() {
      return ACTION_SHEET_ITEM_CLASS;
    },
    _itemDataKey: function _itemDataKey() {
      return ACTION_SHEET_ITEM_DATA_KEY;
    },
    _toggleVisibility: _common.noop,
    _renderDimensions: _common.noop,
    _initMarkup: function _initMarkup() {
      this.callBase();
      this.$element().addClass(ACTION_SHEET_CLASS);
      this._createItemContainer();
    },
    _render: function _render() {
      this._renderPopup();
    },
    _createItemContainer: function _createItemContainer() {
      this._$itemContainer = (0, _renderer.default)('<div>').addClass(ACTION_SHEET_CONTAINER_CLASS);
      this._renderDisabled();
    },
    _renderDisabled: function _renderDisabled() {
      this._$itemContainer.toggleClass('dx-state-disabled', this.option('disabled'));
    },
    _renderPopup: function _renderPopup() {
      this._$popup = (0, _renderer.default)('<div>').appendTo(this.$element());
      this._isPopoverMode() ? this._createPopover() : this._createPopup();
      this._renderPopupTitle();
      this._mapPopupOption('visible');
    },
    _mapPopupOption: function _mapPopupOption(optionName) {
      this._popup && this._popup.option(optionName, this.option(optionName));
    },
    _isPopoverMode: function _isPopoverMode() {
      return this.option('usePopover') && this.option('target');
    },
    _renderPopupTitle: function _renderPopupTitle() {
      this._mapPopupOption('showTitle');
      this._popup && this._popup.$wrapper().toggleClass(ACTION_SHEET_WITHOUT_TITLE_CLASS, !this.option('showTitle'));
    },
    _clean: function _clean() {
      if (this._$popup) {
        this._$popup.remove();
      }
      this.callBase();
    },
    _overlayConfig: function _overlayConfig() {
      return {
        onInitialized: function (args) {
          this._popup = args.component;
        }.bind(this),
        disabled: false,
        showTitle: true,
        title: this.option('title'),
        deferRendering: !window.angular,
        onContentReady: this._popupContentReadyAction.bind(this),
        onHidden: this.hide.bind(this)
      };
    },
    _createPopover: function _createPopover() {
      this._createComponent(this._$popup, _ui2.default, (0, _extend.extend)(this._overlayConfig(), {
        width: this.option('width') || 200,
        height: this.option('height') || 'auto',
        target: this.option('target')
      }));
      this._popup.$overlayContent().attr('role', 'dialog');
      this._popup.$wrapper().addClass(ACTION_SHEET_POPOVER_WRAPPER_CLASS);
    },
    _createPopup: function _createPopup() {
      this._createComponent(this._$popup, _ui.default, (0, _extend.extend)(this._overlayConfig(), {
        dragEnabled: false,
        width: this.option('width') || '100%',
        height: this.option('height') || 'auto',
        showCloseButton: false,
        position: {
          my: 'bottom',
          at: 'bottom',
          of: window
        },
        animation: {
          show: {
            type: 'slide',
            duration: 400,
            from: {
              position: {
                my: 'top',
                at: 'bottom',
                of: window
              }
            },
            to: {
              position: {
                my: 'bottom',
                at: 'bottom',
                of: window
              }
            }
          },
          hide: {
            type: 'slide',
            duration: 400,
            from: {
              position: {
                my: 'bottom',
                at: 'bottom',
                of: window
              }
            },
            to: {
              position: {
                my: 'top',
                at: 'bottom',
                of: window
              }
            }
          }
        }
      }));
      this._popup.$wrapper().addClass(ACTION_SHEET_POPUP_WRAPPER_CLASS);
    },
    _popupContentReadyAction: function _popupContentReadyAction() {
      this._popup.$content().append(this._$itemContainer);
      this._attachClickEvent();
      this._attachHoldEvent();
      this._prepareContent();
      this._renderContent();
      this._renderCancelButton();
    },
    _renderCancelButton: function _renderCancelButton() {
      if (this._isPopoverMode()) {
        return;
      }
      if (this._$cancelButton) {
        this._$cancelButton.remove();
      }
      if (this.option('showCancelButton')) {
        var cancelClickAction = this._createActionByOption('onCancelClick') || _common.noop;
        var that = this;
        this._$cancelButton = (0, _renderer.default)('<div>').addClass(ACTION_SHEET_CANCEL_BUTTON_CLASS).appendTo(this._popup && this._popup.$content());
        this._createComponent(this._$cancelButton, _button.default, {
          disabled: false,
          stylingMode: ACTION_SHEET_BUTTON_DEFAULT_STYLING_MODE,
          text: this.option('cancelText'),
          onClick: function onClick(e) {
            var hidingArgs = {
              event: e,
              cancel: false
            };
            cancelClickAction(hidingArgs);
            if (!hidingArgs.cancel) {
              that.hide();
            }
          },
          integrationOptions: {}
        });
      }
    },
    _attachItemClickEvent: _common.noop,
    _itemClickHandler: function _itemClickHandler(e) {
      this.callBase(e);
      if (!(0, _renderer.default)(e.target).is('.dx-state-disabled, .dx-state-disabled *')) {
        this.hide();
      }
    },
    _itemHoldHandler: function _itemHoldHandler(e) {
      this.callBase(e);
      if (!(0, _renderer.default)(e.target).is('.dx-state-disabled, .dx-state-disabled *')) {
        this.hide();
      }
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'width':
        case 'height':
        case 'visible':
        case 'title':
          this._mapPopupOption(args.name);
          break;
        case 'disabled':
          this._renderDisabled();
          break;
        case 'showTitle':
          this._renderPopupTitle();
          break;
        case 'showCancelButton':
        case 'onCancelClick':
        case 'cancelText':
          this._renderCancelButton();
          break;
        case 'target':
        case 'usePopover':
        case 'items':
          this._invalidate();
          break;
        default:
          this.callBase(args);
      }
    },
    toggle: function toggle(showing) {
      var that = this;
      var d = new _deferred.Deferred();
      that._popup.toggle(showing).done(function () {
        that.option('visible', showing);
        d.resolveWith(that);
      });
      return d.promise();
    },
    show: function show() {
      return this.toggle(true);
    },
    hide: function hide() {
      return this.toggle(false);
    }

    /**
    * @name dxActionSheet.registerKeyHandler
    * @publicName registerKeyHandler(key, handler)
    * @hidden
    */

    /**
    * @name dxActionSheet.focus
    * @publicName focus()
    * @hidden
    */
  });

  (0, _component_registrator.default)('dxActionSheet', ActionSheet);
  var _default = ActionSheet;
  /**
   * @name dxActionSheetItem
   * @inherits CollectionWidgetItem
   * @type object
   */
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/renderer","../core/utils/window","../core/utils/common","../localization/message","../core/component_registrator","../core/utils/extend","./button","./collection/ui.collection_widget.edit","./popup/ui.popup","./popover/ui.popover","../core/templates/bindable_template","../core/utils/deferred"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/renderer"), require("../core/utils/window"), require("../core/utils/common"), require("../localization/message"), require("../core/component_registrator"), require("../core/utils/extend"), require("./button"), require("./collection/ui.collection_widget.edit"), require("./popup/ui.popup"), require("./popover/ui.popover"), require("../core/templates/bindable_template"), require("../core/utils/deferred"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=action_sheet.js.map