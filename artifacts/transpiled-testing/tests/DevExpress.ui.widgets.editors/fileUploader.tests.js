!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/fileUploader.tests.js"], ["jquery","ui/file_uploader","core/devices","core/utils/deferred","../../helpers/keyboardMock.js","../../helpers/fileHelper.js","../../helpers/fileManagerHelpers.js","../../helpers/xmlHttpRequestMock.js","generic_light.css!"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/fileUploader.tests.js", ["jquery", "ui/file_uploader", "core/devices", "core/utils/deferred", "../../helpers/keyboardMock.js", "../../helpers/fileHelper.js", "../../helpers/fileManagerHelpers.js", "../../helpers/xmlHttpRequestMock.js", "generic_light.css!"], function($__export) {
  "use strict";
  var $,
      FileUploader,
      devices,
      Deferred,
      keyboardMock,
      createBlobFile,
      getFileChunkCount,
      test,
      internals,
      FILEUPLOADER_EMPTY_CLASS,
      FILEUPLOADER_CONTENT_CLASS,
      FILEUPLOADER_INPUT_WRAPPER_CLASS,
      FILEUPLOADER_BUTTON_CLASS,
      FILEUPLOADER_INPUT_CONTAINER_CLASS,
      FILEUPLOADER_INPUT_LABEL_CLASS,
      FILEUPLOADER_INPUT_CLASS,
      FILEUPLOADER_FILES_CONTAINER_CLASS,
      FILEUPLOADER_FILE_CONTAINER_CLASS,
      FILEUPLOADER_FILE_CLASS,
      FILEUPLOADER_FILE_NAME_CLASS,
      FILEUPLOADER_FILE_SIZE_CLASS,
      FILEUPLOADER_CANCEL_BUTTON_CLASS,
      FILEUPLOADER_UPLOAD_BUTTON_CLASS,
      FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS,
      FILEUPLOADER_INVALID_CLASS,
      FILEUPLOADER_AFTER_LOAD_DELAY,
      simulateFileChoose,
      fakeFile,
      fakeFile1,
      fakeFile2,
      getNewFile,
      executeAfterDelay,
      getUploadChunkArgumentsSummary,
      triggerDragEvent,
      moduleConfig;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      FileUploader = $__m.default;
    }, function($__m) {
      devices = $__m.default;
    }, function($__m) {
      Deferred = $__m.Deferred;
    }, function($__m) {
      keyboardMock = $__m.default;
    }, function($__m) {
      createBlobFile = $__m.createBlobFile;
    }, function($__m) {
      getFileChunkCount = $__m.getFileChunkCount;
    }, function($__m) {}, function($__m) {}],
    execute: function() {
      var $__3;
      (($__3 = QUnit, test = $__3.test, $__3));
      QUnit.testStart(function() {
        var markup = '<div id="fileuploader"></div>';
        $('#qunit-fixture').html(markup);
      });
      internals = FileUploader.__internals;
      FILEUPLOADER_EMPTY_CLASS = 'dx-fileuploader-empty';
      FILEUPLOADER_CONTENT_CLASS = 'dx-fileuploader-content';
      FILEUPLOADER_INPUT_WRAPPER_CLASS = 'dx-fileuploader-input-wrapper';
      FILEUPLOADER_BUTTON_CLASS = 'dx-fileuploader-button';
      FILEUPLOADER_INPUT_CONTAINER_CLASS = 'dx-fileuploader-input-container';
      FILEUPLOADER_INPUT_LABEL_CLASS = 'dx-fileuploader-input-label';
      FILEUPLOADER_INPUT_CLASS = 'dx-fileuploader-input';
      FILEUPLOADER_FILES_CONTAINER_CLASS = 'dx-fileuploader-files-container';
      FILEUPLOADER_FILE_CONTAINER_CLASS = 'dx-fileuploader-file-container';
      FILEUPLOADER_FILE_CLASS = 'dx-fileuploader-file';
      FILEUPLOADER_FILE_NAME_CLASS = 'dx-fileuploader-file-name';
      FILEUPLOADER_FILE_SIZE_CLASS = 'dx-fileuploader-file-size';
      FILEUPLOADER_CANCEL_BUTTON_CLASS = 'dx-fileuploader-cancel-button';
      FILEUPLOADER_UPLOAD_BUTTON_CLASS = 'dx-fileuploader-upload-button';
      FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS = 'dx-fileuploader-file-status-message';
      FILEUPLOADER_INVALID_CLASS = 'dx-fileuploader-invalid';
      FILEUPLOADER_AFTER_LOAD_DELAY = 500;
      simulateFileChoose = function($fileUploader, files) {
        var $input = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
        files = $.isArray(files) ? files : [files];
        if ($.isPlainObject(files[0])) {
          $input.val(files[0].name);
          $input.prop('files', files);
        } else {
          $input.val(files[0]);
        }
        $input.trigger('change');
      };
      fakeFile = {
        name: 'fakefile.png',
        size: 100023,
        type: 'image/png',
        lastModifiedDate: $.now()
      };
      fakeFile1 = {
        name: 'fakefile1.jpeg',
        size: 1063,
        type: 'image/jpeg',
        lastModifiedDate: $.now()
      };
      fakeFile2 = {
        name: 'document.pdf',
        size: 4000,
        type: 'application/pdf',
        lastModifiedDate: $.now()
      };
      getNewFile = function() {
        var randomSize = Math.round(Math.random() * 10000);
        var randomId = Math.round(Math.random() * 10000);
        return {
          name: 'fakefile' + randomId,
          size: randomSize,
          type: 'image/jpeg',
          lastModifiedDate: $.now()
        };
      };
      executeAfterDelay = function(action, delay) {
        delay = delay || 1000;
        action = action || (function() {});
        var deferred = new Deferred();
        setTimeout(function() {
          try {
            var result = action();
            deferred.resolve(result);
          } catch (e) {
            deferred.reject(e);
          }
        }, delay);
        return deferred.promise();
      };
      getUploadChunkArgumentsSummary = function(file, chunksInfo) {
        return {
          fileName: file.name,
          bytesUploaded: chunksInfo.bytesUploaded,
          chunkCount: chunksInfo.chunkCount,
          blobSize: chunksInfo.chunkBlob.size,
          chunkIndex: chunksInfo.chunkIndex
        };
      };
      triggerDragEvent = function($element, eventType) {
        $element = $($element);
        var offset = eventType === 'dragenter' ? 1 : -1;
        $element.trigger($.Event(eventType, {
          clientX: $element.offset().left + offset,
          clientY: $element.offset().top + offset
        }));
      };
      moduleConfig = {
        beforeEach: function() {
          internals.changeFileInputRenderer(function() {
            return $('<div>');
          });
          this.xhrMock = new window.XMLHttpRequestMock();
          this._nativeXhr = XMLHttpRequest;
          window.XMLHttpRequest = this.xhrMock.XMLHttpRequest;
          this.formDataMock = new window.FormDataMock();
          this._nativeFormData = window.FormData;
          window.FormData = this.formDataMock.FormData;
          this.clock = sinon.useFakeTimers();
        },
        afterEach: function() {
          internals.resetFileInputTag();
          window.XMLHttpRequest = this._nativeXhr;
          window.FormData = this._nativeFormData;
          this.xhrMock.dispose();
          delete this.xhrMock;
          delete this.formDataMock;
          this.clock.restore();
        }
      };
      QUnit.module('custom uploading', moduleConfig, function() {
        test('chunked uploading goes well', function(assert) {
          var chunkSize = 20000;
          var fileSize = 50100;
          var uploadChunkSpy = sinon.spy(function(file, chunksInfo) {
            lastArgsInfo = getUploadChunkArgumentsSummary(file, chunksInfo);
            return executeAfterDelay();
          });
          var onProgressSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var lastArgsInfo = null;
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            chunkSize: chunkSize,
            uploadChunk: uploadChunkSpy,
            onProgress: onProgressSpy,
            onUploaded: onUploadedSpy
          });
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          var expectedArgsInfo = {
            fileName: 'image1.png',
            bytesUploaded: 0,
            chunkCount: 3,
            blobSize: chunkSize,
            chunkIndex: 0
          };
          this.clock.tick(500);
          assert.strictEqual(uploadChunkSpy.callCount, 1, 'custom function called for 1st chunk');
          assert.strictEqual(onProgressSpy.callCount, 0, 'progress event not called before 1st chunk completed');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          assert.deepEqual(lastArgsInfo, expectedArgsInfo, 'custom function has valid arguments');
          this.clock.tick(1000);
          expectedArgsInfo.bytesUploaded = 20000;
          expectedArgsInfo.chunkIndex++;
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function called for 2nd chunk');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event called for 1st chunk');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          assert.deepEqual(lastArgsInfo, expectedArgsInfo, 'custom function has valid arguments');
          this.clock.tick(1000);
          expectedArgsInfo.bytesUploaded = 40000;
          expectedArgsInfo.chunkIndex++;
          expectedArgsInfo.blobSize = 10100;
          assert.strictEqual(uploadChunkSpy.callCount, 3, 'custom function called for 3rd chunk');
          assert.strictEqual(onProgressSpy.callCount, 2, 'progress event called for 2nd chunk');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          assert.deepEqual(lastArgsInfo, expectedArgsInfo, 'custom function has valid arguments');
          this.clock.tick(1000);
          assert.strictEqual(uploadChunkSpy.callCount, 3, 'custom function called for each chunk');
          assert.strictEqual(onProgressSpy.callCount, 3, 'progress event called for each chunk');
          assert.strictEqual(onUploadedSpy.callCount, 1, 'uploaded event raised');
          assert.deepEqual(lastArgsInfo, expectedArgsInfo, 'custom function has valid arguments');
        });
        test('chunked uploading handle error', function(assert) {
          var chunkSize = 20000;
          var fileSize = 50100;
          var uploadChunkSpy = sinon.spy(function(file, chunksInfo) {
            return executeAfterDelay(function() {
              if (chunksInfo.chunkIndex === 1) {
                throw 'Some error.';
              }
            });
          });
          var onProgressSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var onUploadErrorSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            chunkSize: chunkSize,
            uploadChunk: uploadChunkSpy,
            onProgress: onProgressSpy,
            onUploaded: onUploadedSpy,
            onUploadError: onUploadErrorSpy
          });
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(500);
          assert.strictEqual(uploadChunkSpy.callCount, 1, 'custom function called for 1st chunk');
          assert.strictEqual(onProgressSpy.callCount, 0, 'progress event not called before 1st chunk completed');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          assert.strictEqual(onUploadErrorSpy.callCount, 0, 'upload error is not raised');
          this.clock.tick(1000);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function called for 2nd chunk');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event called for 1st chunk');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          assert.strictEqual(onUploadErrorSpy.callCount, 0, 'upload error is not raised');
          this.clock.tick(1000);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function is not called after error');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event is not called after error');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised after error');
          assert.strictEqual(onUploadErrorSpy.callCount, 1, 'upload error raised');
          assert.strictEqual(onUploadErrorSpy.args[0][0].error, 'Some error.', 'upload error event has valid arguments');
          this.clock.tick(5000);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function is not called after error');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event is not called after error');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised after error');
          assert.strictEqual(onUploadErrorSpy.callCount, 1, 'upload error raised only once');
        });
        test('custom state persisted during chunked uploading', function(assert) {
          var lastCustomData = null;
          var chunkSize = 20000;
          var fileSize = 50100;
          var uploadChunkSpy = sinon.spy(function(file, chunksInfo) {
            lastCustomData = $.extend(true, {}, chunksInfo.customData);
            chunksInfo.customData.testCounter = chunksInfo.customData.testCounter || 0;
            chunksInfo.customData.testCounter++;
            return executeAfterDelay();
          });
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            chunkSize: chunkSize,
            uploadChunk: uploadChunkSpy
          });
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(500);
          assert.strictEqual(uploadChunkSpy.callCount, 1, 'custom function called for 1st chunk');
          assert.deepEqual(lastCustomData, {}, 'custom data is empty');
          this.clock.tick(1000);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function called for 2nd chunk');
          assert.deepEqual(lastCustomData, {testCounter: 1}, 'custom data is updated');
          this.clock.tick(1000);
          assert.strictEqual(uploadChunkSpy.callCount, 3, 'custom function called for 3rd chunk');
          assert.deepEqual(lastCustomData, {testCounter: 2}, 'custom data is updated');
        });
        test('cancel chunked uploading', function(assert) {
          var chunkSize = 20000;
          var fileSize = 50100;
          var uploadChunkSpy = sinon.spy(function() {
            return executeAfterDelay();
          });
          var abortUploadSpy = sinon.spy(function(file, chunksInfo) {
            lastArgsInfo = getUploadChunkArgumentsSummary(file, chunksInfo);
            return executeAfterDelay();
          });
          var onProgressSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var onUploadAbortedSpy = sinon.spy();
          var lastArgsInfo = null;
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            chunkSize: chunkSize,
            uploadChunk: uploadChunkSpy,
            abortUpload: abortUploadSpy,
            onProgress: onProgressSpy,
            onUploaded: onUploadedSpy,
            onUploadAborted: onUploadAbortedSpy
          });
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(1500);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function called for 2nd chunk');
          assert.strictEqual(abortUploadSpy.callCount, 0, 'abort upload not called');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event called for 1st chunk');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          assert.strictEqual(onUploadAbortedSpy.callCount, 0, 'upload aborted event is not raised');
          $fileUploader.find(("." + FILEUPLOADER_CANCEL_BUTTON_CLASS)).eq(0).trigger('dxclick');
          this.clock.tick(100);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function is not called after cancel');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called once');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event is not called after cancel');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised after cancel');
          assert.strictEqual(onUploadAbortedSpy.callCount, 0, 'upload aborted event is not raised');
          var expectedArgsInfo = {
            fileName: 'image1.png',
            bytesUploaded: 20000,
            chunkCount: 3,
            blobSize: 20000,
            chunkIndex: 1
          };
          assert.deepEqual(expectedArgsInfo, lastArgsInfo, 'custom function has valid arguments');
          this.clock.tick(1000);
          assert.strictEqual(onUploadAbortedSpy.callCount, 1, 'upload aborted event raised once');
          this.clock.tick(5000);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function is not called after error');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called once');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event is not called after error');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised after error');
          assert.strictEqual(onUploadAbortedSpy.callCount, 1, 'upload aborted event raised once');
        });
        test('cancel chunked uploading with removeFile(number) method', function(assert) {
          var chunkSize = 20000;
          var fileSize = 50100;
          var uploadChunkSpy = sinon.spy(function() {
            return executeAfterDelay();
          });
          var abortUploadSpy = sinon.spy(function(file, chunksInfo) {
            lastArgsInfo = getUploadChunkArgumentsSummary(file, chunksInfo);
            return executeAfterDelay();
          });
          var onProgressSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var onUploadAbortedSpy = sinon.spy();
          var lastArgsInfo = null;
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'useButtons',
            chunkSize: chunkSize,
            uploadChunk: uploadChunkSpy,
            abortUpload: abortUploadSpy,
            onProgress: onProgressSpy,
            onUploaded: onUploadedSpy,
            onUploadAborted: onUploadAbortedSpy
          });
          var instance = $fileUploader.dxFileUploader('instance');
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          instance.upload();
          this.clock.tick(1500);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function called for 2nd chunk');
          assert.strictEqual(abortUploadSpy.callCount, 0, 'abort upload not called');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event called for 1st chunk');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          assert.strictEqual(onUploadAbortedSpy.callCount, 0, 'upload aborted event is not raised');
          instance.removeFile(0);
          this.clock.tick(100);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function is not called after cancel');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called once');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event is not called after cancel');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised after cancel');
          assert.strictEqual(onUploadAbortedSpy.callCount, 0, 'upload aborted event is not raised');
          var expectedArgsInfo = {
            fileName: 'image1.png',
            bytesUploaded: 20000,
            chunkCount: 3,
            blobSize: 20000,
            chunkIndex: 1
          };
          assert.deepEqual(expectedArgsInfo, lastArgsInfo, 'custom function has valid arguments');
          this.clock.tick(1000);
          assert.strictEqual(onUploadAbortedSpy.callCount, 1, 'upload aborted event raised once');
          this.clock.tick(5000);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function is not called after error');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called once');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event is not called after error');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised after error');
          assert.strictEqual(onUploadAbortedSpy.callCount, 1, 'upload aborted event raised once');
        });
        test('cancel chunked uploading with removeFile(file) method', function(assert) {
          var chunkSize = 20000;
          var fileSize = 50100;
          var uploadChunkSpy = sinon.spy(function() {
            return executeAfterDelay();
          });
          var abortUploadSpy = sinon.spy(function(file, chunksInfo) {
            lastArgsInfo = getUploadChunkArgumentsSummary(file, chunksInfo);
            return executeAfterDelay();
          });
          var onProgressSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var onUploadAbortedSpy = sinon.spy();
          var lastArgsInfo = null;
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            chunkSize: chunkSize,
            uploadChunk: uploadChunkSpy,
            abortUpload: abortUploadSpy,
            onProgress: onProgressSpy,
            onUploaded: onUploadedSpy,
            onUploadAborted: onUploadAbortedSpy
          });
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(1500);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function called for 2nd chunk');
          assert.strictEqual(abortUploadSpy.callCount, 0, 'abort upload not called');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event called for 1st chunk');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          assert.strictEqual(onUploadAbortedSpy.callCount, 0, 'upload aborted event is not raised');
          $fileUploader.dxFileUploader('instance').removeFile(file);
          this.clock.tick(100);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function is not called after cancel');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called once');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event is not called after cancel');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised after cancel');
          assert.strictEqual(onUploadAbortedSpy.callCount, 0, 'upload aborted event is not raised');
          var expectedArgsInfo = {
            fileName: 'image1.png',
            bytesUploaded: 20000,
            chunkCount: 3,
            blobSize: 20000,
            chunkIndex: 1
          };
          assert.deepEqual(expectedArgsInfo, lastArgsInfo, 'custom function has valid arguments');
          this.clock.tick(1000);
          assert.strictEqual(onUploadAbortedSpy.callCount, 1, 'upload aborted event raised once');
          this.clock.tick(5000);
          assert.strictEqual(uploadChunkSpy.callCount, 2, 'custom function is not called after error');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called once');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event is not called after error');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised after error');
          assert.strictEqual(onUploadAbortedSpy.callCount, 1, 'upload aborted event raised once');
        });
        test('custom state available during upload aborting', function(assert) {
          var lastCustomData = null;
          var chunkSize = 20000;
          var fileSize = 50100;
          var uploadChunkSpy = sinon.spy(function(file, chunksInfo) {
            chunksInfo.customData.testCounter = chunksInfo.customData.testCounter || 0;
            chunksInfo.customData.testCounter++;
            return executeAfterDelay();
          });
          var abortUploadSpy = sinon.spy(function(file, chunksInfo) {
            lastCustomData = $.extend(true, {}, chunksInfo.customData);
            return executeAfterDelay();
          });
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            chunkSize: chunkSize,
            uploadChunk: uploadChunkSpy,
            abortUpload: abortUploadSpy
          });
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(1500);
          $fileUploader.find(("." + FILEUPLOADER_CANCEL_BUTTON_CLASS)).eq(0).trigger('dxclick');
          this.clock.tick(100);
          assert.deepEqual(lastCustomData, {testCounter: 2}, 'custom data is specified');
        });
        test('whole file upload goes well', function(assert) {
          var fileSize = 50100;
          var uploadFileSpy = sinon.spy(function() {
            return executeAfterDelay();
          });
          var onProgressSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            uploadFile: uploadFileSpy,
            onProgress: onProgressSpy,
            onUploaded: onUploadedSpy
          });
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(500);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(uploadFileSpy.args[0][0].name, 'image1.png', 'custom function has valid argument');
          assert.strictEqual(onProgressSpy.callCount, 0, 'progress event is not called');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          this.clock.tick(1000);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(onProgressSpy.callCount, 0, 'progress event is not called');
          assert.strictEqual(onUploadedSpy.callCount, 1, 'uploaded event raised');
        });
        test('whole file upload handles progress', function(assert) {
          var fileSize = 50100;
          var uploadFileSpy = sinon.spy(function(file, progressCallback) {
            return executeAfterDelay(function() {
              return progressCallback(20000);
            }, 300).then(function() {
              return executeAfterDelay(function() {
                return progressCallback(40000);
              }, 400);
            }).then(function() {
              return executeAfterDelay(null, 300);
            });
          });
          var onProgressSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            uploadFile: uploadFileSpy,
            onProgress: onProgressSpy,
            onUploaded: onUploadedSpy
          });
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(200);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(onProgressSpy.callCount, 0, 'progress event is not called');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          this.clock.tick(200);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event called');
          assert.strictEqual(onProgressSpy.args[0][0].bytesLoaded, 20000, 'loaded bytes updated');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          this.clock.tick(200);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event called');
          assert.strictEqual(onProgressSpy.args[0][0].bytesLoaded, 20000, 'loaded bytes not updated');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          this.clock.tick(200);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(onProgressSpy.callCount, 2, 'progress event called');
          assert.strictEqual(onProgressSpy.args[1][0].bytesLoaded, 40000, 'loaded bytes updated');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          this.clock.tick(300);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(onProgressSpy.callCount, 2, 'progress event called');
          assert.strictEqual(onUploadedSpy.callCount, 1, 'uploaded event raised');
        });
        test('whole file upload handles error', function(assert) {
          var fileSize = 50100;
          var uploadFileSpy = sinon.spy(function() {
            return executeAfterDelay(function() {
              throw 'Some error.';
            });
          });
          var onProgressSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var onUploadErrorSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            uploadFile: uploadFileSpy,
            onProgress: onProgressSpy,
            onUploaded: onUploadedSpy,
            onUploadError: onUploadErrorSpy
          });
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(500);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(onProgressSpy.callCount, 0, 'progress event is not called');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          assert.strictEqual(onUploadErrorSpy.callCount, 0, 'upload error is not raised');
          this.clock.tick(1000);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(onProgressSpy.callCount, 0, 'progress event is not called');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          assert.strictEqual(onUploadErrorSpy.callCount, 1, 'upload error raised');
          assert.strictEqual(onUploadErrorSpy.args[0][0].error, 'Some error.', 'upload error event has valid arguments');
        });
        test('whole file upload allows canceling', function(assert) {
          var fileSize = 50100;
          var uploadFileSpy = sinon.spy(function() {
            return executeAfterDelay();
          });
          var abortUploadSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            uploadFile: uploadFileSpy,
            abortUpload: abortUploadSpy,
            onUploaded: onUploadedSpy
          });
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(500);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(abortUploadSpy.callCount, 0, 'abort upload not called');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          $fileUploader.find(("." + FILEUPLOADER_CANCEL_BUTTON_CLASS)).eq(0).trigger('dxclick');
          this.clock.tick(100);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called');
          assert.strictEqual(abortUploadSpy.args[0][0].name, 'image1.png', 'abort upload has valid args');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          this.clock.tick(1000);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
        });
        test('whole file upload allows canceling with removeFile(number) method', function(assert) {
          var fileSize = 50100;
          var uploadFileSpy = sinon.spy(function() {
            return executeAfterDelay();
          });
          var abortUploadSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'useButtons',
            uploadFile: uploadFileSpy,
            abortUpload: abortUploadSpy,
            onUploaded: onUploadedSpy
          });
          var instance = $fileUploader.dxFileUploader('instance');
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          instance.upload();
          this.clock.tick(500);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(abortUploadSpy.callCount, 0, 'abort upload not called');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          instance.removeFile(0);
          this.clock.tick(100);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called');
          assert.strictEqual(abortUploadSpy.args[0][0].name, 'image1.png', 'abort upload has valid args');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          this.clock.tick(1000);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
        });
        test('whole file upload allows canceling with removeFile(file) method', function(assert) {
          var fileSize = 50100;
          var uploadFileSpy = sinon.spy(function() {
            return executeAfterDelay();
          });
          var abortUploadSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            uploadFile: uploadFileSpy,
            abortUpload: abortUploadSpy,
            onUploaded: onUploadedSpy
          });
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(500);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(abortUploadSpy.callCount, 0, 'abort upload not called');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          $fileUploader.dxFileUploader('instance').removeFile(file);
          this.clock.tick(100);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called');
          assert.strictEqual(abortUploadSpy.args[0][0].name, 'image1.png', 'abort upload has valid args');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          this.clock.tick(1000);
          assert.strictEqual(uploadFileSpy.callCount, 1, 'custom function called');
          assert.strictEqual(abortUploadSpy.callCount, 1, 'abort upload called');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
        });
        test('uploaded files are not aborted after resetting value', function(assert) {
          var chunkSize = 20000;
          var fileSize = 50100;
          var uploadChunkSpy = sinon.spy(function() {
            return executeAfterDelay();
          });
          var onUploadedSpy = sinon.spy();
          var onAbortedSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            chunkSize: chunkSize,
            uploadChunk: uploadChunkSpy,
            onUploaded: onUploadedSpy,
            onUploadAborted: onAbortedSpy
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          var file = createBlobFile('image1.png', fileSize);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(5000);
          assert.strictEqual(uploadChunkSpy.callCount, 3, 'custom function called for each chunk');
          assert.strictEqual(onUploadedSpy.callCount, 1, 'uploaded event raised');
          assert.strictEqual(onAbortedSpy.callCount, 0, 'upload aborted event is not called');
          uploadChunkSpy.reset();
          onUploadedSpy.reset();
          onAbortedSpy.reset();
          fileUploader.option('value', []);
          this.clock.tick(1000);
          assert.strictEqual(uploadChunkSpy.callCount, 0, 'custom function not called');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event not raised');
          assert.strictEqual(onAbortedSpy.callCount, 0, 'upload aborted event is not called');
        });
        QUnit.test('upload of all files with upload method', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          simulateFileChoose($element, [fakeFile, fakeFile1]);
          $element.dxFileUploader('instance').upload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          var request = this.xhrMock.getInstanceAt();
          assert.ok(request.uploaded, 'upload is done');
        });
        QUnit.test('upload of specific file by file from value option with upload method', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var instance = $element.dxFileUploader('instance');
          var files = [fakeFile, fakeFile1];
          simulateFileChoose($element, files);
          instance.upload(instance.option('value[1]'));
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          var request = this.xhrMock.getInstanceAt();
          assert.ok(request.uploaded, 'upload is done');
          assert.strictEqual(request.loadedSize, files[1].size, 'correct file was uploaded');
        });
        QUnit.test('upload of specific file by file index with upload method', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var files = [fakeFile, fakeFile1];
          simulateFileChoose($element, files);
          $element.dxFileUploader('instance').upload(1);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          var request = this.xhrMock.getInstanceAt();
          assert.ok(request.uploaded, 'upload is done');
          assert.strictEqual(request.loadedSize, files[1].size, 'correct file was uploaded');
        });
        QUnit.test('upload of all files with upload method does not work in useForm mode', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useForm'});
          simulateFileChoose($element, fakeFile);
          $element.dxFileUploader('instance').upload();
          var request = this.xhrMock.getInstanceAt();
          assert.ok(!request, 'request is not created');
        });
        QUnit.test('upload of all files with upload method works in instantly mode if set files to value option', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'instantly'});
          var instance = $element.dxFileUploader('instance');
          instance.option('value', [fakeFile]);
          this.clock.tick(300);
          instance.upload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          var request = this.xhrMock.getInstanceAt();
          assert.ok(request.uploaded, 'upload is done');
        });
        QUnit.test('set custom dialog trigger attaches click event handler on targets', function(assert) {
          var instance = $('#fileuploader').dxFileUploader().dxFileUploader('instance');
          sinon.stub(instance, '_attachSelectFileDialogHandler');
          instance.option('dialogTrigger', '.pic');
          assert.strictEqual(instance._attachSelectFileDialogHandler.callCount, 1, 'attachHandlers method called');
          var items = instance._attachSelectFileDialogHandler.args[0];
          assert.strictEqual(items.length, 1, 'attachHandlers args is valid');
          assert.strictEqual(items[0], '.pic', 'attachHandlers args is valid');
          instance._attachSelectFileDialogHandler.restore();
        });
        QUnit.test('it is possible to drop files using custom dropzone', function(assert) {
          var customDropZone = $('<div>').addClass('drop').appendTo('#qunit-fixture');
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            multiple: true,
            dropZone: $('.drop')
          });
          var files = [fakeFile, fakeFile1];
          var event = $.Event($.Event('drop', {dataTransfer: {files: files}}));
          customDropZone.trigger(event);
          assert.deepEqual($fileUploader.dxFileUploader('option', 'value'), files, 'files are correct');
          customDropZone.remove();
        });
      });
      QUnit.module('uploading by chunks', moduleConfig, function() {
        QUnit.test('fileUploader should prevent upload chunks', function(assert) {
          var isPreventedUpload = false;
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            chunkSize: 2000,
            onUploadAborted: function() {
              isPreventedUpload = true;
            }
          });
          simulateFileChoose($fileUploader, [createBlobFile('fake.png', 100023)]);
          var instance = $fileUploader.dxFileUploader('instance');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT_DEFAULT);
          instance.option('value', []);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT_DEFAULT);
          assert.ok(isPreventedUpload, 'file uploading is prevented');
        });
        QUnit.test('file should correctly cut and sent it', function(assert) {
          this.xhrMock.startSeries();
          var fakeContentFile = createBlobFile('fake.png', 100023);
          var index = 0;
          var loadedBytes = 0;
          var isUploaded = false;
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            chunkSize: 20000,
            onProgress: function(e) {
              var progressBar = $('.dx-progressbar').dxProgressBar('instance');
              var request = this.xhrMock.getLastInstance();
              loadedBytes += request.loadedSize;
              assert.equal(e.bytesLoaded, loadedBytes, 'total loaded bytes size is correct');
              assert.equal(progressBar.option('value'), loadedBytes, 'progressBar value is correct');
              assert.equal(e.segmentSize, request.loadedSize, 'loaded segment bytes size is correct');
              assert.equal(e.component.option('progress'), Math.floor(loadedBytes / fakeContentFile.size * 100), 'component progress value is correct');
              assert.ok(this.xhrMock.getInstanceAt(index), 'request ' + index + ' is created');
              index++;
            }.bind(this),
            onUploaded: function() {
              isUploaded = true;
            }
          });
          var instance = $fileUploader.dxFileUploader('instance');
          simulateFileChoose($fileUploader, [fakeContentFile]);
          this.clock.tick(10);
          var expectedCallsCount = Math.ceil(fakeContentFile.size / instance.option('chunkSize'));
          assert.equal(index, expectedCallsCount, 'count of calls onProgress event is valid');
          assert.ok(isUploaded, 'file is uploaded');
          assert.equal(instance.option('progress'), 100, 'component progress value is correct');
        });
        QUnit.test('onFileAborted event should be raised if canceled uploading', function(assert) {
          var isUploadAborted = false;
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            chunkSize: 20000,
            onUploadAborted: function() {
              isUploadAborted = true;
            }
          });
          simulateFileChoose($fileUploader, [createBlobFile('fake.png', 100023)]);
          $fileUploader.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).eq(0).trigger('dxclick');
          assert.ok(isUploadAborted, 'upload file is aborted');
          assert.ok(this.xhrMock.getInstanceAt().uploadAborted, 'request is aborted');
        });
        QUnit.test('multiple files should correctly cut and sent it', function(assert) {
          this.xhrMock.startSeries();
          var fileUploadedCount = 0;
          var totalBytes = 0;
          var totalLoadedBytes = 0;
          var fileStates = {};
          var files = [createBlobFile('fake1.png', 100023), createBlobFile('fake2.png', 5000)];
          files.forEach(function(item) {
            totalBytes += item.size;
            fileStates[item.name] = {bytesLoaded: 0};
          });
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly',
            chunkSize: 20000,
            onProgress: function(e) {
              var request = this.xhrMock.getLastInstance();
              var state = fileStates[e.file.name];
              state.bytesLoaded += request.loadedSize;
              totalLoadedBytes += request.loadedSize;
              assert.equal(e.bytesLoaded, state.bytesLoaded, 'loaded bytes size is correct');
              assert.equal(e.segmentSize, request.loadedSize, 'current loaded segment bytes size is correct');
              assert.equal(e.component.option('progress'), Math.floor(totalLoadedBytes / totalBytes * 100), 'component progress value is correct');
            }.bind(this),
            onUploaded: function() {
              fileUploadedCount++;
            }
          });
          simulateFileChoose($fileUploader, files);
          this.clock.tick(10);
          assert.equal(fileUploadedCount, files.length, 'Count uploaded files is correct');
          for (var i = 0; i < files.length; i++) {
            assert.equal(files[i].size, fileStates[files[i].name].bytesLoaded, 'Uploded file bytes is correct');
          }
        });
        QUnit.test('uploading multiple files should be succesed', function(assert) {
          var uploadedFiles = [];
          this.xhrMock.startSeries();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'instantly',
            chunkSize: 20000,
            onUploaded: function(e) {
              uploadedFiles.push(e.file.name);
            }
          });
          var files = [createBlobFile('fake1.png', 100023), createBlobFile('fake2.png', 5000)];
          simulateFileChoose($fileUploader, files);
          this.clock.tick(10);
          assert.equal(uploadedFiles.length, files.length, 'count uploaded files is valid');
          for (var i = 0; i < files.length; i++) {
            assert.equal(uploadedFiles[files.length - i - 1], files[i].name, 'uploaded files is valid');
          }
        });
        QUnit.test('each chunk should be set in the separate call stack - T886389', function(assert) {
          this.xhrMock.startSeries();
          var fileSize = 100023;
          var chunkSize = 20000;
          var files = [createBlobFile('fake1.png', fileSize)];
          var chunkCount = getFileChunkCount(files[0], chunkSize);
          var progressSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            chunkSize: chunkSize,
            onProgress: progressSpy
          });
          simulateFileChoose($fileUploader, files);
          assert.strictEqual(progressSpy.callCount, 1, 'only one chunk sent');
          this.clock.tick(10);
          assert.strictEqual(progressSpy.callCount, chunkCount, 'all chunks are sent');
        });
        test('abortUpload callback should not rise for not uploading files', function(assert) {
          var abortUploadSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            chunkSize: 20000,
            abortUpload: abortUploadSpy
          });
          simulateFileChoose($fileUploader, [fakeFile]);
          this.clock.tick(200);
          $fileUploader.dxFileUploader('instance').reset();
          this.clock.tick(200);
          assert.strictEqual(abortUploadSpy.callCount, 0, '\'abortUpload\' callback was not rised');
        });
        test('onUploadError raised after no connection established during upload (T1047868)', function(assert) {
          var xhrMock = {status: 0};
          var uploadErrorSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            chunkSize: 20000,
            onUploadError: uploadErrorSpy
          });
          this.clock.tick(200);
          var fileUploader = $fileUploader.dxFileUploader('instance');
          fileUploader._uploadStrategy._sendChunkCore = function() {
            var deferred = new Deferred();
            setTimeout(function() {
              return deferred.reject(xhrMock);
            }, 200);
            return deferred.promise();
          };
          simulateFileChoose($fileUploader, [fakeFile]);
          this.clock.tick(400);
          assert.ok(uploadErrorSpy.calledOnce, 'onUploadError raised');
          assert.strictEqual(uploadErrorSpy.args[0][0].error.status, 0, 'xhr passed as an argument');
        });
        test('an empty file needs one chunk to load - T1122867', function(assert) {
          this.xhrMock.startSeries();
          var fileSize = 0;
          var chunkSize = 20000;
          var files = [createBlobFile('fake1.png', fileSize)];
          var chunkCount = 1;
          var progressSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            chunkSize: chunkSize,
            onProgress: progressSpy
          });
          simulateFileChoose($fileUploader, files);
          assert.strictEqual(progressSpy.callCount, 1, 'only one chunk sent');
          this.clock.tick(10);
          assert.strictEqual(progressSpy.callCount, chunkCount, 'all chunks are sent');
          assert.strictEqual($fileUploader.dxFileUploader('option', 'progress'), 100, 'progress is 100%');
        });
        test('uploading multiple empty files and regular file keeps total progress = 0 until all files are uploaded and completes with 100% of total progress - T1122867', function(assert) {
          var $__2 = this;
          this.xhrMock.startSeries();
          var fileSize = 0;
          var chunkSize = 20000;
          var files = [createBlobFile('fake1.png', fileSize), createBlobFile('fake2.png', fileSize)];
          var chunkIndex = 0;
          var defaultTimeout = 200;
          var progressSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            chunkSize: chunkSize,
            onProgress: progressSpy
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          fileUploader._uploadStrategy._sendChunkCore = function() {
            var deferred = new Deferred();
            var timeout = chunkIndex++ < 1 ? defaultTimeout : defaultTimeout * 2;
            setTimeout(function() {
              return deferred.resolve($__2.xhrMock);
            }, timeout);
            return deferred.promise();
          };
          simulateFileChoose($fileUploader, files);
          this.clock.tick(defaultTimeout + 1);
          assert.strictEqual(progressSpy.callCount, 1, 'only one chunk sent');
          assert.strictEqual(fileUploader.option('progress'), 0, 'progress is 0%');
          this.clock.tick(defaultTimeout + 1);
          assert.strictEqual(progressSpy.callCount, 2, 'all chunks are sent');
          assert.strictEqual(fileUploader.option('progress'), 100, 'progress is 100%');
        });
      });
      QUnit.module('validation rendering', moduleConfig, function() {
        QUnit.test('file with .pdf Extension should be rendered as invalid', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: true,
            allowedFileExtensions: ['.jpeg', '.png']
          });
          var $filesContainer = $fileUploader.find('.' + FILEUPLOADER_FILES_CONTAINER_CLASS);
          simulateFileChoose($fileUploader, [fakeFile, fakeFile1, fakeFile2]);
          assert.equal($filesContainer.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS + '.' + FILEUPLOADER_INVALID_CLASS).length, 1, 'One file is invalid');
          assert.equal($filesContainer.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS).not('.' + FILEUPLOADER_INVALID_CLASS).length, 2, 'Two files is valid');
          var invalidFileName = $filesContainer.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS + '.' + FILEUPLOADER_INVALID_CLASS).find('.' + FILEUPLOADER_FILE_NAME_CLASS).text();
          assert.equal(invalidFileName, fakeFile2.name, fakeFile2.name + 'is invalid file name');
        });
        QUnit.test('file with .pdf Extension should be rendered with validation text', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({allowedFileExtensions: ['.jpeg']});
          var fileUploader = $fileUploader.dxFileUploader('instance');
          simulateFileChoose($fileUploader, [fakeFile2]);
          var statusMessage = $fileUploader.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS).text();
          assert.equal(statusMessage, fileUploader.option('invalidFileExtensionMessage'), 'validation text is correct');
        });
        QUnit.test('File with size more than 100 kb is invalid ', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({maxFileSize: 100000});
          simulateFileChoose($fileUploader, [fakeFile]);
          assert.equal($fileUploader.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS + '.' + FILEUPLOADER_INVALID_CLASS).length, 1, 'One file is invalid');
          assert.equal($fileUploader.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS).not('.' + FILEUPLOADER_INVALID_CLASS).length, 0, 'No has valid files');
        });
        QUnit.test('File with size more than 100 kb should be rendered with validation text ', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({maxFileSize: 100000});
          var fileUploader = $fileUploader.dxFileUploader('instance');
          simulateFileChoose($fileUploader, [fakeFile]);
          var statusMessage = $fileUploader.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS).text();
          assert.equal(statusMessage, fileUploader.option('invalidMaxFileSizeMessage'), 'validation text is correct');
        });
        QUnit.test('File with size less than 2 kb is invalid ', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({minFileSize: 2000});
          simulateFileChoose($fileUploader, [fakeFile, fakeFile1]);
          assert.equal($fileUploader.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS + '.' + FILEUPLOADER_INVALID_CLASS).length, 1, 'Big file is invalid');
          assert.equal($fileUploader.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS).not('.' + FILEUPLOADER_INVALID_CLASS).length, 1, 'Small file is valid');
        });
        QUnit.test('File with size less than 2 kb should be rendered with validation text ', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({minFileSize: 2000});
          var fileUploader = $fileUploader.dxFileUploader('instance');
          simulateFileChoose($fileUploader, [fakeFile1]);
          var statusMessage = $fileUploader.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS).text();
          assert.equal(statusMessage, fileUploader.option('invalidMinFileSizeMessage'), 'validation text is correct');
        });
        QUnit.test('Files with size more than 4 kb and file extension not contains in allowedFileExtensions should be invalid', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            allowedFileExtensions: ['.pdf'],
            maxFileSize: 4000
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          simulateFileChoose($fileUploader, [fakeFile, fakeFile1, fakeFile2]);
          var bigFileWithInvalidExtStatusMessage = $($fileUploader.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS).get(0)).text();
          assert.ok(bigFileWithInvalidExtStatusMessage.indexOf(fileUploader.option('invalidMaxFileSizeMessage')) > -1, 'has invalidMaxFileSizeMessage');
          assert.ok(bigFileWithInvalidExtStatusMessage.indexOf(fileUploader.option('invalidFileExtensionMessage')) > -1, 'has invalidFileExtensionMessage');
          var imageFileStatusMessage = $($fileUploader.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS).get(1)).text();
          assert.equal(imageFileStatusMessage, fileUploader.option('invalidFileExtensionMessage'), 'has invalidFileExtensionMessage');
          var pdfFileStatusMessage = $($fileUploader.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS).get(2)).text();
          assert.equal(pdfFileStatusMessage, fileUploader.option('readyToUploadMessage'), 'validation passed');
        });
      });
      QUnit.module('rendering', function() {
        QUnit.test('the \'Upload\' button should be hidden if no files are chosen', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var $uploadButton = $fileUploader.find('.' + FILEUPLOADER_CONTENT_CLASS + ' > .' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          assert.ok($uploadButton.length && !$uploadButton.is(':visible'), 'the upload button is hidden');
        });
      });
      QUnit.module('files rendering', moduleConfig, function() {
        QUnit.test('selected files should be rendered in container', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({multiple: true});
          var $filesContainer = $fileUploader.find('.' + FILEUPLOADER_FILES_CONTAINER_CLASS);
          simulateFileChoose($fileUploader, [fakeFile, fakeFile1]);
          assert.equal($filesContainer.find('.' + FILEUPLOADER_FILE_CLASS).length, 2, 'number of files is correct');
        });
        QUnit.test('selected files should be rendered in container, uploadMethod = useForm', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'useForm'
          });
          var $filesContainer = $fileUploader.find('.' + FILEUPLOADER_FILES_CONTAINER_CLASS);
          simulateFileChoose($fileUploader, [fakeFile, fakeFile1]);
          assert.equal($filesContainer.find('.' + FILEUPLOADER_FILE_CLASS).length, 2, 'number of files is correct');
        });
        QUnit.test('files should contain file name and file size', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          simulateFileChoose($fileUploader, fakeFile);
          var $file = $('.' + FILEUPLOADER_FILE_CLASS);
          assert.equal($file.find('.' + FILEUPLOADER_FILE_NAME_CLASS).length, 1, 'file contains file name');
          assert.equal($file.find('.' + FILEUPLOADER_FILE_SIZE_CLASS).length, 1, 'file contains file size');
        });
        QUnit.test('files size should be correct', function(assert) {
          var files = [{
            name: 'first.png',
            size: 1
          }, {
            name: 'second.png',
            size: 1024
          }, {
            name: 'third.png',
            size: 1048576
          }, {
            name: 'fourth.png',
            size: 1073741824
          }];
          var filesSize = ['1 bytes', '1 kb', '1 Mb', '1 Gb'];
          var $fileUploader = $('#fileuploader').dxFileUploader({multiple: true});
          simulateFileChoose($fileUploader, files);
          var $filesSize = $('.' + FILEUPLOADER_FILE_SIZE_CLASS);
          $.each(filesSize, function(index, fileSize) {
            assert.equal($filesSize.eq(index).text(), fileSize, 'file ' + (index + 1) + ' size is correct');
          });
        });
        QUnit.test('progressBar should be rendered for each file', function(assert) {
          var files = [fakeFile, fakeFile1];
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'instantly'
          });
          simulateFileChoose($fileUploader, files);
          var $progressBar = $fileUploader.find('.' + FILEUPLOADER_FILE_CLASS + ' .dx-progressbar');
          assert.equal($progressBar.length, files.length, 'separate progressBar is rendered for each file');
        });
        QUnit.test('cancel button should be rendered for each file', function(assert) {
          var files = [fakeFile, fakeFile1];
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'instantly'
          });
          simulateFileChoose($fileUploader, files);
          var $cancelButtons = $fileUploader.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS);
          assert.equal($cancelButtons.length, files.length, 'cancel buttons are rendered');
        });
        QUnit.test('list of files should be rendered depending on the \'showFileList\' option', function(assert) {
          var files = [fakeFile, fakeFile1];
          var $element = $('#fileuploader').dxFileUploader({
            multiple: true,
            showFileList: false,
            extendSelection: false
          });
          var instance = $element.dxFileUploader('instance');
          simulateFileChoose($element, files);
          assert.equal($element.find('.' + FILEUPLOADER_FILE_CLASS).length, 0, 'no files are listed');
          instance.option('showFileList', true);
          assert.equal($element.find('.' + FILEUPLOADER_FILE_CLASS).length, files.length, 'files are listed');
          instance.option('showFileList', false);
          assert.equal($element.find('.' + FILEUPLOADER_FILE_CLASS).length, 0, 'no files are listed again');
        });
        QUnit.test('file info width should be correct if file has long name', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            allowCanceling: true,
            uploadMode: 'useButtons',
            width: 300
          });
          var file = {
            name: 'very_very_very_very_very_very_very_very_very_long_name.png',
            size: 100023,
            type: 'image/png',
            lastModifiedDate: $.now()
          };
          simulateFileChoose($fileUploader, file);
          var $fileContainer = $fileUploader.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS);
          var fileContainerWidth = $fileContainer.width();
          var $fileContainerChildren = $fileContainer.children();
          var fileContainerChildrenWidth = 0;
          for (var i = 0,
              n = $fileContainerChildren.length; i < n; i++) {
            fileContainerChildrenWidth += $fileContainerChildren.eq(i).width();
          }
          assert.ok(fileContainerChildrenWidth <= fileContainerWidth, 'file info width is correct');
        });
        QUnit.test('drag event should handle on inputWrapper element if \'useDragOver\' is true', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            useDragOver: true,
            uploadMode: 'instantly'
          });
          var $inputWrapper = $fileUploader.find('.dx-fileuploader-input-wrapper');
          triggerDragEvent($fileUploader, 'dragenter');
          assert.ok(!$fileUploader.hasClass('dx-fileuploader-dragover'), 'drag event was not handled for fileuploader element');
          triggerDragEvent($inputWrapper, 'dragenter');
          assert.ok($fileUploader.hasClass('dx-fileuploader-dragover'), 'drag event was handled for input wrapper element');
        });
        QUnit.test('\'dragover\' class should be removed on \'dragleave\' event after several \'dragenter\' events', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            useDragOver: true,
            uploadMode: 'instantly'
          });
          var $inputWrapper = $fileUploader.find('.dx-fileuploader-input-wrapper');
          $inputWrapper.trigger('dragenter').trigger('dragenter').trigger('dragleave');
          assert.notOk($fileUploader.hasClass('dx-fileuploader-dragover'), 'FileUploader hasn\'t the dragover class');
        });
        QUnit.test('T286111 - input click should not be prevented if the \'useNativeInputClick\' option is set to true', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            useNativeInputClick: true
          });
          var $input = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          var clickSpy = sinon.spy();
          $input.on('click', clickSpy).click();
          assert.ok(clickSpy.calledOnce, 'input click event handler is called once');
          assert.ok(!clickSpy.args[0][0].isDefaultPrevented(), 'click event is not prevented');
        });
        QUnit.test('T286111 - input should be rendered in select button if form is used and native click should be', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useForm',
            useNativeInputClick: true
          });
          var $selectButton = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS).children('.' + FILEUPLOADER_BUTTON_CLASS);
          assert.equal($selectButton.find('.' + FILEUPLOADER_INPUT_CLASS).length, 1, 'input is rendered in select button');
        });
        QUnit.test('files count in list is correct if the \'extendSelection\' option is false', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            extendSelection: false,
            multiple: true
          });
          simulateFileChoose($fileUploader, [fakeFile, fakeFile]);
          simulateFileChoose($fileUploader, [fakeFile, fakeFile, fakeFile]);
          assert.equal($fileUploader.find('.' + FILEUPLOADER_FILE_CLASS).length, 3, 'files count is correct');
        });
        QUnit.test('files count in list is correct if the \'extendSelection\' option is true', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            extendSelection: true,
            multiple: true,
            uploadMode: 'instantly'
          });
          simulateFileChoose($fileUploader, [getNewFile(), getNewFile()]);
          simulateFileChoose($fileUploader, [getNewFile(), getNewFile(), getNewFile()]);
          assert.equal($fileUploader.find('.' + FILEUPLOADER_FILE_CLASS).length, 5, 'files count is correct');
        });
        QUnit.test('file list should be updated after choosing another file when \'multiple\' option is false (T390178)', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            uploadMode: 'instantly'
          });
          simulateFileChoose($fileUploader, [fakeFile]);
          simulateFileChoose($fileUploader, [fakeFile1]);
          var fileName = $fileUploader.find('.' + FILEUPLOADER_FILE_NAME_CLASS).text();
          assert.equal(fileName, fakeFile1.name, 'the correct file is displayed in the file list');
          assert.notEqual(this.xhrMock.getInstanceAt(1), undefined, 'request is created');
        });
      });
      QUnit.module('allowCanceling', moduleConfig, function() {
        QUnit.test('cancel buttons rendering should depend on the \'allowCanceling\' option', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({
            allowCanceling: false,
            uploadMode: 'instantly'
          });
          var instance = $element.dxFileUploader('instance');
          simulateFileChoose($element, fakeFile);
          assert.ok(!$element.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).is(':visible'), 'cancel button is not visible when \'allowCanceling\' is false');
          instance.option('allowCanceling', true);
          simulateFileChoose($element, fakeFile);
          assert.equal($element.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).length, 1, 'cancel button is rendered when \'allowCanceling\' is true');
        });
        QUnit.test('the \'cancel\' button should be rendered for each file if the \'allowCanceling\' option is true', function(assert) {
          var files = [fakeFile, fakeFile1];
          var $element = $('#fileuploader').dxFileUploader({
            multiple: true,
            showFileList: true,
            allowCanceling: true,
            uploadMode: 'instantly'
          });
          simulateFileChoose($element, files);
          assert.equal($element.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).length, 2, 'two cancel button are rendered');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.ok(!$element.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).is(':visible'), 'no cancel buttons are rendered after files are uploaded');
        });
        QUnit.test('file should be removed after the \'cancel\' button is clicked', function(assert) {
          var files = [fakeFile, fakeFile1];
          var valueChangedCount = 0;
          var $element = $('#fileuploader').dxFileUploader({
            multiple: true,
            showFileList: true,
            allowCanceling: true,
            uploadMode: 'instantly'
          });
          var instance = $element.dxFileUploader('instance');
          simulateFileChoose($element, files);
          instance.option('onValueChanged', function() {
            valueChangedCount++;
          });
          $element.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).eq(0).trigger('dxclick');
          assert.equal($element.find('.' + FILEUPLOADER_FILE_CLASS).length, 1, 'only one file is rendered');
          assert.deepEqual(instance.option('value'), [fakeFile1], 'only one file is in the \'value\' option');
          assert.equal(valueChangedCount, 1, 'the \'onValueChanged\' event is fired');
        });
        QUnit.test('the \'allowCanceling\' option should be ignored if the \'uploadMode\' option is \'useForm\'', function(assert) {
          var files = [fakeFile, fakeFile1];
          var $element = $('#fileuploader').dxFileUploader({
            multiple: true,
            showFileList: true,
            allowCanceling: true,
            uploadMode: 'useForm'
          });
          simulateFileChoose($element, files);
          assert.equal($element.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).length, 0, 'no cancel buttons are rendered');
        });
        QUnit.test('file list should be cleared when \'useForm\' option is used', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'useForm'
          });
          var fileUploader = $element.dxFileUploader('instance');
          var newFile = getNewFile();
          simulateFileChoose($element, [fakeFile, fakeFile1]);
          simulateFileChoose($element, [newFile]);
          assert.deepEqual(fileUploader.option('value'), [newFile], 'file list was cleared');
        });
        QUnit.test('cancel of all files with abortUpload method', function(assert) {
          var onUploadAbortedSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'useButtons',
            onUploadAborted: onUploadAbortedSpy,
            onUploaded: onUploadedSpy
          });
          simulateFileChoose($element, [fakeFile, fakeFile1]);
          var instance = $element.dxFileUploader('instance');
          instance.upload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT / 2);
          instance.abortUpload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.ok(onUploadAbortedSpy.calledTwice, 'upload is cancelled');
          assert.ok(onUploadedSpy.notCalled, 'upload is not finished');
        });
        QUnit.test('cancel of specific file by file from value option with abortUpload method', function(assert) {
          var onUploadAbortedSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'useButtons',
            onUploadAborted: onUploadAbortedSpy,
            onUploaded: onUploadedSpy
          });
          var instance = $element.dxFileUploader('instance');
          var files = [fakeFile, fakeFile1];
          simulateFileChoose($element, files);
          instance.upload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT / 2);
          instance.abortUpload(1);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.ok(onUploadAbortedSpy.calledOnce, 'upload is cancelled');
          assert.strictEqual(onUploadAbortedSpy.args[0][0].file.name, files[1].name, 'correct file is cancelled');
          assert.ok(onUploadedSpy.calledOnce, 'upload is finished');
          assert.strictEqual(onUploadedSpy.args[0][0].file.name, files[0].name, 'correct file is uploaded');
        });
        QUnit.test('cancel of specific file by file index with abortUpload method', function(assert) {
          var onUploadAbortedSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'useButtons',
            onUploadAborted: onUploadAbortedSpy,
            onUploaded: onUploadedSpy
          });
          var instance = $element.dxFileUploader('instance');
          var files = [fakeFile, fakeFile1];
          simulateFileChoose($element, files);
          instance.upload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT / 2);
          instance.abortUpload(instance.option('value[1]'));
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.ok(onUploadAbortedSpy.calledOnce, 'upload is cancelled');
          assert.strictEqual(onUploadAbortedSpy.args[0][0].file.name, files[1].name, 'correct file is cancelled');
          assert.ok(onUploadedSpy.calledOnce, 'upload is finished');
          assert.strictEqual(onUploadedSpy.args[0][0].file.name, files[0].name, 'correct file is uploaded');
        });
        QUnit.test('useButtons: cancel of a file with abortUpload method leads to resetting file state', function(assert) {
          var onUploadAbortedSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'useButtons',
            onUploadAborted: onUploadAbortedSpy,
            onUploaded: onUploadedSpy
          });
          simulateFileChoose($element, [fakeFile, fakeFile1]);
          var instance = $element.dxFileUploader('instance');
          instance.upload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT / 2);
          instance.abortUpload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.ok(onUploadAbortedSpy.calledTwice, 'upload is cancelled');
          assert.ok(onUploadedSpy.notCalled, 'upload is not finished');
          var $fileStatusMessage = $element.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS);
          var $progressBar = $element.find('.dx-progressbar');
          var $uploadButton = $element.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          assert.strictEqual($fileStatusMessage.eq(0).text(), instance.option('readyToUploadMessage'), 'status message is returned to original state');
          assert.ok($fileStatusMessage.eq(0).is(':visible'), 'status message is visible');
          assert.strictEqual($fileStatusMessage.eq(1).text(), instance.option('readyToUploadMessage'), 'status message is return to original state');
          assert.ok($fileStatusMessage.eq(1).is(':visible'), 'status message is visible');
          assert.strictEqual($progressBar.length, 0, 'there is no progressbar');
          assert.ok($uploadButton.eq(1).is(':visible'), '\'upload\' button 1 is visible');
          assert.notOk($uploadButton.eq(1).hasClass('dx-state-disabled'), '\'upload\' button 1 is enabled');
          assert.ok($uploadButton.eq(2).is(':visible'), '\'upload\' button 2 is visible');
          assert.notOk($uploadButton.eq(2).hasClass('dx-state-disabled'), '\'upload\' button 2 is enabled');
        });
        QUnit.test('instantly: cancel of a file with abortUpload method sets file in aborted state', function(assert) {
          var onUploadAbortedSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'instantly',
            onUploadAborted: onUploadAbortedSpy,
            onUploaded: onUploadedSpy
          });
          simulateFileChoose($element, [fakeFile, fakeFile1]);
          var instance = $element.dxFileUploader('instance');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT / 2);
          instance.abortUpload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.ok(onUploadAbortedSpy.calledTwice, 'upload is cancelled');
          assert.ok(onUploadedSpy.notCalled, 'upload is not finished');
          var $fileStatusMessage = $element.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS);
          var $progressBar = $element.find('.dx-progressbar');
          assert.strictEqual($fileStatusMessage.eq(0).text(), instance.option('uploadAbortedMessage'), 'has aborted status message');
          assert.ok($fileStatusMessage.eq(0).is(':visible'), 'status message is visible');
          assert.strictEqual($fileStatusMessage.eq(1).text(), instance.option('uploadAbortedMessage'), 'has aborted status message');
          assert.ok($fileStatusMessage.eq(1).is(':visible'), 'status message is visible');
          assert.strictEqual($progressBar.length, 0, 'there is no progressbar');
        });
        QUnit.test('useButtons: upload can be restarted with button after abortUpload() called', function(assert) {
          var onUploadAbortedSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            onUploadAborted: onUploadAbortedSpy,
            onUploaded: onUploadedSpy
          });
          simulateFileChoose($element, [fakeFile]);
          var instance = $element.dxFileUploader('instance');
          instance.upload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT / 2);
          instance.abortUpload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.ok(onUploadAbortedSpy.calledOnce, 'upload is cancelled');
          assert.ok(onUploadedSpy.notCalled, 'upload is not finished');
          onUploadAbortedSpy.reset();
          onUploadedSpy.reset();
          var $fileStatusMessage = $element.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS);
          var $progressBar = $element.find('.dx-progressbar');
          var $uploadButton = $element.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          assert.strictEqual($fileStatusMessage.eq(0).text(), instance.option('readyToUploadMessage'), 'status message is returned to original state');
          assert.ok($fileStatusMessage.eq(0).is(':visible'), 'status message is visible');
          assert.strictEqual($progressBar.length, 0, 'there is no progressbar');
          assert.ok($uploadButton.eq(1).is(':visible'), '\'upload\' button is visible');
          assert.notOk($uploadButton.eq(1).hasClass('dx-state-disabled'), '\'upload\' button is enabled');
          $uploadButton.eq(1).trigger('dxclick');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.ok(onUploadAbortedSpy.notCalled, 'upload is not cancelled');
          assert.ok(onUploadedSpy.calledOnce, 'upload is finished');
          $fileStatusMessage = $element.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS);
          $progressBar = $element.find('.dx-progressbar');
          $uploadButton = $element.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          assert.strictEqual($fileStatusMessage.eq(0).text(), instance.option('uploadedMessage'), 'has uploaded status message');
          assert.ok($fileStatusMessage.eq(0).is(':visible'), 'status message is visible');
          assert.strictEqual($progressBar.length, 0, 'there is no progressbar');
          assert.notOk($uploadButton.eq(1).is(':visible'), '\'upload\' button is invisible');
          assert.ok($uploadButton.eq(1).hasClass('dx-state-disabled'), '\'upload\' button is disabled');
        });
        QUnit.test('its possible to remove file with removeFile() method when showFileList = false', function(assert) {
          var onUploadedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            showFileList: false,
            onUploaded: onUploadedSpy
          });
          simulateFileChoose($element, [fakeFile]);
          var instance = $element.dxFileUploader('instance');
          instance.upload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.ok(onUploadedSpy.calledOnce, 'upload is finished');
          instance.removeFile(0);
          assert.strictEqual(instance.option('value').length, 0, 'file is removed');
        });
      });
      QUnit.module('autoUpload', moduleConfig, function() {
        QUnit.test('\'upload\' button should be rendered depending on the \'uploadMode\' option', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var instance = $fileUploader.dxFileUploader('instance');
          assert.equal($fileUploader.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).length, 1, '\'upload\' button is rendered');
          instance.option('uploadMode', 'instantly');
          assert.equal($fileUploader.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).length, 0, '\'upload\' button is not rendered');
          instance.option('uploadMode', 'useButtons');
          assert.equal($fileUploader.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).length, 1, '\'upload\' button is rendered again');
        });
        QUnit.test('upload buttons should be rendered if the \'uploadMode\' option is \'useButtons\'', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var files = [fakeFile, fakeFile1];
          simulateFileChoose($element, files);
          var $commonUploadButton = $element.find('.' + FILEUPLOADER_CONTENT_CLASS + ' > .' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          assert.equal($commonUploadButton.length, 1, 'common upload button is rendered');
          var $uploadButtons = $element.find('.' + FILEUPLOADER_FILES_CONTAINER_CLASS + ' .' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          assert.equal($uploadButtons.length, files.length, 'upload button is created for each file');
        });
        QUnit.test('the \'value\' option should be cleared after the \'uploadMode\' option change', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            multiple: true
          });
          var instance = $fileUploader.dxFileUploader('instance');
          var files = [fakeFile, fakeFile1];
          simulateFileChoose($fileUploader, files);
          assert.equal(instance.option('value').length, files.length, 'files are added after init');
          instance.option('uploadMode', 'instantly');
          assert.equal(instance.option('value').length, 0, 'the \'value\' option is empty');
        });
        QUnit.test('the \'upload\' button should not be rendered if the \'uploadMode\' option is not \'useButtons\'', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({uploadMode: 'useForm'});
          var instance = $fileUploader.dxFileUploader('instance');
          assert.equal($fileUploader.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).length, 0, 'there is no \'upload\' button');
          instance.option('uploadMode', 'instantly');
          assert.equal($fileUploader.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).length, 0, 'there is no \'upload\' button');
        });
        QUnit.test('no upload buttons should be rendered if the \'uploadMode\' option is \'instantly\'', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'instantly'});
          simulateFileChoose($element, fakeFile);
          assert.equal($element.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).length, 0, 'no upload buttons are created');
        });
        QUnit.test('file should be uploaded only one time', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var $uploadButton = $fileUploader.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          simulateFileChoose($fileUploader, fakeFile);
          $uploadButton.trigger('dxclick');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT / 2);
          var xhr = this.xhrMock.getLastInstance();
          $uploadButton.trigger('dxclick');
          var newXhr = this.xhrMock.getLastInstance();
          assert.equal(xhr, newXhr, 'new xhr was not created when file is uploading');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT / 2);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          $uploadButton.trigger('dxclick');
          newXhr = this.xhrMock.getLastInstance();
          assert.equal(xhr, newXhr, 'new xhr was not created when file is uploaded');
        });
      });
      QUnit.module('value option', moduleConfig, function() {
        QUnit.test('selected file should be present in value option', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          var fileUploader = $fileUploader.dxFileUploader('instance');
          simulateFileChoose($fileUploader, fakeFile);
          assert.deepEqual(fileUploader.option('value'), [fakeFile], 'value set correctly');
        });
        QUnit.test('input value should not be changed inside widget after selecting', function(assert) {
          var originalVal = $.fn.val;
          try {
            var $fileUploader = $('#fileuploader').dxFileUploader({uploadMode: 'instantly'});
            var valUsed = 0;
            $.fn.val = function() {
              if (arguments.length) {
                valUsed++;
              }
              return originalVal.apply(this, arguments);
            };
            simulateFileChoose($fileUploader, fakeFile);
            assert.equal(valUsed, 1, 'val used only in simulateFileChoose method');
          } finally {
            $.fn.val = originalVal;
          }
        });
        QUnit.test('value change should be fired when file selected', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onValueChanged: function(e) {
              assert.deepEqual(e.value, [fakeFile], 'value specified correctly');
            }
          });
          simulateFileChoose($fileUploader, fakeFile);
        });
        QUnit.test('value change should be fired when file selected, uploadMode = useForm', function(assert) {
          var valueChangeHandler = sinon.stub();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useForm',
            onValueChanged: valueChangeHandler
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          simulateFileChoose($fileUploader, fakeFile);
          assert.equal(valueChangeHandler.callCount, 1, 'onValueChanged was called once');
          assert.deepEqual(valueChangeHandler.getCall(0).args[0].value, [fakeFile], 'value have been correctly passed to the event');
          assert.deepEqual(fileUploader.option('value'), [fakeFile], 'value is correct');
        });
        QUnit.test('value should support files at initialization', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({value: [fakeFile]});
          var fileUploader = $fileUploader.dxFileUploader('instance');
          var $fileInput = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          assert.equal($fileInput.val(), '', 'input value was set to empty string');
          assert.deepEqual(fileUploader.option('value'), [fakeFile], 'file value is correct');
        });
        QUnit.test('value should present in the file name', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          simulateFileChoose($fileUploader, fakeFile);
          var $fileName = $fileUploader.find('.' + FILEUPLOADER_FILE_NAME_CLASS).eq(0);
          assert.equal($fileName.text(), fakeFile.name, 'file name represent value correctly');
        });
        QUnit.test('empty class should be present when value is empty', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader();
          assert.ok($fileUploader.hasClass(FILEUPLOADER_EMPTY_CLASS), 'empty class added');
          simulateFileChoose($fileUploader, fakeFile);
          assert.ok(!$fileUploader.hasClass(FILEUPLOADER_EMPTY_CLASS), 'empty class not added');
        });
        QUnit.test('value should contain only file name (ie9 fix)', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({extendSelection: false});
          simulateFileChoose($fileUploader, 'C:\\fakefolder\\fakefile.txt');
          assert.deepEqual($fileUploader.dxFileUploader('option', 'value'), [{name: 'fakefile.txt'}], 'value contain file name');
          simulateFileChoose($fileUploader, 'C:\\fakefile.txt');
          assert.deepEqual($fileUploader.dxFileUploader('option', 'value'), [{name: 'fakefile.txt'}], 'value contain file name');
          simulateFileChoose($fileUploader, 'fakefile.txt');
          assert.deepEqual($fileUploader.dxFileUploader('option', 'value'), [{name: 'fakefile.txt'}], 'value contain file name');
        });
        QUnit.test('T823593 file list shoud be rerendered if widget invalidated', function(assert) {
          var eventHandled = false;
          var onValueChanged = function(e) {
            if (eventHandled) {
              return;
            } else {
              eventHandled = true;
            }
            var fileUploader = e.component;
            fileUploader.beginUpdate();
            fileUploader.option('value', e.value);
            fileUploader.option('allowedFileExtensions', ['.png', '.gif']);
            fileUploader.endUpdate();
          };
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'useForm',
            allowedFileExtensions: ['.png', '.gif'],
            onValueChanged: onValueChanged
          });
          simulateFileChoose($fileUploader, fakeFile);
          var $file = $fileUploader.find(("." + FILEUPLOADER_FILES_CONTAINER_CLASS + " ." + FILEUPLOADER_FILE_CLASS));
          var $fileName = $file.find(("." + FILEUPLOADER_FILE_NAME_CLASS));
          var $fileStatus = $file.find(("." + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS));
          assert.strictEqual($file.length, 1, 'file rendered');
          assert.strictEqual($fileName.text(), 'fakefile.png', 'file name rendered');
          assert.strictEqual($fileStatus.text(), 'Ready to upload', 'file status message rendered');
        });
      });
      QUnit.module('multiple option', moduleConfig, function() {
        QUnit.test('field multiple attr should be set correctly', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({multiple: true});
          var $fileInput = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          assert.equal($fileInput.prop('multiple'), true, 'file input has correct name property');
          $fileUploader.dxFileUploader('option', 'multiple', false);
          assert.equal($fileInput.prop('multiple'), false, 'file input has correct name property');
        });
        QUnit.test('value should contain several file names', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: true,
            extendSelection: false
          });
          simulateFileChoose($fileUploader, fakeFile);
          assert.deepEqual($fileUploader.dxFileUploader('option', 'value'), [fakeFile], 'value contain file name');
          simulateFileChoose($fileUploader, [fakeFile, fakeFile1]);
          assert.deepEqual($fileUploader.dxFileUploader('option', 'value'), [fakeFile, fakeFile1], 'value contain both files');
        });
      });
      QUnit.module('option change', moduleConfig, function() {
        QUnit.test('file input should not be rerendered if widget repainted', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({uploadMode: 'instantly'});
          simulateFileChoose($fileUploader, fakeFile);
          $fileUploader.dxFileUploader('repaint');
          var $fileInput = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          assert.equal($fileInput.val(), fakeFile.name, 'value was not set to empty string');
        });
        QUnit.test('event subscriptions should be removed before widget is disposed of (T1016127)', function(assert) {
          var customDropZone = $('<div>').addClass('dropZone').appendTo('#qunit-fixture');
          var customDialogTrigger = $('<div>').addClass('trigger').appendTo('#qunit-fixture');
          var instance = $('#fileuploader').dxFileUploader().dxFileUploader('instance');
          sinon.stub(instance, '_attachSelectFileDialogHandler');
          sinon.stub(instance, '_detachSelectFileDialogHandler');
          sinon.stub(instance, '_attachDragEventHandlers');
          sinon.stub(instance, '_detachDragEventHandlers');
          instance.option({
            uploadMode: 'useButtons',
            dialogTrigger: '.trigger',
            dropZone: '.dropZone'
          });
          this.clock.tick(100);
          instance._detachSelectFileDialogHandler.reset();
          instance._detachDragEventHandlers.reset();
          assert.ok(instance._attachSelectFileDialogHandler.callCount >= 1, '_attachSelectFileDialogHandler method called');
          var items = instance._attachSelectFileDialogHandler.args[0];
          assert.strictEqual(items.length, 1, '_attachSelectFileDialogHandler args is valid');
          assert.strictEqual(items[0], '.trigger', '_attachSelectFileDialogHandler args is valid');
          assert.ok(instance._attachDragEventHandlers.callCount >= 1, '_attachDragEventHandlers method called');
          items = instance._attachDragEventHandlers.args[0];
          assert.strictEqual(items.length, 1, '_attachDragEventHandlers args is valid');
          assert.strictEqual(items[0], '.dropZone', '_attachDragEventHandlers args is valid');
          instance.dispose();
          assert.strictEqual(instance._detachSelectFileDialogHandler.callCount, 1, '_detachSelectFileDialogHandler method called');
          items = instance._detachSelectFileDialogHandler.args[0] || [];
          assert.strictEqual(items.length, 1, '_detachSelectFileDialogHandler args is valid');
          assert.strictEqual(items[0], '.trigger', '_detachSelectFileDialogHandler args is valid');
          assert.strictEqual(instance._detachDragEventHandlers.callCount, 1, '_detachDragEventHandlers method called');
          items = instance._detachDragEventHandlers.args[0] || [];
          assert.strictEqual(items.length, 1, '_detachDragEventHandlers args is valid');
          assert.strictEqual(items[0], '.dropZone', '_detachDragEventHandlers args is valid');
          instance._attachSelectFileDialogHandler.restore();
          instance._detachSelectFileDialogHandler.restore();
          instance._attachDragEventHandlers.restore();
          instance._detachDragEventHandlers.restore();
          customDropZone.remove();
          customDialogTrigger.remove();
        });
        QUnit.test('uploader must change hoverStateEnabled option of all buttons by general hoverStateEnabled change', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          simulateFileChoose($fileUploader, fakeFile);
          this.clock.tick(100);
          var buttonElements = $fileUploader.find('.' + FILEUPLOADER_BUTTON_CLASS);
          assert.strictEqual(buttonElements.length, 4, 'all buttons found');
          buttonElements.each(function(index, button) {
            var buttonElem = $(button);
            buttonElem.trigger('dxpointerenter');
            assert.ok(buttonElem.hasClass('dx-state-hover'));
            buttonElem.trigger('dxpointerleave');
          });
          $fileUploader.dxFileUploader({hoverStateEnabled: false});
          this.clock.tick(100);
          buttonElements = $fileUploader.find('.' + FILEUPLOADER_BUTTON_CLASS);
          assert.strictEqual(buttonElements.length, 4, 'all buttons found');
          buttonElements.each(function(index, button) {
            var buttonElem = $(button);
            buttonElem.trigger('dxpointerenter');
            assert.notOk(buttonElem.hasClass('dx-state-hover'));
            buttonElem.trigger('dxpointerleave');
          });
        });
      });
      QUnit.module('file uploading', moduleConfig, function() {
        QUnit.test('upload should be started after file is selected', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'instantly'});
          simulateFileChoose($element, fakeFile);
          var request = this.xhrMock.getInstanceAt();
          var expectedCallsCount = this.xhrMock.LOAD_TIMEOUT / this.xhrMock.PROGRESS_INTERVAL;
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.equal(request.onProgressCallCount, expectedCallsCount, 'the \'onprogress\' callback fired ' + expectedCallsCount + ' times');
          assert.ok(request.uploaded, 'loading is finished');
        });
        QUnit.test('upload should not start automatically only if \'uploadMode\' option is not \'instantly\'', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          simulateFileChoose($element, fakeFile);
          var request = this.xhrMock.getInstanceAt();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.ok(!request, 'upload did not start');
        });
        QUnit.test('click on common \'upload\' button should start file uploading', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var $button = $element.find('.' + FILEUPLOADER_CONTENT_CLASS + ' > .' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          simulateFileChoose($element, fakeFile);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          var request = this.xhrMock.getInstanceAt();
          assert.ok(!request, 'upload did not start');
          $button.trigger('dxclick');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          request = this.xhrMock.getInstanceAt();
          assert.ok(request.uploaded, 'upload started');
        });
        QUnit.test('upload of specific file should start after click on corresponding \'upload\' button', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var files = [fakeFile, fakeFile1];
          simulateFileChoose($element, files);
          var $uploadButtons = $element.find('.' + FILEUPLOADER_FILES_CONTAINER_CLASS + ' .' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          $uploadButtons.eq(1).trigger('dxclick');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          var request = this.xhrMock.getInstanceAt();
          assert.ok(request.uploaded, 'upload is done');
          assert.strictEqual(request.loadedSize, files[1].size, 'correct file was uploaded');
        });
        QUnit.test('file upload buttons should become disabled and invisible after upload started', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var files = [fakeFile, fakeFile1];
          simulateFileChoose($element, files);
          var $uploadButtons = $element.find('.' + FILEUPLOADER_FILES_CONTAINER_CLASS + ' .' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          $uploadButtons.eq(0).trigger('dxclick');
          assert.strictEqual($uploadButtons.length, 2, 'both buttons are still here');
          assert.ok($uploadButtons.eq(0).hasClass('dx-state-disabled'), 'clicked button is disabled');
          assert.notOk($uploadButtons.eq(0).is(':visible'), 'clicked button is invisible');
          assert.ok($uploadButtons.eq(1).is(':visible'), 'other button is visible');
          assert.notOk($uploadButtons.eq(1).hasClass('dx-state-disabled'), 'other button is enabled');
          var $commonUploadButton = $element.find('.' + FILEUPLOADER_CONTENT_CLASS + ' > .' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          $commonUploadButton.trigger('dxclick');
          $uploadButtons = $element.find('.' + FILEUPLOADER_FILES_CONTAINER_CLASS + ' .' + FILEUPLOADER_UPLOAD_BUTTON_CLASS);
          assert.strictEqual($uploadButtons.length, 2, 'both buttons are still here');
          assert.ok($uploadButtons.eq(0).hasClass('dx-state-disabled'), 'first button is still disabled');
          assert.notOk($uploadButtons.eq(0).is(':visible'), 'first button is still invisible');
          assert.notOk($uploadButtons.eq(1).is(':visible'), 'clicked button is invisible');
          assert.ok($uploadButtons.eq(1).hasClass('dx-state-disabled'), 'clicked button is disabled');
        });
        QUnit.test('progressBar should reflect file upload progress', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'instantly'});
          simulateFileChoose($element, fakeFile);
          var request = this.xhrMock.getInstanceAt();
          var progressBar = $('.dx-progressbar').dxProgressBar('instance');
          assert.equal(progressBar.option('value'), request.loadedSize, 'progressBar value is correct on init');
          for (var i = 0,
              n = this.xhrMock.LOAD_TIMEOUT / this.xhrMock.PROGRESS_INTERVAL; i < n; i++) {
            this.clock.tick(this.xhrMock.PROGRESS_INTERVAL);
            assert.equal(progressBar.option('value'), request.loadedSize, 'progressBar value is correct on step ' + (i + 1));
          }
          assert.equal(request.onProgressCallCount, this.xhrMock.LOAD_TIMEOUT / this.xhrMock.PROGRESS_INTERVAL);
        });
        QUnit.test('request should use url from the \'uploadUrl\' option', function(assert) {
          var uploadUrl = location.href;
          var $element = $('#fileuploader').dxFileUploader({
            uploadUrl: uploadUrl,
            uploadMode: 'instantly'
          });
          simulateFileChoose($element, fakeFile);
          var request = this.xhrMock.getInstanceAt();
          assert.equal(request.url, uploadUrl, 'correct url is used');
        });
        QUnit.test('uploading multiple files', function(assert) {
          var $__2 = this;
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'instantly'});
          var files = [fakeFile, fakeFile1];
          simulateFileChoose($element, files);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT * 2);
          $.each(files, function(index, file) {
            var currentRequest = $__2.xhrMock.getInstanceAt(index);
            assert.equal(currentRequest.loadedSize, file.size, (index + 1) + ' file is loaded');
          });
        });
        QUnit.test('upload process should be aborted by \'cancel\' button click', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'instantly'});
          simulateFileChoose($element, fakeFile);
          var request = this.xhrMock.getInstanceAt();
          var $cancelButton = $element.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS);
          $cancelButton.trigger('dxclick');
          assert.ok(request.uploadAborted, 'load is aborted');
        });
        QUnit.test('FormData field name should correspond the \'name\' option value', function(assert) {
          var formFieldElement = 'custom';
          var $element = $('#fileuploader').dxFileUploader({
            name: formFieldElement,
            uploadMode: 'instantly'
          });
          simulateFileChoose($element, fakeFile);
          var formData = this.formDataMock.getInstanceAt();
          var fieldName = formData.getTopElement().fieldName;
          assert.equal(fieldName, formFieldElement, 'field name is correct');
        });
        QUnit.test('uploadMode \'useForm\'', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useForm'});
          simulateFileChoose($element, fakeFile);
          var request = this.xhrMock.getInstanceAt();
          assert.ok(!request, 'request is not created');
        });
        QUnit.test('upload is successful for each 2xx status', function(assert) {
          assert.expect(1);
          this.xhrMock.setStatus(202);
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploaded: function() {
              assert.ok(true, 'upload is success');
            },
            onUploadError: function() {
              assert.ok(false, 'upload should not be failed');
            }
          });
          simulateFileChoose($element, fakeFile);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
        });
        QUnit.test('the \'method\' option', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'instantly',
            uploadMethod: 'POST'
          });
          simulateFileChoose($element, fakeFile);
          assert.equal(this.xhrMock.getLastInstance()._method, 'POST', 'method is correct');
          $element.dxFileUploader('option', 'uploadMethod', 'PUT');
          simulateFileChoose($element, fakeFile1);
          assert.equal(this.xhrMock.getLastInstance()._method, 'PUT', 'method is correct');
        });
        QUnit.test('request should have correct headers', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({
            uploadHeaders: {
              'First-header': 'First-header-value',
              'Second-header': 'Second-header-value'
            },
            uploadMode: 'instantly'
          });
          simulateFileChoose($element, fakeFile);
          var headers = this.xhrMock.getLastInstance()._headers;
          assert.equal(headers['First-header'], 'First-header-value', 'first header is correct');
          assert.equal(headers['Second-header'], 'Second-header-value', 'second header is correct');
        });
        QUnit.test('files upload is correct if the \'extendSelection\' option is true', function(assert) {
          var onUploadStartedCount = 0;
          var $fileUploader = $('#fileuploader').dxFileUploader({
            extendSelection: true,
            multiple: true,
            uploadMode: 'instantly',
            onUploadStarted: function() {
              onUploadStartedCount++;
            }
          });
          simulateFileChoose($fileUploader, [fakeFile, fakeFile]);
          simulateFileChoose($fileUploader, [fakeFile, fakeFile, fakeFile]);
          assert.equal(onUploadStartedCount, 5, 'files count is correct');
        });
        QUnit.test('uploaded files\' cancel buttons are hidden if the \'extendSelection\' option is true', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            extendSelection: true,
            multiple: true,
            uploadMode: 'instantly'
          });
          simulateFileChoose($fileUploader, [fakeFile, fakeFile]);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT + FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.equal($fileUploader.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS + ':visible').length, 0, 'cancel buttons are hidden after files upload');
          simulateFileChoose($fileUploader, [fakeFile, fakeFile, fakeFile]);
          assert.equal($fileUploader.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS + ':visible').length, 3, 'uploaded files\' cancel button are hidden');
        });
        QUnit.test('files count should be correct after value reset', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            extendSelection: true,
            multiple: true
          });
          var $input = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          simulateFileChoose($fileUploader, [fakeFile, fakeFile, fakeFile]);
          assert.equal($fileUploader.find('.' + FILEUPLOADER_FILE_CLASS).length, 3, 'files count is correct on the first file choose');
          $fileUploader.dxFileUploader('option', 'value', []);
          assert.equal($fileUploader.find('.' + FILEUPLOADER_FILE_CLASS).length, 0, 'files count is correct after reset');
          assert.equal($input.val(), '', 'value was cleared in input');
          simulateFileChoose($fileUploader, fakeFile);
          assert.equal($fileUploader.find('.' + FILEUPLOADER_FILE_CLASS).length, 1, 'files count is correct on the second file choose');
        });
        QUnit.test('input should be cleared after value reset', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            extendSelection: true,
            value: [fakeFile],
            multiple: true
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          var $input = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          $input.val('fakefile');
          fileUploader.reset();
          assert.equal($input.val(), '', 'value was cleared in input');
        });
        QUnit.test('input value should not be cleared after the file selection', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            extendSelection: true,
            uploadMode: 'useForm'
          });
          var $input = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          $input.val('fakeFile').trigger('change');
          assert.equal($input.val(), 'fakeFile', 'value was cleared in input');
        });
        QUnit.test('T857021 - widget can be destoyed in \'Uploaded\' event', function(assert) {
          var $fileUploader = $('#fileuploader');
          var onUploadedSpy = sinon.spy(function() {
            $fileUploader.dxFileUploader('dispose');
            $fileUploader.remove();
          });
          $fileUploader.dxFileUploader({onUploaded: onUploadedSpy});
          simulateFileChoose($fileUploader, fakeFile);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT + 1000);
          assert.strictEqual(onUploadedSpy.callCount, 1, 'onUploaded event raised');
          assert.ok($fileUploader.empty(), 'widget container empty');
        });
        test('whole file instantly upload can be cancelled with abortUpload (T990523)', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: true,
            uploadMode: 'instantly',
            onUploadStarted: function($__4) {
              var $__5 = $__4,
                  component = $__5.component,
                  file = $__5.file;
              if (component.option('value').length > 2) {
                component.abortUpload(file);
              }
            }
          });
          var instance = $fileUploader.dxFileUploader('instance');
          simulateFileChoose($fileUploader, [fakeFile, fakeFile1, fakeFile2]);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          $($fileUploader.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS)).each(function(i, message) {
            assert.equal($(message).text(), instance.option('uploadAbortedMessage'), 'has uploadAbortedMessage');
          });
        });
      });
      QUnit.module('uploading progress', moduleConfig, function() {
        QUnit.test('the \'progress\' option should reflect file upload progress', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({
            extendSelection: false,
            uploadMode: 'instantly'
          });
          var instance = $element.dxFileUploader('instance');
          var files = [fakeFile, fakeFile1];
          simulateFileChoose($element, files);
          var stepsCount = this.xhrMock.LOAD_TIMEOUT / this.xhrMock.PROGRESS_INTERVAL;
          var totalSize;
          var loadedSize;
          var currentProgress;
          for (var i = 0; i < stepsCount; i++) {
            loadedSize = 0;
            totalSize = 0;
            for (var j = 0; j < files.length; j++) {
              totalSize += files[j].size;
              loadedSize += this.xhrMock.getInstanceAt(j).loadedSize;
            }
            currentProgress = Math.floor(loadedSize * 100 / totalSize);
            assert.equal(instance.option('progress'), currentProgress, 'progress is correct on step ' + i);
            this.clock.tick(this.xhrMock.PROGRESS_INTERVAL);
          }
          simulateFileChoose($element, fakeFile);
          loadedSize = this.xhrMock.getInstanceAt(files.length).loadedSize;
          currentProgress = Math.floor(loadedSize * 100 / fakeFile.size);
          assert.equal(instance.option('progress'), currentProgress, 'progress is correct after value change');
        });
        QUnit.test('the \'progress\' option should be reset to 0 when new files are selected after old files has been uploaded', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            extendSelection: false
          });
          var instance = $element.dxFileUploader('instance');
          simulateFileChoose($element, fakeFile);
          $element.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS + ' .' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).trigger('dxclick');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.equal(instance.option('progress'), 100, 'file is uploaded');
          simulateFileChoose($element, fakeFile1);
          assert.equal(instance.option('progress'), 0, 'file choosing leads to the \'progress\' option reset');
        });
        QUnit.test('T246244 - the \'progress\' option should be recalculated when not uploaded file is removed', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var instance = $element.dxFileUploader('instance');
          simulateFileChoose($element, [fakeFile, fakeFile, fakeFile]);
          var $files = $element.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS);
          var $firstFile = $files.eq(0);
          var $secondFile = $files.eq(1);
          var $thirdFile = $files.eq(2);
          $firstFile.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).trigger('dxclick');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.equal(instance.option('progress'), 33, 'file is uploaded');
          $secondFile.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).trigger('dxclick');
          assert.equal(instance.option('progress'), 50, 'file removing leads to progress recalculation');
          $thirdFile.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).trigger('dxclick');
          assert.equal(instance.option('progress'), 100, 'removing all not uploaded files leads to setting the \'progress\' option to 100');
        });
        QUnit.test('T246244 - the \'progress\' option should be recalculated when uploaded file is removed', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var instance = $element.dxFileUploader('instance');
          simulateFileChoose($element, [fakeFile, fakeFile, fakeFile]);
          var $files = $element.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS);
          var $firstFile = $files.eq(0);
          var $secondFile = $files.eq(1);
          var $thirdFile = $files.eq(2);
          $firstFile.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).trigger('dxclick');
          $secondFile.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).trigger('dxclick');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.equal(instance.option('progress'), 66, 'two files are uploaded');
          $secondFile.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).trigger('dxclick');
          assert.equal(instance.option('progress'), 50, 'uploaded file removing leads to progress recalculation');
          $thirdFile.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).trigger('dxclick');
          assert.equal(instance.option('progress'), 100, 'removing all files but one uploaded file leads to setting the \'progress\' option to 100');
        });
        QUnit.test('T246244 - the \'progress\' option should be recalculated when uploading file is removed', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'useButtons'});
          var instance = $element.dxFileUploader('instance');
          simulateFileChoose($element, [fakeFile, fakeFile, fakeFile]);
          var $files = $element.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS);
          var $firstFile = $files.eq(0);
          var $secondFile = $files.eq(1);
          var $thirdFile = $files.eq(2);
          $firstFile.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).trigger('dxclick');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          $secondFile.find('.' + FILEUPLOADER_UPLOAD_BUTTON_CLASS).trigger('dxclick');
          assert.equal(instance.option('progress'), 39, 'one file is uploaded and the other one is uploading');
          $secondFile.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).trigger('dxclick');
          assert.equal(instance.option('progress'), 50, 'uploading file removing leads to progress recalculation');
          $thirdFile.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).trigger('dxclick');
          assert.equal(instance.option('progress'), 100, 'removing all files but one uploaded file leads to setting the \'progress\' option to 100');
        });
        QUnit.test('T246244 - the \'progress\' option should be reset to 0 when last file is removed', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({uploadMode: 'instantly'});
          var instance = $element.dxFileUploader('instance');
          simulateFileChoose($element, fakeFile);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.equal(instance.option('progress'), 100, 'file is uploaded');
          $element.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS + ' .' + FILEUPLOADER_CANCEL_BUTTON_CLASS).trigger('dxclick');
          assert.equal(instance.option('progress'), 0, 'progress is reset');
        });
      });
      QUnit.module('file status message', moduleConfig, function() {
        QUnit.test('correct status message on init', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            readyToUploadMessage: 'ready'
          });
          var instance = $element.dxFileUploader('instance');
          simulateFileChoose($element, fakeFile);
          var $fileStatusMessage = $element.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS);
          var $progressBar = $element.find('.dx-progressbar');
          assert.equal($fileStatusMessage.text(), instance.option('readyToUploadMessage'), 'status message is correct');
          assert.ok($fileStatusMessage.is(':visible'), 'status message is visible');
          assert.equal($progressBar.length, 0, 'there is no progressbar');
        });
        QUnit.test('correct status message on uploaded', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            uploadedMessage: 'done'
          });
          var instance = $element.dxFileUploader('instance');
          simulateFileChoose($element, fakeFile);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          var $fileStatusMessage = $element.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS);
          var $progressBar = $element.find('.dx-progressbar');
          assert.equal($fileStatusMessage.text(), instance.option('uploadedMessage'), 'status message is correct');
          assert.ok($fileStatusMessage.is(':visible'), 'status message is visible');
          assert.equal($progressBar.length, 0, 'there is no progressbar');
        });
        QUnit.test('status message is hidden and progressbar is visible on loading', function(assert) {
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            uploadedMessage: 'done'
          });
          simulateFileChoose($element, fakeFile);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT / 2);
          var $fileStatusMessage = $element.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS);
          var $progressBar = $element.find('.dx-progressbar');
          assert.ok(!$fileStatusMessage.is(':visible'), 'status message is not visible');
          assert.equal($progressBar.length, 1, 'progressbar is visible');
        });
        QUnit.test('status message should be correct if upload failed', function(assert) {
          this.xhrMock.setStatus(405);
          var $element = $('#fileuploader').dxFileUploader({
            uploadFailedMessage: 'failed',
            uploadMode: 'instantly'
          });
          var instance = $element.dxFileUploader('instance');
          simulateFileChoose($element, fakeFile);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          var $fileStatusMessage = $element.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS);
          assert.equal($fileStatusMessage.text(), instance.option('uploadFailedMessage'), 'upload failed message is correct');
        });
      });
      QUnit.module('uploading events', moduleConfig, function() {
        QUnit.test('the \'onUploaded\' option', function(assert) {
          var onUploadedCount = 0;
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploaded: function() {
              onUploadedCount++;
            }
          });
          simulateFileChoose($element, fakeFile);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.equal(onUploadedCount, 1, 'the \'onUploaded\' callback is called');
        });
        QUnit.test('the \'onUploaded\' option with multiple files', function(assert) {
          var onUploadedCount = 0;
          var files = [fakeFile, fakeFile1];
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploaded: function() {
              onUploadedCount++;
            }
          });
          simulateFileChoose($element, files);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.equal(onUploadedCount, files.length, 'the \'onUploaded\' callback is called for each file');
        });
        QUnit.test('the \'onProgress\' option', function(assert) {
          var onProgressCount = 0;
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onProgress: function() {
              onProgressCount++;
            }
          });
          simulateFileChoose($element, fakeFile);
          assert.equal(onProgressCount, 1, 'the \'onProgress\' callback is called');
          this.clock.tick(this.xhrMock.PROGRESS_INTERVAL);
          assert.equal(onProgressCount, 2, 'the \'onProgress\' callback is called again after the progress interval');
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.equal(onProgressCount, 5, 'the \'onProgress\' callback is called 6 times after file is uploaded');
        });
        QUnit.test('the \'onProgress\' option with multiple files', function(assert) {
          var onProgressCount = 0;
          var files = [fakeFile, fakeFile1];
          var filesCount = files.length;
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onProgress: function() {
              onProgressCount++;
            }
          });
          simulateFileChoose($element, files);
          assert.equal(onProgressCount, filesCount, 'the \'onProgress\' callback is called for each file');
          this.clock.tick(this.xhrMock.PROGRESS_INTERVAL);
          assert.equal(onProgressCount, 2 * filesCount, 'the \'onProgress\' callback is called after the progress interval twice for each file');
        });
        QUnit.test('the \'onProgress\' option event fields', function(assert) {
          var stepSize = fakeFile.size * this.xhrMock.PROGRESS_INTERVAL / this.xhrMock.LOAD_TIMEOUT;
          var firstSegment = Math.floor(stepSize);
          var twoSegments = Math.floor(2 * stepSize);
          var onProgressHandler = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onProgress: onProgressHandler
          });
          simulateFileChoose($element, fakeFile);
          var args = onProgressHandler.getCall(0).args[0];
          assert.equal(args.segmentSize, firstSegment, 'segment size is correct');
          assert.equal(args.bytesLoaded, firstSegment, 'bytes loaded size is correct');
          assert.equal(args.bytesTotal, args.event.total, 'bytes total size is correct');
          assert.ok(args.bytesTotal, 'bytes total is defined');
          this.clock.tick(this.xhrMock.PROGRESS_INTERVAL);
          args = onProgressHandler.getCall(1).args[0];
          assert.equal(args.segmentSize, twoSegments - firstSegment, 'segment size is correct after progress interval');
          assert.equal(args.bytesLoaded, twoSegments, 'bytes loaded size is correct after progress interval');
          assert.equal(args.bytesTotal, args.event.total, 'bytes total size is correct');
          assert.ok(args.bytesTotal, 'bytes total is defined');
        });
        QUnit.test('the \'onUploadError\' option', function(assert) {
          this.xhrMock.setStatus(405);
          var onUploadErrorCount = 0;
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploadError: function() {
              onUploadErrorCount++;
            }
          });
          simulateFileChoose($element, fakeFile);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.equal(onUploadErrorCount, 1, 'the \'onUploadError\' callback is called after file upload is failed');
        });
        QUnit.test('the \'onUploadError\' option with multiple files', function(assert) {
          this.xhrMock.setStatus(405);
          var onUploadErrorCount = 0;
          var files = [fakeFile, fakeFile1];
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploadError: function() {
              onUploadErrorCount++;
            }
          });
          simulateFileChoose($element, files);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.equal(onUploadErrorCount, files.length, 'the \'onUploadError\' callback is called for each file after file upload is failed');
        });
        QUnit.test('the \'onUploaded\' option should be called the the \'showFileList\' option is false', function(assert) {
          var onUploadedCount = 0;
          var $element = $('#fileuploader').dxFileUploader({
            showFileList: false,
            uploadMode: 'instantly',
            onUploaded: function() {
              onUploadedCount++;
            }
          });
          simulateFileChoose($element, fakeFile);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.equal(onUploadedCount, 1, 'the \'onUploaded\' callback is called');
        });
        QUnit.test('the \'onUploadError\' option should be called the the \'showFileList\' option is false', function(assert) {
          this.xhrMock.setStatus(405);
          var onUploadErrorCount = 0;
          var $element = $('#fileuploader').dxFileUploader({
            showFileList: false,
            uploadMode: 'instantly',
            onUploadError: function() {
              onUploadErrorCount++;
            }
          });
          simulateFileChoose($element, fakeFile);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.equal(onUploadErrorCount, 1, 'the \'onUploadError\' callback is called');
        });
        QUnit.test('the \'onProgress\' option should be called the the \'showFileList\' option is false', function(assert) {
          var onProgressCount = 0;
          var $element = $('#fileuploader').dxFileUploader({
            showFileList: false,
            uploadMode: 'instantly',
            onProgress: function() {
              onProgressCount++;
            }
          });
          simulateFileChoose($element, fakeFile);
          assert.equal(onProgressCount, 1, 'the \'onUploaded\' callback is called');
        });
        QUnit.test('the \'onUploadError\' callback should be called for 4xx status only', function(assert) {
          this.xhrMock.setStatus(0);
          var onUploadError = 0;
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            allowCanceling: true,
            onUploadError: function() {
              onUploadError++;
            }
          });
          simulateFileChoose($element, fakeFile);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.strictEqual(onUploadError, 0, 'the \'onUploadError\' callback is not called');
        });
        QUnit.test('T350238 - the \'onUploaded\' action file should be correct', function(assert) {
          var file;
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploaded: function(e) {
              file = e.file;
            }
          });
          simulateFileChoose($element, fakeFile);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.deepEqual(fakeFile, file, 'file is correct');
        });
        QUnit.test('T350238 - the \'onProgress\' action file should be correct', function(assert) {
          var file;
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onProgress: function(e) {
              file = e.file;
            }
          });
          simulateFileChoose($element, fakeFile);
          assert.deepEqual(fakeFile, file, 'file is correct');
        });
        QUnit.test('T350238 - the \'onUploadError\' action file should be correct', function(assert) {
          this.xhrMock.setStatus(403);
          var file;
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            allowCanceling: true,
            onUploadError: function(e) {
              file = e.file;
            }
          });
          simulateFileChoose($element, fakeFile);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.deepEqual(fakeFile, file, 'file is correct');
        });
        QUnit.test('the \'onUploadStarted\' action', function(assert) {
          var onUploadStartedCount = 0;
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploadStarted: function(e) {
              onUploadStartedCount++;
            }
          });
          simulateFileChoose($element, fakeFile);
          assert.equal(onUploadStartedCount, 1, 'action is fired');
        });
        QUnit.test('the \'onUploadAborted\' action', function(assert) {
          var onUploadAbortedCount = 0;
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            allowCanceling: true,
            onUploadAborted: function(e) {
              onUploadAbortedCount++;
            }
          });
          simulateFileChoose($element, fakeFile);
          $element.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).trigger('dxclick');
          assert.equal(onUploadAbortedCount, 1, 'action is fired');
        });
        QUnit.test('onUploadStarted event should contain request which is instance of XMLHttpRequest', function(assert) {
          assert.expect(1);
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploadStarted: function(e) {
              assert.ok(e.request instanceof XMLHttpRequest, 'request is correct');
            }
          });
          simulateFileChoose($element, fakeFile);
        });
        QUnit.test('onUploaded event should contain request which is instance of XMLHttpRequest', function(assert) {
          assert.expect(1);
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploaded: function(e) {
              assert.ok(e.request instanceof XMLHttpRequest, 'request is correct');
            }
          });
          simulateFileChoose($element, fakeFile);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
        });
        QUnit.test('onProgress event should contain request which is instance of XMLHttpRequest', function(assert) {
          assert.expect(2);
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onProgress: function(e) {
              assert.ok(e.request instanceof XMLHttpRequest, 'request is correct');
            }
          });
          simulateFileChoose($element, fakeFile);
          this.clock.tick(this.xhrMock.PROGRESS_INTERVAL);
        });
        QUnit.test('onUploadError event should contain request which is instance of XMLHttpRequest', function(assert) {
          assert.expect(1);
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploadError: function(e) {
              assert.ok(e.request instanceof XMLHttpRequest, 'request is correct');
            }
          });
          simulateFileChoose($element, fakeFile);
          this.xhrMock.setStatus(400);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
        });
        QUnit.test('onUploadAborted event should contain request which is instance of XMLHttpRequest', function(assert) {
          assert.expect(1);
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploadAborted: function(e) {
              assert.ok(e.request instanceof XMLHttpRequest, 'request is correct');
            }
          });
          simulateFileChoose($element, fakeFile);
          $element.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS).trigger('dxclick');
        });
        QUnit.test('onBeforeSend event should contain request which is instance of XMLHttpRequest', function(assert) {
          assert.expect(1);
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onBeforeSend: function(e) {
              assert.ok(e.request instanceof XMLHttpRequest, 'request is correct');
            }
          });
          simulateFileChoose($element, fakeFile);
        });
        QUnit.test('onBeforeSend event should be able to set properties of XMLHttpRequest', function(assert) {
          assert.expect(2);
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onBeforeSend: function(e) {
              e.request.withCredentials = true;
              e.request.customXhrField = 'Some string';
            },
            onUploadStarted: function(e) {
              assert.ok(e.request.withCredentials, 'withCredentials is correct');
              assert.strictEqual(e.request.customXhrField, 'Some string', 'other custom field is correct');
            }
          });
          simulateFileChoose($element, fakeFile);
        });
        QUnit.test('onBeforeSend event should rise before upload started', function(assert) {
          var onUploadStartedSpy = sinon.spy();
          assert.expect(1);
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onBeforeSend: function(e) {
              assert.ok(onUploadStartedSpy.notCalled, 'upload is not started');
            },
            onUploadStarted: onUploadStartedSpy
          });
          simulateFileChoose($element, fakeFile);
        });
        QUnit.test('onFilesUploaded event should rise when all files are successfully uploaded', function(assert) {
          var chunkSize = 1000;
          var onUploadedSpy = sinon.spy();
          var onUploadCompletedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            chunkSize: chunkSize,
            uploadMode: 'instantly',
            multiple: true,
            onFilesUploaded: onUploadCompletedSpy,
            onUploaded: onUploadedSpy
          });
          var file1 = createBlobFile('file 1', chunkSize);
          var file2 = createBlobFile('file 2', chunkSize * 2);
          simulateFileChoose($element, [file1, file2]);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.ok(onUploadedSpy.calledOnce, 'file 1 uploaded');
          assert.ok(onUploadCompletedSpy.notCalled, 'onUploadCompletedSpy was not called');
          onUploadedSpy.reset();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.ok(onUploadedSpy.calledOnce, 'file 2 uploaded');
          assert.ok(onUploadCompletedSpy.calledOnce, 'onUploadCompletedSpy was called in right time');
        });
        QUnit.test('onFilesUploaded event should rise when files are both successfully uploaded and aborted', function(assert) {
          var chunkSize = 1000;
          var onUploadAbortedSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var onUploadCompletedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            chunkSize: chunkSize,
            uploadMode: 'instantly',
            multiple: true,
            onFilesUploaded: onUploadCompletedSpy,
            onUploadAborted: onUploadAbortedSpy,
            onUploaded: onUploadedSpy
          });
          var file1 = createBlobFile('file 1', chunkSize);
          var file2 = createBlobFile('file 2', chunkSize * 2);
          simulateFileChoose($element, [file1, file2]);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.ok(onUploadedSpy.calledOnce, 'file 1 was uploaded');
          assert.ok(onUploadAbortedSpy.notCalled, 'none files was aborted');
          assert.ok(onUploadCompletedSpy.notCalled, 'onUploadCompletedSpy was not called');
          onUploadedSpy.reset();
          $element.dxFileUploader('instance').abortUpload();
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT * 2);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.ok(onUploadedSpy.notCalled, 'none files was uploaded');
          assert.ok(onUploadAbortedSpy.calledOnce, 'file 2 was aborted');
          assert.ok(onUploadCompletedSpy.calledOnce, 'onUploadCompletedSpy was called in right time');
        });
        QUnit.test('onFilesUploaded event should rise when files are both successfully uploaded and has error', function(assert) {
          var $__2 = this;
          var chunkSize = 1000;
          var uploadChunkSpy = sinon.spy(function(file, uploadInfo) {
            return executeAfterDelay(function() {
              if (file.name === 'file 2' && uploadInfo.chunkIndex === 1) {
                throw 'Some error.';
              }
            }, $__2.xhrMock.LOAD_TIMEOUT);
          });
          var onUploadErrorSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var onUploadCompletedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            chunkSize: chunkSize,
            uploadMode: 'instantly',
            uploadChunk: uploadChunkSpy,
            multiple: true,
            onFilesUploaded: onUploadCompletedSpy,
            onUploadError: onUploadErrorSpy,
            onUploaded: onUploadedSpy
          });
          var file1 = createBlobFile('file 1', chunkSize);
          var file2 = createBlobFile('file 2', chunkSize * 2);
          simulateFileChoose($element, [file1, file2]);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.ok(onUploadedSpy.calledOnce, 'file 1 was uploaded');
          assert.ok(onUploadErrorSpy.notCalled, 'none files has error');
          assert.ok(onUploadCompletedSpy.notCalled, 'onUploadCompletedSpy was not called');
          onUploadedSpy.reset();
          this.clock.tick(1000);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.ok(onUploadedSpy.notCalled, 'none files was uploaded');
          assert.ok(onUploadErrorSpy.calledOnce, 'file 2 has error');
          assert.ok(onUploadCompletedSpy.calledOnce, 'onUploadCompletedSpy was called in right time');
        });
        QUnit.test('onFilesUploaded event should rise when files are both successfully uploaded and invalid', function(assert) {
          var chunkSize = 1000;
          var onUploadedSpy = sinon.spy();
          var onUploadCompletedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            chunkSize: chunkSize,
            uploadMode: 'instantly',
            multiple: true,
            maxFileSize: chunkSize,
            onFilesUploaded: onUploadCompletedSpy,
            onUploaded: onUploadedSpy
          });
          var file1 = createBlobFile('file 1', chunkSize);
          var file2 = createBlobFile('file 2', chunkSize * 2);
          simulateFileChoose($element, [file1, file2]);
          assert.equal($element.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS).not('.' + FILEUPLOADER_INVALID_CLASS).length, 1, 'One files is valid');
          assert.equal($element.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS + '.' + FILEUPLOADER_INVALID_CLASS).length, 1, 'One file is invalid');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.ok(onUploadedSpy.calledOnce, 'file 1 was uploaded');
          assert.ok(onUploadCompletedSpy.calledOnce, 'onUploadCompletedSpy was called in right time');
          onUploadedSpy.reset();
          onUploadCompletedSpy.reset();
          this.clock.tick(1000);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.ok(onUploadedSpy.notCalled, 'none files was uploaded');
          assert.ok(onUploadCompletedSpy.notCalled, 'onUploadCompletedSpy was not called again');
        });
        QUnit.test('onFilesUploaded event should rise when files are all successfully uploaded, invalid and has error', function(assert) {
          var $__2 = this;
          var chunkSize = 1000;
          var uploadChunkSpy = sinon.spy(function(file, uploadInfo) {
            return executeAfterDelay(function() {
              if (file.name === 'file 2' && uploadInfo.chunkIndex === 1) {
                throw 'Some error.';
              }
            }, $__2.xhrMock.LOAD_TIMEOUT);
          });
          var onUploadErrorSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var onUploadCompletedSpy = sinon.spy();
          var $element = $('#fileuploader').dxFileUploader({
            chunkSize: chunkSize,
            uploadMode: 'instantly',
            uploadChunk: uploadChunkSpy,
            multiple: true,
            maxFileSize: chunkSize * 2,
            onFilesUploaded: onUploadCompletedSpy,
            onUploadError: onUploadErrorSpy,
            onUploaded: onUploadedSpy
          });
          var file1 = createBlobFile('file 1', chunkSize);
          var file2 = createBlobFile('file 2', chunkSize * 2);
          var file3 = createBlobFile('file 3', chunkSize * 3);
          simulateFileChoose($element, [file1, file2, file3]);
          assert.equal($element.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS).not('.' + FILEUPLOADER_INVALID_CLASS).length, 2, 'Two files are valid');
          assert.equal($element.find('.' + FILEUPLOADER_FILE_CONTAINER_CLASS + '.' + FILEUPLOADER_INVALID_CLASS).length, 1, 'One file is invalid');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          assert.ok(onUploadedSpy.calledOnce, 'file 1 was uploaded');
          assert.ok(onUploadErrorSpy.notCalled, 'none files has error');
          assert.ok(onUploadCompletedSpy.notCalled, 'onUploadCompletedSpy was not called');
          onUploadedSpy.reset();
          this.clock.tick(1000);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          assert.ok(onUploadedSpy.notCalled, 'none files was uploaded');
          assert.ok(onUploadErrorSpy.calledOnce, 'file 2 has error');
          assert.ok(onUploadCompletedSpy.calledOnce, 'onUploadCompletedSpy was called in right time');
        });
        QUnit.test('File message can be changed on onUploaded event', function(assert) {
          var customMessage = 'Custom uploaded message';
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploaded: function(e) {
              return e.message = customMessage;
            }
          });
          simulateFileChoose($element, [fakeFile]);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT);
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          var $fileStatusMessage = $element.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS);
          assert.strictEqual($fileStatusMessage.text(), customMessage, 'message was applied');
        });
        QUnit.test('File message can be changed on onUploadAborted event', function(assert) {
          var customMessage = 'Custom upload aborted message';
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            onUploadAborted: function(e) {
              return e.message = customMessage;
            }
          });
          simulateFileChoose($element, [fakeFile]);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT / 2);
          $element.dxFileUploader('instance').abortUpload();
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          var $fileStatusMessage = $element.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS);
          assert.strictEqual($fileStatusMessage.text(), customMessage, 'message was applied');
        });
        QUnit.test('File message can be changed on onUploadError event', function(assert) {
          var customMessage = 'Custom upload error message';
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            uploadFile: function() {
              throw customMessage;
            },
            onUploadError: function(e) {
              return e.message = e.error;
            }
          });
          simulateFileChoose($element, [fakeFile]);
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT / 2);
          $element.dxFileUploader('instance').abortUpload();
          this.clock.tick(FILEUPLOADER_AFTER_LOAD_DELAY);
          var $fileStatusMessage = $element.find('.' + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS);
          assert.strictEqual($fileStatusMessage.text(), customMessage, 'message was applied');
        });
        QUnit.test('bytesTotal argument of the onProgress event must not be undefined when using custom uploadFile callback (T1081131)', function(assert) {
          var progressSpy = sinon.spy();
          var files = [fakeFile];
          var $element = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            uploadFile: function(file, progressCallback) {
              return progressCallback(1337);
            },
            onProgress: progressSpy
          });
          simulateFileChoose($element, files);
          this.clock.tick(this.xhrMock.PROGRESS_INTERVAL);
          assert.strictEqual(progressSpy.callCount, 1, 'the \'onProgress\' callback is called once');
          assert.strictEqual(progressSpy.args[0][0].bytesLoaded, 1337, 'the bytesLoaded argument value is correct');
          assert.strictEqual(progressSpy.args[0][0].bytesTotal, 100023, 'the bytesTotal argument value is correct');
        });
      });
      QUnit.module('keyboard navigation', moduleConfig, function() {
        QUnit.test('upload button should be focus target of fileUploader', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            focusStateEnabled: true
          });
          assert.equal($fileUploader.attr('tabindex'), undefined, 'element has not tabindex');
          var $uploadButton = $fileUploader.find('.' + FILEUPLOADER_BUTTON_CLASS);
          var uploadButton = $uploadButton.dxButton('instance');
          assert.equal(uploadButton.option('focusStateEnabled'), false, 'button has not self keyboard handlers');
          assert.equal($uploadButton.attr('tabindex'), 0, 'button has tabindex');
          var stub = sinon.stub();
          var keyboard = keyboardMock($uploadButton);
          uploadButton.option('onClick', stub);
          keyboard.keyDown('enter');
          assert.ok(stub.calledOnce, 'click is called on select button');
        });
        QUnit.test('T328503 - \'enter\' press on select button should lead to input click', function(assert) {
          if (devices.real().deviceType !== 'desktop') {
            assert.ok(true, 'keyboard is not supported for not generic devices');
            return;
          }
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            focusStateEnabled: true,
            useNativeInputClick: false
          });
          var $selectButton = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS + ' .' + FILEUPLOADER_BUTTON_CLASS);
          var keyboard = keyboardMock($selectButton);
          var $input = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          var stub = sinon.stub();
          $input.on('click', stub);
          $selectButton.trigger('focusin');
          keyboard.keyDown('enter');
          this.clock.tick(10);
          assert.ok(stub.calledOnce, 'press on select button leads to input click');
        });
        QUnit.test('Propagation of the native input click should be stopped (T404422)', function(assert) {
          assert.expect(1);
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            useNativeInputClick: false
          });
          var $selectButton = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS + ' .' + FILEUPLOADER_BUTTON_CLASS);
          var $input = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          $input.on('click', function(e) {
            assert.ok(e.isPropagationStopped(), 'propagation was stopped');
          });
          $selectButton.trigger('click');
        });
      });
      QUnit.module('Drag and drop', moduleConfig, function() {
        QUnit.test('T328503 - drag and drop events should be prevented if native drop is not supported', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            useDragOver: true,
            nativeDropSupported: false,
            uploadMode: 'useButtons'
          });
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var dragAndDropSpy = sinon.spy();
          var events = ['dragenter', 'dragover', 'dragleave', 'drop'];
          var dropEvent = $.Event($.Event('drop', {dataTransfer: {files: [fakeFile]}}));
          var dragOverEvent = $.Event($.Event('dragover', {dataTransfer: {files: [fakeFile]}}));
          var eventsCount = events.length;
          assert.expect(eventsCount);
          $inputWrapper.on(events.join(' '), dragAndDropSpy);
          for (var i = 0; i < eventsCount; i++) {
            var event = events[i];
            if (event === 'drop') {
              event = dropEvent;
            } else if (event === 'dragover') {
              event = dragOverEvent;
            }
            $inputWrapper.trigger(event);
            assert.ok(dragAndDropSpy.args[i][0].isDefaultPrevented(), 'default is prevented for ' + events[i]);
          }
        });
        QUnit.test('T328503 - drag and drop events should not be prevented if native drop is supported', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            useDragOver: true,
            nativeDropSupported: true,
            uploadMode: 'useForm'
          });
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var dragAndDropSpy = sinon.spy();
          var events = ['dragenter', 'dragover', 'dragleave', 'drop'];
          var eventsCount = events.length;
          var dragOverEvent = $.Event($.Event('dragover', {dataTransfer: {files: [fakeFile]}}));
          assert.expect(eventsCount);
          $inputWrapper.on(events.join(' '), dragAndDropSpy);
          for (var i = 0; i < eventsCount; i++) {
            var event = events[i];
            if (event === 'dragover') {
              event = dragOverEvent;
            }
            $inputWrapper.trigger(event);
            assert.ok(!dragAndDropSpy.args[i][0].isDefaultPrevented(), 'default is not prevented for ' + events[i]);
          }
        });
        QUnit.test('T328503 - files drag and drop should lead to value change if form is not used', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            multiple: true
          });
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var files = [fakeFile, fakeFile1];
          var event = $.Event($.Event('drop', {dataTransfer: {files: files}}));
          $inputWrapper.trigger(event);
          assert.deepEqual($fileUploader.dxFileUploader('option', 'value'), files, 'files are correct');
        });
        QUnit.test('T328503 - drop field should be visible, but default text is empty if upload mode is useForm and native drop is not supported', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useForm',
            nativeDropSupported: false
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          var $inputContainer = $fileUploader.find('.' + FILEUPLOADER_INPUT_CONTAINER_CLASS);
          var $inputLabel = $inputContainer.find('.' + FILEUPLOADER_INPUT_LABEL_CLASS);
          assert.ok($inputContainer.is(':visible'), 'input container is visible');
          assert.strictEqual($inputLabel.text(), '', 'label has empty line text');
          assert.strictEqual(fileUploader.option('labelText'), '', 'labelText option has empty line text');
        });
        QUnit.test('T370412 - it is impossible to drop some files if the \'multiple\' option is false', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            multiple: false,
            useDragOver: true
          });
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var files = [fakeFile, fakeFile1];
          var event = $.Event($.Event('drop', {dataTransfer: {files: files}}));
          $inputWrapper.trigger(event);
          assert.deepEqual($fileUploader.dxFileUploader('option', 'value'), [], 'dragged files count is correct');
        });
        QUnit.test('the \'accept\' option should not be ignored on drag&drop (T384800)', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            useDragOver: true,
            accept: 'text/*'
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var files = [fakeFile];
          var event = $.Event($.Event('drop', {dataTransfer: {files: files}}));
          $inputWrapper.trigger(event);
          assert.equal(fileUploader.option('value').length, 1, 'files count is correct');
          assert.equal($fileUploader.dxFileUploader('option', 'value[0]').name, fakeFile.name, 'added file is correct');
          var $filesContainer = $fileUploader.find(("." + FILEUPLOADER_FILES_CONTAINER_CLASS));
          var $invalidFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS + "." + FILEUPLOADER_INVALID_CLASS));
          var $validFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS)).not(("." + FILEUPLOADER_INVALID_CLASS));
          assert.equal($invalidFiles.length, 1, 'One file is invalid');
          assert.equal($validFiles.length, 0, 'No valid files');
          var invalidFileName = $invalidFiles.find('.' + FILEUPLOADER_FILE_NAME_CLASS).text();
          var $fileStatus = $invalidFiles.find(("." + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS));
          assert.equal(invalidFileName, fakeFile.name, fakeFile.name + ' is invalid file');
          assert.strictEqual($fileStatus.text(), 'File type is not allowed', 'file status message is correct');
        });
        QUnit.test('the \'accept\' option is case insensitive (T570224)', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            useDragOver: true,
            accept: '.jpg'
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var files = [{name: 'fakefile.JPG'}];
          var event = $.Event($.Event('drop', {dataTransfer: {files: files}}));
          $inputWrapper.trigger(event);
          assert.deepEqual(fileUploader.option('value'), files, 'file is chosen');
          files = [{
            name: 'fakefile.JPG',
            type: 'IMAGE/JPEG'
          }], fileUploader.option('accept', 'image/*');
          event = $.Event($.Event('drop', {dataTransfer: {files: files}}));
          $inputWrapper.trigger(event);
          assert.deepEqual(fileUploader.option('value'), files, 'file is chosen');
        });
        QUnit.test('the \'accept\' option check an extension only at the end of the file (T570224)', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            useDragOver: true,
            accept: '.jpg'
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var files = [{
            name: 'fakefile.jpg.bak',
            type: 'image/text'
          }];
          var event = $.Event($.Event('drop', {dataTransfer: {files: files}}));
          $inputWrapper.trigger(event);
          assert.equal(fileUploader.option('value').length, 1, 'files count is correct');
          assert.equal(fileUploader.option('value[0]').name, files[0].name, 'added file is correct');
          var $filesContainer = $fileUploader.find(("." + FILEUPLOADER_FILES_CONTAINER_CLASS));
          var $invalidFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS + "." + FILEUPLOADER_INVALID_CLASS));
          var $validFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS)).not(("." + FILEUPLOADER_INVALID_CLASS));
          assert.equal($invalidFiles.length, 1, 'One file is invalid');
          assert.equal($validFiles.length, 0, 'No valid files');
          var invalidFileName = $invalidFiles.find('.' + FILEUPLOADER_FILE_NAME_CLASS).text();
          var $fileStatus = $invalidFiles.find(("." + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS));
          assert.equal(invalidFileName, files[0].name, files[0].name + ' is invalid file');
          assert.strictEqual($fileStatus.text(), 'File type is not allowed', 'file status message is correct');
        });
        QUnit.test('the \'accept\' option with multiple types should work correctly on drag&drop', function(assert) {
          var fakeFile2 = {
            name: 'fakefile2',
            size: 2048,
            type: 'text/plain',
            lastModifiedDate: $.now()
          };
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            useDragOver: true,
            accept: 'text/*,image/png'
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var triggerDrop = function(targetFiles) {
            var event = $.Event($.Event('drop', {dataTransfer: {files: targetFiles}}));
            $inputWrapper.trigger(event);
          };
          var files = [fakeFile2];
          triggerDrop(files);
          assert.deepEqual(fileUploader.option('value'), files, 'file of allowed type is chosen');
          files = [fakeFile];
          triggerDrop(files);
          assert.deepEqual(fileUploader.option('value'), files, 'file of another allowed type is chosen');
          files = [fakeFile1];
          triggerDrop(files);
          assert.equal($fileUploader.dxFileUploader('option', 'value').length, 1, 'files count is correct');
          assert.equal($fileUploader.dxFileUploader('option', 'value[0]').name, fakeFile1.name, 'added file is correct');
          var $filesContainer = $fileUploader.find(("." + FILEUPLOADER_FILES_CONTAINER_CLASS));
          var $invalidFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS + "." + FILEUPLOADER_INVALID_CLASS));
          var $validFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS)).not(("." + FILEUPLOADER_INVALID_CLASS));
          assert.equal($invalidFiles.length, 1, 'One file is invalid');
          assert.equal($validFiles.length, 0, 'No valid files');
          var invalidFileName = $invalidFiles.find('.' + FILEUPLOADER_FILE_NAME_CLASS).text();
          var $fileStatus = $invalidFiles.find(("." + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS));
          assert.equal(invalidFileName, fakeFile1.name, fakeFile1.name + ' is invalid file');
          assert.strictEqual($fileStatus.text(), 'File type is not allowed', 'file status message is correct');
        });
        QUnit.test('error should not be thrown for the \'*\' accept (T386887)', function(assert) {
          assert.expect(0);
          var $fileUploader = $('#fileuploader').dxFileUploader({
            useDragOver: true,
            accept: '*'
          });
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          $inputWrapper.trigger($.Event($.Event('drop', {dataTransfer: {files: [fakeFile]}})));
        });
        QUnit.test('file should be added for the \'.jpg\' accept (T386887)', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            useDragOver: true,
            uploadMode: 'instantly',
            accept: '.txt',
            multiple: true
          });
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var firstFile = $.extend({}, fakeFile, {
            name: 'firstFile.txt',
            type: 'text/plain'
          });
          var secondFile = $.extend({}, fakeFile, {
            name: 'secondFile',
            type: 'text/plain'
          });
          $inputWrapper.trigger($.Event($.Event('drop', {dataTransfer: {files: [firstFile, secondFile]}})));
          assert.equal($fileUploader.dxFileUploader('option', 'value').length, 2, 'files count is correct');
          assert.equal($fileUploader.dxFileUploader('option', 'value[0]').name, firstFile.name, 'added file is correct');
          assert.equal($fileUploader.dxFileUploader('option', 'value[1]').name, secondFile.name, 'added file is correct');
          var $filesContainer = $fileUploader.find(("." + FILEUPLOADER_FILES_CONTAINER_CLASS));
          var $invalidFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS + "." + FILEUPLOADER_INVALID_CLASS));
          var $validFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS)).not(("." + FILEUPLOADER_INVALID_CLASS));
          assert.equal($invalidFiles.length, 1, 'One file is invalid');
          assert.equal($validFiles.length, 1, 'One file is valid');
          var validFileName = $validFiles.find('.' + FILEUPLOADER_FILE_NAME_CLASS).text();
          var $validFileStatus = $validFiles.find(("." + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS));
          assert.equal(validFileName, firstFile.name, firstFile.name + ' is valid file');
          assert.strictEqual($validFileStatus.text(), 'Ready to upload', 'file status message is correct');
          var invalidFileName = $invalidFiles.find('.' + FILEUPLOADER_FILE_NAME_CLASS).text();
          var $invalidFileStatus = $invalidFiles.find(("." + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS));
          assert.equal(invalidFileName, secondFile.name, secondFile.name + ' is invalid file');
          assert.strictEqual($invalidFileStatus.text(), 'File type is not allowed', 'file status message is correct');
        });
        QUnit.test('dropZoneEnter and dropZoneLeave events should fire once on correspondent interactions in a custom drop zone', function(assert) {
          var customDropZone = $('<div>').addClass('drop').css({
            width: '5px',
            height: '5px',
            position: 'relative'
          }).appendTo('#qunit-fixture');
          var dropZoneChild = $('<div>').css({
            width: '2px',
            height: '2px',
            position: 'absolute',
            top: '2px',
            left: '2px'
          }).appendTo(customDropZone);
          var onDropZoneEnterSpy = sinon.spy();
          var onDropZoneLeaveSpy = sinon.spy();
          $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            dropZone: $('.drop'),
            onDropZoneEnter: onDropZoneEnterSpy,
            onDropZoneLeave: onDropZoneLeaveSpy
          });
          triggerDragEvent(customDropZone, 'dragenter');
          assert.ok(onDropZoneEnterSpy.calledOnce, 'dropZoneEnter called once');
          assert.strictEqual(onDropZoneEnterSpy.args[0][0].dropZoneElement, customDropZone[0], 'dropZone argument is correct');
          triggerDragEvent(dropZoneChild, 'dragenter');
          assert.ok(onDropZoneEnterSpy.calledOnce, 'dropZoneEnter not called');
          assert.strictEqual(onDropZoneEnterSpy.args[1], undefined, 'dropZoneEnter not called');
          triggerDragEvent(dropZoneChild, 'dragleave');
          assert.ok(onDropZoneLeaveSpy.notCalled, 'dropZoneLeave not called');
          assert.strictEqual(onDropZoneLeaveSpy.args[0], undefined, 'dropZoneLeave not called');
          triggerDragEvent(customDropZone, 'dragleave');
          assert.ok(onDropZoneLeaveSpy.calledOnce, 'dropZoneLeave called once');
          assert.strictEqual(onDropZoneLeaveSpy.args[0][0].dropZoneElement, customDropZone[0], 'dropZone argument is correct');
          customDropZone.remove();
        });
        QUnit.test('dropZoneEnter and dropZoneLeave events should fire if there are several custom drop zones on the page', function(assert) {
          var customDropZone1 = $('<div>').addClass('drop').css({
            width: '5px',
            height: '5px',
            position: 'relative',
            margin: '5px'
          }).appendTo('#qunit-fixture');
          var customDropZone2 = $('<div>').addClass('drop').css({
            width: '5px',
            height: '5px',
            position: 'relative',
            margin: '5px'
          }).appendTo('#qunit-fixture');
          var onDropZoneEnterSpy = sinon.spy();
          var onDropZoneLeaveSpy = sinon.spy();
          $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            dropZone: $('.drop'),
            onDropZoneEnter: onDropZoneEnterSpy,
            onDropZoneLeave: onDropZoneLeaveSpy
          });
          triggerDragEvent(customDropZone1, 'dragenter');
          assert.ok(onDropZoneEnterSpy.calledOnce, 'dropZoneEnter called on first dropZone');
          assert.strictEqual(onDropZoneEnterSpy.args[0][0].dropZoneElement, customDropZone1[0], 'dropZone argument is correct');
          triggerDragEvent(customDropZone1, 'dragleave');
          assert.ok(onDropZoneLeaveSpy.calledOnce, 'dropZoneLeave called on first dropZone');
          assert.strictEqual(onDropZoneLeaveSpy.args[0][0].dropZoneElement, customDropZone1[0], 'dropZone argument is correct');
          onDropZoneEnterSpy.reset();
          onDropZoneLeaveSpy.reset();
          triggerDragEvent(customDropZone2, 'dragenter');
          assert.ok(onDropZoneEnterSpy.calledOnce, 'dropZoneEnter called on second dropZone');
          assert.strictEqual(onDropZoneEnterSpy.args[0][0].dropZoneElement, customDropZone2[0], 'dropZone argument is correct');
          triggerDragEvent(customDropZone2, 'dragleave');
          assert.ok(onDropZoneLeaveSpy.calledOnce, 'dropZoneLeave called on second dropZone');
          assert.strictEqual(onDropZoneLeaveSpy.args[0][0].dropZoneElement, customDropZone2[0], 'dropZone argument is correct');
          customDropZone1.remove();
          customDropZone2.remove();
        });
        QUnit.test('dropZoneEnter and dropZoneLeave events should fire once on correspondent interactions in the deafult drop zone', function(assert) {
          var onDropZoneEnterSpy = sinon.spy();
          var onDropZoneLeaveSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            onDropZoneEnter: onDropZoneEnterSpy,
            onDropZoneLeave: onDropZoneLeaveSpy
          });
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          triggerDragEvent($inputWrapper, 'dragenter');
          assert.ok(onDropZoneEnterSpy.calledOnce, 'dropZoneEnter called once');
          assert.strictEqual(onDropZoneEnterSpy.args[0][0].dropZoneElement, $inputWrapper[0], 'dropZone argument is correct');
          triggerDragEvent($inputWrapper, 'dragenter');
          assert.ok(onDropZoneEnterSpy.calledOnce, 'dropZoneEnter not called');
          assert.strictEqual(onDropZoneEnterSpy.args[1], undefined, 'dropZoneEnter not called');
          triggerDragEvent($inputWrapper, 'dragleave');
          assert.ok(onDropZoneLeaveSpy.calledOnce, 'dropZoneLeave called once');
          assert.strictEqual(onDropZoneLeaveSpy.args[0][0].dropZoneElement, $inputWrapper[0], 'dropZone argument is correct');
        });
        QUnit.test('Custom label text must be shown anyway, enven if upload mode is useForm and native drop is not supported (T936087)', function(assert) {
          var customLabelText = 'custom label text';
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useForm',
            nativeDropSupported: false,
            labelText: customLabelText
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          var $inputContainer = $fileUploader.find('.' + FILEUPLOADER_INPUT_CONTAINER_CLASS);
          var $inputLabel = $inputContainer.find('.' + FILEUPLOADER_INPUT_LABEL_CLASS);
          assert.ok($inputContainer.is(':visible'), 'input container is visible');
          assert.strictEqual($inputLabel.text(), customLabelText, 'label has custom text');
          assert.strictEqual(fileUploader.option('labelText'), customLabelText, 'labelText option has custom text');
        });
        QUnit.test('Default label text must be shown if upload mode is useForm and native drop is supported (T936087)', function(assert) {
          var defaultLabelText = 'or Drop a file here';
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useForm',
            nativeDropSupported: true
          });
          var fileUploader = $fileUploader.dxFileUploader('instance');
          var $inputContainer = $fileUploader.find('.' + FILEUPLOADER_INPUT_CONTAINER_CLASS);
          var $inputLabel = $inputContainer.find('.' + FILEUPLOADER_INPUT_LABEL_CLASS);
          assert.ok($inputContainer.is(':visible'), 'input container is visible');
          assert.strictEqual($inputLabel.text(), defaultLabelText, 'label has default text');
          assert.strictEqual(fileUploader.option('labelText'), defaultLabelText, 'labelText option has default text');
        });
        QUnit.test('invalid files should be added with error on dnd - instantly mode (T1061979)', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            useDragOver: true,
            uploadMode: 'instantly',
            accept: 'image/jpeg',
            allowedFileExtensions: ['.jpeg']
          });
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var firstFile = $.extend({}, fakeFile, {
            name: 'firstFile.txt',
            type: 'text/plain'
          });
          $inputWrapper.trigger($.Event($.Event('drop', {dataTransfer: {files: [firstFile]}})));
          assert.equal($fileUploader.dxFileUploader('option', 'value').length, 1, 'files count is correct');
          assert.equal($fileUploader.dxFileUploader('option', 'value[0]').name, firstFile.name, 'added file is correct');
          var $filesContainer = $fileUploader.find(("." + FILEUPLOADER_FILES_CONTAINER_CLASS));
          var $invalidFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS + "." + FILEUPLOADER_INVALID_CLASS));
          var $validFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS)).not(("." + FILEUPLOADER_INVALID_CLASS));
          assert.equal($invalidFiles.length, 1, 'One file is invalid');
          assert.equal($validFiles.length, 0, 'No valid files');
          var invalidFileName = $invalidFiles.find('.' + FILEUPLOADER_FILE_NAME_CLASS).text();
          var $fileStatus = $invalidFiles.find(("." + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS));
          assert.equal(invalidFileName, firstFile.name, firstFile.name + ' is invalid file');
          assert.strictEqual($fileStatus.text(), 'File type is not allowed', 'file status message is correct');
          var request = this.xhrMock.getInstanceAt();
          assert.notOk(!!request, 'xhr is not created');
        });
        QUnit.test('invalid files should be added with error on dnd - useButtons mode (T1061979)', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            useDragOver: true,
            uploadMode: 'useButtons',
            accept: 'image/jpeg',
            allowedFileExtensions: ['.jpeg']
          });
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var firstFile = $.extend({}, fakeFile, {
            name: 'firstFile.txt',
            type: 'text/plain'
          });
          $inputWrapper.trigger($.Event($.Event('drop', {dataTransfer: {files: [firstFile]}})));
          assert.equal($fileUploader.dxFileUploader('option', 'value').length, 1, 'files count is correct');
          assert.equal($fileUploader.dxFileUploader('option', 'value[0]').name, firstFile.name, 'added file is correct');
          var $filesContainer = $fileUploader.find(("." + FILEUPLOADER_FILES_CONTAINER_CLASS));
          var $invalidFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS + "." + FILEUPLOADER_INVALID_CLASS));
          var $validFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS)).not(("." + FILEUPLOADER_INVALID_CLASS));
          assert.equal($invalidFiles.length, 1, 'One file is invalid');
          assert.equal($validFiles.length, 0, 'No valid files');
          var invalidFileName = $invalidFiles.find('.' + FILEUPLOADER_FILE_NAME_CLASS).text();
          var $fileStatus = $invalidFiles.find(("." + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS));
          assert.equal(invalidFileName, firstFile.name, firstFile.name + ' is invalid file');
          assert.strictEqual($fileStatus.text(), 'File type is not allowed', 'file status message is correct');
        });
        QUnit.test('file can be marked as invalid based on accept option only (T1061979)', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            useDragOver: true,
            uploadMode: 'useButtons',
            accept: 'image/jpeg',
            multiple: true
          });
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var firstFile = $.extend({}, fakeFile, {
            name: 'firstFile.txt',
            type: 'text/plain'
          });
          var secondFile = $.extend({}, fakeFile1, {
            name: 'secondFile.jpeg',
            type: 'image/jpeg'
          });
          $inputWrapper.trigger($.Event($.Event('drop', {dataTransfer: {files: [firstFile, secondFile]}})));
          assert.equal($fileUploader.dxFileUploader('option', 'value').length, 2, 'files count is correct');
          assert.equal($fileUploader.dxFileUploader('option', 'value[0]').name, firstFile.name, 'added file is correct');
          assert.equal($fileUploader.dxFileUploader('option', 'value[1]').name, secondFile.name, 'added file is correct');
          var $filesContainer = $fileUploader.find(("." + FILEUPLOADER_FILES_CONTAINER_CLASS));
          var $invalidFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS + "." + FILEUPLOADER_INVALID_CLASS));
          var $validFiles = $filesContainer.find(("." + FILEUPLOADER_FILE_CONTAINER_CLASS)).not(("." + FILEUPLOADER_INVALID_CLASS));
          assert.equal($invalidFiles.length, 1, 'One file is invalid');
          assert.equal($validFiles.length, 1, 'One file is valid');
          var validFileName = $validFiles.find('.' + FILEUPLOADER_FILE_NAME_CLASS).text();
          var $validFileStatus = $validFiles.find(("." + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS));
          assert.equal(validFileName, secondFile.name, secondFile.name + ' is valid file');
          assert.strictEqual($validFileStatus.text(), 'Ready to upload', 'file status message is correct');
          var invalidFileName = $invalidFiles.find('.' + FILEUPLOADER_FILE_NAME_CLASS).text();
          var $invalidFileStatus = $invalidFiles.find(("." + FILEUPLOADER_FILE_STATUS_MESSAGE_CLASS));
          assert.equal(invalidFileName, firstFile.name, firstFile.name + ' is invalid file');
          assert.strictEqual($invalidFileStatus.text(), 'File type is not allowed', 'file status message is correct');
        });
      });
      QUnit.module('files selection', moduleConfig, function() {
        QUnit.test('T328503 - input is in input container if you should not use native input click', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            nativeDropSupported: true,
            useNativeInputClick: false
          });
          var $input = $fileUploader.find('.' + FILEUPLOADER_INPUT_CONTAINER_CLASS + ' .' + FILEUPLOADER_INPUT_CLASS);
          assert.equal($input.length, 1, 'input is in input container');
        });
        QUnit.test('T328503 - input is in select button if you should use native input click', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useForm',
            nativeDropSupported: true,
            useNativeInputClick: false
          });
          var $input = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS + '.' + FILEUPLOADER_BUTTON_CLASS + ' .' + FILEUPLOADER_INPUT_CLASS);
          assert.equal($input.length, 0, 'input is in select button');
        });
        QUnit.test('T323019 - click on the \'Drop\' field should not lead to file choosing', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            useNativeInputClick: false
          });
          var $input = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          var event;
          $input.on('click', function(e) {
            event = e;
          });
          $input.trigger('click');
          assert.ok(event.isDefaultPrevented(), 'input click is prevented');
        });
        QUnit.test('T346021 - upload is not started after file drop if the \'uploadMode\' is \'instantly\'', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'instantly',
            useDragOver: true,
            useNativeInputClick: false
          });
          var event = $.Event('drop', {originalEvent: $.Event('drop', {dataTransfer: {files: [fakeFile]}})});
          $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS).trigger(event);
          var request = this.xhrMock.getInstanceAt();
          assert.ok(!!request, 'xhr is created');
          assert.ok(request && request.uploadStarted, 'upload is started');
        });
        QUnit.test('file list should not be extended if the \'multiple\' option is false', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({multiple: false});
          simulateFileChoose($fileUploader, fakeFile);
          simulateFileChoose($fileUploader, fakeFile1);
          assert.equal($fileUploader.find('.' + FILEUPLOADER_FILE_CLASS).length, 1, 'only one file is in list');
        });
        QUnit.test('the file list should not remove duplicates (T969288)', function(assert) {
          var $__2 = this;
          var uploadedSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            uploadMode: 'useButtons',
            multiple: true,
            chunkSize: 200000,
            uploadChunk: function() {
              return executeAfterDelay(null, $__2.xhrMock.LOAD_TIMEOUT);
            },
            onUploaded: uploadedSpy
          });
          var instance = $fileUploader.dxFileUploader('instance');
          var files = [createBlobFile('fake1.png', 100023), createBlobFile('fake2.png', 5000)];
          simulateFileChoose($fileUploader, files);
          instance.upload();
          assert.strictEqual($fileUploader.find('.' + FILEUPLOADER_FILE_CLASS).length, 2, 'two files are in the list');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT * 2);
          assert.ok(uploadedSpy.calledTwice, 'two files are loaded');
          uploadedSpy.reset();
          simulateFileChoose($fileUploader, files);
          instance.upload();
          assert.strictEqual($fileUploader.find('.' + FILEUPLOADER_FILE_CLASS).length, 4, 'four files are in the list');
          this.clock.tick(this.xhrMock.LOAD_TIMEOUT * 2);
          assert.ok(uploadedSpy.calledTwice, 'two files are loaded again');
        });
      });
      QUnit.module('disabled option', function() {
        QUnit.test('file input should be hidden when widget is disabled', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            disabled: false,
            useNativeInputClick: false,
            useDragOver: true,
            uploadMode: 'useButtons'
          });
          var $fileInput = $fileUploader.find('.' + FILEUPLOADER_INPUT_CLASS);
          assert.equal($fileInput.css('display'), 'inline-block', 'input is visible');
          $fileUploader.dxFileUploader('option', 'disabled', true);
          assert.equal($fileInput.css('display'), 'none', 'input is hidden');
        });
        QUnit.test('label text must be visible when disabled option changed dynamically', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            disabled: true,
            useDragOver: true,
            nativeDropSupported: true,
            uploadMode: 'useForm'
          });
          var $inputContainer = $fileUploader.find('.' + FILEUPLOADER_INPUT_CONTAINER_CLASS);
          var $inputLabel = $inputContainer.find('.' + FILEUPLOADER_INPUT_LABEL_CLASS);
          assert.ok($inputContainer.is(':visible'), 'input container is visible');
          assert.strictEqual($inputLabel.text(), '', 'label has no text');
          $fileUploader.dxFileUploader('option', 'disabled', false);
          assert.ok($inputContainer.is(':visible'), 'input container is visible');
          assert.strictEqual($inputLabel.text(), 'or Drop a file here', 'label has default text');
        });
      });
      QUnit.module('readOnly option', moduleConfig, function() {
        QUnit.test('file input container should be shown but text empty', function(assert) {
          var defaultLabelText = 'or Drop a file here';
          var $fileUploader = $('#fileuploader').dxFileUploader({
            readOnly: false,
            useDragOver: true,
            uploadMode: 'useButtons'
          });
          var $inputContainer = $fileUploader.find('.' + FILEUPLOADER_INPUT_CONTAINER_CLASS);
          var $inputLabel = $inputContainer.find('.' + FILEUPLOADER_INPUT_LABEL_CLASS);
          assert.ok($inputContainer.is(':visible'), 'input container is visible');
          assert.strictEqual($inputLabel.text(), defaultLabelText, 'label has default text');
          $fileUploader.dxFileUploader('option', 'readOnly', true);
          assert.ok($inputContainer.is(':visible'), 'input container is visible');
          assert.strictEqual($inputLabel.text(), '', 'label has empty line text');
          $fileUploader.dxFileUploader('option', 'readOnly', false);
          assert.ok($inputContainer.is(':visible'), 'input container is visible');
          assert.strictEqual($inputLabel.text(), defaultLabelText, 'label has default text');
        });
        QUnit.test('select button should be disabled', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            readOnly: true,
            uploadMode: 'useButtons'
          });
          var $selectButton = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS).children('.' + FILEUPLOADER_BUTTON_CLASS);
          assert.ok($selectButton.hasClass('dx-state-disabled'), 'button is disabled');
        });
        QUnit.test('file cancel buttons should be disabled', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            readOnly: true,
            uploadMode: 'useButtons'
          });
          simulateFileChoose($fileUploader, [fakeFile, fakeFile1]);
          var $cancelButtons = $fileUploader.find('.' + FILEUPLOADER_CANCEL_BUTTON_CLASS);
          assert.strictEqual($cancelButtons.length, 2, 'there are 2 cancel buttons');
          assert.ok($cancelButtons.eq(0).hasClass('dx-state-disabled'), '1st button is disabled');
          assert.ok($cancelButtons.eq(1).hasClass('dx-state-disabled'), '2nd button is disabled');
        });
        QUnit.test('dialogTrigger should be unable to call _selectButtonClickHandler', function(assert) {
          var instance = $('#fileuploader').dxFileUploader({
            readOnly: true,
            uploadMode: 'useButtons'
          }).dxFileUploader('instance');
          sinon.stub(instance, '_selectButtonClickHandler', function() {
            return instance._selectFileDialogHandler();
          });
          instance._selectButtonClickHandler();
          assert.strictEqual(instance._selectButtonClickHandler.returnValues[0], false, 'selectFile method not called');
          instance._selectButtonClickHandler.restore();
        });
        QUnit.test('uploading events can be fired (successful upload)', function(assert) {
          var onProgressSpy = sinon.spy();
          var onUploadAbortedSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var onUploadErrorSpy = sinon.spy();
          var onUploadStartedSpy = sinon.spy();
          var onValueChangedSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            readOnly: true,
            multiple: true,
            uploadMode: 'instantly',
            chunkSize: 200,
            onProgress: onProgressSpy,
            onUploadAborted: onUploadAbortedSpy,
            onUploaded: onUploadedSpy,
            onUploadError: onUploadErrorSpy,
            onUploadStarted: onUploadStartedSpy,
            onValueChanged: onValueChangedSpy
          });
          var file1 = createBlobFile('image1.png', 150);
          simulateFileChoose($fileUploader, [file1]);
          this.clock.tick(1500);
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event called for 1st chunk');
          assert.strictEqual(onUploadAbortedSpy.callCount, 0, 'upload aborted event not raised');
          assert.strictEqual(onUploadedSpy.callCount, 1, 'uploaded event raised');
          assert.strictEqual(onUploadErrorSpy.callCount, 0, 'upload error event not raised');
          assert.strictEqual(onUploadStartedSpy.callCount, 1, 'upload started event raised');
          assert.strictEqual(onValueChangedSpy.callCount, 1, 'value changed event raised');
        });
        QUnit.test('uploading events can be fired (feature - onUploadAborted)', function(assert) {
          var uploadChunkSpy = sinon.spy(function() {
            return executeAfterDelay();
          });
          var abortUploadSpy = sinon.spy(function() {
            return executeAfterDelay();
          });
          var onProgressSpy = sinon.spy();
          var onUploadAbortedSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var onUploadErrorSpy = sinon.spy();
          var onUploadStartedSpy = sinon.spy();
          var onValueChangedSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            readOnly: true,
            multiple: true,
            uploadMode: 'instantly',
            chunkSize: 200,
            abortUpload: abortUploadSpy,
            uploadChunk: uploadChunkSpy,
            onProgress: onProgressSpy,
            onUploadAborted: onUploadAbortedSpy,
            onUploaded: onUploadedSpy,
            onUploadError: onUploadErrorSpy,
            onUploadStarted: onUploadStartedSpy,
            onValueChanged: onValueChangedSpy
          });
          var file = createBlobFile('image1.png', 250);
          simulateFileChoose($fileUploader, [file]);
          this.clock.tick(1500);
          assert.strictEqual(onProgressSpy.callCount, 1, 'progress event called for 1st chunk');
          assert.strictEqual(onUploadAbortedSpy.callCount, 0, 'upload aborted event is not raised');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised');
          assert.strictEqual(onUploadErrorSpy.callCount, 0, 'upload error event is not raised');
          assert.strictEqual(onUploadStartedSpy.callCount, 1, 'upload started event raised');
          assert.strictEqual(onValueChangedSpy.callCount, 1, 'value changed event raised');
          $fileUploader.find(("." + FILEUPLOADER_CANCEL_BUTTON_CLASS)).eq(0).trigger('dxclick');
          this.clock.tick(1500);
          assert.strictEqual(onProgressSpy.callCount, 2, 'progress event is called for 2nd chunk');
          assert.strictEqual(onUploadAbortedSpy.callCount, 0, 'upload aborted event not raised');
          assert.strictEqual(onUploadedSpy.callCount, 1, 'uploaded event raised');
          assert.strictEqual(onUploadErrorSpy.callCount, 0, 'upload error event is not raised');
          assert.strictEqual(onUploadStartedSpy.callCount, 1, 'upload started event raised');
          assert.strictEqual(onValueChangedSpy.callCount, 1, 'value changed event not raised');
        });
        QUnit.test('uploading events can be fired (feature - onUploadError)', function(assert) {
          var uploadFileSpy = sinon.spy(function() {
            return executeAfterDelay(function() {
              throw 'Some error.';
            });
          });
          var onProgressSpy = sinon.spy();
          var onUploadAbortedSpy = sinon.spy();
          var onUploadedSpy = sinon.spy();
          var onUploadErrorSpy = sinon.spy();
          var onUploadStartedSpy = sinon.spy();
          var onValueChangedSpy = sinon.spy();
          var $fileUploader = $('#fileuploader').dxFileUploader({
            readOnly: true,
            multiple: true,
            uploadMode: 'instantly',
            uploadFile: uploadFileSpy,
            onProgress: onProgressSpy,
            onUploadAborted: onUploadAbortedSpy,
            onUploaded: onUploadedSpy,
            onUploadError: onUploadErrorSpy,
            onUploadStarted: onUploadStartedSpy,
            onValueChanged: onValueChangedSpy
          });
          var file1 = createBlobFile('image1.png', 150);
          simulateFileChoose($fileUploader, [file1]);
          this.clock.tick(1500);
          assert.strictEqual(onProgressSpy.callCount, 0, 'progress event not called');
          assert.strictEqual(onUploadAbortedSpy.callCount, 0, 'upload aborted event not raised');
          assert.strictEqual(onUploadedSpy.callCount, 0, 'uploaded event is not raised after error');
          assert.strictEqual(onUploadErrorSpy.callCount, 1, 'upload error event raised');
          assert.strictEqual(onUploadStartedSpy.callCount, 1, 'upload started event raised');
          assert.strictEqual(onValueChangedSpy.callCount, 1, 'value changed event raised');
        });
        QUnit.test('it is impossible to drop files', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            readOnly: true,
            useDragOver: true
          });
          var $inputWrapper = $fileUploader.find('.' + FILEUPLOADER_INPUT_WRAPPER_CLASS);
          var files = [fakeFile];
          var event = $.Event($.Event('drop', {dataTransfer: {files: files}}));
          $inputWrapper.trigger(event);
          assert.deepEqual($fileUploader.dxFileUploader('option', 'value'), [], 'dragged files count is correct');
        });
        QUnit.test('drag event should not be handled', function(assert) {
          var $fileUploader = $('#fileuploader').dxFileUploader({
            readOnly: true,
            useDragOver: true,
            uploadMode: 'instantly'
          });
          $fileUploader.find('.dx-fileuploader-input-wrapper').trigger('dragenter');
          assert.notOk($fileUploader.hasClass('dx-fileuploader-dragover'), 'drag event was not handled for input wrapper element');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/file_uploader","core/devices","core/utils/deferred","../../helpers/keyboardMock.js","../../helpers/fileHelper.js","../../helpers/fileManagerHelpers.js","../../helpers/xmlHttpRequestMock.js","generic_light.css!"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/file_uploader"), require("core/devices"), require("core/utils/deferred"), require("../../helpers/keyboardMock.js"), require("../../helpers/fileHelper.js"), require("../../helpers/fileManagerHelpers.js"), require("../../helpers/xmlHttpRequestMock.js"), require("generic_light.css!"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=fileUploader.tests.js.map