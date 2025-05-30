/**
* DevExtreme (esm/ui/collection/ui.collection_widget.async.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import CollectionWidgetEdit from './ui.collection_widget.edit';
import { Deferred, when } from '../../core/utils/deferred';
import { noop } from '../../core/utils/common';
var AsyncCollectionWidget = CollectionWidgetEdit.inherit({
  _initMarkup() {
    this._deferredItems = [];
    this.callBase();
  },
  _renderItemContent(args) {
    var renderContentDeferred = new Deferred();
    var itemDeferred = new Deferred();
    var that = this;
    this._deferredItems[args.index] = itemDeferred;
    var $itemContent = this.callBase.call(that, args);
    itemDeferred.done(() => {
      renderContentDeferred.resolve($itemContent);
    });
    return renderContentDeferred.promise();
  },
  _onItemTemplateRendered: function _onItemTemplateRendered(itemTemplate, renderArgs) {
    return () => {
      this._deferredItems[renderArgs.index].resolve();
    };
  },
  _postProcessRenderItems: noop,
  _renderItemsAsync() {
    var d = new Deferred();
    when.apply(this, this._deferredItems).done(() => {
      this._postProcessRenderItems();
      d.resolve();
    });
    return d.promise();
  },
  _clean() {
    this.callBase();
    this._deferredItems = [];
  }
});
export default AsyncCollectionWidget;
