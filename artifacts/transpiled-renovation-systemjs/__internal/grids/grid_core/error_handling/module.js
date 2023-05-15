!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/__internal/grids/grid_core/error_handling/module.js"], ["../../../../core/renderer","../../../../events/core/events_engine","../../../../events/click","../../../../core/utils/iterator","../modules"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/__internal/grids/grid_core/error_handling/module.js", ["../../../../core/renderer", "../../../../events/core/events_engine", "../../../../events/click", "../../../../core/utils/iterator", "../modules"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.errorHandlingModule = void 0;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../../../events/core/events_engine"));
  var _click = $__require("../../../../events/click");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _modules = _interopRequireDefault($__require("../modules"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var ERROR_ROW_CLASS = 'dx-error-row';
  var ERROR_MESSAGE_CLASS = 'dx-error-message';
  var ERROR_CLOSEBUTTON_CLASS = 'dx-closebutton';
  var ACTION_CLASS = 'action';
  var ErrorHandlingController = _modules.default.ViewController.inherit({
    init: function init() {
      var that = this;
      that._columnHeadersView = that.getView('columnHeadersView');
      that._rowsView = that.getView('rowsView');
    },
    _createErrorRow: function _createErrorRow(error, $tableElements) {
      var that = this;
      var $errorRow;
      var $closeButton;
      var $errorMessage = this._renderErrorMessage(error);
      if ($tableElements) {
        $errorRow = (0, _renderer.default)('<tr>').addClass(ERROR_ROW_CLASS);
        $closeButton = (0, _renderer.default)('<div>').addClass(ERROR_CLOSEBUTTON_CLASS).addClass(that.addWidgetPrefix(ACTION_CLASS));
        _events_engine.default.on($closeButton, _click.name, that.createAction(function (args) {
          var e = args.event;
          var $errorRow;
          var errorRowIndex = (0, _renderer.default)(e.currentTarget).closest(".".concat(ERROR_ROW_CLASS)).index();
          e.stopPropagation();
          (0, _iterator.each)($tableElements, function (_, tableElement) {
            $errorRow = (0, _renderer.default)(tableElement).children('tbody').children('tr').eq(errorRowIndex);
            that.removeErrorRow($errorRow);
          });
          that.getController('resizing') && that.getController('resizing').fireContentReadyAction();
        }));
        (0, _renderer.default)('<td>')
        // @ts-expect-errors
        .attr({
          colSpan: that.getController('columns').getVisibleColumns().length,
          role: 'presentation'
        }).prepend($closeButton).append($errorMessage).appendTo($errorRow);
        return $errorRow;
      }
      return $errorMessage;
    },
    _renderErrorMessage: function _renderErrorMessage(error) {
      var message = error.url ? error.message.replace(error.url, '') : error.message || error;
      var $message = (0, _renderer.default)('<div>').addClass(ERROR_MESSAGE_CLASS).text(message);
      if (error.url) {
        (0, _renderer.default)('<a>').attr('href', error.url).text(error.url).appendTo($message);
      }
      return $message;
    },
    renderErrorRow: function renderErrorRow(error, rowIndex, $popupContent) {
      var that = this;
      var $errorMessageElement;
      var $firstErrorRow;
      if ($popupContent) {
        $popupContent.find(".".concat(ERROR_MESSAGE_CLASS)).remove();
        $errorMessageElement = that._createErrorRow(error);
        $popupContent.prepend($errorMessageElement);
        return $errorMessageElement;
      }
      var viewElement = rowIndex >= 0 || !that._columnHeadersView.isVisible() ? that._rowsView : that._columnHeadersView;
      var $tableElements = viewElement.getTableElements();
      (0, _iterator.each)($tableElements, function (_, tableElement) {
        $errorMessageElement = that._createErrorRow(error, $tableElements);
        $firstErrorRow = $firstErrorRow || $errorMessageElement;
        if (rowIndex >= 0) {
          var $row = viewElement._getRowElements((0, _renderer.default)(tableElement)).eq(rowIndex);
          that.removeErrorRow($row.next());
          $errorMessageElement.insertAfter($row);
        } else {
          var $tbody = (0, _renderer.default)(tableElement).children('tbody');
          var rowElements = $tbody.children('tr');
          if (that._columnHeadersView.isVisible()) {
            that.removeErrorRow(rowElements.last());
            (0, _renderer.default)(tableElement).append($errorMessageElement);
          } else {
            that.removeErrorRow(rowElements.first());
            $tbody.first().prepend($errorMessageElement);
          }
        }
      });
      var resizingController = that.getController('resizing');
      resizingController && resizingController.fireContentReadyAction();
      return $firstErrorRow;
    },
    removeErrorRow: function removeErrorRow($row) {
      if (!$row) {
        var $columnHeaders = this._columnHeadersView && this._columnHeadersView.element();
        $row = $columnHeaders && $columnHeaders.find(".".concat(ERROR_ROW_CLASS));
        if (!$row || !$row.length) {
          var $rowsViewElement = this._rowsView.element();
          $row = $rowsViewElement && $rowsViewElement.find(".".concat(ERROR_ROW_CLASS));
        }
      }
      $row && $row.hasClass(ERROR_ROW_CLASS) && $row.remove();
    },
    optionChanged: function optionChanged(args) {
      var that = this;
      switch (args.name) {
        case 'errorRowEnabled':
          args.handled = true;
          break;
        default:
          that.callBase(args);
      }
    }
  });
  var errorHandlingModule = {
    defaultOptions: function defaultOptions() {
      return {
        errorRowEnabled: true
      };
    },
    controllers: {
      errorHandling: ErrorHandlingController
    },
    extenders: {
      controllers: {
        data: {
          init: function init() {
            var that = this;
            var errorHandlingController = that.getController('errorHandling');
            that.callBase();
            that.dataErrorOccurred.add(function (error, $popupContent) {
              if (that.option('errorRowEnabled')) {
                errorHandlingController.renderErrorRow(error, undefined, $popupContent);
              }
            });
            that.changed.add(function (e) {
              if (e && e.changeType === 'loadError') {
                return;
              }
              var errorHandlingController = that.getController('errorHandling');
              var editingController = that.getController('editing');
              if (editingController && !editingController.hasChanges()) {
                errorHandlingController && errorHandlingController.removeErrorRow();
              }
            });
          }
        }
      }
    }
  };
  exports.errorHandlingModule = errorHandlingModule;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../events/core/events_engine","../../../../events/click","../../../../core/utils/iterator","../modules"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../events/core/events_engine"), require("../../../../events/click"), require("../../../../core/utils/iterator"), require("../modules"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module.js.map