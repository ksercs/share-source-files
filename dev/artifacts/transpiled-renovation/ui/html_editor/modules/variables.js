"use strict";

exports.default = void 0;
var _devextremeQuill = _interopRequireDefault(require("devextreme-quill"));
var _renderer = _interopRequireDefault(require("../../../core/renderer"));
var _position = require("../../../core/utils/position");
var _popup = _interopRequireDefault(require("./popup"));
var _base = _interopRequireDefault(require("./base"));
var _variable = _interopRequireDefault(require("../formats/variable"));
var _extend = require("../../../core/utils/extend");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var VariableModule = _base.default;
if (_devextremeQuill.default) {
  var VARIABLE_FORMAT_CLASS = 'dx-variable-format';
  var ACTIVE_FORMAT_CLASS = 'dx-format-active';
  var SELECTED_STATE_CLASS = 'dx-state-selected';
  _devextremeQuill.default.register({
    'formats/variable': _variable.default
  }, true);
  VariableModule = /*#__PURE__*/function (_PopupModule) {
    _inheritsLoose(VariableModule, _PopupModule);
    var _proto = VariableModule.prototype;
    _proto._getDefaultOptions = function _getDefaultOptions() {
      var baseConfig = _PopupModule.prototype._getDefaultOptions.call(this);
      return (0, _extend.extend)(baseConfig, {
        escapeChar: ''
      });
    };
    function VariableModule(quill, options) {
      var _this;
      _this = _PopupModule.call(this, quill, options) || this;
      var toolbar = quill.getModule('toolbar');
      if (toolbar) {
        toolbar.addClickHandler('variable', _this.showPopup.bind(_assertThisInitialized(_this)));
      }
      quill.keyboard.addBinding({
        key: 'P',
        altKey: true
      }, _this.showPopup.bind(_assertThisInitialized(_this)));
      _this._popup.on('shown', function (e) {
        var $ofElement = (0, _renderer.default)(e.component.option('position').of);
        if ($ofElement.hasClass(VARIABLE_FORMAT_CLASS)) {
          $ofElement.addClass(ACTIVE_FORMAT_CLASS);
          $ofElement.addClass(SELECTED_STATE_CLASS);
        }
      });
      return _this;
    }
    _proto.showPopup = function showPopup(event) {
      var selection = this.quill.getSelection(true);
      var position = selection ? selection.index : this.quill.getLength();
      this.savePosition(position);
      this._resetPopupPosition(event, position);
      _PopupModule.prototype.showPopup.call(this);
    };
    _proto._resetPopupPosition = function _resetPopupPosition(event, position) {
      if (event && event.element) {
        this._popup.option('position', {
          of: event.element,
          offset: {
            h: 0,
            v: 0
          },
          my: 'top center',
          at: 'bottom center',
          collision: 'fit'
        });
      } else {
        var mentionBounds = this.quill.getBounds(position);
        var rootRect = (0, _position.getBoundingRect)(this.quill.root);
        this._popup.option('position', {
          of: this.quill.root,
          offset: {
            h: mentionBounds.left,
            v: mentionBounds.bottom - rootRect.height
          },
          my: 'top center',
          at: 'bottom left',
          collision: 'fit flip'
        });
      }
    };
    _proto.insertEmbedContent = function insertEmbedContent(selectionChangedEvent) {
      var caretPosition = this.getPosition();
      var selectedItem = selectionChangedEvent.component.option('selectedItem');
      var variableData = (0, _extend.extend)({}, {
        value: selectedItem,
        escapeChar: this.options.escapeChar
      });
      setTimeout(function () {
        this.quill.insertEmbed(caretPosition, 'variable', variableData);
        this.quill.setSelection(caretPosition + 1);
      }.bind(this));
    };
    return VariableModule;
  }(_popup.default);
}
var _default = VariableModule;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;