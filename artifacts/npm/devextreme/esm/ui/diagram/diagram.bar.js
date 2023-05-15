/**
* DevExtreme (esm/ui/diagram/diagram.bar.js)
* Version: 23.1.1
* Build date: Mon May 15 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import { getDiagram } from './diagram.importer';
class DiagramBar {
  constructor(owner) {
    var {
      EventDispatcher
    } = getDiagram();
    this.onChanged = new EventDispatcher(); // IBar.onChanged: EventDispatcher<IBarListener>
    this._owner = owner;
  }
  raiseBarCommandExecuted(key, parameter) {
    this.onChanged.raise('notifyBarCommandExecuted', parseInt(key), parameter);
  }
  getCommandKeys() {
    // IBar.getCommandKeys(): DiagramCommand[]
    throw 'Not Implemented';
  }
  setItemValue(key, value) {// IBar.setItemValue(key: DiagramCommand, value: any)
  }
  setItemEnabled(key, enabled) {// IBar.setItemEnabled(key: DiagramCommand, enabled: boolean)
  }
  setItemVisible(key, enabled) {// IBar.setItemVisible(key: DiagramCommand, visible: boolean)
  }
  setEnabled(enabled) {// IBar.setEnabled(enabled: boolean)
  }
  setItemSubItems(key, items) {// IBar.setItemSubItems(key: DiagramCommand, items: any[])
  }
  isVisible() {
    // IBar.isVisible(): boolean
    return true;
  }
  _getKeys(items) {
    var keys = items.reduce((commands, item) => {
      if (item.command !== undefined) {
        commands.push(item.command);
      }
      if (item.items) {
        commands = commands.concat(this._getKeys(item.items));
      }
      return commands;
    }, []);
    return keys;
  }
}
export default DiagramBar;
