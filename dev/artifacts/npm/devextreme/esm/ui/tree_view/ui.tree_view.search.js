/**
* DevExtreme (esm/ui/tree_view/ui.tree_view.search.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import registerComponent from '../../core/component_registrator';
import searchBoxMixin from '../widget/ui.search_box_mixin';
import TextBox from '../text_box';
import { extend } from '../../core/utils/extend';
import TreeViewBase from './ui.tree_view.base';
searchBoxMixin.setEditorClass(TextBox);

// STYLE treeView

var WIDGET_CLASS = 'dx-treeview';
var NODE_CONTAINER_CLASS = "".concat(WIDGET_CLASS, "-node-container");
var TreeViewSearch = TreeViewBase.inherit(searchBoxMixin).inherit({
  _addWidgetPrefix: function _addWidgetPrefix(className) {
    return "".concat(WIDGET_CLASS, "-").concat(className);
  },
  _optionChanged: function _optionChanged(args) {
    switch (args.name) {
      case 'searchValue':
        if (this._showCheckboxes() && this._isRecursiveSelection()) {
          this._removeSelection();
        }
        this._initDataAdapter();
        this._updateSearch();
        this._repaintContainer();
        this.option('focusedElement', null);
        break;
      case 'searchExpr':
        this._initDataAdapter();
        this.repaint();
        break;
      case 'searchMode':
        this.option('expandNodesRecursive') ? this._updateDataAdapter() : this._initDataAdapter();
        this.repaint();
        break;
      default:
        this.callBase(args);
    }
  },
  _updateDataAdapter: function _updateDataAdapter() {
    this._setOptionWithoutOptionChange('expandNodesRecursive', false);
    this._initDataAdapter();
    this._setOptionWithoutOptionChange('expandNodesRecursive', true);
  },
  _getDataAdapterOptions: function _getDataAdapterOptions() {
    return extend(this.callBase(), {
      searchValue: this.option('searchValue'),
      searchMode: this.option('searchMode') || 'contains',
      searchExpr: this.option('searchExpr')
    });
  },
  _getNodeContainer: function _getNodeContainer() {
    return this.$element().find(".".concat(NODE_CONTAINER_CLASS)).first();
  },
  _updateSearch: function _updateSearch() {
    if (this._searchEditor) {
      var editorOptions = this._getSearchEditorOptions();
      this._searchEditor.option(editorOptions);
    }
  },
  _repaintContainer: function _repaintContainer() {
    var $container = this._getNodeContainer();
    var rootNodes;
    if ($container.length) {
      $container.empty();
      rootNodes = this._dataAdapter.getRootNodes();
      this._renderEmptyMessage(rootNodes);
      this._renderItems($container, rootNodes);
      this._fireContentReadyAction();
    }
  },
  _focusTarget: function _focusTarget() {
    return this._itemContainer(this.option('searchEnabled'));
  },
  _cleanItemContainer: function _cleanItemContainer() {
    this.$element().empty();
  },
  _itemContainer: function _itemContainer(isSearchMode) {
    if (this._selectAllEnabled()) {
      return this._getNodeContainer();
    }
    if (this._scrollable && isSearchMode) {
      return $(this._scrollable.content());
    }
    return this.callBase();
  },
  _addWidgetClass: function _addWidgetClass() {
    this.$element().addClass(this._widgetClass());
  },
  _clean: function _clean() {
    this.callBase();
    this._removeSearchBox();
  }
});
registerComponent('dxTreeView', TreeViewSearch);
export default TreeViewSearch;
