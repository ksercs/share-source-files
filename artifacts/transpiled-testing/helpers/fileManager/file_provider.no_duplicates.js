System.register(["core/utils/deferred", "../fileManagerHelpers.js", "file_management/custom_provider", "file_management/object_provider"], function (_export, _context) {
  "use strict";

  var Deferred, createTestFileSystem, CustomFileSystemProvider, ObjectFileSystemProvider, NoDuplicatesFileProvider;
  _export("default", void 0);
  return {
    setters: [function (_coreUtilsDeferred) {
      Deferred = _coreUtilsDeferred.Deferred;
    }, function (_fileManagerHelpersJs) {
      createTestFileSystem = _fileManagerHelpersJs.createTestFileSystem;
    }, function (_file_managementCustom_provider) {
      CustomFileSystemProvider = _file_managementCustom_provider.default;
    }, function (_file_managementObject_provider) {
      ObjectFileSystemProvider = _file_managementObject_provider.default;
    }],
    execute: function () {
      _export("default", NoDuplicatesFileProvider = class NoDuplicatesFileProvider extends CustomFileSystemProvider {
        constructor(options) {
          const providerPredefinedOptions = {
            getItems: function (item) {
              return this._realProviderInstance.getItems(item);
            },
            createDirectory: function (parentDir, name) {
              return this._executeIfItemNotExists(() => this._realProviderInstance.createDirectory(parentDir, name), 3, name);
            },
            renameItem: function (item, name) {
              return this._executeIfItemNotExists(() => this._realProviderInstance.renameItem(item.dataItem, name), item.isDirectory ? 3 : 1, name);
            }
          };
          super(providerPredefinedOptions);
          this._realProviderInstance = new ObjectFileSystemProvider({
            data: createTestFileSystem()
          });
          this._parentDir = options['currentDirectory'];
        }
        get parentDir() {
          return this._parentDir();
        }
        _executeIfItemNotExists(onSuccess, errorCode, itemName) {
          const promise = new Deferred();
          this.getItems(this.parentDir).then(items => {
            const duplicateItems = items.filter(i => i.name === itemName);
            if (duplicateItems.length !== 0) {
              promise.reject({
                errorCode
              }).promise();
            } else {
              promise.resolve(onSuccess()).promise();
            }
          });
          return promise.promise();
        }
      });
    }
  };
});