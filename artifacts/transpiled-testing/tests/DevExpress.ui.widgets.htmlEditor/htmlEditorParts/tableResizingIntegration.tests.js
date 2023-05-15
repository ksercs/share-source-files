!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/tableResizingIntegration.tests.js"], ["jquery","ui/html_editor","core/utils/position","core/utils/iterator","../../../helpers/pointerMock.js","core/utils/resize_callbacks","core/utils/window.js"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/tableResizingIntegration.tests.js", ["jquery", "ui/html_editor", "core/utils/position", "core/utils/iterator", "../../../helpers/pointerMock.js", "core/utils/resize_callbacks", "core/utils/window.js"], function($__export) {
  "use strict";
  var $,
      getBoundingRect,
      each,
      PointerMock,
      resizeCallbacks,
      getWindow,
      test,
      module,
      DX_COLUMN_RESIZE_FRAME_CLASS,
      DX_COLUMN_RESIZER_CLASS,
      DX_ROW_RESIZER_CLASS,
      DX_DRAGGABLE_CLASS,
      DX_HIGHLIGHTED_ROW_CLASS,
      DX_HIGHLIGHTED_COLUMN_CLASS,
      TIME_TO_WAIT,
      DRAGGABLE_ELEMENT_OFFSET,
      TABLE_BORDERS,
      tableMarkup,
      tableMarkupWithHeaderRow,
      tableMarkupWidth,
      tableMarkupAutoWidth,
      tableMarkupHeight;
  function getColumnBordersOffset($table) {
    var columnBorderOffsets = [];
    $table.find('tr').eq(0).find('th, td').each(function(i, column) {
      var columnWidth = $(column).outerWidth();
      columnBorderOffsets.push(i === 0 ? columnWidth : columnBorderOffsets[i - 1] + columnWidth);
    });
    return columnBorderOffsets;
  }
  function getRowBordersOffset($table) {
    var rowBorderOffsets = [];
    $table.find('th:first-child, td:first-child').each(function(i, row) {
      var rowHeight = $(row).outerHeight();
      rowBorderOffsets.push(i === 0 ? rowHeight : rowBorderOffsets[i - 1] + rowHeight);
    });
    return rowBorderOffsets;
  }
  function checkResizerPositions(assert, $lineResizerElements, lineBorderOffsets) {
    var cssProperty = arguments[3] !== (void 0) ? arguments[3] : 'left';
    $lineResizerElements.each(function(i, item) {
      var resizerLeftPosition = parseInt($(item).css(cssProperty));
      assert.roughEqual(resizerLeftPosition, lineBorderOffsets[i] - DRAGGABLE_ELEMENT_OFFSET, 1.01, 'Resizer has the same offset as the column border, index = ' + i);
    });
  }
  function dragLoop(pointerMockInstance, stepCount, offsets) {
    for (var i = 0; i < stepCount; i++) {
      pointerMockInstance.drag(offsets[0], offsets[1]);
    }
  }
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      getBoundingRect = $__m.getBoundingRect;
    }, function($__m) {
      each = $__m.each;
    }, function($__m) {
      PointerMock = $__m.default;
    }, function($__m) {
      resizeCallbacks = $__m.default;
    }, function($__m) {
      getWindow = $__m.getWindow;
    }],
    execute: function() {
      var $__5;
      (($__5 = QUnit, test = $__5.test, module = $__5.module, $__5));
      DX_COLUMN_RESIZE_FRAME_CLASS = 'dx-table-resize-frame';
      DX_COLUMN_RESIZER_CLASS = 'dx-htmleditor-column-resizer';
      DX_ROW_RESIZER_CLASS = 'dx-htmleditor-row-resizer';
      DX_DRAGGABLE_CLASS = 'dx-draggable';
      DX_HIGHLIGHTED_ROW_CLASS = 'dx-htmleditor-highlighted-row';
      DX_HIGHLIGHTED_COLUMN_CLASS = 'dx-htmleditor-highlighted-column';
      TIME_TO_WAIT = 200;
      DRAGGABLE_ELEMENT_OFFSET = 2;
      TABLE_BORDERS = 1;
      tableMarkup = '\
    <table>\
        <tr>\
            <td>0_0 content</td>\
            <td>0_1</td>\
            <td>0_2</td>\
            <td style="text-align: right;">0_3</td>\
        </tr>\
        <tr>\
            <td>1_0</td>\
            <td>1_1</td>\
            <td>1_2</td>\
            <td style="text-align: right;">1_3</td>\
        </tr>\
        <tr>\
            <td>2_0</td>\
            <td>2_1</td>\
            <td>2_2</td>\
            <td style="text-align: right;">2_3</td>\
        </tr>\
    </table>\
    <br><br>';
      tableMarkupWithHeaderRow = '\
    <table>\
        <thead>\
            <tr>\
                <th>0</th>\
                <th>1</th>\
                <th>2</th>\
                <th>3</th>\
            </tr>\
        </thead>\
        <tbody>\
            <tr>\
                <td>0_0 content</td>\
                <td>0_1</td>\
                <td>0_2</td>\
                <td style="text-align: right;">0_3</td>\
            </tr>\
            <tr>\
                <td>1_0</td>\
                <td>1_1</td>\
                <td>1_2</td>\
                <td style="text-align: right;">1_3</td>\
            </tr>\
            <tr>\
                <td>2_0</td>\
                <td>2_1</td>\
                <td>2_2</td>\
                <td style="text-align: right;">2_3</td>\
            </tr>\
        </tbody>\
    </table>\
    <br><br>';
      tableMarkupWidth = '\
    <table>\
        <tr>\
            <td width="50px">0_0</td>\
            <td width="100px">0_1</td>\
            <td width="50px">0_2</td>\
            <td width="50px">0_3</td>\
        </tr>\
    </table>\
    <br><br>';
      tableMarkupAutoWidth = '\
    <table>\
        <tr>\
            <td width="50px">0_0</td>\
            <td>0_1</td>\
            <td>0_2</td>\
            <td width="50px">0_3</td>\
        </tr>\
    </table>\
    <br><br>';
      tableMarkupHeight = '\
    <table>\
        <tr>\
            <td>0_0</td>\
            <td>0_1</td>\
        </tr>\
        <tr>\
            <td height="50px">1_0</td>\
            <td height="50px">1_1</td>\
        </tr>\
    </table>\
    <br>';
      module('Table resizing integration', {
        beforeEach: function() {
          var $__4 = this;
          this.clock = sinon.useFakeTimers();
          this.$element = $('#htmlEditor');
          this.options = {
            tableResizing: {enabled: true},
            value: tableMarkup
          };
          this.createWidget = function(options) {
            var newOptions = $.extend({}, $__4.options, options);
            $__4.instance = $__4.$element.dxHtmlEditor(newOptions).dxHtmlEditor('instance');
            $__4.quillInstance = $__4.instance.getQuillInstance();
          };
        },
        afterEach: function() {
          this.instance.dispose();
          this.clock.restore();
        }
      }, function() {
        module('resizing frames initialization', {}, function() {
          test('Frame is created for table by default if the tableResizing option is enabled', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $rowResizerElements = this.$element.find(("." + DX_ROW_RESIZER_CLASS));
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            assert.strictEqual($resizeFrame.length, 1, 'Frame is created for table');
            assert.strictEqual($columnResizerElements.length, 4, 'Column resizers are created for every column separator');
            assert.strictEqual($rowResizerElements.length, 3, 'Row resizers are created for every row separator');
            assert.strictEqual($draggableElements.length, 0, 'Column resizers draggable elements are not created before the pointerDown event');
          });
          test('Frame is not created if tableResizing option is disabled on init', function(assert) {
            this.createWidget({tableResizing: {enabled: false}});
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            assert.strictEqual($resizeFrame.length, 0, 'Frame is created for table');
          });
          test('Frame is created for table if the tableResizing option sets at runtime', function(assert) {
            this.createWidget({tableResizing: {enabled: false}});
            this.clock.tick(TIME_TO_WAIT);
            this.instance.option('tableResizing', {enabled: true});
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $rowResizerElements = this.$element.find(("." + DX_ROW_RESIZER_CLASS));
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            assert.strictEqual($resizeFrame.length, 1, 'Frame is created for table');
            assert.strictEqual($columnResizerElements.length, 4, 'Column resizers are created for every column separator');
            assert.strictEqual($rowResizerElements.length, 3, 'Row resizers are created for every row separator');
            assert.strictEqual($draggableElements.length, 0, 'Column resizers draggable elements are not created before the pointerDown event');
          });
          test('Frame is removed if tableResizing option is disabled at runtime', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            this.instance.option('tableResizing', {enabled: false});
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            assert.strictEqual($resizeFrame.length, 0, 'Frame is not created for table');
          });
          test('Table resuizing should support value change to null at runtime', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            try {
              this.instance.option('tableResizing', null);
              this.clock.tick(TIME_TO_WAIT);
              var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
              assert.strictEqual($resizeFrame.length, 0, 'Frame is not created for table');
            } catch (e) {
              assert.ok(false);
            }
          });
          test('Frame is removed if tableResizing.enabled option is disabled at runtime', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            this.instance.option('tableResizing.enabled', false);
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            assert.strictEqual($resizeFrame.length, 0, 'Frame is removed');
          });
          test('Horizontal draggable element should be created on pointerDown event', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            var $highlightedElement = this.$element.find(("." + DX_HIGHLIGHTED_COLUMN_CLASS));
            assert.strictEqual($draggableElements.length, 1, 'Column resizers draggable elements are created after the pointerDown event');
            assert.strictEqual($highlightedElement.length, 1, 'Column resizers highlighted element is created after the pointerDown event');
          });
          test('Vertical draggable element should be created on pointerDown event', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var $rowResizerElements = this.$element.find(("." + DX_ROW_RESIZER_CLASS));
            $rowResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            var $highlightedElement = this.$element.find(("." + DX_HIGHLIGHTED_ROW_CLASS));
            assert.strictEqual($draggableElements.length, 1, 'Row resizers draggable elements are created after the pointerDown event');
            assert.strictEqual($highlightedElement.length, 1, 'Row resizers highlighted element is created after the pointerDown event');
          });
          test('Draggable element should be disposed after drag', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            $columnResizerElements.eq(1).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(1)).start().dragStart().drag(50, 10).dragEnd();
            $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            var $highlightedElement = this.$element.find(("." + DX_HIGHLIGHTED_COLUMN_CLASS));
            assert.strictEqual($draggableElements.length, 0);
            assert.strictEqual($highlightedElement.length, 0);
          });
          test('Frame is not created for table by default if the tableResizing option is disabled', function(assert) {
            this.createWidget({tableResizing: {enabled: false}});
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            assert.strictEqual($resizeFrame.length, 0, 'Frame is not created for table');
            assert.strictEqual($columnResizerElements.length, 0, 'Column resizers are not created');
          });
          test('Frame is not created if a table does not exists', function(assert) {
            this.createWidget({value: ''});
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            assert.strictEqual($resizeFrame.length, 0, 'Frame is not created');
          });
          test('Frame is created if we apply new value with table in runtime', function(assert) {
            this.createWidget({value: ''});
            this.clock.tick(TIME_TO_WAIT);
            this.instance.option('value', tableMarkup);
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            assert.strictEqual($resizeFrame.length, 1, 'Frame is created');
          });
          test('Table with fixed width should not change size after tableResizing is enabled', function(assert) {
            this.createWidget({
              width: 700,
              tableResizing: {enabled: false},
              value: tableMarkupAutoWidth
            });
            this.clock.tick(TIME_TO_WAIT);
            var $table = this.$element.find('table').eq(0);
            $table.css('width', 400);
            this.instance.option('tableResizing', {enabled: true});
            this.clock.tick(TIME_TO_WAIT);
            assert.roughEqual($table.outerWidth(), 400, 2, 'Table width is correct');
          });
        });
        module('frame position', {}, function() {
          test('Check table resize frame position', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var tablePosition = getBoundingRect(this.$element.find('table').get(0));
            var framePosition = getBoundingRect($resizeFrame.get(0));
            assert.strictEqual(tablePosition.left, framePosition.left, 'Left is correrct');
            assert.strictEqual(tablePosition.top, framePosition.top, 'Top is correrct');
            assert.strictEqual(tablePosition.height, framePosition.height, 'Height is correrct');
            assert.strictEqual(tablePosition.width, framePosition.width, 'Width is correrct');
          });
          test('Check table resize frame position after content height changes', function(assert) {
            this.createWidget({width: 430});
            this.clock.tick(TIME_TO_WAIT);
            this.instance.insertText(0, 'some text some text some text', {bold: true});
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var tablePosition = getBoundingRect(this.$element.find('table').get(0));
            var framePosition = getBoundingRect($resizeFrame.get(0));
            var rowBorderOffsets = getRowBordersOffset(this.$element.find('table').eq(0));
            var $rowResizerElements = $resizeFrame.find(("." + DX_ROW_RESIZER_CLASS));
            assert.strictEqual(tablePosition.left, framePosition.left, 'Left is correrct');
            assert.strictEqual(tablePosition.top, framePosition.top, 'Top is correrct');
            assert.strictEqual(tablePosition.height, framePosition.height, 'Height is correrct');
            assert.strictEqual(tablePosition.width, framePosition.width, 'Width is correrct');
            checkResizerPositions(assert, $rowResizerElements, rowBorderOffsets, 'top');
          });
          test('Check table resize frames positions for a two tables', function(assert) {
            this.createWidget({value: tableMarkup + '<br>' + tableMarkup});
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            assert.strictEqual($resizeFrame.length, 2, 'Frame is created for table');
            assert.strictEqual($columnResizerElements.length, 8, 'Coulumn resize elements are created for the both tables');
          });
          test('Resizing should works correctly after widgets content vertical scrolling', function(assert) {
            this.createWidget({
              value: ("1<br> " + tableMarkup + " 1<br>1<br>1<br>1<br>1<br>"),
              height: 80
            });
            this.clock.tick(TIME_TO_WAIT);
            var $editorContent = this.instance._getContent();
            $editorContent.get(0).scrollTop = 25;
            $($editorContent).trigger('scroll');
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var tablePosition = getBoundingRect(this.$element.find('table').get(0));
            var framePosition = getBoundingRect($resizeFrame.get(0));
            assert.strictEqual(tablePosition.top, framePosition.top, 'Frame top position is correrct');
          });
        });
        module('Column resizing', {}, function() {
          test('Check column resizers elements positions', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var columnBorderOffsets = getColumnBordersOffset($table);
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets);
          });
          test('Check column resizers elements and border positions after drag', function(assert) {
            this.createWidget({width: 430});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(50, 10).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var columnBorderOffsets = getColumnBordersOffset($table);
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets);
            assert.roughEqual(columnBorderOffsets[0], 150, 2.01);
            assert.roughEqual(columnBorderOffsets[1], 200, 2.01);
          });
          test('The widget raise valueChange event after resizing (T1041884)', function(assert) {
            var $__4 = this;
            assert.expect(4);
            var done = assert.async();
            var valueChangedSpy = sinon.spy();
            this.createWidget({
              onValueChanged: valueChangedSpy,
              width: 430
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var initialEditorValue = this.instance.option('value');
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(20, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var history = this.quillInstance.getModule('history').stack;
            this.clock.restore();
            setTimeout(function() {
              assert.strictEqual(valueChangedSpy.callCount, 1, 'value change event is raised');
              assert.ok(valueChangedSpy.getCall(0).args[0].event, 'event is saved');
              assert.notStrictEqual($__4.instance.option('value'), initialEditorValue, 'value was changed');
              assert.strictEqual(history.undo.length, 1, 'history modul detect resizing');
              done();
            }, TIME_TO_WAIT);
          });
          test('Check column resizers elements and border positions after drag if the table has a header row (T1028207)', function(assert) {
            this.createWidget({
              width: 430,
              value: tableMarkupWithHeaderRow
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(50, 10).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var columnBorderOffsets = getColumnBordersOffset($table);
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets);
            assert.roughEqual(columnBorderOffsets[0], 150, 2.01);
            assert.roughEqual(columnBorderOffsets[1], 200, 2.01);
          });
          test('Frame should change height if the table height is changed by horizontal drag', function(assert) {
            this.createWidget({
              width: 430,
              tableResizing: {
                enabled: true,
                minColumnWidth: 0
              }
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var $table = this.$element.find('table');
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            PointerMock($draggableElement).start().dragStart().drag(-70, 0);
            assert.roughEqual($resizeFrame.outerHeight(), $table.outerHeight(), 3);
            assert.roughEqual($columnResizerElements.eq(0).outerHeight(), $table.outerHeight(), 3);
            PointerMock($draggableElement).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
          });
          test('Table should not change on non-last column resizing if next column has content', function(assert) {
            this.createWidget({
              width: 630,
              value: tableMarkupWidth
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var startTableWidth = $table.outerWidth();
            $table.find('td').eq(3).text('text12');
            $columnResizerElements.eq(2).trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            var pointerMockInstance = PointerMock($draggableElement).start().dragStart();
            dragLoop(pointerMockInstance, 10, [1, 0]);
            pointerMockInstance.dragEnd();
            assert.roughEqual(startTableWidth, $table.outerWidth(), 5);
          });
          test('Table should not change on non-last column resizing if previous column has content', function(assert) {
            this.createWidget({
              width: 630,
              value: tableMarkupWidth
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var startTableWidth = $table.outerWidth();
            $table.find('td').eq(1).text('text12');
            $columnResizerElements.eq(1).trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            var pointerMockInstance = PointerMock($draggableElement).start().dragStart().drag(-50, 0);
            dragLoop(pointerMockInstance, 10, [-1, 0]);
            pointerMockInstance.dragEnd();
            assert.roughEqual(startTableWidth, $table.outerWidth(), 5);
          });
        });
        module('minColumnWidth', {}, function() {
          test('Check column border positions after drag (default min width)', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table').width(400);
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(40, 0).drag(30, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var columnBorderOffsets = getColumnBordersOffset($table);
            assert.roughEqual(columnBorderOffsets[0], 140, 3);
            assert.roughEqual(columnBorderOffsets[1], 200, 3);
          });
          test('minColumnWidth option should work for zero value', function(assert) {
            this.createWidget({
              width: 430,
              tableResizing: {
                enabled: true,
                minColumnWidth: 0
              }
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(-30, 0).drag(-25, 0).drag(-10, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            assert.roughEqual($table.find('tr').eq(0).find('td:last-child').outerWidth(), 35, 3);
          });
          test('minColumnWidth can be applied at runtime', function(assert) {
            this.createWidget({width: 435});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var checkingElement = $columnResizerElements.eq(0);
            this.instance.option('tableResizing.minColumnWidth', 50);
            var $table = this.$element.find('table');
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(-30, 0).drag(-20, 0).drag(-10, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            assert.roughEqual($table.find('tr').eq(0).find('td:last-child').outerWidth(), 50, 3);
            assert.ok(checkingElement.is(':visible'));
          });
          test('Check last column min width limitation after drag', function(assert) {
            this.createWidget({width: 430});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(-30, 0).drag(-25, 0).drag(-20, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            assert.roughEqual($table.find('tr').eq(0).find('td:last-child').outerWidth(), 45, 3);
          });
          test('Check column highlighted element position if the column with min width is dragging to the left', function(assert) {
            this.createWidget({
              value: tableMarkupWidth,
              tableResizing: {
                enabled: true,
                minColumnWidth: 50
              }
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(2).trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            PointerMock($draggableElement).start().dragStart().drag(-10, 0);
            this.clock.tick(TIME_TO_WAIT);
            var $highlightedElement = this.$element.find(("." + DX_HIGHLIGHTED_COLUMN_CLASS));
            assert.roughEqual(parseInt($highlightedElement.css('left')), 200, 3);
            PointerMock($draggableElement).dragEnd();
          });
          test('Check frame elements positions after drag out of the column width limit', function(assert) {
            this.createWidget({width: 435});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            var pointerMockInstance = PointerMock($draggableElement).start().dragStart();
            dragLoop(pointerMockInstance, 5, [-20, 0]);
            this.clock.tick(TIME_TO_WAIT);
            var columnBorderOffsets = getColumnBordersOffset($table);
            var $highlightedElement = this.$element.find(("." + DX_HIGHLIGHTED_COLUMN_CLASS));
            assert.roughEqual(columnBorderOffsets[0], 40, 3);
            assert.roughEqual(parseInt($highlightedElement.css('left')), 40, 3);
            pointerMockInstance.dragEnd();
          });
          test('Check frame elements positions after drag out of the next column width limit', function(assert) {
            this.createWidget({width: 435});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            PointerMock($draggableElement).start().dragStart().drag(20, 10).drag(20, 10).drag(20, 10).drag(20, 10).drag(20, 10);
            this.clock.tick(TIME_TO_WAIT);
            var columnBorderOffsets = getColumnBordersOffset($table);
            var $highlightedElement = this.$element.find(("." + DX_HIGHLIGHTED_COLUMN_CLASS));
            assert.roughEqual(columnBorderOffsets[0], 160, 3);
            assert.roughEqual(columnBorderOffsets[1], 200, 3);
            assert.roughEqual(parseInt($highlightedElement.css('left')), 160, 3);
            PointerMock($draggableElement).dragEnd();
          });
          test('Table has fixed width style for every column if we drag the last column', function(assert) {
            this.createWidget({width: 450});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table').width(400);
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $columns = $table.find('tr').eq(0).find('td');
            each($columns, function(_, element) {
              var styleStyle = $(element).css('width') || '';
              assert.ok(styleStyle.length >= 0);
            });
          });
          test('Table width was changed if we drag the last column', function(assert) {
            this.createWidget({width: 400});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var startTableWidth = $table.outerWidth();
            var offset = -20;
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(offset, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            assert.roughEqual($table.outerWidth(), startTableWidth + offset, 3);
          });
        });
        module('Row resizing', {}, function() {
          test('Table height was changed if we drag the row height resizer', function(assert) {
            this.createWidget({height: 300});
            this.clock.tick(TIME_TO_WAIT);
            var $rowResizerElements = this.$element.find(("." + DX_ROW_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var startTableHeight = $table.outerHeight();
            var offset = 20;
            $rowResizerElements.eq(1).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(0, offset).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            assert.roughEqual($table.outerHeight(), startTableHeight + offset, 3);
          });
          test('Height of the table with header row was changed if we drag the row height resizer (T1028207)', function(assert) {
            this.createWidget({
              height: 300,
              value: tableMarkupWithHeaderRow
            });
            this.clock.tick(TIME_TO_WAIT);
            var $rowResizerElements = this.$element.find(("." + DX_ROW_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var startTableHeight = $table.outerHeight();
            var offset = 20;
            $rowResizerElements.eq(1).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(0, offset).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var rowBorderOffsets = getRowBordersOffset(this.$element.find('table').eq(0));
            checkResizerPositions(assert, $rowResizerElements, rowBorderOffsets, 'top');
            assert.roughEqual($table.outerHeight(), startTableHeight + offset, 3);
          });
          test('Table height is changed to minRowHeight if we try to set value less the limit', function(assert) {
            this.createWidget({
              height: 300,
              tableResizing: {
                enabled: true,
                minColumnWidth: 40,
                minRowHeight: 40
              }
            });
            this.clock.tick(TIME_TO_WAIT);
            var $rowResizerElements = this.$element.find(("." + DX_ROW_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var offset = 5;
            $rowResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(0, offset).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            assert.roughEqual($table.find('tr:first-child').find('td:first-child').outerHeight(), 40, 3);
          });
          test('minRowHeight can be applied at runtime', function(assert) {
            this.createWidget({height: 300});
            this.clock.tick(TIME_TO_WAIT);
            this.instance.option('tableResizing.minRowHeight', 40);
            var $rowResizerElements = this.$element.find(("." + DX_ROW_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var offset = 5;
            $rowResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(0, offset).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            assert.roughEqual($table.find('tr:first-child').find('td:first-child').outerHeight(), 40, 3);
          });
          test('Table row height is limited by minRowHeight option', function(assert) {
            this.createWidget({
              height: 300,
              tableResizing: {
                enabled: true,
                minColumnWidth: 40,
                minRowHeight: 20
              }
            });
            this.clock.tick(TIME_TO_WAIT);
            var $rowResizerElement = this.$element.find(("." + DX_ROW_RESIZER_CLASS)).eq(0);
            var $table = this.$element.find('table');
            $rowResizerElement.trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            var pointerMockInstance = PointerMock($draggableElement).start().dragStart().drag(0, 40);
            dragLoop(pointerMockInstance, 6, [0, -10]);
            this.clock.tick(TIME_TO_WAIT);
            var $highlightedElement = this.$element.find(("." + DX_HIGHLIGHTED_ROW_CLASS));
            assert.roughEqual($table.find('tr:first-child').find('td:first-child').outerHeight(), 24, 3);
            assert.roughEqual(parseInt($highlightedElement.css('top')), 24, 3);
            pointerMockInstance.dragEnd();
          });
          test('Table highlighted element position is limited by minRowHeight option while the row has content-based height', function(assert) {
            this.createWidget({
              height: 300,
              width: 430,
              tableResizing: {
                enabled: true,
                minColumnWidth: 40,
                minRowHeight: 20
              }
            });
            this.clock.tick(TIME_TO_WAIT);
            var $rowResizerElement = this.$element.find(("." + DX_ROW_RESIZER_CLASS)).eq(0);
            var $table = this.$element.find('table');
            this.instance.insertText(0, 'some text some test some text');
            this.clock.tick(TIME_TO_WAIT);
            $rowResizerElement.trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            var pointerMockInstance = PointerMock($draggableElement).start().dragStart().drag(0, 40);
            dragLoop(pointerMockInstance, 6, [0, -10]);
            this.clock.tick(TIME_TO_WAIT);
            var $highlightedElement = this.$element.find(("." + DX_HIGHLIGHTED_ROW_CLASS));
            assert.roughEqual(parseInt($highlightedElement.css('top')) + DRAGGABLE_ELEMENT_OFFSET, $table.find('tr:first-child').find('td:first-child').outerHeight(), 3);
            pointerMockInstance.dragEnd();
          });
          test('Table highlighted element position is limited by minRowHeight option while the row has content-based height after last column drag', function(assert) {
            this.createWidget({
              height: 300,
              width: 430,
              value: tableMarkupHeight
            });
            this.clock.tick(TIME_TO_WAIT);
            var $rowResizerElement = this.$element.find(("." + DX_ROW_RESIZER_CLASS)).eq(1);
            var $table = this.$element.find('table');
            $rowResizerElement.trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            var pointerMockInstance = PointerMock($draggableElement).start().dragStart();
            dragLoop(pointerMockInstance, 4, [0, -10]);
            this.clock.tick(TIME_TO_WAIT);
            var $highlightedElement = this.$element.find(("." + DX_HIGHLIGHTED_ROW_CLASS));
            assert.roughEqual(parseInt($highlightedElement.css('top')) + DRAGGABLE_ELEMENT_OFFSET, $table.outerHeight() - TABLE_BORDERS, 3);
            pointerMockInstance.dragEnd();
          });
          test('Check row resizers elements positions', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var $rowResizerElements = this.$element.find(("." + DX_ROW_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var rowBorderOffsets = [];
            $table.find('td:first-child').each(function(i, element) {
              var rowHeight = $(element).outerHeight();
              if (i > 0) {
                rowBorderOffsets[i] = rowBorderOffsets[i - 1] + rowHeight;
              } else {
                rowBorderOffsets[i] = rowHeight;
              }
            });
            checkResizerPositions(assert, $rowResizerElements, rowBorderOffsets, 'top');
          });
        });
        module('Resizers boundaries', {}, function() {
          test('Boundary should have bottom boundary offset we use vertical drag', function(assert) {
            this.createWidget({
              width: 430,
              tableResizing: {enabled: true}
            });
            this.clock.tick(TIME_TO_WAIT);
            var $rowResizerElements = this.$element.find(("." + DX_ROW_RESIZER_CLASS));
            $rowResizerElements.eq(2).trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            var boundaryOffset = $draggableElement.dxDraggable('instance').option('boundOffset');
            assert.roughEqual(boundaryOffset.bottom, -$(getWindow()).height(), 2);
          });
          test('Boundary should be the Table element if we drag column', function(assert) {
            this.createWidget({
              width: 430,
              tableResizing: {enabled: true}
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            var boundaryElement = $($draggableElement.dxDraggable('instance').option('boundary')).get(0);
            assert.strictEqual(boundaryElement, $table.get(0));
          });
          test('Boundary should be Quill content element if we drag last column', function(assert) {
            this.createWidget({
              width: 430,
              tableResizing: {enabled: true}
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            var draggableInstance = $draggableElement.dxDraggable('instance');
            var boundaryElement = draggableInstance.option('boundary').get(0);
            var boundaryOffset = draggableInstance.option('boundOffset');
            assert.strictEqual(boundaryElement, $(this.instance._getContent()).get(0));
            assert.strictEqual(boundaryOffset.left, $(this.instance._getContent()).css('paddingLeft'));
            assert.strictEqual(boundaryOffset.right, $(this.instance._getContent()).css('paddingRight'));
          });
        });
        module('API', {}, function() {
          test('Table and columns width was saved if we apply new markup with td width styles', function(assert) {
            this.createWidget({width: 630});
            this.clock.tick(TIME_TO_WAIT);
            this.instance.option('value', tableMarkupWidth);
            this.clock.tick(TIME_TO_WAIT);
            var $table = this.$element.find('table');
            var expectedColumnsWidths = [50, 100, 50, 50];
            $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
              assert.roughEqual($(columnElement).outerWidth(), expectedColumnsWidths[i], 2, 'Column has expected width, index = ' + i);
            });
            assert.roughEqual($table.outerWidth(), 250, 3);
          });
        });
        module('Window resizing', {}, function() {
          test('Check resizers elements positions after window resize', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var $table = this.$element.find('table').width(400);
            this.clock.tick(TIME_TO_WAIT);
            resizeCallbacks.fire();
            this.clock.tick(500);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var columnBorderOffsets = getColumnBordersOffset($table);
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets);
          });
          test('Check columns widths and resizers positions after window resize', function(assert) {
            this.createWidget({width: 630});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(20, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            $('#htmlEditor').width(430);
            this.clock.tick(TIME_TO_WAIT);
            resizeCallbacks.fire();
            this.clock.tick(TIME_TO_WAIT);
            $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var columnBorderOffsets = getColumnBordersOffset($table);
            var expectedColumnsWidths = [97, 97, 97, 107];
            $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
              assert.roughEqual($(columnElement).outerWidth(), expectedColumnsWidths[i], 2.01, 'Column has expected width, index = ' + i);
              assert.roughEqual(parseInt($(columnElement).css('width')), expectedColumnsWidths[i], 2.01, 'Column has expected width style, index = ' + i);
            });
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets);
          });
        });
        module('Table structure changing', {}, function() {
          test('Second frame should be added if we add the second table', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            this.quillInstance.setSelection(this.quillInstance.getLength(), 0);
            var tableModule = this.quillInstance.getModule('table');
            tableModule.insertTable(2, 2);
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrames = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var rowBorderOffsets = getRowBordersOffset(this.$element.find('table').eq(0));
            var $rowResizerElements = $resizeFrames.eq(0).find(("." + DX_ROW_RESIZER_CLASS));
            $rowResizerElements.each(function(i, row) {
              var resizerLeftPosition = parseInt($(row).css('top').replace('px', ''));
              assert.roughEqual(resizerLeftPosition, rowBorderOffsets[i] - DRAGGABLE_ELEMENT_OFFSET, 1.01, 'Resizer has the same offset as the row border for the first table, index = ' + i);
            });
            rowBorderOffsets = getRowBordersOffset(this.$element.find('table').eq(1));
            $rowResizerElements = $resizeFrames.eq(1).find(("." + DX_ROW_RESIZER_CLASS));
            checkResizerPositions(assert, $rowResizerElements, rowBorderOffsets, 'top');
            assert.strictEqual($resizeFrames.length, 2);
          });
          test('First frame should be removed if we remove the first table', function(assert) {
            this.createWidget({value: tableMarkup + '<br>' + tableMarkup});
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.deleteTable();
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrames = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var rowBorderOffsets = getRowBordersOffset(this.$element.find('table').eq(0));
            var $rowResizerElements = $resizeFrames.eq(0).find(("." + DX_ROW_RESIZER_CLASS));
            checkResizerPositions(assert, $rowResizerElements, rowBorderOffsets, 'top');
            assert.strictEqual($resizeFrames.length, 1);
          });
          test('Row resizers should be updated after a row insert', function(assert) {
            this.createWidget({value: tableMarkup});
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertRow();
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrames = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var rowBorderOffsets = getRowBordersOffset(this.$element.find('table').eq(0));
            var $rowResizerElements = $resizeFrames.eq(0).find(("." + DX_ROW_RESIZER_CLASS));
            checkResizerPositions(assert, $rowResizerElements, rowBorderOffsets, 'top');
          });
          test('Row resizers should be updated after some rows insert', function(assert) {
            this.createWidget({value: tableMarkup});
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertRow();
            tableModule.insertRow();
            tableModule.insertRow();
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrames = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var rowBorderOffsets = getRowBordersOffset(this.$element.find('table').eq(0));
            var $rowResizerElements = $resizeFrames.eq(0).find(("." + DX_ROW_RESIZER_CLASS));
            checkResizerPositions(assert, $rowResizerElements, rowBorderOffsets, 'top');
          });
          test('Row resizers should be updated after a row delete', function(assert) {
            this.createWidget({value: tableMarkup});
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.deleteRow();
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrames = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var rowBorderOffsets = getRowBordersOffset(this.$element.find('table').eq(0));
            var $rowResizerElements = $resizeFrames.eq(0).find(("." + DX_ROW_RESIZER_CLASS));
            checkResizerPositions(assert, $rowResizerElements, rowBorderOffsets, 'top');
          });
          test('Table should save custom column width after the first column deletion', function(assert) {
            this.createWidget({width: 630});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(-50, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            var $table = this.$element.find('table');
            var tableWidth = $table.outerWidth();
            this.quillInstance.setSelection(4, 0);
            tableModule.deleteRow();
            this.clock.tick(TIME_TO_WAIT);
            var expectedColumnsWidths = [150, 150, 150, 100];
            $table = this.$element.find('table');
            $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
              assert.roughEqual($(columnElement).outerWidth(), expectedColumnsWidths[i], 2.51, 'Column has expected width, index = ' + i);
            });
            assert.roughEqual($table.outerWidth(), tableWidth, 2.51, 'Table width is not changed');
          });
          test('Column resizers should be updated after a column insert', function(assert) {
            this.createWidget({value: tableMarkup});
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertColumn();
            this.clock.tick(TIME_TO_WAIT);
            var $tables = this.$element.find('table');
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var columnBorderOffsets = getColumnBordersOffset($tables.eq(0));
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets);
          });
          test('Columns widths should be updated after a some columns insert', function(assert) {
            this.createWidget({width: 630});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var startTableWidth = $table.outerWidth();
            $columnResizerElements.eq(1).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(30, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertColumn();
            tableModule.insertColumn();
            tableModule.insertColumn();
            this.clock.tick(TIME_TO_WAIT);
            var expectedColumnsWidths = [40, 40, 40, 120, 141, 98, 120];
            $table = this.$element.find('table');
            $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
              assert.roughEqual($(columnElement).outerWidth(), expectedColumnsWidths[i], 1.01, 'Column has expected width, index = ' + i);
            });
            assert.roughEqual($table.outerWidth(), startTableWidth, 3, 'Table width is not changed');
          });
          test('Table width should not be updated after a some columns insert', function(assert) {
            this.createWidget({width: 630});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(-50, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var $table = this.$element.find('table');
            var startTableWidth = $table.outerWidth();
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertColumn();
            tableModule.insertColumn();
            tableModule.insertColumn();
            tableModule.insertColumn();
            this.clock.tick(TIME_TO_WAIT);
            $table = this.$element.find('table');
            assert.roughEqual($table.outerWidth(), startTableWidth, 2.01, 'Table width is not changed');
          });
          test('Column resizers should be updated after a some columns insert', function(assert) {
            this.createWidget({width: 630});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(2).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(30, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertColumn();
            tableModule.insertColumn();
            tableModule.insertColumn();
            this.clock.tick(TIME_TO_WAIT);
            var expectedColumnsWidths = [40, 40, 40, 120, 120, 141, 98];
            var $table = this.$element.find('table');
            $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
              assert.roughEqual($(columnElement).outerWidth(), expectedColumnsWidths[i], 1.01, 'Column has expected width, index = ' + i);
              assert.roughEqual(parseInt($(columnElement).css('width')), expectedColumnsWidths[i], 1.01, 'Column has expected width style, index = ' + i);
            });
          });
          test('Column resizers should be updated after a some columns insert and new resize', function(assert) {
            this.createWidget({width: 630});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(2).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(30, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertColumn();
            tableModule.insertColumn();
            tableModule.insertColumn();
            this.clock.tick(TIME_TO_WAIT);
            $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(6).trigger('dxpointerdown');
            $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(-30, 0).dragEnd();
            var $table = this.$element.find('table');
            var expectedColumnsWidths = [40, 40, 40, 120, 120, 141, 68];
            $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
              assert.roughEqual($(columnElement).outerWidth(), expectedColumnsWidths[i], 1.01, 'Column has expected width, index = ' + i);
              assert.roughEqual(parseInt($(columnElement).css('width')), expectedColumnsWidths[i], 1.01, 'Column has expected width style, index = ' + i);
            });
          });
          test('Column resizers should be updated after a column delete', function(assert) {
            this.createWidget({
              value: tableMarkup,
              width: 630
            });
            this.clock.tick(TIME_TO_WAIT);
            var $table = this.$element.find('table').eq(0);
            var tableWidth = $table.outerWidth();
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.deleteColumn();
            tableModule.deleteColumn();
            this.clock.tick(TIME_TO_WAIT);
            $table = this.$element.find('table').eq(0);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var columnBorderOffsets = getColumnBordersOffset($table);
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets);
            assert.roughEqual($table.outerWidth(), tableWidth, 2, 'Table width is not changed');
          });
          test('Table should save custom row height after the first row deletion', function(assert) {
            this.createWidget({
              value: tableMarkup,
              width: 630
            });
            this.clock.tick(TIME_TO_WAIT);
            var $table = this.$element.find('table').eq(0);
            var $rowResizerElement = this.$element.find(("." + DX_ROW_RESIZER_CLASS)).eq(0);
            this.clock.tick(TIME_TO_WAIT);
            $rowResizerElement.trigger('dxpointerdown');
            var $draggableElement = this.$element.find(("." + DX_DRAGGABLE_CLASS)).eq(0);
            PointerMock($draggableElement).start().dragStart().drag(0, 50).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var tableHeight = $table.outerHeight();
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(4, 0);
            tableModule.deleteColumn();
            this.clock.tick(TIME_TO_WAIT);
            $table = this.$element.find('table').eq(0);
            assert.roughEqual($table.outerHeight(), tableHeight, 2, 'Table height is not changed');
          });
          test('Second table frame should update position after the insert row to the first table', function(assert) {
            this.createWidget({value: tableMarkup + '<br>' + tableMarkup});
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertRow();
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrame = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var tablePosition = getBoundingRect(this.$element.find('table').get(1));
            var framePosition = getBoundingRect($resizeFrame.get(1));
            assert.strictEqual(tablePosition.left, framePosition.left, 'Left is correrct');
            assert.strictEqual(tablePosition.top, framePosition.top, 'Top is correrct');
            assert.strictEqual(tablePosition.height, framePosition.height, 'Height is correrct');
            assert.strictEqual(tablePosition.width, framePosition.width, 'Width is correrct');
          });
          test('Row resizers should be updated on the table structure update after resize', function(assert) {
            this.createWidget({width: 430});
            this.clock.tick(TIME_TO_WAIT);
            var $rowResizerElements = this.$element.find(("." + DX_ROW_RESIZER_CLASS));
            $rowResizerElements.eq(1).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(0, 40).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertRow();
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrames = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var rowBorderOffsets = getRowBordersOffset(this.$element.find('table').eq(0));
            $rowResizerElements = $resizeFrames.eq(0).find(("." + DX_ROW_RESIZER_CLASS));
            $rowResizerElements.each(function(i, row) {
              var resizerLeftPosition = parseInt($(row).css('top').replace('px', ''));
              assert.roughEqual(resizerLeftPosition, rowBorderOffsets[i] - DRAGGABLE_ELEMENT_OFFSET, 1.01, 'Resizer has the same offset as the row border for the table, index = ' + i);
            });
          });
          test('Column resizers should be updated on the table structure update after resize', function(assert) {
            this.createWidget({width: 430});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(1).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(40, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertColumn();
            this.clock.tick(TIME_TO_WAIT);
            var $tables = this.$element.find('table');
            $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var columnBorderOffsets = getColumnBordersOffset($tables.eq(0));
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets);
          });
          test('Column resizers should works correctly after the table structure update after resize', function(assert) {
            this.createWidget({width: 830});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(1).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(40, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertColumn();
            this.clock.tick(TIME_TO_WAIT);
            var $tables = this.$element.find('table');
            $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(40, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var columnBorderOffsets = getColumnBordersOffset($tables.eq(0));
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets);
          });
          test('Table should have a correct width if it has not anough place after insert rows', function(assert) {
            assert.expect(17);
            var minColumnWidth = 40;
            this.createWidget({
              width: 230,
              tableResizing: {
                enabled: true,
                minColumnWidth: minColumnWidth
              }
            });
            this.clock.tick(TIME_TO_WAIT);
            var tableModule = this.quillInstance.getModule('table');
            this.quillInstance.setSelection(5, 0);
            tableModule.insertColumn();
            tableModule.insertColumn();
            tableModule.insertColumn();
            tableModule.insertColumn();
            this.clock.tick(TIME_TO_WAIT);
            var $table = this.$element.find('table').eq(0);
            $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
              assert.roughEqual($(columnElement).outerWidth(), minColumnWidth, 1.01, 'Column has expected width, index = ' + i);
              assert.roughEqual(parseInt($(columnElement).css('width')), minColumnWidth, 1.01, 'Column has expected width style, index = ' + i);
            });
            assert.roughEqual($table.outerWidth(), minColumnWidth * 8, 2, 'Table width');
          });
        });
        module('history integration', {}, function() {
          test('The widget can revert table resizing by undo if table has columns with auto width', function(assert) {
            var $__4 = this;
            assert.expect(6);
            var done = assert.async();
            this.createWidget({width: 432});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(2).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(-40, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            this.clock.restore();
            setTimeout(function() {
              $__4.instance.undo();
              var $table = $__4.$element.find('table');
              setTimeout(function() {
                $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
                  assert.roughEqual($(columnElement).outerWidth(), 100, 2, 'Column has expected width, index = ' + i);
                });
                var history = $__4.quillInstance.getModule('history');
                assert.strictEqual(history.stack.undo.length, 0, 'undo history stack is correct');
                assert.strictEqual(history.stack.redo.length, 1, 'redo history stack is correct');
                done();
              }, TIME_TO_WAIT);
            }, TIME_TO_WAIT);
          });
          test('The widget can revert table resizing by redo if table has columns with auto width', function(assert) {
            var $__4 = this;
            assert.expect(3);
            var done = assert.async();
            this.createWidget({width: 432});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(2).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(-40, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            this.clock.restore();
            setTimeout(function() {
              $__4.instance.undo();
              $__4.instance.redo();
              var $table = $__4.$element.find('table');
              var $columns = $table.find('tr').eq(0).find('td');
              setTimeout(function() {
                assert.roughEqual($columns.eq(2).outerWidth(), 60, 2, 'Changes is reverted for the resized column');
                assert.roughEqual($columns.eq(3).outerWidth(), 140, 2, 'Changes is reverted for the next column');
                assert.roughEqual($table.outerWidth(), 400, 2, 'Table width is correct');
                done();
              }, TIME_TO_WAIT);
            }, TIME_TO_WAIT);
          });
          test('The widget can revert whole table resizing by undo if table has columns with auto width', function(assert) {
            var $__4 = this;
            assert.expect(5);
            var done = assert.async();
            this.createWidget({width: 432});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(-40, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            this.clock.restore();
            setTimeout(function() {
              $__4.instance.undo();
              var $table = $__4.$element.find('table');
              setTimeout(function() {
                $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
                  assert.roughEqual($(columnElement).outerWidth(), 100, 2, 'Column has expected width, index = ' + i);
                });
                assert.roughEqual($table.outerWidth(), 400, 2, 'Table width is correct');
                done();
              }, TIME_TO_WAIT);
            }, TIME_TO_WAIT);
          });
          test('The widget can revert whole table resizing by undo and redo if table has columns with auto width', function(assert) {
            var $__4 = this;
            assert.expect(5);
            var done = assert.async();
            this.createWidget({width: 432});
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(-40, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            this.clock.restore();
            setTimeout(function() {
              $__4.instance.undo();
              $__4.instance.redo();
              var $table = $__4.$element.find('table');
              var expectedWidths = [100, 100, 100, 60];
              setTimeout(function() {
                $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
                  assert.roughEqual($(columnElement).outerWidth(), expectedWidths[i], 2, 'Column has expected width, index = ' + i);
                });
                assert.roughEqual($table.outerWidth(), 360, 2, 'Table width is correct');
                done();
              }, TIME_TO_WAIT);
            }, TIME_TO_WAIT);
          });
          test('The widget can revert table resizing by undo if table has no columns with auto width', function(assert) {
            var $__4 = this;
            assert.expect(4);
            var done = assert.async();
            this.createWidget({
              value: tableMarkupWidth,
              width: 282
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(2).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(50, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            this.clock.restore();
            setTimeout(function() {
              $__4.instance.undo();
              var $table = $__4.$element.find('table');
              var expectedWidths = [50, 100, 50, 50];
              setTimeout(function() {
                $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
                  assert.roughEqual($(columnElement).outerWidth(), expectedWidths[i], 2, 'Column has expected width, index = ' + i);
                });
                done();
              }, TIME_TO_WAIT);
            }, TIME_TO_WAIT);
          });
          test('The widget can revert whole table resizing by undo if table has no columns with auto width', function(assert) {
            var $__4 = this;
            assert.expect(5);
            var done = assert.async();
            this.createWidget({
              value: tableMarkupWidth,
              width: 282
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(50, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            this.clock.restore();
            setTimeout(function() {
              $__4.instance.undo();
              var $table = $__4.$element.find('table');
              var expectedWidths = [50, 100, 50, 50];
              setTimeout(function() {
                $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
                  assert.roughEqual($(columnElement).outerWidth(), expectedWidths[i], 2, 'Column has expected width, index = ' + i);
                });
                assert.roughEqual($table.outerWidth(), 250, 2, 'Table width is correct');
                done();
              }, TIME_TO_WAIT);
            }, TIME_TO_WAIT);
          });
          test('The widget can revert whole table resizing by redo if table has no columns with auto width', function(assert) {
            var $__4 = this;
            assert.expect(5);
            var done = assert.async();
            this.createWidget({
              value: tableMarkupWidth,
              width: 282,
              tableResizing: {
                enabled: true,
                minColumnWidth: 0
              }
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            $columnResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(-10, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            this.clock.restore();
            setTimeout(function() {
              $__4.instance.undo();
              $__4.instance.redo();
              var $table = $__4.$element.find('table');
              var expectedWidths = [50, 100, 50, 40];
              setTimeout(function() {
                $table.find('tr').eq(0).find('td').each(function(i, columnElement) {
                  assert.roughEqual($(columnElement).outerWidth(), expectedWidths[i], 2, 'Column has expected width, index = ' + i);
                });
                assert.roughEqual($table.outerWidth(), 240, 2, 'Table width is correct');
                done();
              }, TIME_TO_WAIT);
            }, TIME_TO_WAIT);
          });
          test('The widget can revert table vertical resizing by undo', function(assert) {
            var $__4 = this;
            assert.expect(4);
            var done = assert.async();
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            var $rowResizerElements = this.$element.find(("." + DX_ROW_RESIZER_CLASS));
            $rowResizerElements.eq(3).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(30, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            this.clock.restore();
            setTimeout(function() {
              $__4.instance.undo();
              var $table = $__4.$element.find('table');
              setTimeout(function() {
                $table.find('tr').each(function(i, rowElement) {
                  assert.roughEqual($(rowElement).outerHeight(), 24, 2, 'Row has expected height, index = ' + i);
                });
                assert.roughEqual($table.outerHeight(), 74, 2, 'Table height is correct');
                done();
              }, TIME_TO_WAIT);
            }, TIME_TO_WAIT);
          });
        });
        module('rtl', {}, function() {
          test('Columns resizers should be positioned correctly if the rtl mode is enabled', function(assert) {
            this.createWidget({
              width: 430,
              rtlEnabled: true
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var columnBorderOffsets = getColumnBordersOffset($table);
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets, 'right');
          });
          test('Columns should be resized correctly after drag at the rtl mode', function(assert) {
            this.createWidget({
              width: 430,
              rtlEnabled: true
            });
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(30, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var columnBorderOffsets = getColumnBordersOffset($table);
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets, 'right');
            assert.roughEqual(columnBorderOffsets[0], 70, 3);
            assert.roughEqual(columnBorderOffsets[1], 200, 3);
          });
          test('Columns resizers should be positioned correctly if the rtl mode is enabled at runtime', function(assert) {
            this.createWidget();
            this.clock.tick(TIME_TO_WAIT);
            this.instance.option('rtlEnabled', true);
            this.clock.tick(TIME_TO_WAIT);
            var $resizeFrames = this.$element.find(("." + DX_COLUMN_RESIZE_FRAME_CLASS));
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            var columnBorderOffsets = getColumnBordersOffset($table);
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets, 'right');
            assert.strictEqual($resizeFrames.length, 1);
          });
          test('Columns resizers should works correctly if the rtl mode is enabled at runtime', function(assert) {
            this.createWidget({width: 430});
            this.clock.tick(TIME_TO_WAIT);
            this.instance.option('rtlEnabled', true);
            this.clock.tick(TIME_TO_WAIT);
            var $columnResizerElements = this.$element.find(("." + DX_COLUMN_RESIZER_CLASS));
            var $table = this.$element.find('table');
            $columnResizerElements.eq(0).trigger('dxpointerdown');
            var $draggableElements = this.$element.find(("." + DX_DRAGGABLE_CLASS));
            PointerMock($draggableElements.eq(0)).start().dragStart().drag(30, 0).dragEnd();
            this.clock.tick(TIME_TO_WAIT);
            var columnBorderOffsets = getColumnBordersOffset($table);
            checkResizerPositions(assert, $columnResizerElements, columnBorderOffsets, 'right');
            assert.roughEqual(columnBorderOffsets[0], 70, 3);
            assert.roughEqual(columnBorderOffsets[1], 200, 3);
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor","core/utils/position","core/utils/iterator","../../../helpers/pointerMock.js","core/utils/resize_callbacks","core/utils/window.js"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor"), require("core/utils/position"), require("core/utils/iterator"), require("../../../helpers/pointerMock.js"), require("core/utils/resize_callbacks"), require("core/utils/window.js"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tableResizingIntegration.tests.js.map