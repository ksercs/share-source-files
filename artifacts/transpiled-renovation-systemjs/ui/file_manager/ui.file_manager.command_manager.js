!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.command_manager.js"], ["../../core/utils/extend","../../core/utils/iterator","../../core/utils/type","../../localization/message"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.command_manager.js", ["../../core/utils/extend", "../../core/utils/iterator", "../../core/utils/type", "../../localization/message"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.defaultPermissions = exports.FileManagerCommandManager = void 0;
  var _extend = $__require("../../core/utils/extend");
  var _iterator = $__require("../../core/utils/iterator");
  var _type = $__require("../../core/utils/type");
  var _message = _interopRequireDefault($__require("../../localization/message"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var defaultPermissions = {
    create: false,
    copy: false,
    move: false,
    delete: false,
    rename: false,
    upload: false,
    download: false
  };
  exports.defaultPermissions = defaultPermissions;
  var FileManagerCommandManager = /*#__PURE__*/function () {
    function FileManagerCommandManager(permissions) {
      this._actions = {};
      this._permissions = permissions || {};
      this._initCommands();
    }
    var _proto = FileManagerCommandManager.prototype;
    _proto._initCommands = function _initCommands() {
      var _this = this;
      this._commands = [{
        name: 'create',
        text: _message.default.format('dxFileManager-commandCreate'),
        icon: 'newfolder',
        enabled: this._permissions.create,
        noFileItemRequired: true
      }, {
        name: 'rename',
        text: _message.default.format('dxFileManager-commandRename'),
        icon: 'rename',
        enabled: this._permissions.rename,
        isSingleFileItemCommand: true
      }, {
        name: 'move',
        text: _message.default.format('dxFileManager-commandMove'),
        icon: 'movetofolder',
        enabled: this._permissions.move
      }, {
        name: 'copy',
        text: _message.default.format('dxFileManager-commandCopy'),
        icon: 'copy',
        enabled: this._permissions.copy
      }, {
        name: 'delete',
        text: _message.default.format('dxFileManager-commandDelete'),
        icon: 'trash',
        enabled: this._permissions.delete
      }, {
        name: 'download',
        text: _message.default.format('dxFileManager-commandDownload'),
        icon: 'download',
        enabled: this._permissions.download
      }, {
        name: 'upload',
        text: _message.default.format('dxFileManager-commandUpload'),
        icon: 'upload',
        enabled: this._permissions.upload,
        noFileItemRequired: true
      }, {
        name: 'refresh',
        text: _message.default.format('dxFileManager-commandRefresh'),
        icon: 'dx-filemanager-i dx-filemanager-i-refresh',
        enabled: true,
        noFileItemRequired: true
      }, {
        name: 'thumbnails',
        text: _message.default.format('dxFileManager-commandThumbnails'),
        icon: 'mediumiconslayout',
        enabled: true,
        noFileItemRequired: true
      }, {
        name: 'details',
        text: _message.default.format('dxFileManager-commandDetails'),
        icon: 'detailslayout',
        enabled: true,
        noFileItemRequired: true
      }, {
        name: 'clearSelection',
        text: _message.default.format('dxFileManager-commandClearSelection'),
        icon: 'remove',
        enabled: true
      }, {
        name: 'showNavPane',
        hint: _message.default.format('dxFileManager-commandShowNavPane'),
        icon: 'menu',
        enabled: false,
        noFileItemRequired: true
      }];
      this._commandMap = {};
      this._commands.forEach(function (command) {
        _this._commandMap[command.name] = command;
      });
    };
    _proto.registerActions = function registerActions(actions) {
      this._actions = (0, _extend.extend)(this._actions, actions);
    };
    _proto.executeCommand = function executeCommand(command, arg) {
      var commandName = (0, _type.isString)(command) ? command : command.name;
      var action = this._actions[commandName];
      if (action) {
        return action(arg);
      }
    };
    _proto.updatePermissions = function updatePermissions(permissions) {
      var _this2 = this;
      var resultPermissions = (0, _extend.extend)({}, defaultPermissions, permissions);
      this._permissions = resultPermissions;
      (0, _iterator.each)(this._permissions, function (permission) {
        _this2._commandMap[permission].enabled = _this2._permissions[permission];
      });
    };
    _proto.setCommandEnabled = function setCommandEnabled(commandName, enabled) {
      var command = this.getCommandByName(commandName);
      if (command) {
        command.enabled = enabled;
      }
    };
    _proto.getCommandByName = function getCommandByName(name) {
      return this._commandMap[name];
    };
    _proto.isCommandAvailable = function isCommandAvailable(commandName, itemInfos) {
      var command = this.getCommandByName(commandName);
      if (!command || !command.enabled) {
        return false;
      }
      if (command.noFileItemRequired) {
        return true;
      }
      var itemsLength = itemInfos && itemInfos.length || 0;
      if (itemsLength === 0 || itemInfos.some(function (item) {
        return item.fileItem.isRoot() || item.fileItem.isParentFolder;
      })) {
        return false;
      }
      if (commandName === 'download') {
        return itemInfos.every(function (itemInfo) {
          return !itemInfo.fileItem.isDirectory;
        });
      }
      return !command.isSingleFileItemCommand || itemsLength === 1;
    };
    return FileManagerCommandManager;
  }();
  exports.FileManagerCommandManager = FileManagerCommandManager;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/utils/extend","../../core/utils/iterator","../../core/utils/type","../../localization/message"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/utils/extend"), require("../../core/utils/iterator"), require("../../core/utils/type"), require("../../localization/message"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.command_manager.js.map