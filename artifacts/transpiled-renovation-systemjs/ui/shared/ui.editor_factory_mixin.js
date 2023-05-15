!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled-renovation/ui/shared/ui.editor_factory_mixin.js"], ["../../core/renderer","../../events/core/events_engine","../../core/utils/type","../../core/utils/variable_wrapper","../../core/utils/data","../../core/utils/browser","../../core/utils/extend","../../core/devices","../../core/element","../../data/data_source/utils","../../events/utils/index","../text_box","../number_box","../check_box","../select_box","../date_box"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled-renovation/ui/shared/ui.editor_factory_mixin.js", ["../../core/renderer", "../../events/core/events_engine", "../../core/utils/type", "../../core/utils/variable_wrapper", "../../core/utils/data", "../../core/utils/browser", "../../core/utils/extend", "../../core/devices", "../../core/element", "../../data/data_source/utils", "../../events/utils/index", "../text_box", "../number_box", "../check_box", "../select_box", "../date_box"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  exports.default = void 0;
  var _renderer = _interopRequireDefault($__require("../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../events/core/events_engine"));
  var _type = $__require("../../core/utils/type");
  var _variable_wrapper = _interopRequireDefault($__require("../../core/utils/variable_wrapper"));
  var _data = $__require("../../core/utils/data");
  var _browser = _interopRequireDefault($__require("../../core/utils/browser"));
  var _extend = $__require("../../core/utils/extend");
  var _devices = _interopRequireDefault($__require("../../core/devices"));
  var _element = $__require("../../core/element");
  var _utils = $__require("../../data/data_source/utils");
  var _index = $__require("../../events/utils/index");
  $__require("../text_box");
  $__require("../number_box");
  $__require("../check_box");
  $__require("../select_box");
  $__require("../date_box");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var isWrapped = _variable_wrapper.default.isWrapped;
  var CHECKBOX_SIZE_CLASS = 'checkbox-size';
  var EDITOR_INLINE_BLOCK = 'dx-editor-inline-block';
  var EditorFactoryMixin = function () {
    var getResultConfig = function getResultConfig(config, options) {
      return (0, _extend.extend)(config, {
        readOnly: options.readOnly,
        placeholder: options.placeholder,
        inputAttr: {
          id: options.id
        },
        tabIndex: options.tabIndex
      }, options.editorOptions);
    };
    var checkEnterBug = function checkEnterBug() {
      return _browser.default.mozilla || _devices.default.real().ios; // Workaround for T344096, T249363, T314719, caused by https://connect.microsoft.com/IE/feedback/details/1552272/
    };

    var getTextEditorConfig = function getTextEditorConfig(options) {
      var data = {};
      var isEnterBug = checkEnterBug();
      var sharedData = options.sharedData || data;
      return getResultConfig({
        placeholder: options.placeholder,
        width: options.width,
        value: options.value,
        onValueChanged: function onValueChanged(e) {
          var needDelayedUpdate = options.parentType === 'filterRow' || options.parentType === 'searchPanel';
          var isInputOrKeyUpEvent = e.event && (e.event.type === 'input' || e.event.type === 'keyup');
          var updateValue = function updateValue(e, notFireEvent) {
            options && options.setValue(e.value, notFireEvent);
          };
          clearTimeout(data.valueChangeTimeout);
          if (isInputOrKeyUpEvent && needDelayedUpdate) {
            sharedData.valueChangeTimeout = data.valueChangeTimeout = setTimeout(function () {
              updateValue(e, data.valueChangeTimeout !== sharedData.valueChangeTimeout);
            }, (0, _type.isDefined)(options.updateValueTimeout) ? options.updateValueTimeout : 0);
          } else {
            updateValue(e);
          }
        },
        onKeyDown: function onKeyDown(e) {
          if (isEnterBug && (0, _index.normalizeKeyName)(e.event) === 'enter') {
            _events_engine.default.trigger((0, _renderer.default)(e.component._input()), 'change');
          }
        },
        valueChangeEvent: 'change' + (options.parentType === 'filterRow' ? ' keyup input' : '')
      }, options);
    };
    var prepareDateBox = function prepareDateBox(options) {
      options.editorName = 'dxDateBox';
      options.editorOptions = getResultConfig({
        value: options.value,
        onValueChanged: function onValueChanged(args) {
          options.setValue(args.value);
        },
        onKeyDown: function onKeyDown(_ref) {
          var component = _ref.component,
              event = _ref.event;
          var useMaskBehavior = component.option('useMaskBehavior');
          if ((checkEnterBug() || useMaskBehavior) && (0, _index.normalizeKeyName)(event) === 'enter') {
            component.blur();
            component.focus();
          }
        },
        displayFormat: options.format,
        type: options.dataType,
        dateSerializationFormat: null,
        width: options.parentType === 'filterBuilder' ? undefined : 'auto'
      }, options);
    };
    var prepareTextBox = function prepareTextBox(options) {
      var config = getTextEditorConfig(options);
      var isSearching = options.parentType === 'searchPanel';
      var toString = function toString(value) {
        return (0, _type.isDefined)(value) ? value.toString() : '';
      };
      if (options.editorType && options.editorType !== 'dxTextBox') {
        config.value = options.value;
      } else {
        config.value = toString(options.value);
      }
      config.valueChangeEvent += isSearching ? ' keyup input search' : '';
      config.mode = config.mode || (isSearching ? 'search' : 'text');
      options.editorName = 'dxTextBox';
      options.editorOptions = config;
    };
    var prepareNumberBox = function prepareNumberBox(options) {
      var config = getTextEditorConfig(options);
      config.value = (0, _type.isDefined)(options.value) ? options.value : null;
      options.editorName = 'dxNumberBox';
      options.editorOptions = config;
    };
    var prepareBooleanEditor = function prepareBooleanEditor(options) {
      if (options.parentType === 'filterRow' || options.parentType === 'filterBuilder') {
        prepareLookupEditor((0, _extend.extend)(options, {
          lookup: {
            displayExpr: function displayExpr(data) {
              if (data === true) {
                return options.trueText || 'true';
              } else if (data === false) {
                return options.falseText || 'false';
              }
            },
            dataSource: [true, false]
          }
        }));
      } else {
        prepareCheckBox(options);
      }
    };
    function watchLookupDataSource(options) {
      if (options.row && options.row.watch && options.parentType === 'dataRow') {
        var editorOptions = options.editorOptions || {};
        options.editorOptions = editorOptions;
        var selectBox;
        var onInitialized = editorOptions.onInitialized;
        editorOptions.onInitialized = function (e) {
          onInitialized && onInitialized.apply(this, arguments);
          selectBox = e.component;
          selectBox.on('disposing', stopWatch);
        };
        var dataSource;
        var stopWatch = options.row.watch(function () {
          dataSource = options.lookup.dataSource(options.row);
          return dataSource && dataSource.filter;
        }, function () {
          selectBox.option('dataSource', dataSource);
        }, function (row) {
          options.row = row;
        });
      }
    }
    function prepareLookupEditor(options) {
      var lookup = options.lookup;
      var displayGetter;
      var dataSource;
      var postProcess;
      var isFilterRow = options.parentType === 'filterRow';
      if (lookup) {
        var _options$editorType;
        displayGetter = (0, _data.compileGetter)(lookup.displayExpr);
        dataSource = lookup.dataSource;
        if ((0, _type.isFunction)(dataSource) && !isWrapped(dataSource)) {
          dataSource = dataSource(options.row || {});
          watchLookupDataSource(options);
        }
        if ((0, _type.isObject)(dataSource) || Array.isArray(dataSource)) {
          dataSource = (0, _utils.normalizeDataSourceOptions)(dataSource);
          if (isFilterRow) {
            postProcess = dataSource.postProcess;
            dataSource.postProcess = function (items) {
              if (this.pageIndex() === 0) {
                items = items.slice(0);
                items.unshift(null);
              }
              if (postProcess) {
                return postProcess.call(this, items);
              }
              return items;
            };
          }
        }
        var allowClearing = Boolean(lookup.allowClearing && !isFilterRow);
        options.editorName = (_options$editorType = options.editorType) !== null && _options$editorType !== void 0 ? _options$editorType : 'dxSelectBox';
        options.editorOptions = getResultConfig({
          searchEnabled: true,
          value: options.value,
          valueExpr: options.lookup.valueExpr,
          searchExpr: options.lookup.searchExpr || options.lookup.displayExpr,
          allowClearing: allowClearing,
          showClearButton: allowClearing,
          displayExpr: function displayExpr(data) {
            if (data === null) {
              return options.showAllText;
            }
            return displayGetter(data);
          },
          dataSource: dataSource,
          onValueChanged: function onValueChanged(e) {
            var params = [e.value];
            !isFilterRow && params.push(e.component.option('text'));
            options.setValue.apply(this, params);
          }
        }, options);
      }
    }
    function prepareCheckBox(options) {
      options.editorName = 'dxCheckBox';
      options.editorOptions = getResultConfig({
        elementAttr: {
          id: options.id
        },
        value: (0, _type.isDefined)(options.value) ? options.value : undefined,
        hoverStateEnabled: !options.readOnly,
        focusStateEnabled: !options.readOnly,
        activeStateEnabled: false,
        onValueChanged: function onValueChanged(e) {
          options.setValue && options.setValue(e.value, e /* for selection */);
        }
      }, options);
    }
    var createEditorCore = function createEditorCore(that, options) {
      var $editorElement = (0, _renderer.default)(options.editorElement);
      if (options.editorName && options.editorOptions && $editorElement[options.editorName]) {
        if (options.editorName === 'dxCheckBox' || options.editorName === 'dxSwitch') {
          if (!options.isOnForm) {
            $editorElement.addClass(that.addWidgetPrefix(CHECKBOX_SIZE_CLASS));
            $editorElement.parent().addClass(EDITOR_INLINE_BLOCK);
          }
        }
        that._createComponent($editorElement, options.editorName, options.editorOptions);
        if (options.editorName === 'dxDateBox') {
          var dateBox = $editorElement.dxDateBox('instance');
          var defaultEnterKeyHandler = dateBox._supportedKeys()['enter'];
          dateBox.registerKeyHandler('enter', function (e) {
            if (dateBox.option('opened')) {
              defaultEnterKeyHandler(e);
            }
            return true;
          });
        }
        if (options.editorName === 'dxTextArea') {
          $editorElement.dxTextArea('instance').registerKeyHandler('enter', function (event) {
            if ((0, _index.normalizeKeyName)(event) === 'enter' && !event.ctrlKey && !event.shiftKey) {
              event.stopPropagation();
            }
          });
        }
      }
    };
    var prepareCustomEditor = function prepareCustomEditor(options) {
      options.editorName = options.editorType;
      options.editorOptions = getResultConfig({
        value: options.value,
        onValueChanged: function onValueChanged(args) {
          options.setValue(args.value);
        }
      }, options);
    };
    var prepareEditor = function prepareEditor(options) {
      var prepareDefaultEditor = {
        'dxDateBox': prepareDateBox,
        'dxCheckBox': prepareCheckBox,
        'dxNumberBox': prepareNumberBox,
        'dxTextBox': prepareTextBox
      };
      if (options.lookup) {
        prepareLookupEditor(options);
      } else if (options.editorType) {
        var _prepareDefaultEditor;
        ((_prepareDefaultEditor = prepareDefaultEditor[options.editorType]) !== null && _prepareDefaultEditor !== void 0 ? _prepareDefaultEditor : prepareCustomEditor)(options);
      } else {
        switch (options.dataType) {
          case 'date':
          case 'datetime':
            prepareDateBox(options);
            break;
          case 'boolean':
            prepareBooleanEditor(options);
            break;
          case 'number':
            prepareNumberBox(options);
            break;
          default:
            prepareTextBox(options);
            break;
        }
      }
    };
    return {
      createEditor: function createEditor($container, options) {
        options.cancel = false;
        options.editorElement = (0, _element.getPublicElement)($container);
        if (!(0, _type.isDefined)(options.tabIndex)) {
          options.tabIndex = this.option('tabIndex');
        }
        prepareEditor(options);
        this.executeAction('onEditorPreparing', options);
        if (options.cancel) {
          return;
        }
        if (options.parentType === 'dataRow' && !options.isOnForm && !(0, _type.isDefined)(options.editorOptions.showValidationMark)) {
          options.editorOptions.showValidationMark = false;
        }
        createEditorCore(this, options);
        this.executeAction('onEditorPrepared', options);
      }
    };
  }();
  var _default = EditorFactoryMixin;
  exports.default = _default;
  module.exports = exports.default;
  module.exports.default = exports.default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../core/renderer","../../events/core/events_engine","../../core/utils/type","../../core/utils/variable_wrapper","../../core/utils/data","../../core/utils/browser","../../core/utils/extend","../../core/devices","../../core/element","../../data/data_source/utils","../../events/utils/index","../text_box","../number_box","../check_box","../select_box","../date_box"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../core/renderer"), require("../../events/core/events_engine"), require("../../core/utils/type"), require("../../core/utils/variable_wrapper"), require("../../core/utils/data"), require("../../core/utils/browser"), require("../../core/utils/extend"), require("../../core/devices"), require("../../core/element"), require("../../data/data_source/utils"), require("../../events/utils/index"), require("../text_box"), require("../number_box"), require("../check_box"), require("../select_box"), require("../date_box"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=ui.editor_factory_mixin.js.map