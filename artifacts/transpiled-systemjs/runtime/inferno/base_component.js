"use strict";

System.register(["inferno", "./effect_host"], function (_export, _context2) {
  "use strict";

  var Component, findDOMfromVNode, InfernoEffectHost, areObjectsEqual, BaseInfernoComponent, InfernoComponent, InfernoWrapperComponent;
  function _get() { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get.bind(); } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(arguments.length < 3 ? target : receiver); } return desc.value; }; } return _get.apply(this, arguments); }
  function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
  function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
  function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
  function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
  function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
  function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
  function _possibleConstructorReturn(self, call) { if (call && (typeof call === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
  function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
  function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
  function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
  return {
    setters: [function (_inferno) {
      Component = _inferno.Component;
      findDOMfromVNode = _inferno.findDOMfromVNode;
    }, function (_effect_host) {
      InfernoEffectHost = _effect_host.InfernoEffectHost;
    }],
    execute: function () {
      areObjectsEqual = function areObjectsEqual(firstObject, secondObject) {
        var bothAreObjects = firstObject instanceof Object && secondObject instanceof Object;
        if (!bothAreObjects) {
          return firstObject === secondObject;
        }
        var firstObjectKeys = Object.keys(firstObject);
        var secondObjectKeys = Object.keys(secondObject);
        if (firstObjectKeys.length !== secondObjectKeys.length) {
          return false;
        }
        var hasDifferentElement = firstObjectKeys.some(function (key) {
          return firstObject[key] !== secondObject[key];
        });
        return !hasDifferentElement;
      };
      _export("BaseInfernoComponent", BaseInfernoComponent = /*#__PURE__*/function (_Component) {
        _inherits(BaseInfernoComponent, _Component);
        var _super = _createSuper(BaseInfernoComponent);
        function BaseInfernoComponent() {
          var _this;
          _classCallCheck(this, BaseInfernoComponent);
          _this = _super.apply(this, arguments);
          _this._pendingContext = _this.context;
          return _this;
        }
        _createClass(BaseInfernoComponent, [{
          key: "componentWillReceiveProps",
          value: function componentWillReceiveProps(_, context) {
            this._pendingContext = context !== null && context !== void 0 ? context : {};
          }
        }, {
          key: "shouldComponentUpdate",
          value: function shouldComponentUpdate(nextProps, nextState) {
            return !areObjectsEqual(this.props, nextProps) || !areObjectsEqual(this.state, nextState) || !areObjectsEqual(this.context, this._pendingContext);
          }
        }]);
        return BaseInfernoComponent;
      }(Component));
      _export("InfernoComponent", InfernoComponent = /*#__PURE__*/function (_BaseInfernoComponent) {
        _inherits(InfernoComponent, _BaseInfernoComponent);
        var _super2 = _createSuper(InfernoComponent);
        function InfernoComponent() {
          var _this2;
          _classCallCheck(this, InfernoComponent);
          _this2 = _super2.apply(this, arguments);
          _this2._effects = [];
          return _this2;
        }
        _createClass(InfernoComponent, [{
          key: "createEffects",
          value: function createEffects() {
            return [];
          }
        }, {
          key: "updateEffects",
          value: function updateEffects() {}
        }, {
          key: "componentWillMount",
          value: function componentWillMount() {
            InfernoEffectHost.lock();
          }
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        }, {
          key: "componentWillUpdate",
          value: function componentWillUpdate(_nextProps, _nextState, _context) {
            InfernoEffectHost.lock();
          }
        }, {
          key: "componentDidMount",
          value: function componentDidMount() {
            var _this3 = this;
            InfernoEffectHost.callbacks.push(function () {
              _this3._effects = _this3.createEffects();
            });
            InfernoEffectHost.callEffects();
          }
        }, {
          key: "componentDidUpdate",
          value: function componentDidUpdate() {
            var _this4 = this;
            InfernoEffectHost.callbacks.push(function () {
              return _this4.updateEffects();
            });
            InfernoEffectHost.callEffects();
          }
        }, {
          key: "destroyEffects",
          value: function destroyEffects() {
            this._effects.forEach(function (e) {
              return e.dispose();
            });
          }
        }, {
          key: "componentWillUnmount",
          value: function componentWillUnmount() {
            this.destroyEffects();
          }
        }]);
        return InfernoComponent;
      }(BaseInfernoComponent));
      _export("InfernoWrapperComponent", InfernoWrapperComponent = /*#__PURE__*/function (_InfernoComponent) {
        _inherits(InfernoWrapperComponent, _InfernoComponent);
        var _super3 = _createSuper(InfernoWrapperComponent);
        function InfernoWrapperComponent() {
          var _this5;
          _classCallCheck(this, InfernoWrapperComponent);
          _this5 = _super3.apply(this, arguments);
          _this5.vDomElement = null;
          return _this5;
        }
        _createClass(InfernoWrapperComponent, [{
          key: "vDomUpdateClasses",
          value: function vDomUpdateClasses() {
            var el = this.vDomElement;
            var currentClasses = el.className.length ? el.className.split(' ') : [];
            var addedClasses = currentClasses.filter(function (className) {
              return el.dxClasses.previous.indexOf(className) < 0;
            });
            var removedClasses = el.dxClasses.previous.filter(function (className) {
              return currentClasses.indexOf(className) < 0;
            });
            addedClasses.forEach(function (value) {
              var indexInRemoved = el.dxClasses.removed.indexOf(value);
              if (indexInRemoved > -1) {
                el.dxClasses.removed.splice(indexInRemoved, 1);
              } else {
                el.dxClasses.added.push(value);
              }
            });
            removedClasses.forEach(function (value) {
              var indexInAdded = el.dxClasses.added.indexOf(value);
              if (indexInAdded > -1) {
                el.dxClasses.added.splice(indexInAdded, 1);
              } else {
                el.dxClasses.removed.push(value);
              }
            });
          }
        }, {
          key: "componentDidMount",
          value: function componentDidMount() {
            var el = findDOMfromVNode(this.$LI, true);
            this.vDomElement = el;
            _get(_getPrototypeOf(InfernoWrapperComponent.prototype), "componentDidMount", this).call(this);
            el.dxClasses = el.dxClasses || {
              removed: [],
              added: [],
              previous: []
            };
            el.dxClasses.previous = (el === null || el === void 0 ? void 0 : el.className.length) ? el.className.split(' ') : [];
          }
        }, {
          key: "componentDidUpdate",
          value: function componentDidUpdate() {
            _get(_getPrototypeOf(InfernoWrapperComponent.prototype), "componentDidUpdate", this).call(this);
            var el = this.vDomElement;
            if (el !== null) {
              el.dxClasses.added.forEach(function (className) {
                return el.classList.add(className);
              });
              el.dxClasses.removed.forEach(function (className) {
                return el.classList.remove(className);
              });
              el.dxClasses.previous = el.className.length ? el.className.split(' ') : [];
            }
          }
        }, {
          key: "shouldComponentUpdate",
          value: function shouldComponentUpdate(nextProps, nextState) {
            var shouldUpdate = _get(_getPrototypeOf(InfernoWrapperComponent.prototype), "shouldComponentUpdate", this).call(this, nextProps, nextState);
            if (shouldUpdate) {
              this.vDomUpdateClasses();
            }
            return shouldUpdate;
          }
        }]);
        return InfernoWrapperComponent;
      }(InfernoComponent));
    }
  };
});