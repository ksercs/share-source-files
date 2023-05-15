!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.files_tree_view.js"], ["../../core/renderer","../../core/utils/extend","../../core/utils/icon","../../core/utils/common","../widget/ui.widget","../tree_view/ui.tree_view.search","./ui.file_manager.file_actions_button","../../core/utils/deferred","../../core/utils/window","../../core/utils/type"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/file_manager/ui.file_manager.files_tree_view.js", ["../../core/renderer", "../../core/utils/extend", "../../core/utils/icon", "../../core/utils/common", "../widget/ui.widget", "../tree_view/ui.tree_view.search", "./ui.file_manager.file_actions_button", "../../core/utils/deferred", "../../core/utils/window", "../../core/utils/type"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  function _typeof(obj) {
    "@babel/helpers - typeof";
    return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
      return typeof obj;
    } : function (obj) {
      return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    }, _typeof(obj);
  }
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _extend = $__require("../../core/utils/extend");
  var _icon = $__require("../../core/utils/icon");
  var _common = $__require("../../core/utils/common");
  var _ui = _interopRequireDefault($__require("../widget/ui.widget"));
  var _uiTree_view = _interopRequireDefault($__require("../tree_view/ui.tree_view.search"));
  var _uiFile_manager = _interopRequireDefault($__require("./ui.file_manager.file_actions_button"));
  var _deferred = $__require("../../core/utils/deferred");
  var _window = $__require("../../core/utils/window");
  var _type = $__require("../../core/utils/type");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }
  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }
  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }
  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }
  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];return arr2;
  }
  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor);
    }
  }
  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;
  }
  function _toPropertyKey(arg) {
    var key = _toPrimitive(arg, "string");return _typeof(key) === "symbol" ? key : String(key);
  }
  function _toPrimitive(input, hint) {
    if (_typeof(input) !== "object" || input === null) return input;var prim = input[Symbol.toPrimitive];if (prim !== undefined) {
      var res = prim.call(input, hint || "default");if (_typeof(res) !== "object") return res;throw new TypeError("@@toPrimitive must return a primitive value.");
    }return (hint === "string" ? String : Number)(input);
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var FILE_MANAGER_DIRS_TREE_CLASS = 'dx-filemanager-dirs-tree';
  var FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS = 'dx-filemanager-focused-item';
  var FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS = 'dx-filemanager-dirs-tree-item-text';
  var TREE_VIEW_ITEM_CLASS = 'dx-treeview-item';
  var FileManagerFilesTreeView = /*#__PURE__*/function (_Widget) {
    _inheritsLoose(FileManagerFilesTreeView, _Widget);
    function FileManagerFilesTreeView() {
      return _Widget.apply(this, arguments) || this;
    }
    var _proto = FileManagerFilesTreeView.prototype;
    _proto._initMarkup = function _initMarkup() {
      var _this = this;
      this._initActions();
      this._getCurrentDirectory = this.option('getCurrentDirectory');
      this._createFileActionsButton = _common.noop;
      this._storeExpandedState = this.option('storeExpandedState') || false;
      var $treeView = (0, _renderer.default)('<div>').addClass(FILE_MANAGER_DIRS_TREE_CLASS).appendTo(this.$element());
      var treeViewOptions = {
        dataStructure: 'plain',
        rootValue: '',
        createChildren: this._onFilesTreeViewCreateSubDirectories.bind(this),
        itemTemplate: this._createFilesTreeViewItemTemplate.bind(this),
        keyExpr: 'getInternalKey',
        parentIdExpr: 'parentDirectory.getInternalKey',
        displayExpr: function displayExpr(itemInfo) {
          return itemInfo.getDisplayName();
        },
        hasItemsExpr: 'fileItem.hasSubDirectories',
        onItemClick: function onItemClick(e) {
          return _this._actions.onDirectoryClick(e);
        },
        onItemExpanded: function onItemExpanded(e) {
          return _this._onFilesTreeViewItemExpanded(e);
        },
        onItemCollapsed: function onItemCollapsed(e) {
          return _this._onFilesTreeViewItemCollapsed(e);
        },
        onItemRendered: function onItemRendered(e) {
          return _this._onFilesTreeViewItemRendered(e);
        },
        onContentReady: function onContentReady() {
          return _this._actions.onFilesTreeViewContentReady();
        }
      };
      if (this._contextMenu) {
        this._contextMenu.option('onContextMenuHidden', function () {
          return _this._onContextMenuHidden();
        });
        treeViewOptions.onItemContextMenu = function (e) {
          return _this._onFilesTreeViewItemContextMenu(e);
        };
        this._createFileActionsButton = function (element, options) {
          return _this._createComponent(element, _uiFile_manager.default, options);
        };
      }
      this._filesTreeView = this._createComponent($treeView, _uiTree_view.default, treeViewOptions);
    };
    _proto._initActions = function _initActions() {
      this._actions = {
        onDirectoryClick: this._createActionByOption('onDirectoryClick'),
        onFilesTreeViewContentReady: this._createActionByOption('onFilesTreeViewContentReady')
      };
    };
    _proto._render = function _render() {
      _Widget.prototype._render.call(this);
      var that = this;
      setTimeout(function () {
        that._updateFocusedElement();
      });
    };
    _proto._onFilesTreeViewCreateSubDirectories = function _onFilesTreeViewCreateSubDirectories(rootItem) {
      var getDirectories = this.option('getDirectories');
      var directoryInfo = rootItem && rootItem.itemData || null;
      return getDirectories && getDirectories(directoryInfo, true);
    };
    _proto._onFilesTreeViewItemRendered = function _onFilesTreeViewItemRendered(_ref) {
      var itemData = _ref.itemData;
      var currentDirectory = this._getCurrentDirectory();
      if (currentDirectory && currentDirectory.fileItem.equals(itemData.fileItem)) {
        this._updateFocusedElement();
        this._restoreScrollTopPosition();
      }
    };
    _proto._onFilesTreeViewItemExpanded = function _onFilesTreeViewItemExpanded(_ref2) {
      var itemData = _ref2.itemData;
      if (this._storeExpandedState) {
        itemData.expanded = true;
      }
    };
    _proto._onFilesTreeViewItemCollapsed = function _onFilesTreeViewItemCollapsed(_ref3) {
      var itemData = _ref3.itemData;
      if (this._storeExpandedState) {
        itemData.expanded = false;
      }
    };
    _proto._createFilesTreeViewItemTemplate = function _createFilesTreeViewItemTemplate(itemData, itemIndex, itemElement) {
      var _this2 = this;
      var $itemElement = (0, _renderer.default)(itemElement);
      var $itemWrapper = $itemElement.closest(this._filesTreeViewItemSelector);
      $itemWrapper.data('item', itemData);
      var $image = (0, _icon.getImageContainer)(itemData.icon);
      var $text = (0, _renderer.default)('<span>').text(itemData.getDisplayName()).addClass(FILE_MANAGER_DIRS_TREE_ITEM_TEXT_CLASS);
      var $button = (0, _renderer.default)('<div>');
      $itemElement.append($image, $text, $button);
      this._createFileActionsButton($button, {
        onClick: function onClick(e) {
          return _this2._onFileItemActionButtonClick(e);
        }
      });
    };
    _proto._onFilesTreeViewItemContextMenu = function _onFilesTreeViewItemContextMenu(_ref4) {
      var itemElement = _ref4.itemElement,
          event = _ref4.event;
      event.preventDefault();
      event.stopPropagation();
      var itemData = (0, _renderer.default)(itemElement).data('item');
      this._contextMenu.showAt([itemData], itemElement, event, {
        itemData: itemData,
        itemElement: itemElement
      });
    };
    _proto._onFileItemActionButtonClick = function _onFileItemActionButtonClick(_ref5) {
      var component = _ref5.component,
          element = _ref5.element,
          event = _ref5.event;
      event.stopPropagation();
      var itemElement = component.$element().closest(this._filesTreeViewItemSelector);
      var itemData = itemElement.data('item');
      var target = {
        itemData: itemData,
        itemElement: itemElement,
        isActionButton: true
      };
      this._contextMenu.showAt([itemData], element, event, target);
      this._activeFileActionsButton = component;
      this._activeFileActionsButton.setActive(true);
    };
    _proto._onContextMenuHidden = function _onContextMenuHidden() {
      if (this._activeFileActionsButton) {
        this._activeFileActionsButton.setActive(false);
      }
    };
    _proto.toggleNodeDisabledState = function toggleNodeDisabledState(key, state) {
      var node = this._getNodeByKey(key);
      if (!node) {
        return;
      }
      var items = this._filesTreeView.option('items');
      var itemIndex = items.map(function (item) {
        return item.getInternalKey();
      }).indexOf(node.getInternalKey());
      if (itemIndex !== -1) {
        this._filesTreeView.option("items[".concat(itemIndex, "].disabled"), state);
      }
    };
    _proto._saveScrollTopPosition = function _saveScrollTopPosition() {
      if (!(0, _window.hasWindow)()) {
        return;
      }
      this._scrollTopPosition = this._filesTreeView.getScrollable().scrollTop();
    };
    _proto._restoreScrollTopPosition = function _restoreScrollTopPosition() {
      var _this3 = this;
      if (!(0, _window.hasWindow)() || !(0, _type.isNumeric)(this._scrollTopPosition)) {
        return;
      }
      setTimeout(function () {
        return _this3._filesTreeView.getScrollable().scrollTo(_this3._scrollTopPosition);
      });
    };
    _proto._updateFocusedElement = function _updateFocusedElement() {
      var directoryInfo = this._getCurrentDirectory();
      var $element = this._getItemElementByKey(directoryInfo === null || directoryInfo === void 0 ? void 0 : directoryInfo.getInternalKey());
      if (this._$focusedElement) {
        this._$focusedElement.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, false);
      }
      this._$focusedElement = $element || (0, _renderer.default)();
      this._$focusedElement.toggleClass(FILE_MANAGER_DIRS_TREE_FOCUSED_ITEM_CLASS, true);
    };
    _proto._getNodeByKey = function _getNodeByKey(key) {
      var _this$_filesTreeView;
      return (_this$_filesTreeView = this._filesTreeView) === null || _this$_filesTreeView === void 0 ? void 0 : _this$_filesTreeView._getNode(key);
    };
    _proto._getPublicNode = function _getPublicNode(key) {
      var _this$_filesTreeView2;
      // eslint-disable-next-line no-unsafe-optional-chaining
      var nodesQueue = _toConsumableArray((_this$_filesTreeView2 = this._filesTreeView) === null || _this$_filesTreeView2 === void 0 ? void 0 : _this$_filesTreeView2.getNodes());
      while (nodesQueue.length) {
        var node = nodesQueue.shift();
        if (node.itemData.getInternalKey() === key) {
          return node;
        } else if (node.children.length) {
          nodesQueue.push.apply(nodesQueue, _toConsumableArray(node.children));
        }
      }
      return undefined;
    };
    _proto._getItemElementByKey = function _getItemElementByKey(key) {
      var node = this._getNodeByKey(key);
      if (node) {
        var $node = this._filesTreeView._getNodeElement(node);
        if ($node) {
          return $node.children(this._filesTreeViewItemSelector);
        }
      }
      return null;
    };
    _proto._getDefaultOptions = function _getDefaultOptions() {
      return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), {
        storeExpandedState: false,
        initialFolder: null,
        contextMenu: null,
        getItems: null,
        getCurrentDirectory: null,
        onDirectoryClick: null
      });
    };
    _proto._optionChanged = function _optionChanged(args) {
      var name = args.name;
      switch (name) {
        case 'storeExpandedState':
          this._storeExpandedState = this.option(name);
          break;
        case 'getItems':
        case 'rootFolderDisplayName':
        case 'initialFolder':
        case 'contextMenu':
          this.repaint();
          break;
        case 'getCurrentDirectory':
          this.getCurrentDirectory = this.option(name);
          break;
        case 'onDirectoryClick':
        case 'onFilesTreeViewContentReady':
          this._actions[name] = this._createActionByOption(name);
          break;
        default:
          _Widget.prototype._optionChanged.call(this, args);
      }
    };
    _proto.toggleDirectoryExpandedState = function toggleDirectoryExpandedState(directoryInfo, state) {
      var deferred = new _deferred.Deferred();
      var treeViewNode = this._getPublicNode(directoryInfo === null || directoryInfo === void 0 ? void 0 : directoryInfo.getInternalKey());
      if (!treeViewNode) {
        return deferred.reject().promise();
      }
      if (treeViewNode.expanded === state || treeViewNode.itemsLoaded && !treeViewNode.itemData.fileItem.hasSubDirectories) {
        return deferred.resolve().promise();
      }
      var action = state ? 'expandItem' : 'collapseItem';
      return this._filesTreeView[action](directoryInfo.getInternalKey());
    };
    _proto.refresh = function refresh() {
      this._$focusedElement = null;
      this._saveScrollTopPosition();
      this._filesTreeView.option('dataSource', []);
    };
    _proto.updateCurrentDirectory = function updateCurrentDirectory() {
      if (this._disposed) {
        return;
      }
      this._updateFocusedElement();
      this._storeExpandedState && this._updateExpandedStateToCurrentDirectory();
    };
    _proto._updateExpandedStateToCurrentDirectory = function _updateExpandedStateToCurrentDirectory() {
      return this.toggleDirectoryExpandedStateRecursive(this._getCurrentDirectory().parentDirectory, true);
    };
    _proto.toggleDirectoryExpandedStateRecursive = function toggleDirectoryExpandedStateRecursive(directoryInfo, state) {
      var dirLine = [];
      for (var dirInfo = directoryInfo; dirInfo; dirInfo = dirInfo.parentDirectory) {
        dirLine.unshift(dirInfo);
      }
      return this.toggleDirectoryLineExpandedState(dirLine, state);
    };
    _proto.toggleDirectoryLineExpandedState = function toggleDirectoryLineExpandedState(dirLine, state) {
      var _this4 = this;
      if (!dirLine.length) {
        return new _deferred.Deferred().resolve().promise();
      }
      return this.toggleDirectoryExpandedState(dirLine.shift(), state).then(function () {
        return _this4.toggleDirectoryLineExpandedState(dirLine, state);
      });
    };
    _createClass(FileManagerFilesTreeView, [{
      key: "_filesTreeViewItemSelector",
      get: function get() {
        return ".".concat(TREE_VIEW_ITEM_CLASS);
      }
    }, {
      key: "_contextMenu",
      get: function get() {
        return this.option('contextMenu');
      }
    }]);
    return FileManagerFilesTreeView;
  }(_ui.default);
  var _default = FileManagerFilesTreeView;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../core/utils/extend","../../core/utils/icon","../../core/utils/common","../widget/ui.widget","../tree_view/ui.tree_view.search","./ui.file_manager.file_actions_button","../../core/utils/deferred","../../core/utils/window","../../core/utils/type"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../core/utils/extend"), require("../../core/utils/icon"), require("../../core/utils/common"), require("../widget/ui.widget"), require("../tree_view/ui.tree_view.search"), require("./ui.file_manager.file_actions_button"), require("../../core/utils/deferred"), require("../../core/utils/window"), require("../../core/utils/type"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.file_manager.files_tree_view.js.map