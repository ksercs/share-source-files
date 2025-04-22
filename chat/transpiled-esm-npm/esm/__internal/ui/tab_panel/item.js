import { noop } from '../../../core/utils/common';
import CollectionWidgetItem from '../../ui/collection/item';
export default class TabPanelItem extends CollectionWidgetItem {
  _renderWatchers() {
    this._startWatcher('badge', noop);
    super._renderWatchers();
  }
}