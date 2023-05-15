!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/tableProperties.tests.js"], ["jquery","ui/html_editor","ui/html_editor/utils/toolbar_helper"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.htmlEditor/htmlEditorParts/tableProperties.tests.js", ["jquery", "ui/html_editor", "ui/html_editor/utils/toolbar_helper"], function($__export) {
  "use strict";
  var $,
      getFormatHandlers,
      FORM_CLASS,
      FIELD_ITEM_CLASS,
      COLOR_BOX_CLASS,
      showCellPropertiesForm,
      showTablePropertiesForm,
      showForm,
      tableMarkup,
      tableWithoutContent,
      tableWithFixedDimensionsMarkup,
      tableMarkupWithHeaderRow,
      test,
      module;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {}, function($__m) {
      getFormatHandlers = $__m.getFormatHandlers;
    }],
    execute: function() {
      var $__5;
      FORM_CLASS = 'dx-formdialog-form';
      FIELD_ITEM_CLASS = 'dx-field-item';
      COLOR_BOX_CLASS = 'dx-colorbox';
      showCellPropertiesForm = function(instance, $cellElement) {
        showForm(instance, $cellElement, 'cellProperties');
      };
      showTablePropertiesForm = function(instance, $tableElement) {
        showForm(instance, $tableElement, 'tableProperties');
      };
      showForm = function(instance, $element, formatType) {
        var contextMenuModule = instance.getModule('tableContextMenu');
        var formatHelpers = getFormatHandlers(contextMenuModule);
        formatHelpers[formatType]($element);
      };
      tableMarkup = '\
    before table text<br>\
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
    <br>after table text<br>';
      tableWithoutContent = '\
<table>\
    <tr>\
        <td style="background-color: green; border-color: gray;"></td>\
        <td style="background-color: red; border-color: yellow;"></td>\
    </tr>\
</table>\
<br>';
      tableWithFixedDimensionsMarkup = '\
    <table>\
        <tr>\
            <td width="300px" height="24px">0_0 content</td>\
            <td width="300px" height="24px">0_1</td>\
        </tr>\
        <tr>\
            <td width="300px" height="48px">1_0</td>\
            <td width="300px" height="48px">1_1</td>\
        </tr>\
    </table>\
    <br>';
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
      (($__5 = QUnit, test = $__5.test, module = $__5.module, $__5));
      module('Table properties forms', {
        beforeEach: function() {
          var $__4 = this;
          this.clock = sinon.useFakeTimers();
          this.$element = $('#htmlEditor');
          this.options = {
            tableContextMenu: {enabled: true},
            value: tableMarkup
          };
          this.createWidget = function(options) {
            var newOptions = $.extend({}, $__4.options, options);
            $__4.instance = $__4.$element.dxHtmlEditor(newOptions).dxHtmlEditor('instance');
            $__4.quillInstance = $__4.instance.getQuillInstance();
          };
          this.applyFormChanges = function() {
            var buttonIndex = arguments[0] !== (void 0) ? arguments[0] : 0;
            var $button = $('.dx-popup-bottom .dx-button:visible').eq(buttonIndex);
            $button.trigger('dxclick');
            $__4.clock.tick(10);
          };
          this.getFormInstance = function() {
            return $('.dx-form:not(.dx-formdialog-form)').dxForm('instance');
          };
        },
        afterEach: function() {
          this.instance.dispose();
          this.clock.restore();
        }
      }, function() {
        module('Base', {}, function() {
          test('show table Form', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('table').eq(0);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var $form = $('.dx-form:not(.dx-formdialog-form)');
            var $scrollView = $form.closest('.dx-scrollview');
            assert.strictEqual($form.length, 1);
            assert.ok($form.eq(0).is(':visible'));
            assert.ok($scrollView.length, 'Form should be in the ScrollView');
          });
          test('show table form start values', function(assert) {
            this.createWidget({width: 432});
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(50, 1);
            showCellPropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var tableBorderColor = $tableElement.css('borderTopColor');
            var tableBackgroundColor = $tableElement.css('backgroundColor');
            var borderStyleEditor = formInstance.getEditor('borderStyle');
            var borderWidthEditor = formInstance.getEditor('borderWidth');
            var borderColorEditor = formInstance.$element().find(("." + COLOR_BOX_CLASS)).eq(0).dxColorBox('instance');
            var backgroundColorEditor = formInstance.$element().find(("." + COLOR_BOX_CLASS)).eq(1).dxColorBox('instance');
            var alignmentEditor = formInstance.$element().find('.dx-buttongroup').eq(0).dxButtonGroup('instance');
            var heightEditor = formInstance.getEditor('height');
            var widthEditor = formInstance.getEditor('width');
            assert.strictEqual(borderStyleEditor.option('value'), 'none', 'borderStyleEditor value is correct');
            assert.strictEqual(borderWidthEditor.option('value'), 0, 'borderWidthEditor value is correct');
            assert.strictEqual(borderColorEditor.option('value'), tableBorderColor, 'borderColorEditor value is correct');
            assert.strictEqual(backgroundColorEditor.option('value'), tableBackgroundColor, 'backgroundColorEditor value is correct');
            assert.strictEqual(alignmentEditor.option('selectedItemKeys')[0], 'left', 'alignmentEditor selectedItemKeys is correct');
            assert.roughEqual(heightEditor.option('value'), 73, 3, 'heightEditor value is correct');
            assert.roughEqual(widthEditor.option('value'), 400, 3, 'widthEditor value is correct');
          });
          test('Check properties edititng at the table Form (without dimensions)', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(50, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var borderStyleEditor = formInstance.getEditor('borderStyle');
            borderStyleEditor.option('value', 'dotted');
            var borderWidthEditor = formInstance.getEditor('borderWidth');
            borderWidthEditor.option('value', 3);
            var borderColorEditor = formInstance.$element().find(("." + COLOR_BOX_CLASS)).eq(0).dxColorBox('instance');
            borderColorEditor.option('value', 'red');
            var backgroundColorEditor = formInstance.$element().find(("." + COLOR_BOX_CLASS)).eq(1).dxColorBox('instance');
            backgroundColorEditor.option('value', 'green');
            var alignmentEditor = formInstance.$element().find('.dx-buttongroup').eq(0).dxButtonGroup('instance');
            alignmentEditor.option('selectedItemKeys', ['right']);
            this.applyFormChanges();
            assert.strictEqual($tableElement.css('borderTopStyle'), 'dotted', 'border style is applied');
            assert.strictEqual($tableElement.css('borderTopWidth'), '3px', 'border width is applied');
            assert.strictEqual($tableElement.css('borderTopColor'), 'rgb(255, 0, 0)', 'border color is applied');
            assert.strictEqual($tableElement.css('backgroundColor'), 'rgb(0, 128, 0)', 'background color is applied');
            assert.strictEqual($tableElement.css('textAlign'), 'right', 'text align is applied');
          });
          test('Cell backgroundColor & borderColor should be passed to colorBox as a default during editing', function(assert) {
            this.createWidget({value: tableWithoutContent});
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(0, 2);
            showCellPropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var backgroundColorEditor = formInstance.$element().find(("." + COLOR_BOX_CLASS)).eq(1).dxColorBox('instance');
            var borderColorEditor = formInstance.$element().find(("." + COLOR_BOX_CLASS)).eq(0).dxColorBox('instance');
            assert.strictEqual(backgroundColorEditor.option('value'), 'green', 'background color is passed to colorBox');
            assert.strictEqual(borderColorEditor.option('value'), 'gray', 'border color is passed to colorBox');
          });
          test('backgroundColor & borderColor of first selected cell should be applied for all cells when color was not modified in colorBox', function(assert) {
            this.createWidget({value: tableWithoutContent});
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(0, 2);
            showCellPropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            this.applyFormChanges();
            [0, 1].forEach(function(elementNumber) {
              assert.strictEqual($tableElement.find('td').eq(elementNumber).css('backgroundColor'), 'rgb(0, 128, 0)', 'background color is applied');
              assert.strictEqual($tableElement.find('td').eq(elementNumber).css('borderColor'), 'rgb(128, 128, 128)', 'borderColor color is applied');
            });
          });
          test('Check table width and height editor options', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(50, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            var heightEditor = formInstance.getEditor('height');
            assert.strictEqual(widthEditor.option('min'), 0, 'placeholder is applied');
            assert.strictEqual(heightEditor.option('min'), 0, 'placeholder is applied');
            assert.ok(widthEditor.option('placeholder').length > 1, 'placeholder is applied');
            assert.ok(heightEditor.option('placeholder').length > 1, 'placeholder is applied');
          });
          test('Check base dimensions edititng at the table Form', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(50, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var heightEditor = formInstance.getEditor('height');
            heightEditor.option('value', 90);
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 600);
            this.applyFormChanges();
            assert.strictEqual($tableElement.outerHeight(), 90, 'table height is applied');
            assert.strictEqual($tableElement.outerWidth(), 600, 'table width is applied');
          });
          test('show cell Form', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(6);
            this.quillInstance.setSelection(50, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var $form = $('.dx-form:not(.dx-formdialog-form)');
            var $scrollView = $form.closest('.dx-scrollview');
            assert.strictEqual($form.length, 1);
            assert.ok($form.eq(0).is(':visible'));
            assert.ok($scrollView.length, 'Form should be in the ScrollView');
          });
          [{
            text: 'ok',
            index: 0
          }, {
            text: 'cancel',
            index: 1
          }].forEach(function(buttonConfig) {
            test(("Cell Form can not update other form dialogs if cell form is closed by " + buttonConfig.text + " button (T1038636)"), function(assert) {
              this.createWidget();
              var $tableElement = this.$element.find('table').eq(0);
              var $targetCell = $tableElement.find('td').eq(6);
              this.quillInstance.setSelection(50, 1);
              showCellPropertiesForm(this.instance, $targetCell);
              this.clock.tick(10);
              this.applyFormChanges(buttonConfig.index);
              var contextMenuModule = this.instance.getModule('tableContextMenu');
              var formatHelpers = getFormatHandlers(contextMenuModule);
              formatHelpers['link'](this.$element);
              this.clock.tick(10);
              var formItemsCount = $(("." + FORM_CLASS + " ." + FIELD_ITEM_CLASS)).length;
              assert.equal(formItemsCount, 3, '3 form items are rendered');
            });
          });
          test('show cell form start values', function(assert) {
            this.createWidget({width: 432});
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(6);
            this.quillInstance.setSelection(50, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var borderStyleEditor = formInstance.getEditor('borderStyle');
            var borderWidthEditor = formInstance.getEditor('borderWidth');
            var borderColorEditor = formInstance.$element().find(("." + COLOR_BOX_CLASS)).eq(0).dxColorBox('instance');
            var backgroundColorEditor = formInstance.$element().find(("." + COLOR_BOX_CLASS)).eq(1).dxColorBox('instance');
            var horizontalPaddingEditor = formInstance.getEditor('horizontalPadding');
            var verticalPaddingEditor = formInstance.getEditor('verticalPadding');
            var alignmentEditor = formInstance.$element().find('.dx-buttongroup').eq(0).dxButtonGroup('instance');
            var verticalAlignmentEditor = formInstance.$element().find('.dx-buttongroup').eq(1).dxButtonGroup('instance');
            var heightEditor = formInstance.getEditor('height');
            var widthEditor = formInstance.getEditor('width');
            assert.strictEqual(borderStyleEditor.option('value'), 'solid', 'borderStyleEditor value is correct');
            assert.strictEqual(borderWidthEditor.option('value'), 1, 'borderWidthEditor value is correct');
            assert.strictEqual(borderColorEditor.option('value'), 'rgb(221, 221, 221)', 'borderColorEditor value is correct');
            assert.strictEqual(backgroundColorEditor.option('value'), 'rgba(0, 0, 0, 0)', 'backgroundColorEditor value is correct');
            assert.strictEqual(horizontalPaddingEditor.option('value'), 5, 'horizontalPaddingEditor value is correct');
            assert.strictEqual(verticalPaddingEditor.option('value'), 2, 'verticalPaddingEditor value is correct');
            assert.strictEqual(alignmentEditor.option('selectedItemKeys')[0], 'left', 'alignmentEditor selectedItemKeys is correct');
            assert.strictEqual(verticalAlignmentEditor.option('selectedItemKeys')[0], 'middle', 'verticalAlignmentEditor selectedItemKeys is correct');
            assert.roughEqual(heightEditor.option('value'), 24, 2, 'heightEditor value is correct');
            assert.roughEqual(widthEditor.option('value'), 100, 2, 'widthEditor value is correct');
          });
          test('Check properties edititng at the cell Form (without dimensions)', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(6);
            this.quillInstance.setSelection(50, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var borderStyleEditor = formInstance.getEditor('borderStyle');
            borderStyleEditor.option('value', 'dotted');
            var borderWidthEditor = formInstance.getEditor('borderWidth');
            borderWidthEditor.option('value', 3);
            var borderColorEditor = formInstance.$element().find(("." + COLOR_BOX_CLASS)).eq(0).dxColorBox('instance');
            borderColorEditor.option('value', 'red');
            var backgroundColorEditor = formInstance.$element().find(("." + COLOR_BOX_CLASS)).eq(1).dxColorBox('instance');
            backgroundColorEditor.option('value', 'green');
            var horizontalPaddingEditor = formInstance.getEditor('horizontalPadding');
            horizontalPaddingEditor.option('value', 10);
            var verticalPaddingEditor = formInstance.getEditor('verticalPadding');
            verticalPaddingEditor.option('value', 15);
            var alignmentEditor = formInstance.$element().find('.dx-buttongroup').eq(0).dxButtonGroup('instance');
            alignmentEditor.option('selectedItemKeys', ['right']);
            var verticalAlignmentEditor = formInstance.$element().find('.dx-buttongroup').eq(1).dxButtonGroup('instance');
            verticalAlignmentEditor.option('selectedItemKeys', ['bottom']);
            this.applyFormChanges();
            assert.strictEqual($targetCell.css('borderTopStyle'), 'dotted', 'border style is applied');
            assert.strictEqual($targetCell.css('borderTopWidth'), '3px', 'border width is applied');
            assert.strictEqual($targetCell.css('borderTopColor'), 'rgb(255, 0, 0)', 'border color is applied');
            assert.strictEqual($targetCell.css('backgroundColor'), 'rgb(0, 128, 0)', 'background color is applied');
            assert.strictEqual($targetCell.css('paddingLeft'), '10px', 'padding is applied');
            assert.strictEqual($targetCell.css('paddingRight'), '10px', 'padding is applied');
            assert.strictEqual($targetCell.css('paddingTop'), '15px', 'padding is applied');
            assert.strictEqual($targetCell.css('paddingBottom'), '15px', 'padding is applied');
            assert.strictEqual($targetCell.css('textAlign'), 'right', 'text align is applied');
            assert.strictEqual($targetCell.css('verticalAlign'), 'bottom', 'vertical align is applied');
          });
          test('Check cell width and height editor options', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(0);
            this.quillInstance.setSelection(50, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            var heightEditor = formInstance.getEditor('height');
            assert.strictEqual(widthEditor.option('min'), 0, 'min is applied');
            assert.strictEqual(heightEditor.option('min'), 0, 'placeholder is applied');
            assert.ok(widthEditor.option('placeholder').length > 1, 'placeholder is applied');
            assert.ok(heightEditor.option('placeholder').length > 1, 'placeholder is applied');
          });
          test('Check base cell dimensions edititng', function(assert) {
            this.createWidget();
            var $tableElement = this.$element.find('table').eq(0);
            var initialTableWidth = $tableElement.outerWidth();
            var initialTableHeight = $tableElement.outerHeight();
            var $targetCell = $tableElement.find('td').eq(6);
            var initialCellHeight = $targetCell.outerHeight();
            this.quillInstance.setSelection(50, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var heightEditor = formInstance.getEditor('height');
            heightEditor.option('value', 80);
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 180);
            this.applyFormChanges();
            assert.strictEqual($targetCell.outerHeight(), 80, 'cell height is applied');
            assert.strictEqual($targetCell.get(0).style.height, '80px', 'cell height style is correct');
            assert.strictEqual($targetCell.next().get(0).style.height, '80px', 'sibling cell height style is correct');
            assert.strictEqual($targetCell.outerWidth(), 180, 'cell width is applied');
            assert.strictEqual($targetCell.get(0).style.width, '180px', 'cell width style is correct');
            assert.strictEqual($tableElement.find('td').eq(2).get(0).style.width, '180px', 'other this column cell width style is correct');
            assert.roughEqual(initialTableWidth, $tableElement.outerWidth(), 1, 'table width is not changed');
            assert.roughEqual(initialTableHeight + 80 - initialCellHeight, $tableElement.outerHeight(), 1), 'table height is changed as expected';
          });
          test('Check header row cell dimensions edititng', function(assert) {
            this.createWidget({value: tableMarkupWithHeaderRow});
            var $tableElement = this.$element.find('table').eq(0);
            var initialTableWidth = $tableElement.outerWidth();
            var initialTableHeight = $tableElement.outerHeight();
            var $targetCell = $tableElement.find('th').eq(1);
            var initialCellHeight = $targetCell.outerHeight();
            this.quillInstance.setSelection(3, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var heightEditor = formInstance.getEditor('height');
            heightEditor.option('value', 80);
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 180);
            this.applyFormChanges();
            assert.strictEqual($targetCell.outerHeight(), 80, 'cell height is applied');
            assert.strictEqual($targetCell.get(0).style.height, '80px', 'cell height style is correct');
            assert.strictEqual($targetCell.next().get(0).style.height, '80px', 'sibling cell height style is correct');
            assert.strictEqual($targetCell.outerWidth(), 180, 'cell width is applied');
            assert.strictEqual($targetCell.get(0).style.width, '180px', 'cell width style is correct');
            assert.strictEqual($tableElement.find('td').eq(1).get(0).style.width, '180px', 'other this column cell width style is correct');
            assert.roughEqual(initialTableWidth, $tableElement.outerWidth(), 1, 'table width is not changed');
            assert.roughEqual(initialTableHeight + 80 - initialCellHeight, $tableElement.outerHeight(), 1), 'table height is changed as expected';
          });
          test('formDialog tableWidth should have value in table with fixed dimensions and enabled tableResizing (T1093235)', function(assert) {
            this.createWidget({
              tableResizing: {enabled: true},
              value: tableWithFixedDimensionsMarkup
            });
            var $tableElement = this.$element.find('table').eq(0);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var width = formInstance.getEditor('width').option('value');
            assert.notOk(isNaN(width), 'width is not NaN');
          });
          test('formDialog tableWidth should have value after cell width change in table with enabled tableResizing', function(assert) {
            this.createWidget({
              tableResizing: {enabled: true},
              value: tableWithFixedDimensionsMarkup
            });
            var $tableElement = this.$element.find('table').eq(0);
            var $cellElement = $tableElement.find('td').eq(0);
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $cellElement);
            this.clock.tick(10);
            var cellPropertiesFormInstance = this.getFormInstance();
            cellPropertiesFormInstance.getEditor('width').option('value', 50);
            this.applyFormChanges();
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var tablePropertiesFormInstance = this.getFormInstance();
            var width = tablePropertiesFormInstance.getEditor('width').option('value');
            assert.notOk(isNaN(width), 'width is not NaN');
          });
        });
        module('Cell width calculations', {}, function() {
          test('Check cell width edititing if all columns width is fixed', function(assert) {
            this.createWidget({value: '\
            <table>\
                <tr>\
                    <td width="300px">0_0 content</td>\
                    <td width="300px">0_1</td>\
                </tr>\
                <tr>\
                    <td width="300px">1_0</td>\
                    <td width="300px">1_1</td>\
                </tr>\
            </table>\
            <br>'});
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(0);
            $tableElement.css('width', 'initial');
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 250);
            this.applyFormChanges();
            assert.strictEqual($targetCell.outerWidth(), 250, 'cell width is applied');
            assert.strictEqual($targetCell.next().outerWidth(), 350, 'next cell width is correct');
          });
          test('Check cell width styles after edititing if all columns width is not fixed', function(assert) {
            this.createWidget({
              width: 632,
              value: '\
            <table>\
                <tr>\
                    <td>0_0 content</td>\
                    <td>0_1</td>\
                </tr>\
                <tr>\
                    <td>1_0</td>\
                    <td>1_1</td>\
                </tr>\
            </table>\
            <br>'
            });
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(0);
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 250);
            this.applyFormChanges();
            assert.strictEqual($targetCell.outerWidth(), 250, 'cell width is applied');
            assert.strictEqual($targetCell.get(0).style.width, '250px', 'cell width style is applied');
            assert.roughEqual($targetCell.next().outerWidth(), 348, 2, 'next cell width style is correct');
            assert.strictEqual($targetCell.next().get(0).style.width, '', 'next cell width style is correct');
          });
          test('Check cell width edititing for the last table column if all columns width is fixed', function(assert) {
            this.createWidget({value: tableWithFixedDimensionsMarkup});
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(1);
            $tableElement.css('width', 'initial');
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 250);
            this.applyFormChanges();
            assert.strictEqual($targetCell.outerWidth(), 250, 'cell width is applied');
            assert.strictEqual($targetCell.prev().outerWidth(), 350, 'previous cell width is correct');
          });
          test('Check cell width edititing if the table has one column', function(assert) {
            this.createWidget({value: '\
            <table>\
                <tr>\
                    <td>0_0 content</td>\
                </tr>\
                <tr>\
                    <td>1_0</td>\
                </tr>\
            </table>\
            <br>'});
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(0);
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 250);
            this.applyFormChanges();
            assert.strictEqual($targetCell.outerWidth(), 250, 'cell width is applied');
          });
          test('Check cell width edititing if the table has one column with auto width and one with fixed width', function(assert) {
            this.createWidget({
              width: 632,
              value: '\
            <table>\
                <tr>\
                    <td width="300px">0_0 content</td>\
                    <td>0_1</td>\
                </tr>\
                <tr>\
                    <td width="300px">1_0</td>\
                    <td>1_1</td>\
                </tr>\
            </table>\
            <br>'
            });
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(1);
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 250);
            this.applyFormChanges();
            assert.strictEqual($targetCell.outerWidth(), 250, 'cell width is applied');
            assert.strictEqual($targetCell.get(0).style.width, '250px', 'cell width style is applied');
            assert.roughEqual(parseInt($targetCell.prev().outerWidth()), 350, 2, 'previous cell width style is correct');
            assert.roughEqual(parseInt($targetCell.prev().outerWidth()), 350, 2, 'previous cell width style is correct');
          });
          test('Check cell width edititing if the table has two column with auto width and one with fixed width', function(assert) {
            this.createWidget({
              width: 932,
              value: '\
            <table>\
                <tr>\
                    <td width="300px">0_0 content</td>\
                    <td>0_1</td>\
                    <td>0_2</td>\
                </tr>\
                <tr>\
                    <td width="300px">1_0</td>\
                    <td>1_1</td>\
                    <td>1_2</td>\
                </tr>\
            </table>\
            <br>'
            });
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(1);
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 400);
            this.applyFormChanges();
            assert.strictEqual($targetCell.outerWidth(), 400, 'cell width is applied');
            assert.strictEqual($targetCell.get(0).style.width, '400px', 'cell width style is applied');
            assert.roughEqual($targetCell.prev().outerWidth(), 300, 2, 'previous cell width is correct');
            assert.roughEqual(parseInt($targetCell.prev().get(0).style.width), 300, 2, 'previous cell width style is correct');
            assert.roughEqual($targetCell.next().outerWidth(), 200, 2, 'next cell width is correct');
            assert.strictEqual($targetCell.next().get(0).style.width, '', 'next cell width style is correct');
          });
          test('Check cell width styles if new value is more than the full table width', function(assert) {
            this.createWidget({
              width: 632,
              value: '\
            <table>\
                <tr>\
                    <td>0_0 content</td>\
                    <td>0_1</td>\
                </tr>\
                <tr>\
                    <td>1_0</td>\
                    <td>1_1</td>\
                </tr>\
            </table>\
            <br>'
            });
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(0);
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 700);
            this.applyFormChanges();
            assert.roughEqual($targetCell.outerWidth(), 567, 3, 'cell width is applied');
            assert.strictEqual($targetCell.get(0).style.width, '700px', 'cell width style is applied');
            assert.roughEqual($targetCell.next().outerWidth(), 32, 3, 'next cell width style is correct');
            assert.strictEqual($targetCell.next().get(0).style.width, '', 'next cell width style is correct');
            assert.roughEqual($tableElement.outerWidth(), 600, 2, 'table width is not changed');
          });
          test('Check cell width styles if new value is more than the full table width and all columns has fixed width', function(assert) {
            this.createWidget({
              width: 632,
              value: tableWithFixedDimensionsMarkup
            });
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(0);
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 700);
            this.applyFormChanges();
            assert.roughEqual($targetCell.outerWidth(), 567, 3, 'cell width is applied');
            assert.strictEqual($targetCell.get(0).style.width, '700px', 'cell width style is applied');
            assert.roughEqual($targetCell.next().outerWidth(), 32, 3, 'next cell width style is correct');
            assert.strictEqual($targetCell.next().get(0).style.width, '0px', 'next cell width style is correct');
            assert.roughEqual($tableElement.outerWidth(), 600, 2, 'table width is not changed');
          });
          test('Check cell width styles if it is changed after the table width was changed (columns width is fixed)', function(assert) {
            this.createWidget({
              width: 632,
              value: tableWithFixedDimensionsMarkup
            });
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(5, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 400);
            this.applyFormChanges();
            var $targetCell = $tableElement.find('td').eq(0);
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            formInstance = this.getFormInstance();
            widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 150);
            this.applyFormChanges();
            assert.roughEqual($targetCell.outerWidth(), 150, 2, 'cell width is applied');
            assert.strictEqual($targetCell.get(0).style.width, '150px', 'cell width style is applied');
            assert.roughEqual(parseInt($targetCell.next().outerWidth()), 250, 2, 'next cell width style is correct');
            assert.roughEqual(parseInt($targetCell.next().get(0).style.width), 250, 2, 'next cell width style is correct');
            assert.roughEqual($tableElement.outerWidth(), 400, 2, 'table width is correct');
          });
          test('Check cell width styles if it is changed after the table width was changed (columns width is not fixed)', function(assert) {
            this.createWidget({width: 1032});
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(50, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 800);
            this.applyFormChanges();
            var $targetCell = $tableElement.find('td').eq(0);
            this.quillInstance.setSelection(50, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            formInstance = this.getFormInstance();
            widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 110);
            this.applyFormChanges();
            var $rowCells = $targetCell.closest('tr').find('td');
            assert.roughEqual($targetCell.outerWidth(), 110, 2, 'cell width is applied');
            assert.strictEqual($targetCell.get(0).style.width, '110px', 'cell width style is applied');
            assert.roughEqual(parseInt($rowCells.eq(1).outerWidth()), 230, 2, 'second cell width style is correct');
            assert.roughEqual(parseInt($rowCells.eq(2).outerWidth()), 230, 2, 'third cell width style is correct');
            assert.roughEqual(parseInt($rowCells.eq(3).outerWidth()), 230, 2, 'fourth cell width style is correct');
            assert.roughEqual($tableElement.outerWidth(), 800, 2, 'table width is correct');
          });
        });
        module('Cell height calculations', {}, function() {
          test('Check cell height edititng if all rows height is fixed', function(assert) {
            this.createWidget({value: tableWithFixedDimensionsMarkup});
            var $tableElement = this.$element.find('table').eq(0);
            var initialTableHeight = $tableElement.outerHeight();
            var $targetCell = $tableElement.find('td').eq(0);
            var initialCellHeight = $targetCell.outerHeight();
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var heightEditor = formInstance.getEditor('height');
            heightEditor.option('value', 80);
            this.applyFormChanges();
            assert.strictEqual($targetCell.outerHeight(), 80, 'cell height is applied');
            assert.strictEqual($targetCell.get(0).style.height, '80px', 'cell height style is correct');
            assert.roughEqual(initialTableHeight + 80 - initialCellHeight, $tableElement.outerHeight(), 1), 'table height is changed as expected';
          });
          test('Check cell height edititng if all rows height is fixed and new value is less than the minimum row content height', function(assert) {
            this.createWidget({value: tableWithFixedDimensionsMarkup});
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(2);
            this.quillInstance.setSelection(17, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var heightEditor = formInstance.getEditor('height');
            heightEditor.option('value', 10);
            this.applyFormChanges();
            assert.roughEqual($targetCell.outerHeight(), 24, 2, 'cell height is applied');
            assert.strictEqual($targetCell.get(0).style.height, '10px', 'cell height style is correct');
            assert.roughEqual($tableElement.outerHeight(), 48, 3), 'table height is changed as expected';
          });
        });
        module('Table height calculations', {}, function() {
          test('Check table height edititng if all rows height is fixed', function(assert) {
            this.createWidget({
              width: 632,
              value: tableWithFixedDimensionsMarkup
            });
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(5, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var heightEditor = formInstance.getEditor('height');
            heightEditor.option('value', 150);
            this.applyFormChanges();
            var $verticalCells = $tableElement.find('td:nth-child(1)');
            assert.roughEqual($tableElement.outerHeight(), 150, 2.01, 'table height is changed as expected');
            assert.roughEqual($verticalCells.eq(0).outerHeight(), 50, 2, 'first row cell height is applied');
            assert.roughEqual(parseInt($verticalCells.eq(0).get(0).style.height), 50, 2, 'first row cell height style is applied');
            assert.roughEqual(parseInt($verticalCells.eq(1).outerHeight()), 99, 3, 'second row cell height style is applied');
            assert.roughEqual(parseInt($verticalCells.eq(1).get(0).style.height), 99, 3, 'second row cell height style is applied');
          });
          test('Check table height edititng if new value is less than the content', function(assert) {
            this.createWidget({value: tableWithFixedDimensionsMarkup});
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(5, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var heightEditor = formInstance.getEditor('height');
            heightEditor.option('value', 30);
            this.applyFormChanges();
            var $verticalCells = $tableElement.find('td:nth-child(1)');
            assert.roughEqual($tableElement.outerHeight(), 48, 3, 'table height is changed as expected');
            assert.roughEqual($verticalCells.eq(0).outerHeight(), 24, 2, 'first row cell height is applied');
            assert.roughEqual(parseInt($verticalCells.eq(0).get(0).style.height), 10, 2, 'first row cell height style is applied');
            assert.roughEqual(parseInt($verticalCells.eq(1).outerHeight()), 24, 2, 'second row cell height style is applied');
            assert.roughEqual(parseInt($verticalCells.eq(1).get(0).style.height), 20, 2, 'second row cell height style is applied');
          });
        });
        module('Table width calculations', {}, function() {
          test('Check table width edititng if all columns height is fixed', function(assert) {
            this.createWidget({
              width: 632,
              value: tableWithFixedDimensionsMarkup
            });
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(5, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 400);
            this.applyFormChanges();
            var $horizontalCells = $tableElement.find('tr:eq(0) td');
            assert.roughEqual($tableElement.outerWidth(), 400, 2, 'table width is changed as expected');
            assert.roughEqual($horizontalCells.eq(0).outerWidth(), 200, 2, 'first column cell width is applied');
            assert.roughEqual(parseInt($horizontalCells.eq(0).get(0).style.width), 200, 2, 'first column cell width style is applied');
            assert.roughEqual(parseInt($horizontalCells.eq(1).outerWidth()), 200, 2, 'second column cell width style is applied');
            assert.roughEqual(parseInt($horizontalCells.eq(1).get(0).style.width), 200, 2, 'second column cell width style is applied');
          });
          test('Check table width edititng if one column width is fixed', function(assert) {
            this.createWidget({
              width: 632,
              value: '\
            <table>\
                <tr>\
                    <td style="width: 400px;">0_0 content</td>\
                    <td>0_1</td>\
                </tr>\
                <tr>\
                    <td style="width: 400px;">1_0</td>\
                    <td>1_1</td>\
                </tr>\
            </table>\
            <br>'
            });
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(5, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 900);
            this.applyFormChanges();
            var $horizontalCells = $tableElement.find('tr:eq(0) td');
            assert.roughEqual($tableElement.outerWidth(), 900, 2, 'table width is changed as expected');
            assert.roughEqual($horizontalCells.eq(0).outerWidth(), 400, 2, 'first column cell width is applied');
            assert.roughEqual(parseInt($horizontalCells.eq(0).get(0).style.width), 400, 2, 'first column cell width style is applied');
            assert.roughEqual(parseInt($horizontalCells.eq(1).outerWidth()), 500, 2, 'second column cell width style is applied');
            assert.strictEqual($horizontalCells.eq(1).get(0).style.width, '', 'second column cell width style is undefined');
          });
          test('Check table width edititng if new width is less than the content', function(assert) {
            this.createWidget({
              width: 632,
              value: tableWithFixedDimensionsMarkup
            });
            var $tableElement = this.$element.find('table').eq(0);
            this.quillInstance.setSelection(5, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 60);
            this.applyFormChanges();
            var $horizontalCells = $tableElement.find('tr:eq(0) td');
            assert.roughEqual($tableElement.outerWidth(), 90, 3, 'table width is changed as expected');
            assert.roughEqual($horizontalCells.eq(0).outerWidth(), 60, 4.01, 'first column cell width is applied');
            assert.roughEqual(parseInt($horizontalCells.eq(0).get(0).style.width), 30, 2, 'first column cell width style is applied');
            assert.roughEqual(parseInt($horizontalCells.eq(1).outerWidth()), 30, 4.01, 'second column cell width style is applied');
            assert.roughEqual(parseInt($horizontalCells.eq(1).get(0).style.width), 30, 2, 'second column cell width style is applied');
          });
          test('Check table width styles if it is changed after the cell width was changed (columns width is not fixed)', function(assert) {
            this.createWidget({
              width: 632,
              value: '\
            <table>\
                <tr>\
                    <td>0_0 content</td>\
                    <td>0_1</td>\
                </tr>\
                <tr>\
                    <td>1_0</td>\
                    <td>1_1</td>\
                </tr>\
            </table>\
            <br>'
            });
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(0);
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 200);
            this.applyFormChanges();
            this.quillInstance.setSelection(5, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            formInstance = this.getFormInstance();
            widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 800);
            this.applyFormChanges();
            assert.roughEqual($targetCell.outerWidth(), 200, 2, 'cell width is applied');
            assert.strictEqual($targetCell.get(0).style.width, '200px', 'cell width style is applied');
            assert.roughEqual($targetCell.next().outerWidth(), 600, 2, 'next cell width style is correct');
            assert.strictEqual($targetCell.next().get(0).style.width, '', 'next cell width style is not defined');
            assert.roughEqual($tableElement.outerWidth(), 800, 2, 'table width is correct');
          });
          test('Check table width styles if it is changed after the cell width was changed (columns width is fixed)', function(assert) {
            this.createWidget({
              width: 632,
              value: tableWithFixedDimensionsMarkup
            });
            var $tableElement = this.$element.find('table').eq(0);
            var $targetCell = $tableElement.find('td').eq(0);
            this.quillInstance.setSelection(5, 1);
            showCellPropertiesForm(this.instance, $targetCell);
            this.clock.tick(10);
            var formInstance = this.getFormInstance();
            var widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 200);
            this.applyFormChanges();
            this.quillInstance.setSelection(5, 1);
            showTablePropertiesForm(this.instance, $tableElement);
            this.clock.tick(10);
            formInstance = this.getFormInstance();
            widthEditor = formInstance.getEditor('width');
            widthEditor.option('value', 450);
            this.applyFormChanges();
            assert.roughEqual($targetCell.outerWidth(), 150, 2, 'cell width is applied');
            assert.roughEqual(parseInt($targetCell.get(0).style.width), 150, 2, 'cell width style is applied');
            assert.roughEqual($targetCell.next().outerWidth(), 300, 2, 'next cell width style is correct');
            assert.strictEqual(parseInt($targetCell.next().get(0).style.width), 300, 'next cell width style is not defined');
            assert.roughEqual($tableElement.outerWidth(), 450, 2, 'table width is correct');
          });
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/html_editor","ui/html_editor/utils/toolbar_helper"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/html_editor"), require("ui/html_editor/utils/toolbar_helper"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tableProperties.tests.js.map