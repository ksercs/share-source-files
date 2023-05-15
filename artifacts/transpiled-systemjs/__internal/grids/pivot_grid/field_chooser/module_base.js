!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in v||(v[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==g.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=v[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(g.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=v[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return y[e]||(y[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},{id:r.name});t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=v[s],f=y[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=p(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=v[e];if(t)t.declarative?f(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=p(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=v[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);void 0!==c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(m)for(var n in r)"default"!==n&&c(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,x(t,"__useDefault",{value:!0}),t}function c(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&x(e,t,n)}catch(o){return e[t]=r[t],!1}}function f(r,t){var n=v[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==g.call(t,u)&&(v[u]?f(u,t):p(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function p(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return I[e]=s(D(e.substr(6)));var r=v[e];if(!r)throw"Module "+e+" not present.";return a(e),f(e,[]),v[e]=void 0,r.declarative&&x(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var v={},g=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},m=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(h){m=!1}var x;!function(){try{Object.defineProperty({},"a",{})&&(x=Object.defineProperty)}catch(e){x=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var y={},D="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&"undefined"!=typeof require.resolve&&"undefined"!=typeof process&&process.platform&&require,I={"@empty":{}};return function(e,n,o,a){return function(u){u(function(u){for(var d={_nodeRequire:D,register:r,registerDynamic:t,get:p,set:function(e,r){I[e]=r},newModule:function(e){return e}},i=0;i<n.length;i++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[i],arguments[i]);a(d);var l=p(e[0]);if(e.length>1)for(var i=1;i<e.length;i++)p(e[i]);return o?l["default"]:l})}}}("undefined"!=typeof self?self:global)

(["artifacts/transpiled/__internal/grids/pivot_grid/field_chooser/module_base.js"], ["../../../../core/renderer","../../../../events/core/events_engine","../../../../data/array_store","../../../../events/click","../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../localization/message","../../../../core/component_registrator","../../../../ui/widget/ui.widget","../../../../ui/grid_core/ui.grid_core.header_filter_core","../../../../ui/grid_core/ui.grid_core.column_state_mixin","../../../../ui/grid_core/ui.grid_core.sorting_mixin","../../../../ui/grid_core/ui.grid_core.utils","../../../../core/utils/deferred","./utils","../module_widget_utils","../sortable/module","./const","./dom"], true, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.registerDynamic("artifacts/transpiled/__internal/grids/pivot_grid/field_chooser/module_base.js", ["../../../../core/renderer", "../../../../events/core/events_engine", "../../../../data/array_store", "../../../../events/click", "../../../../core/utils/common", "../../../../core/utils/type", "../../../../core/utils/extend", "../../../../core/utils/iterator", "../../../../localization/message", "../../../../core/component_registrator", "../../../../ui/widget/ui.widget", "../../../../ui/grid_core/ui.grid_core.header_filter_core", "../../../../ui/grid_core/ui.grid_core.column_state_mixin", "../../../../ui/grid_core/ui.grid_core.sorting_mixin", "../../../../ui/grid_core/ui.grid_core.utils", "../../../../core/utils/deferred", "./utils", "../module_widget_utils", "../sortable/module", "./const", "./dom"], true, function ($__require, exports, module) {
  "use strict";

  var global = this || self,
      GLOBAL = global;
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = exports.FieldChooserBase = void 0;
  var _renderer = _interopRequireDefault($__require("../../../../core/renderer"));
  var _events_engine = _interopRequireDefault($__require("../../../../events/core/events_engine"));
  var _array_store = _interopRequireDefault($__require("../../../../data/array_store"));
  var _click = $__require("../../../../events/click");
  var _common = $__require("../../../../core/utils/common");
  var _type = $__require("../../../../core/utils/type");
  var _extend = $__require("../../../../core/utils/extend");
  var _iterator = $__require("../../../../core/utils/iterator");
  var _message = _interopRequireDefault($__require("../../../../localization/message"));
  var _component_registrator = _interopRequireDefault($__require("../../../../core/component_registrator"));
  var _ui = _interopRequireDefault($__require("../../../../ui/widget/ui.widget"));
  var _uiGrid_core = $__require("../../../../ui/grid_core/ui.grid_core.header_filter_core");
  var _uiGrid_core2 = _interopRequireDefault($__require("../../../../ui/grid_core/ui.grid_core.column_state_mixin"));
  var _uiGrid_core3 = _interopRequireDefault($__require("../../../../ui/grid_core/ui.grid_core.sorting_mixin"));
  var _uiGrid_core4 = _interopRequireDefault($__require("../../../../ui/grid_core/ui.grid_core.utils"));
  var _deferred = $__require("../../../../core/utils/deferred");
  var _utils = $__require("./utils");
  var _module_widget_utils = $__require("../module_widget_utils");
  var _module = $__require("../sortable/module");
  var _const = $__require("./const");
  var _dom = $__require("./dom");
  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : { default: obj };
  }
  var DIV = '<div>';
  var HeaderFilterView = _uiGrid_core.HeaderFilterView.inherit({
    _getSearchExpr: function _getSearchExpr(options, headerFilterOptions) {
      options.useDefaultSearchExpr = true;
      return this.callBase(options, headerFilterOptions);
    }
  });
  var processItems = function processItems(groupItems, field) {
    var filterValues = [];
    var isTree = !!field.groupName;
    var isExcludeFilterType = field.filterType === 'exclude';
    if (field.filterValues) {
      (0, _iterator.each)(field.filterValues, function (_, filterValue) {
        filterValues.push(Array.isArray(filterValue) ? filterValue.join('/') : filterValue && filterValue.valueOf());
      });
    }
    (0, _module_widget_utils.foreachTree)(groupItems, function (items) {
      var item = items[0];
      var path = (0, _module_widget_utils.createPath)(items);
      var preparedFilterValueByText = isTree ? (0, _iterator.map)(items, function (item) {
        return item.text;
      }).reverse().join('/') : item.text;
      item.value = isTree ? path.slice(0) : item.key || item.value;
      var preparedFilterValue = isTree ? path.join('/') : item.value && item.value.valueOf();
      if (item.children) {
        item.items = item.children;
        item.children = null;
      }
      (0, _uiGrid_core.updateHeaderFilterItemSelectionState)(item, item.key && filterValues.includes(preparedFilterValueByText) || filterValues.includes(preparedFilterValue), isExcludeFilterType);
    });
  };
  function getMainGroupField(dataSource, sourceField) {
    var field = sourceField;
    if ((0, _type.isDefined)(sourceField.groupIndex)) {
      field = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex];
    }
    return field;
  }
  function getStringState(state) {
    state = state || {};
    return JSON.stringify([state.fields, state.columnExpandedPaths, state.rowExpandedPaths]);
  }
  var FieldChooserBase = _ui.default.inherit(_uiGrid_core2.default).inherit(_uiGrid_core3.default).inherit(_uiGrid_core.headerFilterMixin).inherit({
    _getDefaultOptions: function _getDefaultOptions() {
      return (0, _extend.extend)(this.callBase(), {
        allowFieldDragging: true,
        applyChangesMode: 'instantly',
        state: null,
        headerFilter: {
          width: 252,
          height: 325,
          allowSelectAll: true,
          showRelevantValues: false,
          search: {
            enabled: false,
            timeout: 500,
            editorOptions: {},
            mode: 'contains'
          },
          texts: {
            emptyValue: _message.default.format('dxDataGrid-headerFilterEmptyValue'),
            ok: _message.default.format('dxDataGrid-headerFilterOK'),
            cancel: _message.default.format('dxDataGrid-headerFilterCancel')
          }
        },
        // NOTE: private option added in fix of the T1150523 ticket.
        remoteSort: false
      });
    },
    _init: function _init() {
      this.callBase();
      this._headerFilterView = new HeaderFilterView(this);
      this._refreshDataSource();
      this.subscribeToEvents();
      _uiGrid_core4.default.logHeaderFilterDeprecatedWarningIfNeed(this);
    },
    _refreshDataSource: function _refreshDataSource() {
      var dataSource = this.option('dataSource');
      if (dataSource && dataSource.fields && dataSource.load /* instanceof DX.ui.dxPivotGrid.DataSource */) {
          this._dataSource = dataSource;
        }
    },
    _optionChanged: function _optionChanged(args) {
      switch (args.name) {
        case 'dataSource':
          this._refreshDataSource();
          break;
        case 'applyChangesMode':
        case 'remoteSort':
          break;
        case 'state':
          if (this._skipStateChange || !this._dataSource) {
            break;
          }
          if (this.option('applyChangesMode') === 'instantly' && getStringState(this._dataSource.state()) !== getStringState(args.value)) {
            this._dataSource.state(args.value);
          } else {
            this._clean(true);
            this._renderComponent();
          }
          break;
        case 'headerFilter':
        case 'allowFieldDragging':
          this._invalidate();
          break;
        default:
          this.callBase(args);
      }
    },
    renderField: function renderField(field, showColumnLines) {
      var that = this;
      var $fieldContent = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.fieldContent).text(field.caption || field.dataField);
      var $fieldElement = (0, _renderer.default)(DIV).addClass(_const.CLASSES.area.field).addClass(_const.CLASSES.area.box).data('field', field).append($fieldContent);
      var mainGroupField = getMainGroupField(that._dataSource, field);
      if (field.area !== 'data') {
        if (field.allowSorting) {
          that._applyColumnState({
            name: 'sort',
            rootElement: $fieldElement,
            column: {
              alignment: that.option('rtlEnabled') ? 'right' : 'left',
              sortOrder: field.sortOrder === 'desc' ? 'desc' : 'asc',
              allowSorting: field.allowSorting
            },
            showColumnLines: showColumnLines
          });
        }
        that._applyColumnState({
          name: 'headerFilter',
          rootElement: $fieldElement,
          column: {
            alignment: that.option('rtlEnabled') ? 'right' : 'left',
            filterValues: mainGroupField.filterValues,
            allowFiltering: mainGroupField.allowFiltering && !field.groupIndex,
            allowSorting: field.allowSorting
          },
          showColumnLines: showColumnLines
        });
      }
      if (field.groupName) {
        $fieldElement.attr(_const.ATTRIBUTES.itemGroup, field.groupName);
      }
      return $fieldElement;
    },
    _clean: function _clean() {},
    _render: function _render() {
      this.callBase();
      this._headerFilterView.render(this.$element());
    },
    renderSortable: function renderSortable() {
      var that = this;
      that._createComponent(that.$element(), _module.Sortable, (0, _extend.extend)({
        allowDragging: that.option('allowFieldDragging'),
        itemSelector: ".".concat(_const.CLASSES.area.field),
        itemContainerSelector: ".".concat(_const.CLASSES.area.fieldContainer),
        groupSelector: ".".concat(_const.CLASSES.area.fieldList),
        groupFilter: function groupFilter() {
          var dataSource = that._dataSource;
          var $sortable = (0, _renderer.default)(this).closest('.dx-sortable-old');
          var pivotGrid = $sortable.data('dxPivotGrid');
          var pivotGridFieldChooser = $sortable.data('dxPivotGridFieldChooser');
          if (pivotGrid) {
            return pivotGrid.getDataSource() === dataSource;
          }
          if (pivotGridFieldChooser) {
            return pivotGridFieldChooser.option('dataSource') === dataSource;
          }
          return false;
        },
        itemRender: _dom.dragAndDropItemRender,
        onDragging: function onDragging(e) {
          var field = e.sourceElement.data('field');
          var targetGroup = e.targetGroup;
          e.cancel = false;
          if (field.isMeasure === true) {
            if (targetGroup === 'column' || targetGroup === 'row' || targetGroup === 'filter') {
              e.cancel = true;
            }
          } else if (field.isMeasure === false && targetGroup === 'data') {
            e.cancel = true;
          }
        },
        useIndicator: true,
        onChanged: function onChanged(e) {
          var field = e.sourceElement.data('field');
          e.removeSourceElement = !!e.sourceGroup;
          that._adjustSortableOnChangedArgs(e);
          if (field) {
            var targetIndex = e.targetIndex;
            var mainGroupField;
            var invisibleFieldsIndexOffset = 0;
            that._processDemandState(function (dataSource) {
              var fields = dataSource.getAreaFields(field.area, true);
              mainGroupField = getMainGroupField(dataSource, field);
              var visibleFields = fields.filter(function (f) {
                return f.visible !== false;
              });
              var fieldBeforeTarget = visibleFields[targetIndex - 1];
              if (fieldBeforeTarget) {
                invisibleFieldsIndexOffset = fields.filter(function (f) {
                  return f.visible === false && f.areaIndex <= fieldBeforeTarget.areaIndex;
                }).length;
              }
            });
            that._applyChanges([mainGroupField], {
              area: e.targetGroup,
              areaIndex: targetIndex + invisibleFieldsIndexOffset
            });
          }
        }
      }, that._getSortableOptions()));
    },
    _processDemandState: function _processDemandState(func) {
      var that = this;
      var isInstantlyMode = that.option('applyChangesMode') === 'instantly';
      var dataSource = that._dataSource;
      if (isInstantlyMode) {
        func(dataSource, isInstantlyMode);
      } else {
        var currentState = dataSource.state();
        var pivotGridState = that.option('state');
        if (pivotGridState) {
          dataSource.state(pivotGridState, true);
        }
        func(dataSource, isInstantlyMode);
        dataSource.state(currentState, true);
      }
    },
    _applyChanges: function _applyChanges(fields, props) {
      var that = this;
      that._processDemandState(function (dataSource, isInstantlyMode) {
        fields.forEach(function (_ref) {
          var index = _ref.index;
          dataSource.field(index, props);
        });
        if (isInstantlyMode) {
          dataSource.load();
        } else {
          that._changedHandler();
        }
      });
    },
    _applyLocalSortChanges: function _applyLocalSortChanges(fieldIdx, sortOrder) {
      this._processDemandState(function (dataSource) {
        dataSource.field(fieldIdx, {
          sortOrder: sortOrder
        });
        dataSource.sortLocal();
      });
    },
    _adjustSortableOnChangedArgs: function _adjustSortableOnChangedArgs(e) {
      e.removeSourceElement = false;
      e.removeTargetElement = true;
      e.removeSourceClass = false;
    },
    _getSortableOptions: function _getSortableOptions() {
      return {
        direction: 'auto'
      };
    },
    subscribeToEvents: function subscribeToEvents(element) {
      var that = this;
      var func = function func(e) {
        var field = (0, _renderer.default)(e.currentTarget).data('field');
        var mainGroupField = (0, _extend.extend)(true, {}, getMainGroupField(that._dataSource, field));
        var isHeaderFilter = (0, _renderer.default)(e.target).hasClass(_const.CLASSES.headerFilter);
        var dataSource = that._dataSource;
        var type = mainGroupField.groupName ? 'tree' : 'list';
        var paginate = dataSource.paginate() && type === 'list';
        if (isHeaderFilter) {
          that._headerFilterView.showHeaderFilterMenu((0, _renderer.default)(e.currentTarget), (0, _extend.extend)(mainGroupField, {
            type: type,
            encodeHtml: that.option('encodeHtml'),
            dataSource: {
              useDefaultSearch: !paginate,
              // paginate: false,
              load: function load(options) {
                var userData = options.userData;
                if (userData.store) {
                  return userData.store.load(options);
                }
                // @ts-expect-error
                var d = new _deferred.Deferred();
                dataSource.getFieldValues(mainGroupField.index, that.option('headerFilter.showRelevantValues'), paginate ? options : undefined).done(function (data) {
                  var emptyValue = that.option('headerFilter.texts.emptyValue');
                  data.forEach(function (element) {
                    if (!element.text) {
                      element.text = emptyValue;
                    }
                  });
                  if (paginate) {
                    d.resolve(data);
                  } else {
                    userData.store = new _array_store.default(data);
                    userData.store.load(options).done(d.resolve).fail(d.reject);
                  }
                }).fail(d.reject);
                return d;
              },
              postProcess: function postProcess(data) {
                processItems(data, mainGroupField);
                return data;
              }
            },
            apply: function apply() {
              that._applyChanges([mainGroupField], {
                filterValues: this.filterValues,
                filterType: this.filterType
              });
            }
          }));
        } else if (field.allowSorting && field.area !== 'data') {
          var isRemoteSort = that.option('remoteSort');
          var sortOrder = (0, _utils.reverseSortOrder)(field.sortOrder);
          if (isRemoteSort) {
            that._applyChanges([field], {
              sortOrder: sortOrder
            });
          } else {
            that._applyLocalSortChanges(field.index, sortOrder);
          }
        }
      };
      if (element) {
        _events_engine.default.on(element, _click.name, ".".concat(_const.CLASSES.area.field, ".").concat(_const.CLASSES.area.box), func);
        return;
      }
      _events_engine.default.on(that.$element(), _click.name, ".".concat(_const.CLASSES.area.field, ".").concat(_const.CLASSES.area.box), func);
    },
    _initTemplates: _common.noop,
    addWidgetPrefix: function addWidgetPrefix(className) {
      return "dx-pivotgrid-".concat(className);
    }
  });
  exports.FieldChooserBase = FieldChooserBase;
  (0, _component_registrator.default)('dxPivotGridFieldChooserBase', FieldChooserBase);
  var _default = {
    FieldChooserBase: FieldChooserBase
  };
  exports.default = _default;
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["../../../../core/renderer","../../../../events/core/events_engine","../../../../data/array_store","../../../../events/click","../../../../core/utils/common","../../../../core/utils/type","../../../../core/utils/extend","../../../../core/utils/iterator","../../../../localization/message","../../../../core/component_registrator","../../../../ui/widget/ui.widget","../../../../ui/grid_core/ui.grid_core.header_filter_core","../../../../ui/grid_core/ui.grid_core.column_state_mixin","../../../../ui/grid_core/ui.grid_core.sorting_mixin","../../../../ui/grid_core/ui.grid_core.utils","../../../../core/utils/deferred","./utils","../module_widget_utils","../sortable/module","./const","./dom"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("../../../../core/renderer"), require("../../../../events/core/events_engine"), require("../../../../data/array_store"), require("../../../../events/click"), require("../../../../core/utils/common"), require("../../../../core/utils/type"), require("../../../../core/utils/extend"), require("../../../../core/utils/iterator"), require("../../../../localization/message"), require("../../../../core/component_registrator"), require("../../../../ui/widget/ui.widget"), require("../../../../ui/grid_core/ui.grid_core.header_filter_core"), require("../../../../ui/grid_core/ui.grid_core.column_state_mixin"), require("../../../../ui/grid_core/ui.grid_core.sorting_mixin"), require("../../../../ui/grid_core/ui.grid_core.utils"), require("../../../../core/utils/deferred"), require("./utils"), require("../module_widget_utils"), require("../sortable/module"), require("./const"), require("./dom"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=module_base.js.map