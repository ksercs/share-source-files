!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.breadcrumbs.js"], ["../../core/renderer","../../core/utils/extend","../widget/ui.widget","../menu/ui.menu"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.breadcrumbs.js", ["../../core/renderer", "../../core/utils/extend", "../widget/ui.widget", "../menu/ui.menu"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _ui2 = _interopRequireDefault($__require("../menu/ui.menu"));
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
  var FILE_MANAGER_BREADCRUMBS_CLASS = 'dx-filemanager-breadcrumbs';
  var FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-parent-folder-item';
  var FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-separator-item';
  var FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-path-separator-item';
  var FileManagerBreadcrumbs = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(FileManagerBreadcrumbs, _Widget);
    function FileManagerBreadcrumbs() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = FileManagerBreadcrumbs.prototype;
    _proto._init = function _init() {
      _Widget.prototype._init.call(this);
      this._currentDirectory = null;
    };
    _proto._initMarkup = function _initMarkup() {
      _Widget.prototype._initMarkup.call(this);
      this._initActions();
      if (this._currentDirectory) {
        this._renderMenu();
      }
      this.$element().addClass(FILE_MANAGER_BREADCRUMBS_CLASS);
    };
    _proto.setCurrentDirectory = function setCurrentDirectory(directory) {
      if (!this._areDirsEqual(this._currentDirectory, directory)) {
        this._currentDirectory = directory;
        this.repaint();
      }
    };
    _proto._renderMenu = function _renderMenu() {
      var $menu = (0, _renderer.default)('<div>').appendTo(this.$element());
      this._menu = this._createComponent($menu, _ui2.default, {
        dataSource: this._getMenuItems(),
        onItemClick: this._onItemClick.bind(this),
        onItemRendered: this._onItemRendered.bind(this)
      });
    };
    _proto._getMenuItems = function _getMenuItems() {
      var dirLine = this._getParentDirsLine();
      var result = [{
        icon: 'arrowup',
        directory: this._currentDirectory.parentDirectory,
        isPathItem: true,
        cssClass: FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS
      }, {
        text: ' ',
        cssClass: FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS
      }];
      dirLine.forEach(function (dir, index) {
        result.push({
          text: dir.getDisplayName(),
          directory: dir,
          isPathItem: true
        });
        if (index !== dirLine.length - 1) {
          result.push({
            icon: 'spinnext',
            cssClass: FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS
          });
        }
      });
      return result;
    };
    _proto._onItemClick = function _onItemClick(_ref) {
      var itemData = _ref.itemData;
      if (!itemData.isPathItem) {
        return;
      }
      var newDir = itemData.directory;
      if (!this._areDirsEqual(newDir, this._currentDirectory)) {
        this._raiseCurrentDirectoryChanged(newDir);
      }
    };
    _proto._onItemRendered = function _onItemRendered(_ref2) {
      var itemElement = _ref2.itemElement,
          itemData = _ref2.itemData;
      if (itemData.cssClass) {
        (0, _renderer.default)(itemElement).addClass(itemData.cssClass);
      }
    };
    _proto._getParentDirsLine = function _getParentDirsLine() {
      var currentDirectory = this._currentDirectory;
      var result = [];
      while (currentDirectory) {
        result.unshift(currentDirectory);
        currentDirectory = currentDirectory.parentDirectory;
      }
      return result;
    };
    _proto._areDirsEqual = function _areDirsEqual(dir1, dir2) {
      return dir1 && dir2 && dir1 === dir2 && dir1.fileItem.key === dir2.fileItem.key;
    };
    _proto._initActions = function _initActions() {
      this._actions = {
        onCurrentDirectoryChanging: this._createActionByOption('onCurrentDirectoryChanging')
      };
    };
    _proto._raiseCurrentDirectoryChanged = function _raiseCurrentDirectoryChanged(currentDirectory) {
      this._actions.onCurrentDirectoryChanging({
        currentDirectory: currentDirectory
      });
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        rootFolderDisplayName: 'Files',
        onCurrentDirectoryChanging: null
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name;
      switch (name) {
        case 'rootFolderDisplayName':
          this.repaint();
          break;
        case 'onCurrentDirectoryChanging':
          this._actions[name] = this._createActionByOption(name);
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    return FileManagerBreadcrumbs;
  }(_ui.default);
  var _default = FileManagerBreadcrumbs;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","../widget/ui.widget","../menu/ui.menu"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("../widget/ui.widget"), require("../menu/ui.menu"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.breadcrumbs.js.map