/**
* DevExtreme (esm/ui/file_manager/ui.file_manager.breadcrumbs.js)
* Version: 23.2.0
* Build date: Mon Sep 11 2023
*
* Copyright (c) 2012 - 2023 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import $ from '../../core/renderer';
import { extend } from '../../core/utils/extend';
import Widget from '../widget/ui.widget';
import Menu from '../menu/ui.menu';
var FILE_MANAGER_BREADCRUMBS_CLASS = 'dx-filemanager-breadcrumbs';
var FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-parent-folder-item';
var FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-separator-item';
var FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS = FILE_MANAGER_BREADCRUMBS_CLASS + '-path-separator-item';
class FileManagerBreadcrumbs extends Widget {
  _init() {
    super._init();
    this._currentDirectory = null;
  }
  _initMarkup() {
    super._initMarkup();
    this._initActions();
    if (this._currentDirectory) {
      this._renderMenu();
    }
    this.$element().addClass(FILE_MANAGER_BREADCRUMBS_CLASS);
  }
  setCurrentDirectory(directory) {
    if (!this._areDirsEqual(this._currentDirectory, directory)) {
      this._currentDirectory = directory;
      this.repaint();
    }
  }
  _renderMenu() {
    var $menu = $('<div>').appendTo(this.$element());
    this._menu = this._createComponent($menu, Menu, {
      dataSource: this._getMenuItems(),
      onItemClick: this._onItemClick.bind(this),
      onItemRendered: this._onItemRendered.bind(this)
    });
  }
  _getMenuItems() {
    var dirLine = this._getParentDirsLine();
    var result = [{
      icon: 'arrowup',
      directory: this._currentDirectory.parentDirectory,
      isPathItem: true,
      cssClass: FILE_MANAGER_BREADCRUMBS_PARENT_FOLDER_ITEM_CLASS
    }, {
      text: ' ',
      cssClass: FILE_MANAGER_BREADCRUMBS_SEPARATOR_ITEM_CLASS
    }];
    dirLine.forEach((dir, index) => {
      result.push({
        text: dir.getDisplayName(),
        directory: dir,
        isPathItem: true
      });
      if (index !== dirLine.length - 1) {
        result.push({
          icon: 'spinnext',
          cssClass: FILE_MANAGER_BREADCRUMBS_PATH_SEPARATOR_ITEM_CLASS
        });
      }
    });
    return result;
  }
  _onItemClick(_ref) {
    var {
      itemData
    } = _ref;
    if (!itemData.isPathItem) {
      return;
    }
    var newDir = itemData.directory;
    if (!this._areDirsEqual(newDir, this._currentDirectory)) {
      this._raiseCurrentDirectoryChanged(newDir);
    }
  }
  _onItemRendered(_ref2) {
    var {
      itemElement,
      itemData
    } = _ref2;
    if (itemData.cssClass) {
      $(itemElement).addClass(itemData.cssClass);
    }
  }
  _getParentDirsLine() {
    var currentDirectory = this._currentDirectory;
    var result = [];
    while (currentDirectory) {
      result.unshift(currentDirectory);
      currentDirectory = currentDirectory.parentDirectory;
    }
    return result;
  }
  _areDirsEqual(dir1, dir2) {
    return dir1 && dir2 && dir1 === dir2 && dir1.fileItem.key === dir2.fileItem.key;
  }
  _initActions() {
    this._actions = {
      onCurrentDirectoryChanging: this._createActionByOption('onCurrentDirectoryChanging')
    };
  }
  _raiseCurrentDirectoryChanged(currentDirectory) {
    this._actions.onCurrentDirectoryChanging({
      currentDirectory
    });
  }
  _getDefaultOptions() {
    return extend(super._getDefaultOptions(), {
      rootFolderDisplayName: 'Files',
      onCurrentDirectoryChanging: null
    });
  }
  _optionChanged(args) {
    var name = args.name;
    switch (name) {
      case 'rootFolderDisplayName':
        this.repaint();
        break;
      case 'onCurrentDirectoryChanging':
        this._actions[name] = this._createActionByOption(name);
        break;
      default:
        super._optionChanged(args);
    }
  }
}
export default FileManagerBreadcrumbs;
