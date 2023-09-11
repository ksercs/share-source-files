/**
* DevExtreme (renovation/ui/pager/pager.j.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../../core/component_registrator"));
var _grid_pager = require("../../component_wrapper/grid_pager");
var _pager = require("./pager");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
var Pager = /*#__PURE__*/function (_GridPagerWrapper) {
  _inheritsLoose(Pager, _GridPagerWrapper);
  function Pager() {
    return _GridPagerWrapper.apply(this, arguments) || this;
  }
  var _proto = Pager.prototype;
  _proto.getProps = function getProps() {
    var props = _GridPagerWrapper.prototype.getProps.call(this);
    props.onKeyDown = this._wrapKeyDownHandler(props.onKeyDown);
    return props;
  };
  _createClass(Pager, [{
    key: "_propsInfo",
    get: function get() {
      return {
        twoWay: [['pageSize', 'defaultPageSize', 'pageSizeChange'], ['pageIndex', 'defaultPageIndex', 'pageIndexChange']],
        allowNull: [],
        elements: [],
        templates: [],
        props: ['defaultPageSize', 'pageSizeChange', 'defaultPageIndex', 'pageIndexChange', 'gridCompatibility', 'className', 'showInfo', 'infoText', 'lightModeEnabled', 'displayMode', 'maxPagesCount', 'pageCount', 'pagesCountText', 'visible', 'hasKnownLastPage', 'pagesNavigatorVisible', 'showPageSizes', 'pageSizes', 'rtlEnabled', 'showNavigationButtons', 'totalCount', 'label', 'onKeyDown', 'pageSize', 'pageIndex']
      };
    }
  }, {
    key: "_viewComponent",
    get: function get() {
      return _pager.Pager;
    }
  }]);
  return Pager;
}(_grid_pager.GridPagerWrapper);
exports.default = Pager;
(0, _component_registrator.default)('dxPager', Pager);
module.exports = exports.default;
module.exports.default = exports.default;
