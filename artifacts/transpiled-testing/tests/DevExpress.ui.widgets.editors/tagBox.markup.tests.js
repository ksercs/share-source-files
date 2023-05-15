!function(e){function r(e,r,t){e in l||(l[e]={name:e,declarative:!0,deps:r,declare:t,normalizedDeps:r})}function t(e){return p[e]||(p[e]={name:e,dependencies:[],exports:{},importers:[]})}function n(r){if(!r.module){var o=r.module=t(r.name),a=r.module.exports,u=r.declare.call(e,function(e,r){if(o.locked=!0,"object"==typeof e)for(var t in e)a[t]=e[t];else a[e]=r;for(var n=0,u=o.importers.length;u>n;n++){var i=o.importers[n];if(!i.locked)for(var l=0;l<i.dependencies.length;++l)i.dependencies[l]===o&&i.setters[l](a)}return o.locked=!1,r},r.name);o.setters=u.setters,o.execute=u.execute;for(var s=0,d=r.normalizedDeps.length;d>s;s++){var f,c=r.normalizedDeps[s],v=l[c],m=p[c];m?f=m.exports:v&&!v.declarative?f=v.esModule:v?(n(v),m=v.module,f=m.exports):f=i(c),m&&m.importers?(m.importers.push(o),o.dependencies.push(m)):o.dependencies.push(null),o.setters[s]&&o.setters[s](f)}}}function o(r){var t={};if(("object"==typeof r||"function"==typeof r)&&r!==e)if(d)for(var n in r)"default"!==n&&a(t,r,n);else{var o=r&&r.hasOwnProperty;for(var n in r)"default"===n||o&&!r.hasOwnProperty(n)||(t[n]=r[n])}return t["default"]=r,c(t,"__useDefault",{value:!0}),t}function a(e,r,t){try{var n;(n=Object.getOwnPropertyDescriptor(r,t))&&c(e,t,n)}catch(o){return e[t]=r[t],!1}}function u(r,t){var n=l[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var d=n.normalizedDeps[o];-1==s.call(t,d)&&(l[d]?u(d,t):i(d))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function i(e){if(m[e])return m[e];if("@node/"==e.substr(0,6))return m[e]=o(v(e.substr(6)));var r=l[e];if(!r)throw"Module "+e+" not present.";return n(l[e]),u(e,[]),l[e]=void 0,r.declarative&&c(r.module.exports,"__esModule",{value:!0}),m[e]=r.declarative?r.module.exports:r.esModule}var l={},s=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},d=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(f){d=!1}var c;!function(){try{Object.defineProperty({},"a",{})&&(c=Object.defineProperty)}catch(e){c=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var p={},v="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,m={"@empty":{}};return function(e,t,n,a){return function(u){u(function(u){for(var l=0;l<t.length;l++)(function(e,r){r&&r.__esModule?m[e]=r:m[e]=o(r)})(t[l],arguments[l]);a({register:r});var s=i(e[0]);if(e.length>1)for(var l=1;l<e.length;l++)i(e[l]);return n?s["default"]:s})}}}("undefined"!=typeof self?self:global)

(["testing/tests/DevExpress.ui.widgets.editors/tagBox.markup.tests.js"], ["jquery","ui/tag_box","animation/fx","core/utils/type","core/config","core/utils/window"], false, function($__System) {
var require = this.require, exports = this.exports, module = this.module;
$__System.register("testing/tests/DevExpress.ui.widgets.editors/tagBox.markup.tests.js", ["jquery", "ui/tag_box", "animation/fx", "core/utils/type", "core/config", "core/utils/window"], function($__export) {
  "use strict";
  var $,
      TagBox,
      fx,
      isRenderer,
      config,
      windowModule,
      EMPTY_INPUT_CLASS,
      TAGBOX_CLASS,
      TAGBOX_TAG_CONTAINER_CLASS,
      TAGBOX_TAG_CONTENT_CLASS,
      TAGBOX_TAG_CLASS,
      TAGBOX_MULTI_TAG_CLASS,
      TAGBOX_TAG_REMOVE_BUTTON_CLASS,
      TAGBOX_SINGLE_LINE_CLASS,
      TAGBOX_DEFAULT_FIELD_TEMPLATE_CLASS,
      TAGBOX_CUSTOM_FIELD_TEMPLATE_CLASS,
      TAGBOX_TEXTEDITOR_INPUT_CONTAINER_CLASS,
      SELECT_ALL_CLASS,
      moduleSetup;
  return {
    setters: [function($__m) {
      $ = $__m.default;
    }, function($__m) {
      TagBox = $__m.default;
    }, function($__m) {
      fx = $__m.default;
    }, function($__m) {
      isRenderer = $__m.isRenderer;
    }, function($__m) {
      config = $__m.default;
    }, function($__m) {
      windowModule = $__m.default;
    }],
    execute: function() {
      QUnit.testStart(function() {
        var markup = '<div id="tagBox"></div>';
        $('#qunit-fixture').html(markup);
      });
      EMPTY_INPUT_CLASS = 'dx-texteditor-empty';
      TAGBOX_CLASS = 'dx-tagbox';
      TAGBOX_TAG_CONTAINER_CLASS = 'dx-tag-container';
      TAGBOX_TAG_CONTENT_CLASS = 'dx-tag-content';
      TAGBOX_TAG_CLASS = 'dx-tag';
      TAGBOX_MULTI_TAG_CLASS = 'dx-tagbox-multi-tag';
      TAGBOX_TAG_REMOVE_BUTTON_CLASS = 'dx-tag-remove-button';
      TAGBOX_SINGLE_LINE_CLASS = 'dx-tagbox-single-line';
      TAGBOX_DEFAULT_FIELD_TEMPLATE_CLASS = 'dx-tagbox-default-template';
      TAGBOX_CUSTOM_FIELD_TEMPLATE_CLASS = 'dx-tagbox-custom-template';
      TAGBOX_TEXTEDITOR_INPUT_CONTAINER_CLASS = 'dx-texteditor-input-container';
      SELECT_ALL_CLASS = 'dx-list-select-all';
      moduleSetup = {
        beforeEach: function() {
          TagBox.defaultOptions({options: {deferRendering: false}});
          this.getTexts = function($tags) {
            return $tags.map(function(_, tag) {
              return $(tag).text();
            }).toArray();
          };
          fx.off = true;
        },
        afterEach: function() {
          fx.off = false;
        }
      };
      QUnit.module('base markup', moduleSetup, function() {
        QUnit.test('tagbox should have base class', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            opened: false,
            items: [1, 2, 3],
            value: [1, 2]
          });
          assert.ok($tagBox.hasClass(TAGBOX_CLASS), 'tagbox should have base class');
          assert.notOk($tagBox.hasClass(EMPTY_INPUT_CLASS), 'tag box has no empty class');
          var $tagContainer = $tagBox.find('.' + TAGBOX_TAG_CONTAINER_CLASS);
          assert.equal($tagContainer.length, 1, 'tagbox should have tag container');
          var $tags = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          var $tagContent = $tags.find('.' + TAGBOX_TAG_CONTENT_CLASS);
          assert.equal($tagContent.length, 2, 'each tag has tag content');
          assert.deepEqual(this.getTexts($tagContent), ['1', '2'], 'each tag content has correct text');
          assert.equal($tagContent.find('.' + TAGBOX_TAG_REMOVE_BUTTON_CLASS).length, 2, 'each tag has remove button');
          assert.ok($tags.eq(0).parent().hasClass(TAGBOX_TEXTEDITOR_INPUT_CONTAINER_CLASS), 'tags are placed in the element with TAGBOX_TEXTEDITOR_INPUT_CONTAINER_CLASS');
        });
        QUnit.test('tagbox should render custom values in tags', function(assert) {
          var $element = $('#tagBox').dxTagBox({value: [1, 2]});
          var tags = $element.find('.' + TAGBOX_TAG_CONTENT_CLASS);
          assert.equal(tags.length, 2, 'tags are rendered');
        });
        QUnit.test('tagElement arguments of tagTemplate for custom tags is correct', function(assert) {
          $('#tagBox').dxTagBox({
            value: [1, 2],
            tagTemplate: function(tagData, tagElement) {
              assert.equal(isRenderer(tagElement), !!config().useJQuery, 'tagElement is correct');
            }
          });
        });
        QUnit.test('empty class should be added if no one tags selected', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({items: [1, 2, 3]});
          assert.ok($tagBox.hasClass(EMPTY_INPUT_CLASS), 'element has an empty class');
        });
        QUnit.test('tagBox should render tags with the custom displayExpr for simple items', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            items: [1, 2, 3],
            displayExpr: function(item) {
              if (item === 1) {
                return 'one';
              }
              return item;
            },
            value: [1, 2]
          });
          var $tags = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.equal($tags.length, 2, 'two tags should be rendered');
          assert.equal($tags.eq(0).text(), 'one', 'Check value of the first tag');
          assert.equal($tags.eq(1).text(), '2', 'Check value of the second tag');
        });
        QUnit.test('tagBox should render tags with the custom displayExpr for object items', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            items: [{value: 1}, {value: 2}, {value: 3}],
            displayExpr: function(item) {
              if (item.value === 1) {
                return 'one';
              }
              return item.value;
            },
            valueExpr: 'value',
            value: [1, 2]
          });
          var $tags = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.equal($tags.length, 2, 'two tags should be rendered');
          assert.equal($tags.eq(0).text(), 'one', 'Check value of the first tag');
          assert.equal($tags.eq(1).text(), '2', 'Check value of the second tag');
        });
        QUnit.test('tagBox should not render an empty tag when item is not found in the dataSource', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            items: [{
              id: 1,
              text: 'item 1'
            }],
            valueExpr: 'id',
            displayExpr: 'text',
            value: [1, 4]
          });
          var $tags = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.equal($tags.length, 1, 'only one tag should be rendered');
          assert.equal($tags.text(), 'item 1', 'first tag should be rendered');
        });
        QUnit.test('placeholder should be rendered', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            dataSource: ['item1', 'item2', 'item3'],
            value: []
          });
          var $placeholder = $tagBox.find('.dx-placeholder');
          assert.equal($placeholder.length, 1, 'placeholder has been rendered');
        });
      });
      QUnit.module('select element', moduleSetup, function() {
        QUnit.test('a select element should be rendered', function(assert) {
          var $select = $('#tagBox').dxTagBox().find('select');
          assert.equal($select.length, 1, 'select element is rendered');
        });
        QUnit.test('the select element should has the \'multiple\' attribute', function(assert) {
          var select = $('#tagBox').dxTagBox().find('select').get(0);
          assert.ok(select.hasAttribute('multiple'), 'the select element has the \'multiple\' attribute');
        });
        QUnit.test('an option element should be rendered for each selected item', function(assert) {
          var items = ['eins', 'zwei', 'drei'];
          var $options = $('#tagBox').dxTagBox({
            items: items,
            value: [items[0], items[2]]
          }).find('option');
          assert.equal($options.length, 2, 'option elements count is correct');
        });
        QUnit.test('option elements should have correct \'value\' attributes', function(assert) {
          var items = ['eins', 'zwei', 'drei'];
          var value = [items[0], items[2]];
          var $options = $('#tagBox').dxTagBox({
            items: items,
            value: value
          }).find('option');
          $options.each(function(index) {
            assert.equal(this.value, value[index], 'the \'value\' attribute is correct for the option ' + index);
          });
        });
        QUnit.test('option elements should have the \'selected\' attributes', function(assert) {
          var items = ['eins', 'zwei', 'drei'];
          var value = [items[0], items[2]];
          var $options = $('#tagBox').dxTagBox({
            items: items,
            value: value
          }).find('option');
          $options.each(function(index) {
            assert.ok(this.hasAttribute('selected'), 'the \'selected\' attribute is set for the option ' + index);
          });
        });
        QUnit.test('option elements should have displayed text of selected items as value if the \'valueExpr\' option is \'this\'', function(assert) {
          var items = [{
            id: 1,
            text: 'eins'
          }, {
            id: 2,
            text: 'zwei'
          }, {
            id: 3,
            text: 'drei'
          }];
          var value = [items[0], items[2]];
          var $options = $('#tagBox').dxTagBox({
            items: items,
            value: value,
            valueExpr: 'this',
            displayExpr: 'text'
          }).find('option');
          assert.equal($options.length, value.length, 'all options are rendered');
          $options.each(function(index) {
            assert.equal(this.value, value[index].text, 'the \'value\' attribute is set for the option ' + index);
          });
        });
        QUnit.test('the submit value must be equal to the value of the widget', function(assert) {
          var items = ['test-1', 'test-2', 'test-3'];
          var value = [items[0], items[2]];
          var $options = $('#tagBox').dxTagBox({
            items: items,
            value: value,
            valueExpr: 'this',
            displayExpr: function(item) {
              if (item) {
                return item.split('-').join('+');
              }
            }
          }).find('option');
          assert.equal($options.length, value.length, 'all options are rendered');
          $options.each(function(index) {
            assert.deepEqual(this.value, value[index], 'the \'value\' attribute is set for the option ' + index);
          });
        });
        QUnit.test('select element should get the \'name\' attribute with a correct value', function(assert) {
          var expectedName = 'some_name';
          var $element = $('#tagBox').dxTagBox({name: expectedName});
          var $select = $element.find('select');
          assert.equal($select.attr('name'), expectedName, 'the select element \'name\' attribute has correct value');
        });
        QUnit.test('Custom selectAllText', function(assert) {
          if (!windowModule.hasWindow()) {
            assert.ok(true, 'no window');
            return;
          }
          var selectAllText = 'Test';
          $('#tagBox').dxTagBox({
            items: ['P1', 'P2'],
            selectAllText: selectAllText,
            showSelectionControls: true,
            opened: true
          });
          assert.equal($(("." + SELECT_ALL_CLASS)).text(), selectAllText);
        });
      });
      QUnit.module('multitag', moduleSetup, function() {
        QUnit.test('tagBox should display one tag after limit overflow', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            items: [1, 2, 3, 4],
            value: [1, 2, 4],
            maxDisplayedTags: 2
          });
          var $tag = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.equal($tag.length, 1, 'only one tag should be displayed');
          assert.ok($tag.hasClass(TAGBOX_MULTI_TAG_CLASS), 'the tag has correct css class');
          assert.equal($tag.text(), '3 selected', 'tag has correct text');
        });
        QUnit.test('multitag should be rendered always when maxDisplayedTags is 0', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            items: [1, 2, 3, 4],
            maxDisplayedTags: 0,
            value: [1]
          });
          var $tag = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.equal($tag.length, 1, 'one tag is selected');
          assert.ok($tag.hasClass(TAGBOX_MULTI_TAG_CLASS), 'one selected tag is multitag');
        });
        QUnit.test('onMultitagPreparing option', function(assert) {
          assert.expect(5);
          var $tagBox = $('#tagBox').dxTagBox({
            items: [1, 2, 3, 4],
            value: [1, 2, 4],
            maxDisplayedTags: 2,
            onMultiTagPreparing: function(e) {
              assert.equal(e.component.NAME, 'dxTagBox', 'component is correct');
              assert.equal(isRenderer(e.multiTagElement), !!config().useJQuery, 'tagElement is correct');
              assert.ok($(e.multiTagElement).hasClass(TAGBOX_MULTI_TAG_CLASS), 'element is correct');
              assert.deepEqual(e.selectedItems, [1, 2, 4], 'selectedItems are correct');
              e.text = 'custom text';
            }
          });
          var $tag = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.deepEqual($tag.text(), 'custom text', 'custom text is displayed');
        });
        QUnit.test('multi tag should not be rendered if e.cancel is true', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            items: [1, 2, 3, 4],
            value: [1, 2, 4],
            maxDisplayedTags: 2,
            onMultiTagPreparing: function(e) {
              e.cancel = true;
            }
          });
          var $tag = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.equal($tag.length, 3, '3 tags was rendered');
          assert.deepEqual(this.getTexts($tag), ['1', '2', '4'], 'tags have correct text');
        });
        QUnit.test('multi tag should be rendered after max number of tags if showMultiTagOnly is false', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            items: [1, 2, 3, 4],
            value: [1, 2, 4],
            maxDisplayedTags: 2,
            showMultiTagOnly: false
          });
          var $tag = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.equal($tag.length, 2, '2 tags rendered');
          assert.deepEqual(this.getTexts($tag), ['1', '2 more'], 'tags have correct text');
        });
        QUnit.test('only multi tag should be shown when showMultiTagOnly option is true', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            items: [1, 2, 3, 4],
            value: [1, 2, 4],
            maxDisplayedTags: 2,
            showMultiTagOnly: true
          });
          var $tag = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.equal($tag.length, 1, '1 tag rendered');
          assert.deepEqual($tag.text(), '3 selected', 'text is correct');
        });
      });
      QUnit.module('option dependent appearance', moduleSetup, function() {
        QUnit.test('displayExpr and valueExpr options should work correctly', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            dataSource: [{
              'ID': 1,
              'Name': 'Item 1'
            }, {
              'ID': 2,
              'Name': 'Item 2'
            }],
            displayExpr: 'Name',
            valueExpr: 'ID',
            value: [2]
          });
          var $tags = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.equal($tags.text(), 'Item 2', 'tag is correct');
        });
        QUnit.test('tag should have correct value when item value is zero', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            items: [0, 1, 2, 3],
            value: [0]
          });
          var $tags = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.equal($tags.text(), '0', 'selected item is correct');
        });
        QUnit.test('tag should have correct value when item value is an empty string', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({
            items: ['', 1, 2, 3],
            value: ['']
          });
          var $tags = $tagBox.find('.' + TAGBOX_TAG_CLASS);
          assert.equal($tags.length, 1, 'empty string value was successfully selected');
        });
        QUnit.test('tags should not be rendered if the value is null', function(assert) {
          var $element = $('#tagBox').dxTagBox({
            items: [1, 2, 3],
            value: null
          });
          assert.equal($element.find('.' + TAGBOX_TAG_CLASS).length, 0, 'no tags are rendered');
        });
        QUnit.test('tag template option should work', function(assert) {
          var $element = $('#tagBox').dxTagBox({
            items: [{
              id: 1,
              text: 'one'
            }, {
              id: 2,
              text: 'two'
            }],
            displayExpr: 'text',
            valueExpr: 'id',
            opened: true,
            value: [1, 2],
            tagTemplate: function(tagData, tagElement) {
              return '<div class=\'custom-item\'><div class=\'product-name\'>!' + tagData.text + '</div>';
            }
          });
          var $tagContainer = $element.find('.' + TAGBOX_TAG_CONTAINER_CLASS);
          assert.equal($.trim($tagContainer.text()), '!one!two', 'selected values are rendered correctly');
        });
        QUnit.test('tagbox should have template classes', function(assert) {
          var fieldTemplate = function() {
            return $('<div>').dxTextBox();
          };
          var $tagBox = $('#tagBox').dxTagBox({
            items: [1, 2, 3],
            focusStateEnabled: true,
            fieldTemplate: fieldTemplate
          });
          assert.notOk($tagBox.hasClass(TAGBOX_DEFAULT_FIELD_TEMPLATE_CLASS), 'default template class was removed');
          assert.ok($tagBox.hasClass(TAGBOX_CUSTOM_FIELD_TEMPLATE_CLASS), 'custom template class was applied');
        });
        QUnit.test('widget gets special class in the single line mode', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({multiline: false});
          assert.ok($tagBox.hasClass(TAGBOX_SINGLE_LINE_CLASS), 'the single line class is added');
        });
        QUnit.test('tagbox should not have a single line class if multiline is true', function(assert) {
          var $tagBox = $('#tagBox').dxTagBox({multiline: true});
          assert.notOk($tagBox.hasClass(TAGBOX_SINGLE_LINE_CLASS), 'there is no single line class on widget');
        });
      });
    }
  };
});

})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define(["jquery","ui/tag_box","animation/fx","core/utils/type","core/config","core/utils/window"], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory(require("jquery"), require("ui/tag_box"), require("animation/fx"), require("core/utils/type"), require("core/config"), require("core/utils/window"));
  else
    throw new Error("Module must be loaded as AMD or CommonJS");
});
//# sourceMappingURL=tagBox.markup.tests.js.map