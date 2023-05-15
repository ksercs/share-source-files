!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/pivot_grid/fields_area/module.js"], ["../../../../core/renderer","../../../../core/utils/common","../../../../core/utils/iterator","../../../../core/utils/style","../../../../ui/popup/ui.popup","../../../../ui/button","../area_item/module","../module_widget_utils","../field_chooser/module_base"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/pivot_grid/fields_area/module.js", ["../../../../core/renderer", "../../../../core/utils/common", "../../../../core/utils/iterator", "../../../../core/utils/style", "../../../../ui/popup/ui.popup", "../../../../ui/button", "../area_item/module", "../module_widget_utils", "../field_chooser/module_base"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.FieldsArea = void 0;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _common = $__require("../../../../core/utils/common");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _style = $__require("../../../../core/utils/style");
  var _ui = _interopRequireDefault($__require("../../../../ui/popup/ui.popup"));
  var _button = _interopRequireDefault($__require("../../../../ui/button"));
  var _module = $__require("../area_item/module");
  var _module_widget_utils = $__require("../module_widget_utils");
  $__require("../field_chooser/module_base");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DIV = '<div>';
  var AREA_DRAG_CLASS = 'dx-pivotgrid-drag-action';
  function renderGroupConnector(field, nextField, prevField, $container) {
    if (prevField && prevField.groupName && prevField.groupName === field.groupName) {
      (0, _renderer.default)(DIV).addClass('dx-group-connector').addClass('dx-group-connector-prev').appendTo($container);
    }
    if (nextField && nextField.groupName && nextField.groupName === field.groupName) {
      (0, _renderer.default)(DIV).addClass('dx-group-connector').addClass('dx-group-connector-next').appendTo($container);
    }
  }
  var FieldsArea = _module.AreaItem.inherit({
    ctor: function ctor(component, area) {
      this.callBase(component);
      this._area = area;
    },
    _getAreaName: function _getAreaName() {
      return 'fields';
    },
    _createGroupElement: function _createGroupElement() {
      return (0, _renderer.default)(DIV).addClass('dx-pivotgrid-fields-area').addClass('dx-area-fields').addClass(AREA_DRAG_CLASS).attr('group', this._area);
    },
    isVisible: function isVisible() {
      return !!this.option('fieldPanel.visible') && this.option("fieldPanel.show".concat((0, _module_widget_utils.capitalizeFirstLetter)(this._area), "Fields"));
    },
    _renderButton: function _renderButton(element) {
      var that = this;
      var container = (0, _renderer.default)('<td>').appendTo((0, _renderer.default)('<tr>').appendTo(element));
      var button = that.component._createComponent((0, _renderer.default)(DIV).appendTo(container), _button.default, {
        text: 'Fields',
        icon: 'menu',
        width: 'auto',
        onClick: function onClick() {
          var popup = that.tableElement().find('.dx-fields-area-popup').dxPopup('instance');
          if (!popup.option('visible')) {
            popup.show();
          }
        }
      });
      button.$element().addClass('dx-pivotgrid-fields-area-hamburger');
    },
    _getPopupOptions: function _getPopupOptions(row, button) {
      return {
        contentTemplate: function contentTemplate() {
          return (0, _renderer.default)('<table>').addClass('dx-area-field-container').append((0, _renderer.default)('<thead>').addClass('dx-pivotgrid-fields-area-head').append(row));
        },
        height: 'auto',
        width: 'auto',
        position: {
          at: 'left',
          my: 'left',
          of: button
        },
        dragEnabled: false,
        animation: {
          show: {
            type: 'pop',
            duration: 200
          }
        },
        shading: false,
        showTitle: false,
        hideOnOutsideClick: true,
        container: button.parent()
      };
    },
    _renderPopup: function _renderPopup(tableElement, row) {
      var that = this;
      var button = tableElement.find('.dx-button');
      var popupOptions = that._getPopupOptions(row, button);
      var FieldChooserBase = that.component.$element().dxPivotGridFieldChooserBase('instance');
      if (that._rowPopup) {
        that._rowPopup.$element().remove();
      }
      that._rowPopup = that.component._createComponent((0, _renderer.default)(DIV).appendTo(tableElement), _ui.default, popupOptions);
      that._rowPopup.$element().addClass('dx-fields-area-popup');
      that._rowPopup.content().addClass('dx-pivotgrid-fields-container');
      that._rowPopup.content().parent().attr('group', 'row');
      FieldChooserBase.subscribeToEvents(that._rowPopup.content());
      FieldChooserBase.renderSortable(that._rowPopup.content());
    },
    _shouldCreateButton: function _shouldCreateButton() {
      return false;
    },
    _renderTableContent: function _renderTableContent(tableElement, data) {
      var that = this;
      var groupElement = this.groupElement();
      var isVisible = this.isVisible();
      var fieldChooserBase = that.component.$element().dxPivotGridFieldChooserBase('instance');
      var head = (0, _renderer.default)('<thead>').addClass('dx-pivotgrid-fields-area-head').appendTo(tableElement);
      var area = that._area;
      var row = (0, _renderer.default)('<tr>');
      groupElement.toggleClass('dx-hidden', !isVisible);
      tableElement.addClass('dx-area-field-container');
      if (!isVisible) {
        return;
      }
      (0, _iterator.each)(data, function (index, field) {
        if (field.area === area && field.visible !== false) {
          var td = (0, _renderer.default)('<td>').append(fieldChooserBase.renderField(field, field.area === 'row'));
          var indicators = td.find('.dx-column-indicators');
          if (indicators.length && that._shouldCreateButton()) {
            indicators.insertAfter(indicators.next());
          }
          td.appendTo(row);
          renderGroupConnector(field, data[index + 1], data[index - 1], td);
        }
      });
      if (!row.children().length) {
        (0, _renderer.default)('<td>').append((0, _renderer.default)(DIV).addClass('dx-empty-area-text').text(this.option("fieldPanel.texts.".concat(area, "FieldArea")))).appendTo(row);
      }
      if (that._shouldCreateButton()) {
        that._renderButton(head);
        that._renderPopup(tableElement, row);
      } else {
        head.append(row);
      }
    },
    setGroupWidth: function setGroupWidth(value) {
      (0, _style.setWidth)(this.groupElement(), value);
    },
    setGroupHeight: function setGroupHeight(value) {
      (0, _style.setHeight)(this.groupElement(), value);
    },
    reset: function reset() {
      this.callBase();
      this.groupElement().css('marginTop', 0);
    },
    _renderVirtualContent: _common.noop
  });
  exports.FieldsArea = FieldsArea;
  var _default = {
    FieldsArea: FieldsArea
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../core/utils/common","../../../../core/utils/iterator","../../../../core/utils/style","../../../../ui/popup/ui.popup","../../../../ui/button","../area_item/module","../module_widget_utils","../field_chooser/module_base"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../core/utils/common"), require("../../../../core/utils/iterator"), require("../../../../core/utils/style"), require("../../../../ui/popup/ui.popup"), require("../../../../ui/button"), require("../area_item/module"), require("../module_widget_utils"), require("../field_chooser/module_base"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map