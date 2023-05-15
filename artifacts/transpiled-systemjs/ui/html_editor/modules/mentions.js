!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/ui/html_editor/modules/mentions.js"], ["../../../core/renderer","devextreme-quill","../../../core/utils/data","../../../core/utils/type","../../../core/utils/extend","../../../core/element","../../../events/core/events_engine","./base","./popup","../formats/mention"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/ui/html_editor/modules/mentions.js", ["../../../core/renderer", "devextreme-quill", "../../../core/utils/data", "../../../core/utils/type", "../../../core/utils/extend", "../../../core/element", "../../../events/core/events_engine", "./base", "./popup", "../formats/mention"], true, function ($__require, exports, module) {
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
  var _renderer = _interopRequireDefault($__require("../../../core/renderer"));
  var _devextremeQuill = _interopRequireDefault($__require("devextreme-quill"));
  var _data = $__require("../../../core/utils/data");
  var _type = $__require("../../../core/utils/type");
  var _extend = $__require("../../../core/utils/extend");
  var _element = $__require("../../../core/element");
  var _events_engine = _interopRequireDefault($__require("../../../events/core/events_engine"));
  var _base = _interopRequireDefault($__require("./base"));
  var _popup = _interopRequireDefault($__require("./popup"));
  var _mention = _interopRequireDefault($__require("../formats/mention"));
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
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
  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }return self;
  }
  function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);subClass.prototype.constructor = subClass;_setPrototypeOf(subClass, superClass);
  }
  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) {
      o.__proto__ = p;return o;
    };return _setPrototypeOf(o, p);
  }
  var MentionModule = _base.default;
  if (_devextremeQuill.default) {
    var USER_ACTION = 'user';
    var DEFAULT_MARKER = '@';
    var KEYS = {
      ARROW_UP: 'upArrow',
      ARROW_DOWN: 'downArrow',
      ARROW_LEFT: 'leftArrow',
      ARROW_RIGHT: 'rightArrow',
      ENTER: 'enter',
      ESCAPE: 'escape',
      SPACE: 'space',
      PAGE_UP: 'pageUp',
      PAGE_DOWN: 'pageDown',
      END: 'end',
      HOME: 'home'
    };
    var NAVIGATION_KEYS = [KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT, KEYS.PAGE_UP, KEYS.PAGE_DOWN, KEYS.END, KEYS.HOME];
    var ALLOWED_PREFIX_CHARS = [' ', '\n'];
    var DISABLED_STATE_CLASS = 'dx-state-disabled';
    _devextremeQuill.default.register({
      'formats/mention': _mention.default
    }, true);
    MentionModule = /*#__PURE__*/function (_PopupModule) {
      _inheritsLoose(MentionModule, _PopupModule);
      var _proto = MentionModule.prototype;
      _proto._getDefaultOptions = function _getDefaultOptions() {
        var baseConfig = _PopupModule.prototype._getDefaultOptions.call(this);
        return (0, _extend.extend)(baseConfig, {
          itemTemplate: 'item',
          valueExpr: 'this',
          displayExpr: 'this',
          template: null,
          searchExpr: null,
          searchTimeout: 500,
          minSearchLength: 0
        });
      };
      function MentionModule(quill, options) {
        var _this;
        _this = _PopupModule.call(this, quill, options) || this;
        _this._mentions = {};
        options.mentions.forEach(function (item) {
          var marker = item.marker;
          if (!marker) {
            item.marker = marker = DEFAULT_MARKER;
          }
          var template = item.template;
          if (template) {
            var preparedTemplate = _this.editorInstance._getTemplate(template);
            preparedTemplate && _mention.default.addTemplate({
              marker: marker,
              editorKey: _this.editorInstance.getMentionKeyInTemplateStorage()
            }, preparedTemplate);
          }
          _this._mentions[marker] = (0, _extend.extend)({}, _this._getDefaultOptions(), item);
        });
        _this._attachKeyboardHandlers();
        _this.addCleanCallback(_this.clean.bind(_assertThisInitialized(_this)));
        _this.quill.on('text-change', _this.onTextChange.bind(_assertThisInitialized(_this)));
        return _this;
      }
      _proto._attachKeyboardHandlers = function _attachKeyboardHandlers() {
        this.quill.keyboard.addBinding({
          key: KEYS.ARROW_UP
        }, this._moveToItem.bind(this, 'prev'));
        this.quill.keyboard.addBinding({
          key: KEYS.ARROW_DOWN
        }, this._moveToItem.bind(this, 'next'));
        this.quill.keyboard.addBinding({
          key: [KEYS.ENTER, KEYS.SPACE]
        }, this._selectItemHandler.bind(this));
        var enterBindings = this.quill.keyboard.bindings[KEYS.ENTER];
        enterBindings.unshift(enterBindings.pop());
        this.quill.keyboard.addBinding({
          key: KEYS.ESCAPE
        }, this._escapeKeyHandler.bind(this));
        this.quill.keyboard.addBinding({
          key: [KEYS.ARROW_LEFT, KEYS.ARROW_RIGHT],
          shiftKey: true
        }, this._ignoreKeyHandler.bind(this));
        this.quill.keyboard.addBinding({
          key: NAVIGATION_KEYS
        }, this._ignoreKeyHandler.bind(this));
      };
      _proto._moveToItem = function _moveToItem(direction) {
        var dataSource = this._list.getDataSource();
        if (this._isMentionActive && !dataSource.isLoading()) {
          var $focusedItem = (0, _renderer.default)(this._list.option('focusedElement'));
          var defaultItemPosition = direction === 'next' ? 'first' : 'last';
          var $nextItem = $focusedItem[direction]();
          $nextItem = $nextItem.length ? $nextItem : this._activeListItems[defaultItemPosition]();
          this._list.option('focusedElement', (0, _element.getPublicElement)($nextItem));
          this._list.scrollToItem($nextItem);
        }
        return !this._isMentionActive;
      };
      _proto._ignoreKeyHandler = function _ignoreKeyHandler() {
        return !this._isMentionActive;
      };
      _proto._fitIntoRange = function _fitIntoRange(value, start, end) {
        if (value > end) {
          return start;
        }
        if (value < start) {
          return end;
        }
        return value;
      };
      _proto._selectItemHandler = function _selectItemHandler() {
        if (this._isMentionActive) {
          this._list.option('items').length ? this._list.selectItem(this._list.option('focusedElement')) : this._popup.hide();
        }
        return !this._isMentionActive;
      };
      _proto._escapeKeyHandler = function _escapeKeyHandler() {
        if (this._isMentionActive) {
          this._popup.hide();
        }
        return !this._isMentionActive;
      };
      _proto.renderList = function renderList($container, options) {
        this.compileGetters(this.options);
        _PopupModule.prototype.renderList.call(this, $container, options);
      };
      _proto.compileGetters = function compileGetters(_ref) {
        var displayExpr = _ref.displayExpr,
            valueExpr = _ref.valueExpr;
        this._valueGetter = (0, _data.compileGetter)(displayExpr);
        this._idGetter = (0, _data.compileGetter)(valueExpr);
      };
      _proto._getListConfig = function _getListConfig(options) {
        var _this2 = this;
        var baseConfig = _PopupModule.prototype._getListConfig.call(this, options);
        return (0, _extend.extend)(baseConfig, {
          itemTemplate: this.options.itemTemplate,
          onContentReady: function onContentReady() {
            if (_this2._hasSearch) {
              _this2._popup.repaint();
              _this2._focusFirstElement();
              _this2._hasSearch = false;
            }
          }
        });
      };
      _proto.insertEmbedContent = function insertEmbedContent() {
        var markerLength = this._activeMentionConfig.marker.length;
        var textLength = markerLength + this._searchValue.length;
        var caretPosition = this.getPosition();
        var selectedItem = this._list.option('selectedItem');
        var value = {
          value: this._valueGetter(selectedItem),
          id: this._idGetter(selectedItem),
          marker: this._activeMentionConfig.marker,
          keyInTemplateStorage: this.editorInstance.getMentionKeyInTemplateStorage()
        };
        var Delta = _devextremeQuill.default.import('delta');
        var startIndex = Math.max(0, caretPosition - markerLength);
        var newDelta = new Delta().retain(startIndex).delete(textLength).insert({
          mention: value
        }).insert(' ');
        this.quill.updateContents(newDelta);
        this.quill.setSelection(startIndex + 2);
      };
      _proto._getLastInsertOperation = function _getLastInsertOperation(ops) {
        var lastOperation = ops[ops.length - 1];
        var isLastOperationInsert = 'insert' in lastOperation;
        if (isLastOperationInsert) {
          return lastOperation;
        }
        var isLastOperationDelete = 'delete' in lastOperation;
        if (isLastOperationDelete && ops.length >= 2) {
          var penultOperation = ops[ops.length - 2];
          var isPenultOperationInsert = 'insert' in penultOperation;
          var isSelectionReplacing = isLastOperationDelete && isPenultOperationInsert;
          if (isSelectionReplacing) {
            return penultOperation;
          }
        }
        return null;
      };
      _proto.onTextChange = function onTextChange(newDelta, oldDelta, source) {
        if (source === USER_ACTION) {
          var lastOperation = newDelta.ops[newDelta.ops.length - 1];
          if (this._isMentionActive && this._isPopupVisible) {
            this._processSearchValue(lastOperation) && this._filterList(this._searchValue);
          } else {
            var ops = newDelta.ops;
            var lastInsertOperation = this._getLastInsertOperation(ops);
            if (lastInsertOperation) {
              this.checkMentionRequest(lastInsertOperation, ops);
            }
          }
        }
      };
      _proto._processSearchValue = function _processSearchValue(operation) {
        var isInsertOperation = 'insert' in operation;
        if (isInsertOperation) {
          this._searchValue += operation.insert;
        } else {
          if (!this._searchValue.length || operation.delete > 1) {
            this._popup.hide();
            return false;
          } else {
            this._searchValue = this._searchValue.slice(0, -1);
          }
        }
        return true;
      };
      _proto.checkMentionRequest = function checkMentionRequest(_ref2, ops) {
        var insert = _ref2.insert;
        var caret = this.quill.getSelection();
        if (!insert || !(0, _type.isString)(insert) || !caret || this._isMarkerPartOfText(ops[0].retain)) {
          return;
        }
        this._activeMentionConfig = this._mentions[insert];
        if (this._activeMentionConfig) {
          this._updateList(this._activeMentionConfig);
          // NOTE: Fix of off-by-one error in selection index after insert on a new line.
          // See https://github.com/quilljs/quill/issues/1763.
          var isOnNewLine = caret.index && this._getCharByIndex(caret.index - 1) === '\n';
          this.savePosition(caret.index + isOnNewLine);
          this._popup.option('position', this._popupPosition);
          this._searchValue = '';
          this._popup.show();
        }
      };
      _proto._isMarkerPartOfText = function _isMarkerPartOfText(retain) {
        if (!retain || ALLOWED_PREFIX_CHARS.indexOf(this._getCharByIndex(retain - 1)) !== -1) {
          return false;
        }
        return true;
      };
      _proto._getCharByIndex = function _getCharByIndex(index) {
        return this.quill.getContents(index, 1).ops[0].insert;
      };
      _proto._updateList = function _updateList(_ref3) {
        var dataSource = _ref3.dataSource,
            displayExpr = _ref3.displayExpr,
            valueExpr = _ref3.valueExpr,
            itemTemplate = _ref3.itemTemplate,
            searchExpr = _ref3.searchExpr;
        this.compileGetters({
          displayExpr: displayExpr,
          valueExpr: valueExpr
        });
        this._list.unselectAll();
        this._list.option({
          dataSource: dataSource,
          displayExpr: displayExpr,
          itemTemplate: itemTemplate,
          searchExpr: searchExpr
        });
      };
      _proto._filterList = function _filterList(searchValue) {
        var _this3 = this;
        if (!this._isMinSearchLengthExceeded(searchValue)) {
          this._resetFilter();
          return;
        }
        var searchTimeout = this._activeMentionConfig.searchTimeout;
        if (searchTimeout) {
          clearTimeout(this._searchTimer);
          this._searchTimer = setTimeout(function () {
            _this3._search(searchValue);
          }, searchTimeout);
        } else {
          this._search(searchValue);
        }
      };
      _proto._isMinSearchLengthExceeded = function _isMinSearchLengthExceeded(searchValue) {
        return searchValue.length >= this._activeMentionConfig.minSearchLength;
      };
      _proto._resetFilter = function _resetFilter() {
        clearTimeout(this._searchTimer);
        this._search(null);
      };
      _proto._search = function _search(searchValue) {
        this._hasSearch = true;
        this._list.option('searchValue', searchValue);
      };
      _proto._focusFirstElement = function _focusFirstElement() {
        if (!this._list) {
          return;
        }
        var $firstItem = this._activeListItems.first();
        this._list.option('focusedElement', (0, _element.getPublicElement)($firstItem));
        this._list.scrollToItem($firstItem);
      };
      _proto._getPopupConfig = function _getPopupConfig() {
        var _this4 = this;
        return (0, _extend.extend)(_PopupModule.prototype._getPopupConfig.call(this), {
          hideOnParentScroll: false,
          onShown: function onShown() {
            _this4._isMentionActive = true;
            _this4._hasSearch = false;
            _this4._focusFirstElement();
          },
          onHidden: function onHidden() {
            _this4._list.unselectAll();
            _this4._list.option('focusedElement', null);
            _this4._isMentionActive = false;
            _this4._search(null);
          },
          focusStateEnabled: false
        });
      };
      _proto.clean = function clean() {
        var _this5 = this;
        Object.keys(this._mentions).forEach(function (marker) {
          if (_this5._mentions[marker].template) {
            _mention.default.removeTemplate({
              marker: marker,
              editorKey: _this5.editorInstance.getMentionKeyInTemplateStorage()
            });
          }
        });
      };
      _createClass(MentionModule, [{
        key: "_isPopupVisible",
        get: function get() {
          var _this$_popup;
          return (_this$_popup = this._popup) === null || _this$_popup === void 0 ? void 0 : _this$_popup.option('visible');
        }
      }, {
        key: "_popupPosition",
        get: function get() {
          var position = this.getPosition();
          var _this$quill$getBounds = this.quill.getBounds(position ? position - 1 : position),
              mentionLeft = _this$quill$getBounds.left,
              mentionTop = _this$quill$getBounds.top,
              mentionHeight = _this$quill$getBounds.height;
          var _$$offset = (0, _renderer.default)(this.quill.root).offset(),
              leftOffset = _$$offset.left,
              topOffset = _$$offset.top;
          var positionEvent = _events_engine.default.Event('positionEvent', {
            pageX: leftOffset + mentionLeft,
            pageY: topOffset + mentionTop
          });
          return {
            of: positionEvent,
            offset: {
              v: mentionHeight
            },
            my: 'top left',
            at: 'top left',
            collision: {
              y: 'flip',
              x: 'flipfit'
            }
          };
        }
      }, {
        key: "_activeListItems",
        get: function get() {
          return this._list.itemElements().filter(":not(.".concat(DISABLED_STATE_CLASS, ")"));
        }
      }]);
      return MentionModule;
    }(_popup.default);
  }
  var _default = MentionModule;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../core/renderer","devextreme-quill","../../../core/utils/data","../../../core/utils/type","../../../core/utils/extend","../../../core/element","../../../events/core/events_engine","./base","./popup","../formats/mention"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../core/renderer"), require("devextreme-quill"), require("../../../core/utils/data"), require("../../../core/utils/type"), require("../../../core/utils/extend"), require("../../../core/element"), require("../../../events/core/events_engine"), require("./base"), require("./popup"), require("../formats/mention"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=mentions.js.map