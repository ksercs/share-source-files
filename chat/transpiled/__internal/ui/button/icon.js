"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultIconProps = exports.Icon = void 0;
var _inferno = require("inferno");
var _icon = require("../../../core/utils/icon");
var _index = require("../../core/r1/runtime/inferno/index");
var _index2 = require("../../core/r1/utils/index");
var _combine_classes = require("../../core/utils/combine_classes");
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const defaultIconProps = exports.defaultIconProps = {
  position: 'left',
  source: ''
};
class Icon extends _index.BaseInfernoComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  get sourceType() {
    return (0, _icon.getImageSourceType)(this.props.source);
  }
  get cssClass() {
    return this.props.position !== 'left' ? 'dx-icon-right' : '';
  }
  get iconClassName() {
    const generalClasses = {
      'dx-icon': true,
      [this.cssClass]: !!this.cssClass
    };
    const {
      source
    } = this.props;
    if (this.sourceType === 'dxIcon') {
      return (0, _combine_classes.combineClasses)(_extends({}, generalClasses, {
        [`dx-icon-${source}`]: true
      }));
    }
    if (this.sourceType === 'fontIcon') {
      return (0, _combine_classes.combineClasses)(_extends({}, generalClasses, {
        [String(source)]: !!source
      }));
    }
    if (this.sourceType === 'image') {
      return (0, _combine_classes.combineClasses)(generalClasses);
    }
    if (this.sourceType === 'svg') {
      return (0, _combine_classes.combineClasses)(_extends({}, generalClasses, {
        'dx-svg-icon': true
      }));
    }
    return '';
  }
  get restAttributes() {
    const restProps = _extends({}, this.props);
    ['iconTemplate', 'position', 'source'].forEach(excluded => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete restProps[excluded];
    });
    return restProps;
  }
  render() {
    const {
      iconClassName,
      props: {
        source
      },
      sourceType
    } = this;
    const IconTemplate = (0, _index2.getTemplate)(this.props.iconTemplate);
    return (0, _inferno.createFragment)([sourceType === 'dxIcon' && (0, _inferno.createVNode)(1, "i", iconClassName), sourceType === 'fontIcon' && (0, _inferno.createVNode)(1, "i", iconClassName), sourceType === 'image' && (0, _inferno.createVNode)(1, "img", iconClassName, null, 1, {
      "alt": "",
      "src": source
    }), IconTemplate && (0, _inferno.createVNode)(1, "i", iconClassName, IconTemplate({}), 0)], 0);
  }
}
exports.Icon = Icon;
Icon.defaultProps = defaultIconProps;