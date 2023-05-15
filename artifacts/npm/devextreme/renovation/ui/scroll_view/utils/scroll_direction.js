/**
* DevExtreme (renovation/ui/scroll_view/utils/scroll_direction.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
"use strict";

exports.ScrollDirection = void 0;
var _consts = require("../common/consts");
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var ScrollDirection = /*#__PURE__*/function () {
  function ScrollDirection(direction) {
    this.DIRECTION_HORIZONTAL = 'horizontal';
    this.DIRECTION_VERTICAL = 'vertical';
    this.DIRECTION_BOTH = 'both';
    this.direction = direction !== null && direction !== void 0 ? direction : _consts.DIRECTION_VERTICAL;
  }
  _createClass(ScrollDirection, [{
    key: "isHorizontal",
    get: function get() {
      return this.direction === _consts.DIRECTION_HORIZONTAL || this.direction === _consts.DIRECTION_BOTH;
    }
  }, {
    key: "isVertical",
    get: function get() {
      return this.direction === _consts.DIRECTION_VERTICAL || this.direction === _consts.DIRECTION_BOTH;
    }
  }, {
    key: "isBoth",
    get: function get() {
      return this.direction === _consts.DIRECTION_BOTH;
    }
  }]);
  return ScrollDirection;
}();
exports.ScrollDirection = ScrollDirection;
