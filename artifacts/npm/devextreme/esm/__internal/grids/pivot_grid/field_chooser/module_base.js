/**
* DevExtreme (esm/__internal/grids/pivot_grid/field_chooser/module_base.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../../../core/renderer';
import eventsEngine from '../../../../events/core/events_engine';
import ArrayStore from '../../../../data/array_store';
import { name as clickEventName } from '../../../../events/click';
import { noop } from '../../../../core/utils/common';
import { isDefined } from '../../../../core/utils/type';
import { extend } from '../../../../core/utils/extend';
import { each, map } from '../../../../core/utils/iterator';
import localizationMessage from '../../../../localization/message';
import registerComponent from '../../../../core/component_registrator';
import Widget from '../../../../ui/widget/ui.widget';
import { HeaderFilterView as HeaderFilterViewBase, updateHeaderFilterItemSelectionState, headerFilterMixin } from '../../../../ui/grid_core/ui.grid_core.header_filter_core';
import columnStateMixin from '../../../../ui/grid_core/ui.grid_core.column_state_mixin';
import sortingMixin from '../../../../ui/grid_core/ui.grid_core.sorting_mixin';
import gridCoreUtils from '../../../../ui/grid_core/ui.grid_core.utils';
import { Deferred } from '../../../../core/utils/deferred';
import { reverseSortOrder } from './utils';
import { foreachTree, createPath } from '../module_widget_utils';
import { Sortable } from '../sortable/module';
import { ATTRIBUTES, CLASSES } from './const';
import { dragAndDropItemRender } from './dom';
var DIV = '<div>';
var HeaderFilterView = HeaderFilterViewBase.inherit({
  _getSearchExpr(options, headerFilterOptions) {
    options.useDefaultSearchExpr = true;
    return this.callBase(options, headerFilterOptions);
  }
});
var processItems = function processItems(groupItems, field) {
  var filterValues = [];
  var isTree = !!field.groupName;
  var isExcludeFilterType = field.filterType === 'exclude';
  if (field.filterValues) {
    each(field.filterValues, (_, filterValue) => {
      filterValues.push(Array.isArray(filterValue) ? filterValue.join('/') : filterValue && filterValue.valueOf());
    });
  }
  foreachTree(groupItems, items => {
    var item = items[0];
    var path = createPath(items);
    var preparedFilterValueByText = isTree ? map(items, item => item.text).reverse().join('/') : item.text;
    item.value = isTree ? path.slice(0) : item.key || item.value;
    var preparedFilterValue = isTree ? path.join('/') : item.value && item.value.valueOf();
    if (item.children) {
      item.items = item.children;
      item.children = null;
    }
    updateHeaderFilterItemSelectionState(item, item.key && filterValues.includes(preparedFilterValueByText) || filterValues.includes(preparedFilterValue), isExcludeFilterType);
  });
};
function getMainGroupField(dataSource, sourceField) {
  var field = sourceField;
  if (isDefined(sourceField.groupIndex)) {
    field = dataSource.getAreaFields(sourceField.area, true)[sourceField.areaIndex];
  }
  return field;
}
function getStringState(state) {
  state = state || {};
  return JSON.stringify([state.fields, state.columnExpandedPaths, state.rowExpandedPaths]);
}
var FieldChooserBase = Widget.inherit(columnStateMixin).inherit(sortingMixin).inherit(headerFilterMixin).inherit({
  _getDefaultOptions() {
    return extend(this.callBase(), {
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
          emptyValue: localizationMessage.format('dxDataGrid-headerFilterEmptyValue'),
          ok: localizationMessage.format('dxDataGrid-headerFilterOK'),
          cancel: localizationMessage.format('dxDataGrid-headerFilterCancel')
        }
      },
      // NOTE: private option added in fix of the T1150523 ticket.
      remoteSort: false
    });
  },
  _init() {
    this.callBase();
    this._headerFilterView = new HeaderFilterView(this);
    this._refreshDataSource();
    this.subscribeToEvents();
    gridCoreUtils.logHeaderFilterDeprecatedWarningIfNeed(this);
  },
  _refreshDataSource() {
    var dataSource = this.option('dataSource');
    if (dataSource && dataSource.fields && dataSource.load /* instanceof DX.ui.dxPivotGrid.DataSource */) {
      this._dataSource = dataSource;
    }
  },
  _optionChanged(args) {
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
  renderField(field, showColumnLines) {
    var that = this;
    var $fieldContent = $(DIV).addClass(CLASSES.area.fieldContent).text(field.caption || field.dataField);
    var $fieldElement = $(DIV).addClass(CLASSES.area.field).addClass(CLASSES.area.box).data('field', field).append($fieldContent);
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
          showColumnLines
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
        showColumnLines
      });
    }
    if (field.groupName) {
      $fieldElement.attr(ATTRIBUTES.itemGroup, field.groupName);
    }
    return $fieldElement;
  },
  _clean() {},
  _render() {
    this.callBase();
    this._headerFilterView.render(this.$element());
  },
  renderSortable() {
    var that = this;
    that._createComponent(that.$element(), Sortable, extend({
      allowDragging: that.option('allowFieldDragging'),
      itemSelector: ".".concat(CLASSES.area.field),
      itemContainerSelector: ".".concat(CLASSES.area.fieldContainer),
      groupSelector: ".".concat(CLASSES.area.fieldList),
      groupFilter() {
        var dataSource = that._dataSource;
        var $sortable = $(this).closest('.dx-sortable-old');
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
      itemRender: dragAndDropItemRender,
      onDragging(e) {
        var field = e.sourceElement.data('field');
        var {
          targetGroup
        } = e;
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
      onChanged(e) {
        var field = e.sourceElement.data('field');
        e.removeSourceElement = !!e.sourceGroup;
        that._adjustSortableOnChangedArgs(e);
        if (field) {
          var {
            targetIndex
          } = e;
          var mainGroupField;
          var invisibleFieldsIndexOffset = 0;
          that._processDemandState(dataSource => {
            var fields = dataSource.getAreaFields(field.area, true);
            mainGroupField = getMainGroupField(dataSource, field);
            var visibleFields = fields.filter(f => f.visible !== false);
            var fieldBeforeTarget = visibleFields[targetIndex - 1];
            if (fieldBeforeTarget) {
              invisibleFieldsIndexOffset = fields.filter(f => f.visible === false && f.areaIndex <= fieldBeforeTarget.areaIndex).length;
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
  _processDemandState(func) {
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
  _applyChanges(fields, props) {
    var that = this;
    that._processDemandState((dataSource, isInstantlyMode) => {
      fields.forEach(_ref => {
        var {
          index
        } = _ref;
        dataSource.field(index, props);
      });
      if (isInstantlyMode) {
        dataSource.load();
      } else {
        that._changedHandler();
      }
    });
  },
  _applyLocalSortChanges(fieldIdx, sortOrder) {
    this._processDemandState(dataSource => {
      dataSource.field(fieldIdx, {
        sortOrder
      });
      dataSource.sortLocal();
    });
  },
  _adjustSortableOnChangedArgs(e) {
    e.removeSourceElement = false;
    e.removeTargetElement = true;
    e.removeSourceClass = false;
  },
  _getSortableOptions() {
    return {
      direction: 'auto'
    };
  },
  subscribeToEvents(element) {
    var that = this;
    var func = function func(e) {
      var field = $(e.currentTarget).data('field');
      var mainGroupField = extend(true, {}, getMainGroupField(that._dataSource, field));
      var isHeaderFilter = $(e.target).hasClass(CLASSES.headerFilter);
      var dataSource = that._dataSource;
      var type = mainGroupField.groupName ? 'tree' : 'list';
      var paginate = dataSource.paginate() && type === 'list';
      if (isHeaderFilter) {
        that._headerFilterView.showHeaderFilterMenu($(e.currentTarget), extend(mainGroupField, {
          type,
          encodeHtml: that.option('encodeHtml'),
          dataSource: {
            useDefaultSearch: !paginate,
            // paginate: false,
            load(options) {
              var {
                userData
              } = options;
              if (userData.store) {
                return userData.store.load(options);
              }
              // @ts-expect-error
              var d = new Deferred();
              dataSource.getFieldValues(mainGroupField.index, that.option('headerFilter.showRelevantValues'), paginate ? options : undefined).done(data => {
                var emptyValue = that.option('headerFilter.texts.emptyValue');
                data.forEach(element => {
                  if (!element.text) {
                    element.text = emptyValue;
                  }
                });
                if (paginate) {
                  d.resolve(data);
                } else {
                  userData.store = new ArrayStore(data);
                  userData.store.load(options).done(d.resolve).fail(d.reject);
                }
              }).fail(d.reject);
              return d;
            },
            postProcess(data) {
              processItems(data, mainGroupField);
              return data;
            }
          },
          apply() {
            that._applyChanges([mainGroupField], {
              filterValues: this.filterValues,
              filterType: this.filterType
            });
          }
        }));
      } else if (field.allowSorting && field.area !== 'data') {
        var isRemoteSort = that.option('remoteSort');
        var sortOrder = reverseSortOrder(field.sortOrder);
        if (isRemoteSort) {
          that._applyChanges([field], {
            sortOrder
          });
        } else {
          that._applyLocalSortChanges(field.index, sortOrder);
        }
      }
    };
    if (element) {
      eventsEngine.on(element, clickEventName, ".".concat(CLASSES.area.field, ".").concat(CLASSES.area.box), func);
      return;
    }
    eventsEngine.on(that.$element(), clickEventName, ".".concat(CLASSES.area.field, ".").concat(CLASSES.area.box), func);
  },
  _initTemplates: noop,
  addWidgetPrefix(className) {
    return "dx-pivotgrid-".concat(className);
  }
});
registerComponent('dxPivotGridFieldChooserBase', FieldChooserBase);
export default {
  FieldChooserBase
};
export { FieldChooserBase };
