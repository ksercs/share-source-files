!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/dialog.js"], ["../core/utils/size","../core/renderer","../core/component","../core/action","../core/devices","../core/config","../core/utils/dom","../core/utils/deferred","../core/utils/type","../core/utils/iterator","../core/utils/extend","../core/utils/window","../events/core/events_engine","../core/utils/view_port","../localization/message","./widget/ui.errors","./popup/ui.popup","../core/utils/common"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/dialog.js", ["../core/utils/size", "../core/renderer", "../core/component", "../core/action", "../core/devices", "../core/config", "../core/utils/dom", "../core/utils/deferred", "../core/utils/type", "../core/utils/iterator", "../core/utils/extend", "../core/utils/window", "../events/core/events_engine", "../core/utils/view_port", "../localization/message", "./widget/ui.errors", "./popup/ui.popup", "../core/utils/common"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.custom = exports.confirm = exports.alert = exports.FakeDialogComponent = void 0;
  var _size = $__require("../core/utils/size");
  var _renderer = _interopRequireDefault($__require("../core/renderer"));
  var _component = $__require("../core/component");
  var _action = _interopRequireDefault($__require("../core/action"));
  var _devices = _interopRequireDefault($__require("../core/devices"));
  var _config = _interopRequireDefault($__require("../core/config"));
  var _dom = $__require("../core/utils/dom");
  var _deferred = $__require("../core/utils/deferred");
  var _type = $__require("../core/utils/type");
  var _iterator = $__require("../core/utils/iterator");
  var _extend = $__require("../core/utils/extend");
  var _window = $__require("../core/utils/window");
  var _events_engine = _interopRequireDefault($__require("../events/core/events_engine"));
  var _view_port = $__require("../core/utils/view_port");
  var _message = _interopRequireDefault($__require("../localization/message"));
  var _ui = _interopRequireDefault($__require("./widget/ui.errors"));
  var _ui2 = _interopRequireDefault($__require("./popup/ui.popup"));
  var _common = $__require("../core/utils/common");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var window = (0, _window.getWindow)();
  var DEFAULT_BUTTON = {
    text: 'OK',
    onClick: function onClick() {
      return true;
    }
  };

  /**
   * @name ui.dialog
   */

  var DX_DIALOG_CLASSNAME = 'dx-dialog';
  var DX_DIALOG_WRAPPER_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-wrapper");
  var DX_DIALOG_ROOT_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-root");
  var DX_DIALOG_CONTENT_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-content");
  var DX_DIALOG_MESSAGE_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-message");
  var DX_DIALOG_BUTTONS_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-buttons");
  var DX_DIALOG_BUTTON_CLASSNAME = "".concat(DX_DIALOG_CLASSNAME, "-button");
  var DX_BUTTON_CLASSNAME = 'dx-button';
  var FakeDialogComponent = _component.Component.inherit({
    ctor: function ctor(element, options) {
      this.callBase(options);
    },
    _defaultOptionsRules: function _defaultOptionsRules() {
      return this.callBase().concat([{
        device: {
          platform: 'ios'
        },
        options: {
          width: 276
        }
      }]);
    }
  });
  exports.FakeDialogComponent = FakeDialogComponent;
  var custom = function custom(options) {
    var _options$title;
    var deferred = new _deferred.Deferred();
    var defaultOptions = new FakeDialogComponent().option();
    options = (0, _extend.extend)(defaultOptions, options);
    var $element = (0, _renderer.default)('<div>').addClass(DX_DIALOG_CLASSNAME).appendTo((0, _view_port.value)());
    var isMessageDefined = 'message' in options;
    var isMessageHtmlDefined = 'messageHtml' in options;
    if (isMessageDefined) {
      _ui.default.log('W1013');
    }
    var messageHtml = String(isMessageHtmlDefined ? options.messageHtml : options.message);
    var $message = (0, _renderer.default)('<div>').addClass(DX_DIALOG_MESSAGE_CLASSNAME).html(messageHtml);
    var popupToolbarItems = [];
    (0, _iterator.each)(options.buttons || [DEFAULT_BUTTON], function () {
      var action = new _action.default(this.onClick, {
        context: popupInstance
      });
      popupToolbarItems.push({
        toolbar: 'bottom',
        location: _devices.default.current().android ? 'after' : 'center',
        widget: 'dxButton',
        options: (0, _extend.extend)({}, this, {
          onClick: function onClick() {
            var result = action.execute.apply(action, arguments);
            hide(result);
          }
        })
      });
    });
    var popupInstance = new _ui2.default($element, (0, _extend.extend)({
      title: (_options$title = options.title) !== null && _options$title !== void 0 ? _options$title : '',
      showTitle: (0, _common.ensureDefined)(options.showTitle, true),
      dragEnabled: (0, _common.ensureDefined)(options.dragEnabled, true),
      height: 'auto',
      width: options.width,
      showCloseButton: options.showCloseButton || false,
      ignoreChildEvents: false,
      container: $element,
      visualContainer: window,
      dragAndResizeArea: window,
      onContentReady: function onContentReady(args) {
        args.component.$content().addClass(DX_DIALOG_CONTENT_CLASSNAME).append($message);
      },
      onShowing: function onShowing(e) {
        e.component.bottomToolbar().addClass(DX_DIALOG_BUTTONS_CLASSNAME).find(".".concat(DX_BUTTON_CLASSNAME)).addClass(DX_DIALOG_BUTTON_CLASSNAME);
        (0, _dom.resetActiveElement)();
      },
      onShown: function onShown(e) {
        var $firstButton = e.component.bottomToolbar().find(".".concat(DX_BUTTON_CLASSNAME)).first();
        _events_engine.default.trigger($firstButton, 'focus');
      },
      onHiding: function onHiding() {
        deferred.reject();
      },
      onHidden: function onHidden(_ref) {
        var element = _ref.element;
        (0, _renderer.default)(element).remove();
      },
      toolbarItems: popupToolbarItems,
      animation: {
        show: {
          type: 'pop',
          duration: 400
        },
        hide: {
          type: 'pop',
          duration: 400,
          to: {
            opacity: 0,
            scale: 0
          },
          from: {
            opacity: 1,
            scale: 1
          }
        }
      },
      rtlEnabled: (0, _config.default)().rtlEnabled,
      position: {
        boundaryOffset: {
          h: 10,
          v: 0
        }
      }
    }, options.popupOptions));
    popupInstance.$wrapper().addClass(DX_DIALOG_WRAPPER_CLASSNAME);
    if (options.position) {
      popupInstance.option('position', options.position);
    }
    popupInstance.$wrapper().addClass(DX_DIALOG_ROOT_CLASSNAME);
    function show() {
      if (_devices.default.real().platform === 'android') {
        var isPortrait = (0, _size.getHeight)(window) > (0, _size.getWidth)(window);
        var width = isPortrait ? '80%' : '60%';
        popupInstance.option({
          width: width
        });
      }
      popupInstance.show();
      return deferred.promise();
    }
    function hide(value) {
      deferred.resolve(value);
      popupInstance.hide();
    }
    return {
      show: show,
      hide: hide
    };
  };
  exports.custom = custom;
  var alert = function alert(messageHtml) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var showTitle = arguments.length > 2 ? arguments[2] : undefined;
    var options = (0, _type.isPlainObject)(messageHtml) ? messageHtml : {
      title: title,
      messageHtml: messageHtml,
      showTitle: showTitle,
      dragEnabled: showTitle
    };
    return custom(options).show();
  };
  exports.alert = alert;
  var confirm = function confirm(messageHtml) {
    var title = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var showTitle = arguments.length > 2 ? arguments[2] : undefined;
    var options = (0, _type.isPlainObject)(messageHtml) ? messageHtml : {
      title: title,
      messageHtml: messageHtml,
      showTitle: showTitle,
      buttons: [{
        text: _message.default.format('Yes'),
        onClick: function onClick() {
          return true;
        }
      }, {
        text: _message.default.format('No'),
        onClick: function onClick() {
          return false;
        }
      }],
      dragEnabled: showTitle
    };
    return custom(options).show();
  };
  exports.confirm = confirm;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../core/utils/size","../core/renderer","../core/component","../core/action","../core/devices","../core/config","../core/utils/dom","../core/utils/deferred","../core/utils/type","../core/utils/iterator","../core/utils/extend","../core/utils/window","../events/core/events_engine","../core/utils/view_port","../localization/message","./widget/ui.errors","./popup/ui.popup","../core/utils/common"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../core/utils/size"), require("../core/renderer"), require("../core/component"), require("../core/action"), require("../core/devices"), require("../core/config"), require("../core/utils/dom"), require("../core/utils/deferred"), require("../core/utils/type"), require("../core/utils/iterator"), require("../core/utils/extend"), require("../core/utils/window"), require("../events/core/events_engine"), require("../core/utils/view_port"), require("../localization/message"), require("./widget/ui.errors"), require("./popup/ui.popup"), require("../core/utils/common"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=dialog.js.map